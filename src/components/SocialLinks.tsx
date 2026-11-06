"use client";

import React from "react";
import { SOCIAL_LINKS, type SocialLink } from "@/lib/content";

function SocialIcon({ icon }: { icon: SocialLink["icon"] }) {
  switch (icon) {
    case "github":
      return (
        <svg
          className="w-5 h-5 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      );
    case "linkedin":
      return (
        <svg
          className="w-5 h-5 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          className="w-5 h-5 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case "mail":
      return (
        <svg
          className="w-5 h-5 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    case "cv":
      return (
        <svg
          className="w-5 h-5 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" x2="8" y1="13" y2="13" />
          <line x1="16" x2="8" y1="17" y2="17" />
          <line x1="10" x2="8" y1="9" y2="9" />
        </svg>
      );
    default:
      return null;
  }
}

export default function SocialLinks() {
  return (
    <nav aria-label="Tautan Media Sosial" className="w-full">
      {/* 
        Di HP (< 640px): Grid 2 kolom yang mudah di-tap dengan tinggi min 48px.
        Di Desktop (>= 640px): Deretan horizontal fleksibel dengan spacing teratur.
      */}
      <ul className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
        {SOCIAL_LINKS.map((link) => {
          const isEmail = link.url.startsWith("mailto:");
          return (
            <li key={link.id} className="w-full sm:w-auto">
              <a
                href={link.url}
                target={isEmail ? undefined : "_blank"}
                rel={isEmail ? undefined : "noopener noreferrer"}
                aria-label={`${link.name}: ${link.handle}`}
                className={`
                  group relative flex w-full sm:inline-flex items-center justify-between sm:justify-start gap-2.5
                  min-h-[48px] px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-lg
                  text-sm font-medium text-[#e8e6f0]
                  border border-white/10 bg-white/[0.03]
                  transition-all duration-200 ease-out
                  hover:-translate-y-0.5 hover:border-sky-400/50 hover:bg-white/[0.07]
                  hover:text-white hover:shadow-[0_0_18px_rgba(125,211,252,0.18)]
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400
                  focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060f]
                  active:translate-y-0
                `}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="text-sky-300 transition-colors duration-200 group-hover:text-sky-200"
                    aria-hidden="true"
                  >
                    <SocialIcon icon={link.icon} />
                  </span>

                  <span className="font-body font-medium tracking-normal">{link.name}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {link.badge && (
                    <span className="px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] rounded font-medium bg-sky-400/10 text-sky-300 border border-sky-400/30">
                      {link.badge}
                    </span>
                  )}

                  {!isEmail && (
                    <svg
                      className="w-3.5 h-3.5 text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  )}
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
