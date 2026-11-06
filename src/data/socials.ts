export interface SocialLink {
  id: string;
  name: string;
  handle: string;
  url: string;
  description: string;
  icon: "github" | "linkedin" | "instagram" | "mail" | "cv";
  badge?: string;
  isPrimary?: boolean;
}

export const PROFILE = {
  name: "Indra Wijaya",
  role: "Teknologi Rekayasa Komputer",
  campus: "Politeknik Negeri Semarang",
  location: "Semarang, Jawa Tengah",
  status: "Aktif & terbuka untuk diskusi",
  shortBio:
    "Hai aku disini.",
  email: "indrawijaya180218@gmail.com",
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "in/indrawijaya1818",
    url: "https://www.linkedin.com/in/indrawijaya1818/",
    description: "Temukan saya di Linkedin untuk jejaring profesional",
    icon: "linkedin",
  },
  {
    id: "github",
    name: "GitHub",
    handle: "github.com/IndraWijaya2",
    url: "https://github.com/IndraWijaya2",
    description: "Temukan saya di Github untuk eksplorasi proyek",
    icon: "github",
  },
  {
    id: "instagram",
    name: "Instagram",
    handle: "@indraa.wjya",
    url: "https://www.instagram.com/indraa.wjya",
    description: "Temukan saya di Instagram",
    icon: "instagram",
  },
  {
    id: "email",
    name: "Email",
    handle: "indrawijaya180218@gmail.com",
    url: "mailto:indrawijaya180218@gmail.com",
    description: "Kirim pesan langsung ke email saya",
    icon: "mail",
  },
];

