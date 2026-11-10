"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown, ArrowUpRight, ArrowRight } from "lucide-react";
import { LearningItem } from "@/lib/content";

interface ExplorationAccordionProps {
  items: LearningItem[];
}

export default function ExplorationAccordion({ items }: ExplorationAccordionProps) {
  // Default: item pertama dibuka agar pengunjung langsung melihat contoh interaksi
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  const prefersReducedMotion = useReducedMotion();

  const toggleItem = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((item) => {
        const isOpen = activeId === item.id;

        return (
          <div
            key={item.id}
            className={`group transition-colors duration-200 ${
              isOpen ? "bg-white/[0.03]" : "hover:bg-white/[0.015]"
            }`}
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              id={`accordion-trigger-${item.id}`}
              className="flex w-full items-center justify-between py-5 sm:py-6 px-3 sm:px-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 rounded-lg"
            >
              {/* Kolom Kiri: Indeks + Kategori & Judul */}
              <div className="flex items-start sm:items-center gap-4 sm:gap-6 pr-4">
                <span className="font-display text-sm sm:text-base font-bold tracking-wider text-sky-400/80 pt-0.5 sm:pt-0 w-6">
                  {item.index}
                </span>
                <div className="space-y-0.5">
                  <span className="font-mono text-[12px] font-medium tracking-[0.1em] uppercase text-sky-300/60 block">
                    {item.category}
                  </span>
                  <h3 className="font-display text-base sm:text-lg lg:text-xl font-bold text-white group-hover:text-sky-200 transition-colors text-balance">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Kolom Kanan: Tombol Indikator Status & Ikon Chevron */}
              <div className="flex items-center gap-3 shrink-0 ml-2">
                <span className="hidden sm:inline-block font-mono text-[12px] uppercase tracking-[0.08em] text-white/40 group-hover:text-sky-300/70 transition-colors">
                  {isOpen ? "Tutup" : "Rincian"}
                </span>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200 ${
                    isOpen
                      ? "border-sky-400/50 bg-sky-400/15 text-sky-300 shadow-[0_0_12px_rgba(125,211,252,0.2)]"
                      : "border-white/10 bg-white/[0.03] text-white/60 group-hover:border-white/30 group-hover:text-white"
                  }`}
                >
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.25,
                      ease: "easeInOut",
                    }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </div>
              </div>
            </button>

            {/* Konten Terbuka (Deskripsi & Badges) */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-content-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-trigger-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    transition: {
                      height: prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.3, ease: "easeOut" },
                      opacity: prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.25, delay: 0.05 },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.2, ease: "easeInOut" },
                      opacity: prefersReducedMotion ? { duration: 0 } : { duration: 0.15 },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pt-1 pl-12 sm:pl-16 pr-4 space-y-4">
                    {/* Ringkasan Penjelasan */}
                    <p className="prose-reading fluid-body text-sm sm:text-base text-[#e8e6f0]/80 leading-relaxed text-pretty">
                      {item.summary}
                    </p>

                    {/* Badge Tag Teknologi */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {item.badges.map((badge) => (
                        <span
                          key={badge}
                          className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-white/75 hover:border-sky-400/30 hover:text-white transition-colors"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    {/* Tombol Tautan (Internal: satu tab via Next.js Link; External: tab baru) */}
                    {item.link && (
                      <div className="pt-2">
                        {item.link.url.startsWith("http") ? (
                          <a
                            href={item.link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 font-body text-xs font-semibold text-sky-200 transition-all hover:bg-sky-400/20 hover:border-sky-400/60 hover:text-white group/link shadow-sm"
                          >
                            <span>{item.link.label}</span>
                            <ArrowUpRight className="h-3.5 w-3.5 text-sky-300 transition-transform duration-150 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                          </a>
                        ) : (
                          <Link
                            href={item.link.url}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 font-body text-xs font-semibold text-sky-200 transition-all hover:bg-sky-400/20 hover:border-sky-400/60 hover:text-white group/link shadow-sm"
                          >
                            <span>{item.link.label}</span>
                            <ArrowRight className="h-3.5 w-3.5 text-sky-300 transition-transform duration-150 group-hover/link:translate-x-1" />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
