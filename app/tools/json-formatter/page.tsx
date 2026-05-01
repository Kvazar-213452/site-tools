export const dynamic = "force-static";

import type { Metadata } from "next";
import JsonFormatter from "./JsonFormatter";
import Config from "@/lib/config";

export const metadata: Metadata = {
  title: `JSON Formatter & Validator — Beautify, Minify & Validate JSON | Free`,
  description: `Free JSON Formatter: Instantly beautify, minify, and validate JSON. Syntax highlighting, error detection, and one-click copy. No signup, 100% browser-based and private.`,
  keywords: [
    "json formatter",
    "json beautifier",
    "json validator",
    "json minifier",
    "format json",
    "pretty print json",
    "json lint",
    "json parser",
    "json editor",
    "online json formatter",
    "free json formatter",
    "json tools",
    "developer tools",
    "json syntax checker",
    "validate json online",
  ],
  authors: [{ name: `${Config.NAME_MAKE}` }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${Config.MAIN_DOMEN}/tools/json-formatter` },
  openGraph: {
    title: `JSON Formatter & Validator — Beautify, Minify & Validate JSON`,
    description: `Free JSON Formatter with real-time validation: beautify, minify, and detect errors instantly. 100% browser-based, no signup, completely private.`,
    url: `${Config.MAIN_DOMEN}/tools/json-formatter`,
    type: "website",
    siteName: Config.SITE_NAME,
    images: [
      {
        url: `${Config.MAIN_DOMEN}/icon.png`,
        width: 1200,
        height: 630,
        alt: `JSON Formatter — Free Developer Tool`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `JSON Formatter — Beautify & Validate JSON Instantly`,
    description: `Format, minify, and validate JSON in real-time. 100% browser-based, no signup, private.`,
  },
};

export default function JsonFormatterPage() {
  return <JsonFormatter />;
}