import { PROFILE, SOCIAL_LINKS, type SocialLink } from "@/data/socials";

export interface HeroContent {
  name: string;
  role: string;
  description: string;
  location: string;
  campus: string;
  status: string;
  email: string;
}

export interface LearningItem {
  id: string;
  index: string;
  category: string;
  title: string;
  summary: string;
  badges: string[];
  link?: {
    label: string;
    url: string;
  };
}

export interface FooterContent {
  year: number;
  text: string;
  subtext: string;
}

/**
 * Konten Utama Portofolio (Hero Section)
 * Data profil dasar diambil langsung dari src/data/socials.ts.
 * Anda dapat memperbarui data profil di sini atau di src/data/socials.ts.
 */
export const HERO_CONTENT: HeroContent = {
  // [NAMA LENGKAP]
  name: PROFILE.name || "Indra Wijaya",
  // [ROLE] - Menjelaskan bidang kompetensi utama
  role: `${PROFILE.role} · Tech & Business Explorer`,
  // [DESKRIPSI SINGKAT] - 2-3 kalimat yang spesifik, padat, dan manusiawi
  description:
    "Mahasiswa Teknologi Rekayasa Komputer di Politeknik Negeri Semarang dengan ketertarikan kuat pada rekayasa perangkat lunak, sistem komputasi berkinerja tinggi, dan analitik data terstruktur. Berkomitmen merancang sistem yang handal, efisien, serta menyelesaikan permasalahan dunia nyata.",
  location: PROFILE.location,
  campus: PROFILE.campus,
  status: PROFILE.status,
  email: PROFILE.email,
};

/**
 * Bagian "Eksplorasi Aktif & Fokus Projek"
 * Menampilkan inisiatif nyata: Bisnis Cloud (Rupa Cloud) & Pengolahan Data Spasial.
 */
export const LEARNING_ITEMS: LearningItem[] = [
  {
    id: "rupa-cloud",
    index: "01",
    category: "Technopreneurship & Cloud Infrastructure",
    title: "Rupa Cloud (Layanan Cloud Computing, VPS, & Web Hosting)",
    summary:
      "Inisiatif bisnis teknologi (technopreneurship) yang dirancang bersama tim untuk menyediakan infrastruktur server yang andal dan terjangkau bagi pengembang serta UMKM. Berfokus pada penyediaan Virtual Private Server (VPS), web hosting, manajemen sistem Linux, dan operasional layanan berbasis web.",
    badges: ["Rupa Cloud", "VPS & Hosting", "Linux Server", "Technopreneurship", "Cloud Computing"],
    link: {
      label: "Kunjungi rupacloud.web.id",
      url: "https://rupacloud.web.id/",
    },
  },
  {
    id: "spatial-data-mining",
    index: "02",
    category: "Data Mining & Pemrosesan Spasial",
    title: "Data Processing: Ekstraksi & Klasterisasi Jaringan Jalan Kota Semarang",
    summary:
      "Pengolahan dan analisis data spasial skala besar mencakup lebih dari 50.000 titik node jaringan jalan Kota Semarang. Mengimplementasikan pipeline data mining dari ekstraksi graf dengan OSMnx & GeoPandas, rekayasa fitur geometris & simpang jalan, normalisasi data, hingga klasterisasi K-Means dan pemetaan interaktif berbasis Folium/Leaflet.",
    badges: ["Python", "GeoPandas & OSMnx", "K-Means Clustering", "Data Preprocessing", "Folium / Leaflet"],
  },
];

/**
 * Konten Footer
 */
export const FOOTER_CONTENT: FooterContent = {
  year: 2026,
  text: `© 2026 ${PROFILE.name}. Semua hak cipta dilindungi.`,
  subtext: "Dibangun dengan Next.js App Router, Tailwind CSS, dan React Three Fiber.",
};

// Re-export data sosial media dari src/data/socials.ts
export { PROFILE, SOCIAL_LINKS };
export type { SocialLink };
