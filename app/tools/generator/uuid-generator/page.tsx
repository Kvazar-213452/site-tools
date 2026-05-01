export const dynamic = "force-static";

import type { Metadata } from "next";
import UuidGenerator from "./UuidGenerator";
import Config from "@/lib/config";

export const metadata: Metadata = {
  title: `UUID Generator — Generate Random UUIDs Online | Free`,
  description: `Free UUID Generator: Instantly create v4 UUIDs in bulk. Copy single or all at once. No signup, 100% browser-based and private.`,
  keywords: [
    "uuid generator",
    "random uuid",
    "uuid v4 generator",
    "unique id generator",
    "guid generator",
    "online uuid generator",
    "free uuid generator",
    "generate uuid",
    "bulk uuid generator",
    "uuid creator",
    "universally unique identifier",
    "developer tools",
  ],
  authors: [{ name: `${Config.NAME_MAKE}` }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${Config.MAIN_DOMEN}/tools/generator/uuid-generator` },
  openGraph: {
    title: `UUID Generator — Generate Random UUIDs Instantly`,
    description: `Free UUID generator. Create v4 UUIDs in bulk, copy instantly. Never stored, 100% browser-based.`,
    url: `${Config.MAIN_DOMEN}/tools/generator/uuid-generator`,
    type: "website",
    siteName: Config.SITE_NAME,
    images: [{ url: `${Config.MAIN_DOMEN}/icon.png`, width: 1200, height: 630, alt: `UUID Generator` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `UUID Generator — Fast & Free`,
    description: `Generate random v4 UUIDs in bulk. Copy instantly. 100% browser-based, never stored.`,
  },
};

export default function UuidGeneratorPage() {
  return <UuidGenerator />;
}