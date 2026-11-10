"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  MapPin,
  Database,
  Layers,
  Filter,
  Activity,
  CheckCircle2,
  Table as TableIcon,
  Maximize2,
  TrendingUp,
  Sparkles,
  Search,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";
import Starfield from "@/components/Starfield";
import { orbitron } from "@/lib/fonts";
import {
  SPATIAL_METRICS,
  PIPELINE_STEPS,
  RAW_DATA_SAMPLES,
  FILTERED_DATA_SAMPLES,
  STATS_SAMPLES,
  OUTLIER_SAMPLES,
  SCALED_SAMPLES,
} from "@/data/spatialData";

type TableTab = "raw" | "filtered" | "stats" | "outliers" | "scaled";
type MapTab = "raw" | "filtered";

// Formatter angka deterministik agar tidak terjadi mismatch server/client hydration
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function DataProcessingPage() {
  const [activeMap, setActiveMap] = useState<MapTab>("filtered");
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [activeTableTab, setActiveTableTab] = useState<TableTab>("filtered");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const switchMap = (tab: MapTab) => {
    if (tab === activeMap) return;
    setIsMapLoading(true);
    setActiveMap(tab);
  };

  // Filter raw / filtered table by search
  const filteredRawRows = useMemo(() => {
    if (!searchQuery) return RAW_DATA_SAMPLES;
    const q = searchQuery.toLowerCase();
    return RAW_DATA_SAMPLES.filter(
      (item) =>
        item.node_id.includes(q) ||
        item.jumlah_lengan.toString().includes(q) ||
        item.kecepatan_rata_rata.toString().includes(q)
    );
  }, [searchQuery]);

  const filteredSimpangRows = useMemo(() => {
    if (!searchQuery) return FILTERED_DATA_SAMPLES;
    const q = searchQuery.toLowerCase();
    return FILTERED_DATA_SAMPLES.filter(
      (item) =>
        item.node_id.includes(q) ||
        item.jumlah_lengan.toString().includes(q) ||
        item.kecepatan_rata_rata.toString().includes(q)
    );
  }, [searchQuery]);

  const filteredScaledRows = useMemo(() => {
    if (!searchQuery) return SCALED_SAMPLES;
    const q = searchQuery.toLowerCase();
    return SCALED_SAMPLES.filter((item) => item.node_id.includes(q));
  }, [searchQuery]);

  // Pagination slice helper
  const paginate = <T,>(items: T[]): { paged: T[]; totalPages: number } => {
    const totalPages = Math.max(1, Math.ceil(items.length / rowsPerPage));
    const start = (currentPage - 1) * rowsPerPage;
    return {
      paged: items.slice(start, start + rowsPerPage),
      totalPages,
    };
  };

  const handleTabChange = (tab: TableTab) => {
    setActiveTableTab(tab);
    setCurrentPage(1);
    setSearchQuery("");
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#06070d] text-[#e8e6f0]">
      {/* Background Bintang Kosmik Interaktif */}
      <Starfield />

      <div className="relative z-10 mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12 py-8 sm:py-12 space-y-12">
        {/* ============================================================== */}
        {/* TOP BAR / NAVIGATION                                           */}
        {/* ============================================================== */}
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-xs uppercase tracking-wider text-sky-200 transition-all hover:border-sky-400/40 hover:bg-sky-400/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Kembali ke Portofolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/5 px-3 py-1 font-mono text-[11px] text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
              Dataset Kota Semarang
            </span>
            <a
              href="/data/sample_dataset_semarang.csv"
              download="sample_dataset_semarang.csv"
              className="inline-flex items-center gap-2 rounded-xl border border-sky-400/30 bg-sky-400/15 px-3.5 py-2 font-mono text-xs font-semibold text-sky-200 shadow-sm transition-all hover:bg-sky-400/25 hover:border-sky-400/60 hover:text-white"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Unduh CSV</span>
            </a>
          </div>
        </header>

        {/* ============================================================== */}
        {/* HERO TITLE SECTION                                             */}
        {/* ============================================================== */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-[11px] font-mono tracking-widest text-sky-300 uppercase">
            <Sparkles className="h-3.5 w-3.5 text-sky-400" />
            <span>Spatial Data Engineering & Data Mining</span>
          </div>

          <h1
            className={`${orbitron.className} text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-wide text-white text-balance`}
          >
            Data Processing: <span className="text-sky-300">Jaringan Jalan & Persimpangan</span> Kota Semarang
          </h1>

          <p className="max-w-4xl text-sm sm:text-base text-[#e8e6f0]/80 leading-relaxed text-pretty">
            Eksplorasi dan rekayasa data spasial skala besar mencakup lebih dari{" "}
            <span className="font-semibold text-white">50.000 titik node</span> jaringan jalan Kota Semarang.
            Mengimplementasikan pipeline komprehensif mulai dari ekstraksi graf dengan{" "}
            <span className="text-sky-300 font-mono">OSMnx</span>, pembersihan & imputasi missing values, filtering simpul
            persimpangan murni (lengan $\ge 3$), uji statistik & deteksi outlier metode{" "}
            <span className="text-sky-300 font-mono">IQR</span>, hingga normalisasi{" "}
            <span className="text-sky-300 font-mono">Min-Max Scaling</span> dan visualisasi Leaflet.
          </p>
        </div>

        {/* ============================================================== */}
        {/* METRICS KPI CARDS                                              */}
        {/* ============================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-white/50 mb-2">
              <span className="font-mono text-xs uppercase tracking-wider">Node Mentah</span>
              <Database className="h-4 w-4 text-sky-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {formatNumber(SPATIAL_METRICS.totalRawNodes)}
            </div>
            <p className="text-[11px] text-white/50 mt-1">Ekstraksi awal OSMnx</p>
          </div>

          <div className="rounded-2xl border border-sky-400/30 bg-sky-400/[0.04] p-4 sm:p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-sky-300/70 mb-2">
              <span className="font-mono text-xs uppercase tracking-wider">Simpang Murni</span>
              <CheckCircle2 className="h-4 w-4 text-sky-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-200 font-mono">
              {formatNumber(SPATIAL_METRICS.totalFilteredNodes)}
            </div>
            <p className="text-[11px] text-sky-300/60 mt-1">Lolos filter lengan $\ge 3$</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-white/50 mb-2">
              <span className="font-mono text-xs uppercase tracking-wider">Dieliminasi</span>
              <Filter className="h-4 w-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {formatNumber(SPATIAL_METRICS.eliminatedNodes)}
            </div>
            <p className="text-[11px] text-amber-300/70 mt-1">
              {SPATIAL_METRICS.eliminationPercentage}% segmen jalan biasa
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-white/50 mb-2">
              <span className="font-mono text-xs uppercase tracking-wider">Missing Values</span>
              <Activity className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-mono">0</div>
            <p className="text-[11px] text-emerald-300/70 mt-1">100% bersih & terimputasi</p>
          </div>

          <div className="col-span-2 sm:col-span-1 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-white/50 mb-2">
              <span className="font-mono text-xs uppercase tracking-wider">Dimensi Fitur</span>
              <Layers className="h-4 w-4 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {SPATIAL_METRICS.featuresCount}
            </div>
            <p className="text-[11px] text-purple-300/70 mt-1">Siap K-Means Clustering</p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE MAP VIEWER SECTION                                 */}
        {/* ============================================================== */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-sky-400" />
                <h2 className="font-display text-lg sm:text-xl font-bold text-white">
                  Pemetaan Spasial Interaktif Folium
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-white/60">
                Peta interaktif menggunakan tiles Esri WorldStreetMap & Leaflet FastMarkerCluster untuk performa tinggi.
              </p>
            </div>

            {/* Map Switcher Pills */}
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-1 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => switchMap("filtered")}
                className={`rounded-lg px-3.5 py-1.5 font-mono text-xs transition-all ${
                  activeMap === "filtered"
                    ? "bg-sky-400/20 text-sky-200 border border-sky-400/40 shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Peta 2: Persimpangan ({formatNumber(SPATIAL_METRICS.totalFilteredNodes)})
              </button>
              <button
                type="button"
                onClick={() => switchMap("raw")}
                className={`rounded-lg px-3.5 py-1.5 font-mono text-xs transition-all ${
                  activeMap === "raw"
                    ? "bg-sky-400/20 text-sky-200 border border-sky-400/40 shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Peta 1: Mentah ({formatNumber(SPATIAL_METRICS.totalRawNodes)})
              </button>
            </div>
          </div>

          {/* Map Frame Container */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
              <div className="flex items-center gap-2 text-xs font-mono text-white/70">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>
                  {activeMap === "filtered"
                    ? "Menampilkan 40.158 Titik Persimpangan Murni (Lengan ≥ 3)"
                    : "Menampilkan 51.398 Titik Mentah OSM Jaringan Jalan Semarang"}
                </span>
              </div>
              <a
                href={
                  activeMap === "filtered"
                    ? "/maps/semarang-filtered-intersections.html"
                    : "/maps/semarang-raw-nodes.html"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-sky-300 hover:text-white transition-colors"
                title="Buka peta di tab baru layar penuh"
              >
                <span>Layar Penuh</span>
                <Maximize2 className="h-3 w-3" />
              </a>
            </div>

            <div className="relative h-[480px] sm:h-[580px] w-full bg-[#0a0c16]">
              {/* High-tech Loading State Skeleton */}
              {isMapLoading && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-[#0a0c16]/95 backdrop-blur-sm">
                  <div className="relative flex h-12 w-12 items-center justify-center">
                    <div className="absolute h-full w-full rounded-full border-2 border-sky-400/20 border-t-sky-400 animate-spin" />
                    <MapPin className="h-5 w-5 text-sky-300" />
                  </div>
                  <div className="text-center space-y-1 px-4">
                    <p className="font-mono text-sm font-semibold text-white">
                      {activeMap === "filtered"
                        ? "Memuat & Mengklaster 40.158 Titik Persimpangan..."
                        : "Memuat 51.398 Titik Mentah Jaringan Jalan..."}
                    </p>
                    <p className="text-xs text-white/50 font-mono">
                      Menghitung spatial grid Leaflet FastMarkerCluster di browser...
                    </p>
                  </div>
                </div>
              )}

              <iframe
                key={activeMap}
                src={
                  activeMap === "filtered"
                    ? "/maps/semarang-filtered-intersections.html"
                    : "/maps/semarang-raw-nodes.html"
                }
                onLoad={() => setIsMapLoading(false)}
                title="Peta Interaktif Semarang"
                className={`h-full w-full border-0 transition-opacity duration-500 ${
                  isMapLoading ? "opacity-0" : "opacity-100"
                }`}
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* INTERACTIVE DATA TABLE INSPECTOR                                */}
        {/* ============================================================== */}
        <section className="space-y-6 pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <TableIcon className="h-5 w-5 text-sky-400" />
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                  Inspeksi Tabel Data & Pipeline Transformasi
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-white/60">
                Jelajahi sampel data mentah, persimpangan terfilter, statistik tendensi sentral, uji outlier IQR, dan hasil normalisasi.
              </p>
            </div>

            {/* Table Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.02] p-1">
              <button
                type="button"
                onClick={() => handleTabChange("filtered")}
                className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-all ${
                  activeTableTab === "filtered"
                    ? "bg-sky-400/20 text-sky-200 border border-sky-400/40"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Simpang Terfilter
              </button>
              <button
                type="button"
                onClick={() => handleTabChange("raw")}
                className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-all ${
                  activeTableTab === "raw"
                    ? "bg-sky-400/20 text-sky-200 border border-sky-400/40"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Data Mentah
              </button>
              <button
                type="button"
                onClick={() => handleTabChange("stats")}
                className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-all ${
                  activeTableTab === "stats"
                    ? "bg-sky-400/20 text-sky-200 border border-sky-400/40"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Statistik Deskriptif
              </button>
              <button
                type="button"
                onClick={() => handleTabChange("outliers")}
                className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-all ${
                  activeTableTab === "outliers"
                    ? "bg-sky-400/20 text-sky-200 border border-sky-400/40"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Uji Outlier (IQR)
              </button>
              <button
                type="button"
                onClick={() => handleTabChange("scaled")}
                className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-all ${
                  activeTableTab === "scaled"
                    ? "bg-sky-400/20 text-sky-200 border border-sky-400/40"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Ternormalisasi [0, 1]
              </button>
            </div>
          </div>

          {/* Table Container Card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden">
            {/* Table Action Bar (Search & Info) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-white/10 bg-white/[0.02] px-5 py-3">
              <div className="flex items-center gap-2 text-xs font-mono text-white/60 w-full sm:w-auto">
                <Info className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                <span>
                  {activeTableTab === "filtered" &&
                    "Menampilkan cuplikan persimpangan jalan murni (lengan simpang ≥ 3)"}
                  {activeTableTab === "raw" &&
                    "Menampilkan data awal mentah hasil ekstraksi OSMnx (51.398 baris total)"}
                  {activeTableTab === "stats" &&
                    "Matriks tendensi sentral fitur numerik (mean, median, std dev, rentang)"}
                  {activeTableTab === "outliers" &&
                    "Uji outlier menggunakan rumus Interquartile Range (Q1 - 1.5*IQR sampai Q3 + 1.5*IQR)"}
                  {activeTableTab === "scaled" &&
                    "Hasil transformasi Min-Max Scaler rentang [0, 1] siap klasterisasi K-Means"}
                </span>
              </div>

              {/* Search Bar for tabular rows */}
              {(activeTableTab === "raw" || activeTableTab === "filtered" || activeTableTab === "scaled") && (
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Cari Node ID / Atribut..."
                    className="w-full rounded-lg border border-white/10 bg-black/40 pl-9 pr-3 py-1.5 font-mono text-xs text-white placeholder-white/30 focus:border-sky-400/60 focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Table Content Area */}
            <div className="overflow-x-auto">
              {/* TAB 1 & 2: RAW / FILTERED DATA TABLE */}
              {(activeTableTab === "filtered" || activeTableTab === "raw") && (() => {
                const dataset = activeTableTab === "filtered" ? filteredSimpangRows : filteredRawRows;
                const { paged, totalPages } = paginate(dataset);

                return (
                  <div>
                    <table className="w-full border-collapse text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/[0.04] text-white/70 uppercase tracking-wider text-[11px]">
                          <th className="py-3 px-4">Index</th>
                          <th className="py-3 px-4">Node ID</th>
                          <th className="py-3 px-4">Latitude (y)</th>
                          <th className="py-3 px-4">Longitude (x)</th>
                          <th className="py-3 px-4 text-center">Jml Lengan</th>
                          <th className="py-3 px-4 text-center">Lampu Lalin</th>
                          <th className="py-3 px-4 text-center">Kepadatan POI</th>
                          <th className="py-3 px-4 text-center">Kec. Rata-Rata</th>
                          <th className="py-3 px-4 text-right">Status Seleksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-[#e8e6f0]/85">
                        {paged.length > 0 ? (
                          paged.map((row) => (
                            <tr
                              key={row.node_id}
                              className="hover:bg-white/[0.02] transition-colors"
                            >
                              <td className="py-3 px-4 text-white/40">{row.index}</td>
                              <td className="py-3 px-4 font-semibold text-sky-300">
                                {row.node_id}
                              </td>
                              <td className="py-3 px-4">{row.lat.toFixed(6)}</td>
                              <td className="py-3 px-4">{row.lon.toFixed(6)}</td>
                              <td className="py-3 px-4 text-center font-bold text-white">
                                {row.jumlah_lengan}
                              </td>
                              <td className="py-3 px-4 text-center">
                                {row.lampu_lalu_lintas > 0 ? (
                                  <span className="rounded bg-emerald-400/10 px-2 py-0.5 text-emerald-300 border border-emerald-400/20 text-[10px]">
                                    Ada
                                  </span>
                                ) : (
                                  <span className="text-white/40">Tidak</span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-center">{row.kepadatan_poi}</td>
                              <td className="py-3 px-4 text-center">{row.kecepatan_rata_rata} km/h</td>
                              <td className="py-3 px-4 text-right">
                                {row.jumlah_lengan >= 3 ? (
                                  <span className="inline-flex items-center gap-1 rounded-md bg-sky-400/10 px-2 py-0.5 text-[10px] text-sky-300 border border-sky-400/20">
                                    <CheckCircle2 className="h-3 w-3" />
                                    <span>Lolos Simpang</span>
                                  </span>
                                ) : (
                                  <span className="rounded-md bg-amber-400/10 px-2 py-0.5 text-[10px] text-amber-300 border border-amber-400/20">
                                    Non-Simpang
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={9} className="py-8 text-center text-white/40">
                              Tidak ada baris data yang cocok dengan pencarian &ldquo;{searchQuery}&rdquo;
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-xs font-mono text-white/60">
                      <span>
                        Menampilkan {paged.length} dari {dataset.length} sampel
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={currentPage <= 1}
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          className="rounded p-1 border border-white/10 bg-white/[0.02] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/[0.06]"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <span>
                          Halaman {currentPage} / {totalPages}
                        </span>
                        <button
                          type="button"
                          disabled={currentPage >= totalPages}
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          className="rounded p-1 border border-white/10 bg-white/[0.02] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/[0.06]"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* TAB 3: STATISTICAL SUMMARY TABLE */}
              {activeTableTab === "stats" && (
                <table className="w-full border-collapse text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.04] text-white/70 uppercase tracking-wider text-[11px]">
                      <th className="py-3 px-4">Fitur Spasial / Atribut</th>
                      <th className="py-3 px-4 text-center">Mean (Rata-rata)</th>
                      <th className="py-3 px-4 text-center">Std Deviasi</th>
                      <th className="py-3 px-4 text-center">Nilai Min</th>
                      <th className="py-3 px-4 text-center">Median (Q2)</th>
                      <th className="py-3 px-4 text-center">Nilai Max</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#e8e6f0]/85">
                    {STATS_SAMPLES.map((row) => (
                      <tr key={row.feature} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4 font-bold text-sky-300">
                          {row.feature}
                        </td>
                        <td className="py-3.5 px-4 text-center text-white font-semibold">
                          {row.mean.toFixed(4)}
                        </td>
                        <td className="py-3.5 px-4 text-center">{row.std.toFixed(4)}</td>
                        <td className="py-3.5 px-4 text-center">{row.min.toFixed(1)}</td>
                        <td className="py-3.5 px-4 text-center text-sky-200">{row.median.toFixed(1)}</td>
                        <td className="py-3.5 px-4 text-center">{row.max.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* TAB 4: OUTLIER (IQR) TABLE */}
              {activeTableTab === "outliers" && (
                <table className="w-full border-collapse text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.04] text-white/70 uppercase tracking-wider text-[11px]">
                      <th className="py-3 px-4">Nama Fitur</th>
                      <th className="py-3 px-4 text-center">Q1 (25%)</th>
                      <th className="py-3 px-4 text-center">Q3 (75%)</th>
                      <th className="py-3 px-4 text-center">IQR</th>
                      <th className="py-3 px-4 text-center">Batas Bawah</th>
                      <th className="py-3 px-4 text-center">Batas Atas</th>
                      <th className="py-3 px-4 text-right">Jumlah Outlier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#e8e6f0]/85">
                    {OUTLIER_SAMPLES.map((row) => (
                      <tr key={row.feature} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4 font-bold text-sky-300">{row.feature}</td>
                        <td className="py-3.5 px-4 text-center">{row.q1.toFixed(1)}</td>
                        <td className="py-3.5 px-4 text-center">{row.q3.toFixed(1)}</td>
                        <td className="py-3.5 px-4 text-center font-semibold text-white">
                          {row.iqr.toFixed(1)}
                        </td>
                        <td className="py-3.5 px-4 text-center">{row.lower_bound.toFixed(1)}</td>
                        <td className="py-3.5 px-4 text-center">{row.upper_bound.toFixed(1)}</td>
                        <td className="py-3.5 px-4 text-right">
                          <span
                            className={`rounded px-2.5 py-1 text-[11px] font-bold border ${
                              row.outlier_count > 0
                                ? "bg-amber-400/10 text-amber-300 border-amber-400/30"
                                : "bg-emerald-400/10 text-emerald-300 border-emerald-400/30"
                            }`}
                          >
                            {formatNumber(row.outlier_count)} baris
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* TAB 5: MIN-MAX SCALED TABLE */}
              {activeTableTab === "scaled" && (() => {
                const { paged, totalPages } = paginate(filteredScaledRows);

                return (
                  <div>
                    <table className="w-full border-collapse text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/[0.04] text-white/70 uppercase tracking-wider text-[11px]">
                          <th className="py-3 px-4">Index</th>
                          <th className="py-3 px-4">Node ID</th>
                          <th className="py-3 px-4 text-center">Lengan (Raw)</th>
                          <th className="py-3 px-4 text-center text-sky-300">Lengan Scaled [0, 1]</th>
                          <th className="py-3 px-4 text-center text-sky-300">Lampu Lalin Scaled</th>
                          <th className="py-3 px-4 text-center text-sky-300">POI Scaled</th>
                          <th className="py-3 px-4 text-center text-sky-300">Kecepatan Scaled</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-[#e8e6f0]/85">
                        {paged.length > 0 ? (
                          paged.map((row) => (
                            <tr
                              key={row.node_id}
                              className="hover:bg-white/[0.02] transition-colors"
                            >
                              <td className="py-3 px-4 text-white/40">{row.index}</td>
                              <td className="py-3 px-4 font-semibold text-white">
                                {row.node_id}
                              </td>
                              <td className="py-3 px-4 text-center">{row.jumlah_lengan}</td>
                              <td className="py-3 px-4 text-center font-bold text-sky-300">
                                {row.jumlah_lengan_scaled.toFixed(4)}
                              </td>
                              <td className="py-3 px-4 text-center text-sky-300">
                                {row.lampu_lalu_lintas_scaled.toFixed(4)}
                              </td>
                              <td className="py-3 px-4 text-center text-sky-300">
                                {row.kepadatan_poi_scaled.toFixed(4)}
                              </td>
                              <td className="py-3 px-4 text-center text-sky-300">
                                {row.kecepatan_rata_rata_scaled.toFixed(4)}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={7} className="py-8 text-center text-white/40">
                              Tidak ada baris data yang cocok dengan &ldquo;{searchQuery}&rdquo;
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-xs font-mono text-white/60">
                      <span>
                        Menampilkan {paged.length} dari {filteredScaledRows.length} sampel
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={currentPage <= 1}
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          className="rounded p-1 border border-white/10 bg-white/[0.02] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/[0.06]"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <span>
                          Halaman {currentPage} / {totalPages}
                        </span>
                        <button
                          type="button"
                          disabled={currentPage >= totalPages}
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          className="rounded p-1 border border-white/10 bg-white/[0.02] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/[0.06]"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* PIPELINE ARCHITECTURE (7 STEPS)                                */}
        {/* ============================================================== */}
        <section className="space-y-6 pt-6">
          <div className="space-y-1">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-sky-400" />
              <span>7 Tahap Arsitektur Pipeline Data Spasial</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/60">
              Alur kerja metodologis data engineering dari ingestion hingga clustering-ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {PIPELINE_STEPS.map((step) => (
              <div
                key={step.step}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-300 hover:border-sky-400/40 hover:bg-white/[0.04] backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-sm font-extrabold text-sky-400">
                    #{step.step}
                  </span>
                  <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-white/70">
                    {step.library}
                  </span>
                </div>
                <h3 className="font-display text-sm font-bold text-white group-hover:text-sky-200 transition-colors mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* FOOTER CALL TO ACTION                                          */}
        {/* ============================================================== */}
        <footer className="border-t border-white/10 pt-8 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
          <div>
            <span>© 2026 Indra Wijaya · Teknologi Rekayasa Komputer, Polines.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-sky-300 transition-colors">
              Halaman Utama
            </Link>
            <span>·</span>
            <a
              href="https://rupacloud.web.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-300 transition-colors"
            >
              RuPa Cloud
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
