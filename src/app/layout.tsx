import type { Metadata, Viewport } from "next";
import "./globals.css";
import { HERO_CONTENT } from "@/lib/content";
import { orbitron, geist, jetbrainsMono } from "@/lib/fonts";

export const metadata: Metadata = {
  title: `${HERO_CONTENT.name} — ${HERO_CONTENT.role}`,
  description: HERO_CONTENT.description,
  keywords: [
    HERO_CONTENT.name,
    "Teknologi Rekayasa Komputer",
    "Politeknik Negeri Semarang",
    "Portfolio",
    "Tech & Business Explorer",
    "Software Engineering",
  ],
  authors: [{ name: HERO_CONTENT.name }],
  creator: HERO_CONTENT.name,
  openGraph: {
    type: "website",
    locale: "id_ID",
    title: `${HERO_CONTENT.name} — Portofolio Pribadi`,
    description: HERO_CONTENT.description,
    siteName: HERO_CONTENT.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#05060f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`dark ${orbitron.variable} ${geist.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-[#05060f] text-[#e8e6f0] font-body antialiased selection:bg-sky-500/25 selection:text-white">
        {children}
      </body>
    </html>
  );
}
