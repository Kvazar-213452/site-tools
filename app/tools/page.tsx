export const dynamic = "force-static";

import type { Metadata } from "next";
import Tools from "./Tools";
import Config from "@/lib/config";

export const metadata: Metadata = {
  title: `All Free Online Generator Tools — ${Config.SITE_NAME}`,
  description: `Browse all 12+ free browser-based generator tools on ${Config.SITE_NAME}: password generator, QR code generator, UUID generator, color palette generator, fake data generator, hash generator, lorem ipsum, meta tag generator, CSS gradient, username generator, JSON generator, favicon generator. No signup, no ads, 100% private.`,
  keywords: [
    "online generator tools",
    "free generator tools",
    "all generators",
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
    "developer tools catalog",
  ],
  authors: [{ name: `${Config.NAME_MAKE}` }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${Config.MAIN_DOMEN}/tools` },
  openGraph: {
    title: `All Free Online Generator Tools — ${Config.SITE_NAME}`,
    description: `Complete catalog of 12+ free browser-based generators. Password, QR code, UUID, color palette, fake data, hash, lorem ipsum, meta tag, gradient, username, JSON, favicon — all instant, all private, all free.`,
    url: `${Config.MAIN_DOMEN}/tools`,
    type: "website",
    siteName: Config.SITE_NAME,
    images: [
      {
        url: `${Config.MAIN_DOMEN}/icon.png`,
        width: 1200,
        height: 630,
        alt: `${Config.SITE_NAME} — All Free Online Generator Tools`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `All Free Online Generator Tools — ${Config.SITE_NAME}`,
    description: `Browse 12+ free browser-based generators: passwords, QR codes, UUIDs, palettes, fake data, hashes, lorem ipsum, and more. No signup, no ads, 100% private.`,
  },
};

export default function ToolsPage() {
  return <Tools />;
  return <Tools />;
}