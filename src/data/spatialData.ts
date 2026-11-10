// Auto-generated from data_mining.ipynb
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

export const RAW_DATA_SAMPLES: RawNodeSample[] = [
  {
    "index": "0",
    "node_id": "64695853",
    "lat": -6.989264,
    "lon": 110.42262,
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "kepadatan_poi": 6,
    "kecepatan_rata_rata": 50
  },
  {
    "index": "1",
    "node_id": "64695855",
    "lat": -6.991302,
    "lon": 110.42231,
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "kepadatan_poi": 3,
    "kecepatan_rata_rata": 50
  },
  {
    "index": "2",
    "node_id": "64695857",
    "lat": -6.99157,
    "lon": 110.422901,
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "kepadatan_poi": 7,
    "kecepatan_rata_rata": 50
  },
  {
    "index": "3",
    "node_id": "64695858",
    "lat": -6.990257,
    "lon": 110.423815,
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "kepadatan_poi": 4,
    "kecepatan_rata_rata": 30
  },
  {
    "index": "4",
    "node_id": "64695860",
    "lat": -6.989589,
    "lon": 110.423886,
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "kepadatan_poi": 6,
    "kecepatan_rata_rata": 30
  },
  {
    "index": "5",
    "node_id": "64696477",
    "lat": -6.991569,
    "lon": 110.422247,
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "kepadatan_poi": 9,
    "kecepatan_rata_rata": 60
  },
  {
    "index": "6",
    "node_id": "64696762",
    "lat": -6.992999,
    "lon": 110.421396,
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "kepadatan_poi": 2,
    "kecepatan_rata_rata": 40
  },
  {
    "index": "7",
    "node_id": "64699979",
    "lat": -6.993107,
    "lon": 110.421666,
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "kepadatan_poi": 6,
    "kecepatan_rata_rata": 60
  },
  {
    "index": "8",
    "node_id": "64700711",
    "lat": -6.991492,
    "lon": 110.422689,
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "kepadatan_poi": 7,
    "kecepatan_rata_rata": 40
  },
  {
    "index": "9",
    "node_id": "79409654",
    "lat": -6.99832,
    "lon": 110.419518,
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "kepadatan_poi": 4,
    "kecepatan_rata_rata": 30
  }
];

export const FILTERED_DATA_SAMPLES: RawNodeSample[] = [
  {
    "index": "0",
    "node_id": "64695853",
    "lat": -6.989264,
    "lon": 110.42262,
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "kepadatan_poi": 6,
    "kecepatan_rata_rata": 50
  },
  {
    "index": "1",
    "node_id": "64695855",
    "lat": -6.991302,
    "lon": 110.42231,
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "kepadatan_poi": 3,
    "kecepatan_rata_rata": 50
  },
  {
    "index": "2",
    "node_id": "64695857",
    "lat": -6.99157,
    "lon": 110.422901,
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "kepadatan_poi": 7,
    "kecepatan_rata_rata": 50
  },
  {
    "index": "3",
    "node_id": "64695858",
    "lat": -6.990257,
    "lon": 110.423815,
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "kepadatan_poi": 4,
    "kecepatan_rata_rata": 30
  },
  {
    "index": "4",
    "node_id": "64695860",
    "lat": -6.989589,
    "lon": 110.423886,
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "kepadatan_poi": 6,
    "kecepatan_rata_rata": 30
  },
  {
    "index": "5",
    "node_id": "64696477",
    "lat": -6.991569,
    "lon": 110.422247,
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "kepadatan_poi": 9,
    "kecepatan_rata_rata": 60
  },
  {
    "index": "6",
    "node_id": "64696762",
    "lat": -6.992999,
    "lon": 110.421396,
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "kepadatan_poi": 2,
    "kecepatan_rata_rata": 40
  },
  {
    "index": "7",
    "node_id": "64699979",
    "lat": -6.993107,
    "lon": 110.421666,
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "kepadatan_poi": 6,
    "kecepatan_rata_rata": 60
  },
  {
    "index": "8",
    "node_id": "64700711",
    "lat": -6.991492,
    "lon": 110.422689,
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "kepadatan_poi": 7,
    "kecepatan_rata_rata": 40
  },
  {
    "index": "9",
    "node_id": "79409654",
    "lat": -6.99832,
    "lon": 110.419518,
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "kepadatan_poi": 4,
    "kecepatan_rata_rata": 30
  }
];

export const STATS_SAMPLES: DescriptiveStat[] = [
  {
    "feature": "jumlah_lengan",
    "mean": 3.120499,
    "std": 0.32677,
    "min": 3,
    "median": 3,
    "max": 6
  },
  {
    "feature": "kepadatan_poi",
    "mean": 4.529359,
    "std": 2.871933,
    "min": 0,
    "median": 5,
    "max": 9
  },
  {
    "feature": "kecepatan_rata_rata",
    "mean": 44.980328,
    "std": 11.204491,
    "min": 30,
    "median": 40,
    "max": 60
  }
];

export const OUTLIER_SAMPLES: OutlierMetric[] = [
  {
    "feature": "jumlah_lengan",
    "q1": 3,
    "q3": 3,
    "iqr": 0,
    "lower_bound": 3,
    "upper_bound": 3,
    "outlier_count": 4824
  },
  {
    "feature": "kepadatan_poi",
    "q1": 2,
    "q3": 7,
    "iqr": 5,
    "lower_bound": -5.5,
    "upper_bound": 14.5,
    "outlier_count": 0
  },
  {
    "feature": "kecepatan_rata_rata",
    "q1": 30,
    "q3": 60,
    "iqr": 30,
    "lower_bound": -15,
    "upper_bound": 105,
    "outlier_count": 0
  }
];

export const SCALED_SAMPLES: ScaledSample[] = [
  {
    "index": "0",
    "node_id": "64695853",
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "jumlah_lengan_scaled": 0,
    "lampu_lalu_lintas_scaled": 0,
    "kepadatan_poi_scaled": 0.666667,
    "kecepatan_rata_rata_scaled": 0.666667
  },
  {
    "index": "1",
    "node_id": "64695855",
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "jumlah_lengan_scaled": 0,
    "lampu_lalu_lintas_scaled": 0,
    "kepadatan_poi_scaled": 0.333333,
    "kecepatan_rata_rata_scaled": 0.666667
  },
  {
    "index": "2",
    "node_id": "64695857",
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "jumlah_lengan_scaled": 0,
    "lampu_lalu_lintas_scaled": 0,
    "kepadatan_poi_scaled": 0.777778,
    "kecepatan_rata_rata_scaled": 0.666667
  },
  {
    "index": "3",
    "node_id": "64695858",
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "jumlah_lengan_scaled": 0,
    "lampu_lalu_lintas_scaled": 0,
    "kepadatan_poi_scaled": 0.444444,
    "kecepatan_rata_rata_scaled": 0
  },
  {
    "index": "4",
    "node_id": "64695860",
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "jumlah_lengan_scaled": 0,
    "lampu_lalu_lintas_scaled": 0,
    "kepadatan_poi_scaled": 0.666667,
    "kecepatan_rata_rata_scaled": 0
  },
  {
    "index": "5",
    "node_id": "64696477",
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "jumlah_lengan_scaled": 0,
    "lampu_lalu_lintas_scaled": 0,
    "kepadatan_poi_scaled": 1,
    "kecepatan_rata_rata_scaled": 1
  },
  {
    "index": "6",
    "node_id": "64696762",
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "jumlah_lengan_scaled": 0,
    "lampu_lalu_lintas_scaled": 0,
    "kepadatan_poi_scaled": 0.222222,
    "kecepatan_rata_rata_scaled": 0.333333
  },
  {
    "index": "7",
    "node_id": "64699979",
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "jumlah_lengan_scaled": 0,
    "lampu_lalu_lintas_scaled": 0,
    "kepadatan_poi_scaled": 0.666667,
    "kecepatan_rata_rata_scaled": 1
  },
  {
    "index": "8",
    "node_id": "64700711",
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "jumlah_lengan_scaled": 0,
    "lampu_lalu_lintas_scaled": 0,
    "kepadatan_poi_scaled": 0.777778,
    "kecepatan_rata_rata_scaled": 0.333333
  },
  {
    "index": "9",
    "node_id": "79409654",
    "jumlah_lengan": 3,
    "lampu_lalu_lintas": 0,
    "jumlah_lengan_scaled": 0,
    "lampu_lalu_lintas_scaled": 0,
    "kepadatan_poi_scaled": 0.444444,
    "kecepatan_rata_rata_scaled": 0
  }
];
