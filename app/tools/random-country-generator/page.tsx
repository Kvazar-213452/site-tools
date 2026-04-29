export const dynamic = "force-static";

import type { Metadata } from "next";
import RandomCountryGenerator from "./RandomCountryGenerator";
import Config from "@/lib/config";

export const metadata: Metadata = {
  title: `Random Country Generator — Explore 250 Countries with Flag & Data | Free`,
  description: `Free Random Country Generator: discover random countries with flag, capital, population, area, languages, currency, and timezone. Filter by region. Powered by REST Countries API. No signup, no ads, 100% free.`,
  keywords: [
    "random country generator",
    "random country",
    "country generator",
    "random country picker",
    "country facts",
    "country information",
    "geography tool",
    "world countries",
    "country flag generator",
    "random country with flag",
    "country capital generator",
    "explore countries",
    "geography quiz tool",
    "country data",
    "filter by region",
    "africa countries",
    "europe countries",
    "asia countries",
    "free geography tool",
  ],
  authors: [{ name: `${Config.NAME_MAKE}` }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${Config.MAIN_DOMEN}/random-country-generator` },
  openGraph: {
    title: `Random Country Generator — Explore 250 Countries Instantly`,
    description: `Discover a random country with flag, capital, population, area, languages, currency, and timezone. Filter by region. Free, instant, no signup.`,
    url: `${Config.MAIN_DOMEN}/random-country-generator`,
    type: "website",
    siteName: Config.SITE_NAME,
    images: [
      {
        url: `${Config.MAIN_DOMEN}/icon.png`,
        width: 1200,
        height: 630,
        alt: `Random Country Generator — Free Geography Tool`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Random Country Generator — Explore the World`,
    description: `Get a random country with flag, capital, population, and more. Filter by Africa, Americas, Asia, Europe, or Oceania. Free, no signup.`,
  },
};

export default function RandomCountryGeneratorPage() {
  return <RandomCountryGenerator />;
}