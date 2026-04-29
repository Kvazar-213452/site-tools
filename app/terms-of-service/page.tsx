export const dynamic = "force-static";

import type { Metadata } from "next";
import TermsOfService from "./TermsOfService";
import Config from "@/lib/config";

export const metadata: Metadata = {
  title: `Terms of Service — ${Config.SITE_NAME}`,
  description: `Read the ${Config.SITE_NAME} Terms of Service. Free browser-based tools, no signup, no data collection. Plain-English usage terms, disclaimers, and intellectual property policy.`,
  keywords: [
    "terms of service",
    "terms and conditions",
    "usage terms",
    "tos",
    "user agreement",
    "service agreement",
    "legal terms",
    "website terms",
    "free tools terms",
    "browser tools terms",
    "no signup tools",
    "privacy-friendly tools",
    "intellectual property policy",
    "disclaimer",
    "limitation of liability",
  ],
  authors: [{ name: `${Config.NAME_MAKE}` }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${Config.MAIN_DOMEN}/terms-of-service` },
  openGraph: {
    title: `Terms of Service — ${Config.SITE_NAME}`,
    description: `Usage terms for ${Config.SITE_NAME} free online tools. No signup, no data collection, 100% browser-based. Written in plain English.`,
    url: `${Config.MAIN_DOMEN}/terms-of-service`,
    type: "website",
    siteName: Config.SITE_NAME,
    images: [
      {
        url: `${Config.MAIN_DOMEN}/icon.png`,
        width: 1200,
        height: 630,
        alt: `${Config.SITE_NAME} Terms of Service`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Terms of Service — ${Config.SITE_NAME}`,
    description: `Plain-English terms for ${Config.SITE_NAME}. Free tools, output is yours, no data collected.`,
  },
};

export default function TermsOfServicePage() {
  return <TermsOfService />;
}