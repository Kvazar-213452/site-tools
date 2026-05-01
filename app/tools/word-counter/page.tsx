export const dynamic = "force-static";

import type { Metadata } from "next";
import WordCounter from "./WordCounter";
import Config from "@/lib/config";

export const metadata: Metadata = {
  title: `Word Counter — Count Words, Characters, Sentences & Reading Time | Free`,
  description: `Free Word Counter: Instantly count words, characters, sentences, paragraphs, and calculate reading time. No signup, no ads, 100% browser-based and private.`,
  keywords: [
    "word counter",
    "character counter",
    "word count",
    "character count",
    "sentence counter",
    "paragraph counter",
    "reading time calculator",
    "text analyzer",
    "text statistics",
    "word counter online",
    "free word counter",
    "online word counter",
    "text analysis",
    "content analyzer",
    "writing tools",
    "blogging tools",
    "essay tools",
    "student tools",
  ],
  authors: [{ name: `${Config.NAME_MAKE}` }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${Config.MAIN_DOMEN}/tools/word-counter` },
  openGraph: {
    title: `Word Counter — Count Words, Characters & Reading Time Instantly`,
    description: `Free word counter with real-time statistics: words, characters, sentences, paragraphs, reading time, and more. 100% browser-based, no signup, completely private.`,
    url: `${Config.MAIN_DOMEN}/tools/word-counter`,
    type: "website",
    siteName: Config.SITE_NAME,
    images: [
      {
        url: `${Config.MAIN_DOMEN}/icon.png`,
        width: 1200,
        height: 630,
        alt: `Word Counter — Free Text Analysis Tool`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Word Counter — Instant Text Statistics`,
    description: `Count words, characters, sentences, paragraphs, and reading time instantly. 100% browser-based, no signup, private.`,
  },
};

export default function WordCounterPage() {
  return <WordCounter />;
}