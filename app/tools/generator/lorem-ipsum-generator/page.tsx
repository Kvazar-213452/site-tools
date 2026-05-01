export const dynamic = "force-static";

import type { Metadata } from "next";
import LoremIpsumGenerator from "./LoremIpsumGenerator";
import Config from "@/lib/config";

export const metadata: Metadata = {
  title: `Lorem Ipsum Generator — Generate Placeholder Text Instantly | Free`,
  description: `Free Lorem Ipsum Generator: Generate placeholder text by paragraphs, sentences, or words. Classic lorem ipsum or random text. No signup, 100% browser-based and private.`,
  keywords: [
    "lorem ipsum generator",
    "placeholder text",
    "dummy text",
    "lorem ipsum",
    "random text generator",
    "placeholder text generator",
    "lipsum",
    "lorem ipsum online",
    "free lorem ipsum",
    "design placeholder",
    "mockup text",
    "filler text",
  ],
  authors: [{ name: `${Config.NAME_MAKE}` }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${Config.MAIN_DOMEN}/tools/generator/lorem-ipsum-generator` },
  openGraph: {
    title: `Lorem Ipsum Generator — Generate Placeholder Text Instantly`,
    description: `Free Lorem Ipsum Generator: generate paragraphs, sentences, or words of placeholder text instantly. Classic lorem ipsum or random. 100% browser-based.`,
    url: `${Config.MAIN_DOMEN}/tools/generator/lorem-ipsum-generator`,
    type: "website",
    siteName: Config.SITE_NAME,
    images: [{ url: `${Config.MAIN_DOMEN}/icon.png`, width: 1200, height: 630, alt: `Lorem Ipsum Generator` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Lorem Ipsum Generator — Instant Placeholder Text`,
    description: `Generate lorem ipsum placeholder text by paragraphs, sentences, or words. Free, instant, browser-based.`,
  },
};

export default function LoremIpsumPage() {
  return <LoremIpsumGenerator />;
}