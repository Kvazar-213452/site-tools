export const dynamic = "force-static";

import type { Metadata } from "next";
import Tools from "./Tools";
import Config from "@/lib/config";

export const metadata: Metadata = {
  title: "Random Number Generator — Pick a Number Between Any Min and Max | Free",
  description:
    "Free online random number generator. Enter a Min and Max, click Generate, get an instant random integer. No signup, no ads, 100% browser-based and private.",
  keywords: [
    "random number generator",
    "random number between 1 and 100",
    "random integer generator",
    "pick a random number",
    "random number picker",
    "random number tool",
    "online random number generator",
    "free random number generator",
    "random number for lottery",
    "random number for games",
    "random number min max",
    "generate random number",
    "browser random number",
    "client-side random number",
    "developer tools",
  ],
  authors: [{ name: `${Config.NAME_MAKE}` }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${Config.MAIN_DOMEN}/random-number-generator` },
  openGraph: {
    title: "Random Number Generator — Free & Instant",
    description:
      "Generate a random integer between any Min and Max. One click, browser-only, no signup, completely private.",
    url: `${Config.MAIN_DOMEN}/random-number-generator`,
    type: "website",
    siteName: Config.SITE_NAME,
    images: [
      {
        url: `${Config.MAIN_DOMEN}/icon.png`,
        width: 1200,
        height: 630,
        alt: "Random Number Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Number Generator — Free & Instant",
    description:
      "Enter Min and Max, click Generate — instant random integer. 100% browser-based, no signup, completely private.",
  },
};

export default function ToolsPage() {
  return <Tools />;
}