export const dynamic = "force-static";

import type { Metadata } from "next";
import RandomFactGenerator from "./RandomFactGenerator";
import Config from "@/lib/config";

export const metadata: Metadata = {
  title: `Random Fact Generator — Discover Surprising Facts Instantly | Free`,
  description: `Free Random Fact Generator: discover surprising, verified facts with one click. Thousands of live facts from science, history, animals, space, and more. No signup, no ads, 100% free.`,
  keywords: [
    "random fact generator",
    "random facts",
    "fun facts",
    "interesting facts",
    "did you know facts",
    "fact of the day",
    "science facts",
    "history facts",
    "animal facts",
    "space facts",
    "weird facts",
    "surprising facts",
    "useless facts",
    "trivia generator",
    "random trivia",
    "fact generator online",
    "free fact generator",
    "live facts api",
  ],
  authors: [{ name: `${Config.NAME_MAKE}` }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${Config.MAIN_DOMEN}/random-fact-generator` },
  openGraph: {
    title: `Random Fact Generator — Discover Surprising Facts Instantly`,
    description: `Get a random, verified fact with one click via live API. Science, history, animals, space, and more. Thousands of facts — free, instant, no signup.`,
    url: `${Config.MAIN_DOMEN}/random-fact-generator`,
    type: "website",
    siteName: Config.SITE_NAME,
    images: [
      {
        url: `${Config.MAIN_DOMEN}/icon.png`,
        width: 1200,
        height: 630,
        alt: `Random Fact Generator — Free and Instant`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Random Fact Generator — Surprising Facts Instantly`,
    description: `Click once, learn something new. Live facts from science, history, animals, space, and more. Free, no signup.`,
  },
};

export default function RandomFactGeneratorPage() {
  return <RandomFactGenerator />;
}