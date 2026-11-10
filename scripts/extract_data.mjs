import fs from 'fs';
import path from 'path';

const defaultNbPath = 'C:/Users/INDRA WIJAYA/Documents/mytugasgwej/smt_5/data_mining/data_mining.ipynb';
const nbPath = process.argv[2] || defaultNbPath;

if (!fs.existsSync(nbPath)) {
  console.log(`Notebook file not found at: ${nbPath}. Pass path as argument if located elsewhere.`);
  process.exit(0);
}

const nb = JSON.parse(fs.readFileSync(nbPath, 'utf8'));

// 1. Ensure directories exist
const mapsDir = path.resolve('public/maps');
const dataDir = path.resolve('public/data');
const srcDataDir = path.resolve('src/data');

[mapsDir, dataDir, srcDataDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

function unescapeHtml(escapedStr) {
  return escapedStr
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

// 2. Extract Folium Maps
const cell11 = nb.cells[11];
const mapOutputs = cell11.outputs.filter(o => o.data && o.data['text/html']);

if (mapOutputs.length >= 2) {
  const raw1 = mapOutputs[0].data['text/html'].join('');
  const match1 = raw1.match(/srcdoc="([\s\S]*?)"/);
  if (match1) {
    const html1 = unescapeHtml(match1[1]);
    fs.writeFileSync(path.join(mapsDir, 'semarang-raw-nodes.html'), html1, 'utf8');
    console.log('Saved semarang-raw-nodes.html');
  }

  const raw2 = mapOutputs[1].data['text/html'].join('');
  const match2 = raw2.match(/srcdoc="([\s\S]*?)"/);
  if (match2) {
    const html2 = unescapeHtml(match2[1]);
    fs.writeFileSync(path.join(mapsDir, 'semarang-filtered-intersections.html'), html2, 'utf8');
    console.log('Saved semarang-filtered-intersections.html');
  }
}

// 3. Helper to parse Pandas HTML table
function parseTable(html) {
  const theadMatch = html.match(/<thead>([\s\S]*?)<\/thead>/);
  const tbodyMatch = html.match(/<tbody>([\s\S]*?)<\/tbody>/);
  
  const headers = [];
  if (theadMatch) {
    const thMatches = [...theadMatch[1].matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)];
    thMatches.forEach(m => {
      const h = m[1].trim();
      if (h && !h.includes('<tr') && !h.includes('<th')) headers.push(h);
    });
  }
  
  const rows = [];
  if (tbodyMatch) {
    const trMatches = [...tbodyMatch[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)];
    trMatches.forEach(tr => {
      const cols = [];
      const cells = [...tr[1].matchAll(/<(?:td|th)[^>]*>([\s\S]*?)<\/(?:td|th)>/g)];
      cells.forEach(c => cols.push(c[1].trim()));
      rows.push(cols);
    });
  }
  return { headers, rows };
}

// Cell 4: Raw
const rawTable = parseTable(nb.cells[4].outputs.find(o => o.data?.['text/html']).data['text/html'].join(''));
// Cell 6: Filtered
const filteredTable = parseTable(nb.cells[6].outputs.find(o => o.data?.['text/html']).data['text/html'].join(''));
// Cell 7: Statistics
const statsTable = parseTable(nb.cells[7].outputs.find(o => o.data?.['text/html']).data['text/html'].join(''));
// Cell 8: Outlier
const outlierTable = parseTable(nb.cells[8].outputs.find(o => o.data?.['text/html']).data['text/html'].join(''));
// Cell 9: Scaled
const scaledTable = parseTable(nb.cells[9].outputs.find(o => o.data?.['text/html']).data['text/html'].join(''));

// Format Raw Data
const rawDataFormatted = rawTable.rows.map(r => ({
  index: r[0],
  node_id: r[1],
  lat: parseFloat(r[2]),
  lon: parseFloat(r[3]),
  jumlah_lengan: parseInt(r[4], 10),
  lampu_lalu_lintas: parseInt(r[5], 10),
  kepadatan_poi: parseInt(r[6], 10),
  kecepatan_rata_rata: parseInt(r[7], 10)
}));

// Format Filtered Data
const filteredDataFormatted = filteredTable.rows.map(r => ({
  index: r[0],
  node_id: r[1],
  lat: parseFloat(r[2]),
  lon: parseFloat(r[3]),
  jumlah_lengan: parseInt(r[4], 10),
  lampu_lalu_lintas: parseInt(r[5], 10),
  kepadatan_poi: parseInt(r[6], 10),
  kecepatan_rata_rata: parseInt(r[7], 10)
}));

// Format Stats Data
const statsDataFormatted = statsTable.rows.map(r => ({
  feature: r[0],
  mean: parseFloat(r[1]),
  std: parseFloat(r[2]),
  min: parseFloat(r[3]),
  median: parseFloat(r[4]),
  max: parseFloat(r[5])
}));

// Format Outlier Data
const outlierDataFormatted = outlierTable.rows.map(r => ({
  feature: r[1],
  q1: parseFloat(r[2]),
  q3: parseFloat(r[3]),
  iqr: parseFloat(r[4]),
  lower_bound: parseFloat(r[5]),
  upper_bound: parseFloat(r[6]),
  outlier_count: parseInt(r[7], 10)
}));

// Format Scaled Data
const scaledDataFormatted = scaledTable.rows.map(r => ({
  index: r[0],
  node_id: r[1],
  jumlah_lengan: parseInt(r[2], 10),
  lampu_lalu_lintas: parseInt(r[3], 10),
  jumlah_lengan_scaled: parseFloat(r[4]),
  lampu_lalu_lintas_scaled: parseFloat(r[5]),
  kepadatan_poi_scaled: parseFloat(r[6]),
  kecepatan_rata_rata_scaled: parseFloat(r[7])
}));

// Generate CSV sample
let csvContent = "node_id,y,x,jumlah_lengan,lampu_lalu_lintas,kepadatan_poi,kecepatan_rata_rata,status\n";
filteredDataFormatted.forEach(row => {
  csvContent += `${row.node_id},${row.lat},${row.lon},${row.jumlah_lengan},${row.lampu_lalu_lintas},${row.kepadatan_poi},${row.kecepatan_rata_rata},Lolos_Filter\n`;
});
fs.writeFileSync(path.join(dataDir, 'sample_dataset_semarang.csv'), csvContent, 'utf8');
console.log('Saved sample_dataset_semarang.csv');

// Generate TypeScript data file
const tsContent = `// Auto-generated from data_mining.ipynb
export interface RawNodeSample {
  index: string;
  node_id: string;
  lat: number;
  lon: number;
  jumlah_lengan: number;
  lampu_lalu_lintas: number;
  kepadatan_poi: number;
  kecepatan_rata_rata: number;
}

export interface DescriptiveStat {
  feature: string;
  mean: number;
  std: number;
  min: number;
  median: number;
  max: number;
}

export interface OutlierMetric {
  feature: string;
  q1: number;
  q3: number;
  iqr: number;
  lower_bound: number;
  upper_bound: number;
  outlier_count: number;
}

export interface ScaledSample {
  index: string;
  node_id: string;
  jumlah_lengan: number;
  lampu_lalu_lintas: number;
  jumlah_lengan_scaled: number;
  lampu_lalu_lintas_scaled: number;
  kepadatan_poi_scaled: number;
  kecepatan_rata_rata_scaled: number;
}

export const SPATIAL_METRICS = {
  totalRawNodes: 51398,
  totalFilteredNodes: 40158,
  eliminatedNodes: 11240,
  eliminationPercentage: 21.87,
  featuresCount: 7,
  targetArea: "Kota Semarang, Jawa Tengah",
  minLenganThreshold: 3,
  clusteringReady: true,
};

export const PIPELINE_STEPS = [
  {
    step: "01",
    title: "Ekstraksi Jaringan Jalan",
    library: "OSMnx & Overpass API",
    description: "Mengunduh seluruh graf jaringan jalan terhubung Kota Semarang dalam format NetworkX & GeoPandas GeoDataFrame (51.398 node titik persimpangan/segmen).",
  },
  {
    step: "02",
    title: "Cleaning & Missing Value Imputation",
    library: "Pandas & NumPy",
    description: "Memeriksa nilai kosong pada atribut lalu lintas dan lengan. Melakukan imputasi nilai 0 pada missing values sehingga tersisa 0 missing data.",
  },
  {
    step: "03",
    title: "Filtering Persimpangan Murni",
    library: "GeoPandas",
    description: "Menyeleksi simpul jalan dengan degree (lengan simpang) >= 3 untuk memisahkan persimpangan jalan murni dari titik belokan jalan biasa (40.158 lolos filter).",
  },
  {
    step: "04",
    title: "Statistik Deskriptif",
    library: "Scipy & Pandas",
    description: "Menganalisis tendensi sentral (mean, median, standar deviasi, rentang min-max) untuk memastikan sebaran nilai fitur sebelum klasterisasi.",
  },
  {
    step: "05",
    title: "Deteksi Outlier (Metode IQR)",
    library: "Interquartile Range Rule",
    description: "Mendeteksi nilai ekstrem (Q1 - 1.5*IQR sampai Q3 + 1.5*IQR) pada parameter jumlah lengan simpang, kepadatan POI, dan estimasi kecepatan lalu lintas.",
  },
  {
    step: "06",
    title: "Normalisasi Min-Max Scaling",
    library: "Scikit-Learn (MinMaxScaler)",
    description: "Mentransformasikan seluruh dimensi fitur ke skala seragam [0, 1] agar atribut ber-orde besar tidak mendominasi perhitungan jarak Euclidean.",
  },
  {
    step: "07",
    title: "Pemetaan Spasial Interaktif",
    library: "Folium & FastMarkerCluster",
    description: "Memvisualisasikan kepadatan simpul jalan Kota Semarang ke dalam antarmuka peta interaktif berbasis Leaflet dengan pengelompokan marker dinamis.",
  },
];

export const RAW_DATA_SAMPLES: RawNodeSample[] = ${JSON.stringify(rawDataFormatted, null, 2)};

export const FILTERED_DATA_SAMPLES: RawNodeSample[] = ${JSON.stringify(filteredDataFormatted, null, 2)};

export const STATS_SAMPLES: DescriptiveStat[] = ${JSON.stringify(statsDataFormatted, null, 2)};

export const OUTLIER_SAMPLES: OutlierMetric[] = ${JSON.stringify(outlierDataFormatted, null, 2)};

export const SCALED_SAMPLES: ScaledSample[] = ${JSON.stringify(scaledDataFormatted, null, 2)};
`;

fs.writeFileSync(path.join(srcDataDir, 'spatialData.ts'), tsContent, 'utf8');
console.log('Saved src/data/spatialData.ts');
