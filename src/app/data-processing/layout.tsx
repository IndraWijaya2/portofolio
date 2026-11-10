import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spatial Data Processing & Pipeline | Indra Wijaya",
  description:
    "Dashboard interaktif pengolahan data spasial, ekstraksi jaringan jalan OSMnx Kota Semarang (>50.000 titik), inspeksi tabel data, deteksi outlier IQR, dan visualisasi pemetaan interaktif Leaflet.",
};

export default function DataProcessingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
