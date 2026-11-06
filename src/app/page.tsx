"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SocialLinks from "@/components/SocialLinks";
import Starfield from "@/components/Starfield";
import Globe from "@/components/Globe";
import ExplorationAccordion from "@/components/ExplorationAccordion";
import { HERO_CONTENT, LEARNING_ITEMS, FOOTER_CONTENT } from "@/lib/content";
import { orbitron } from "@/lib/fonts";

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion();

  // Variasi animasi masuk (durasi 700ms, stagger 90ms)
  const sectionVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.09,
        delayChildren: prefersReducedMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.7,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-[#e8e6f0]">
      {/* Background Bintang Kosmik Interaktif */}
      <Starfield />

      {/* Globe Bumi 3D (Fluid Responsive) */}
      <Globe />

      {/* Konten Halaman Utama (Langsung ter-render di SSR agar selalu muncul di semua device) */}
      <main className="relative z-10 mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 lg:py-24 safe-bottom">
        <div className="flex flex-col fluid-section-gap">
          {/* ============================================================== */}
          {/* 1. HERO SECTION (RATA KIRI SEJAJAR LURUS)                       */}
          {/* ============================================================== */}
          <motion.header
            variants={sectionVariants}
            initial={false}
            animate="show"
            className="space-y-8 lg:space-y-10"
          >
            {/* Eyebrow Status & Lokasi */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[12px] uppercase tracking-[0.1em] text-sky-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
                </span>
                <span className="font-medium">
                  {HERO_CONTENT.status}
                </span>
                <span className="text-white/20">/</span>
                <span className="text-white/70">{HERO_CONTENT.location}</span>
              </div>
            </motion.div>

            {/* [NAMA LENGKAP] - Fluid Typography: Font Orbitron untuk "Indra Wijaya" */}
            <motion.div variants={itemVariants}>
              <h1 className={`${orbitron.className} font-orbitron fluid-hero font-extrabold text-white text-balance tracking-wider`}>
                Indra <span className="font-bold text-sky-200/90">Wijaya</span>
              </h1>
            </motion.div>

            {/* Role, Deskripsi, & Tombol Sosial Media (Rata kiri sejajar lurus dengan Nama) */}
            <div className="space-y-6 max-w-2xl sm:max-w-3xl">
              <motion.div variants={itemVariants} className="space-y-3">
                {/* [ROLE] - Font Body dengan weight seragam tanpa mencampur italic */}
                <p className="font-body text-base sm:text-lg lg:text-xl font-medium text-sky-300/90 tracking-tight">
                  {HERO_CONTENT.role}
                </p>

                {/* [DESKRIPSI SINGKAT] - Dibatasi 65ch untuk kenyamanan membaca */}
                <p className="prose-reading fluid-body text-[#e8e6f0]/85 text-pretty">
                  {HERO_CONTENT.description}
                </p>
              </motion.div>

              {/* Tombol Sosial Media (Grid 2 kolom di HP, horizontal di desktop) */}
              <motion.div variants={itemVariants} className="pt-2 sm:pt-4 space-y-3">
                <span className="fluid-label text-white/45 font-semibold block">
                  Hubungkan & Kolaborasi
                </span>
                <SocialLinks />
              </motion.div>
            </div>
          </motion.header>

          {/* ============================================================== */}
          {/* 2. SECTION "SEDANG DIPELAJARI" (MINIMALIST ACCORDION)           */}
          {/* ============================================================== */}
          <motion.section
            variants={sectionVariants}
            initial={false}
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            aria-labelledby="learning-heading"
            className="space-y-6 sm:space-y-8 pt-10 sm:pt-14 border-t border-white/10"
          >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2 max-w-xl">
                <span className="fluid-label text-sky-400/90 font-semibold tracking-wider">
                  Fokus & Eksplorasi
                </span>
                <h2
                  id="learning-heading"
                  className="fluid-section-title font-bold text-white text-balance"
                >
                  Sedang Dikerjakan & Dieksplorasi
                </h2>
              </div>
              <p className="prose-reading text-sm text-[#e8e6f0]/65 text-pretty max-w-md">
                Inisiatif bisnis teknologi cloud dan pengolahan data geospasial yang saat ini aktif ditekuni.
              </p>
            </div>

            {/* Minimalist Interactive Accordion */}
            <motion.div variants={itemVariants}>
              <ExplorationAccordion items={LEARNING_ITEMS} />
            </motion.div>
          </motion.section>

          {/* ============================================================== */}
          {/* 3. FOOTER                                                      */}
          {/* ============================================================== */}
          <motion.footer
            variants={sectionVariants}
            initial={false}
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="mt-6 border-t border-white/10 pt-8 pb-4"
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[12px] uppercase tracking-[0.08em] text-[#e8e6f0]/60"
            >
              <p>{FOOTER_CONTENT.text}</p>
              <p className="text-white/40">{FOOTER_CONTENT.subtext}</p>
            </motion.div>
          </motion.footer>
        </div>
      </main>
    </div>
  );
}
