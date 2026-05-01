export const dynamic = "force-static";

import type { Metadata } from "next";
import UrlEncoder from "@/app/tools/url-encoder/UrlEncoder";
import Config from "@/lib/config";

export const metadata: Metadata = {
  title: `URL Encoder & Decoder — Encode & Decode URLs Online | Free`,
  description: `Free URL Encoder & Decoder: Instantly encode or decode URLs and query strings. Supports full URL and component encoding. No signup, 100% browser-based and private.`,
  keywords: [
    "url encoder",
    "url decoder",
    "encode url",
    "decode url",
    "url encode online",
    "url decode online",
    "percent encoding",
    "uri encoder",
    "uri decoder",
    "query string encoder",
    "url encoding tool",
    "free url encoder",
    "online url encoder",
    "developer tools",
    "web tools",
  ],
  authors: [{ name: `${Config.NAME_MAKE}` }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${Config.MAIN_DOMEN}/tools/url-encoder` },
  openGraph: {
    title: `URL Encoder & Decoder — Encode & Decode URLs Instantly`,
    description: `Free URL Encoder & Decoder with real-time conversion. Encode or decode URLs and query strings instantly. 100% browser-based, no signup, completely private.`,
    url: `${Config.MAIN_DOMEN}/tools/url-encoder`,
    type: "website",
    siteName: Config.SITE_NAME,
    images: [
      {
        url: `${Config.MAIN_DOMEN}/icon.png`,
        width: 1200,
        height: 630,
        alt: `URL Encoder & Decoder — Free Developer Tool`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `URL Encoder & Decoder — Instant Conversion`,
    description: `Encode or decode URLs and query strings instantly. 100% browser-based, no signup, private.`,
  },
};

export default function UrlEncoderPage() {
  return <UrlEncoder />;
}