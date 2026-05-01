export const dynamic = "force-static";

import type { Metadata } from "next";
import HashGenerator from "./HashGenerator";
import Config from "@/lib/config";

export const metadata: Metadata = {
  title: `Hash Generator — MD5, SHA-1, SHA-256, SHA-512 Online | Free`,
  description: `Free Hash Generator: Instantly compute MD5, SHA-1, SHA-256 and SHA-512 hashes from any text. No signup, 100% browser-based using the Web Crypto API.`,
  keywords: [
    "hash generator",
    "sha256 generator",
    "md5 generator",
    "sha512 generator",
    "sha1 generator",
    "online hash generator",
    "free hash generator",
    "text to hash",
    "checksum generator",
    "crypto hash",
    "hash function",
    "developer tools",
  ],
  authors: [{ name: `${Config.NAME_MAKE}` }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${Config.MAIN_DOMEN}/tools/generator/hash-generator` },
  openGraph: {
    title: `Hash Generator — MD5, SHA-1, SHA-256, SHA-512 Online`,
    description: `Compute MD5, SHA-1, SHA-256 and SHA-512 hashes instantly in your browser. Never stored, 100% private.`,
    url: `${Config.MAIN_DOMEN}/tools/generator/hash-generator`,
    type: "website",
    siteName: Config.SITE_NAME,
    images: [{ url: `${Config.MAIN_DOMEN}/icon.png`, width: 1200, height: 630, alt: `Hash Generator` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Hash Generator — SHA-256, MD5 & More`,
    description: `Generate MD5, SHA-1, SHA-256 and SHA-512 hashes from any text. 100% browser-based.`,
  },
};

export default function HashGeneratorPage() {
  return <HashGenerator />;
}