export const dynamic = "force-static";

import type { Metadata } from "next";
import Home from "./Home";
import Config from "@/lib/config";

export const metadata: Metadata = {
  title: `${Config.SITE_NAME} — Free Online Generator Tools for Everything You Build`,
  description: `12+ free browser-based generators: password, QR code, UUID, color palette, fake data, hash, lorem ipsum, meta tag, CSS gradient, username, JSON, favicon. No signup, no ads, no tracking — 100% client-side and private.`,
  keywords: [
    "online generator tools",
    "free generator tools",
    "password generator",
    "QR code generator",
    "UUID generator",
    "color palette generator",
    "fake data generator",
    "hash generator",
    "lorem ipsum generator",
    "meta tag generator",
    "CSS gradient generator",
    "username generator",
    "JSON generator",
    "favicon generator",
    "browser-based tools",
    "client-side tools",
    "no signup tools",
    "developer tools",
    "design tools",
    "SEO tools",
  ],
  authors: [{ name: `${Config.NAME_MAKE}` }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${Config.MAIN_DOMEN}` },
  openGraph: {
    title: `${Config.SITE_NAME} — Free Online Generator Tools`,
    description: `12+ fast, browser-based generators for developers, designers, and creators. Passwords, QR codes, UUIDs, palettes, fake data, hashes — all free, all private, all instant.`,
    url: `${Config.MAIN_DOMEN}`,
    type: "website",
    siteName: Config.SITE_NAME,
    images: [
      {
        url: `${Config.MAIN_DOMEN}/icon.png`,
        width: 1200,
        height: 630,
        alt: `${Config.SITE_NAME} — Free Online Generator Tools`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${Config.SITE_NAME} — Free Online Generator Tools`,
    description: `12+ free browser-based generators: passwords, QR codes, UUIDs, palettes, fake data, hashes, and more. No signup, no ads, no tracking.`,
  },
};

export default function HomePage() {
  return <Home />;
}