export const dynamic = "force-static";

import type { Metadata } from "next";
import PrivacyPolicy from "./PrivacyPolicy";
import Config from "@/lib/config";

export const metadata: Metadata = {
  title: `Privacy Policy — ${Config.SITE_NAME}`,
  description: `${Config.SITE_NAME} does not collect, store, or sell your personal data. All tools run 100% in your browser — no tracking, no ads, no signup. Read our full privacy policy.`,
  keywords: [
    "privacy policy",
    "data privacy",
    "no tracking",
    "no cookies",
    "no data collection",
    "browser-based tools privacy",
    "client-side privacy",
    "anonymous tools",
    "no signup tools",
    "private tools",
    "GDPR friendly",
    "no analytics tracking",
    "local-first privacy",
    "zero data collection",
    "ad-free tools",
  ],
  authors: [{ name: `${Config.NAME_MAKE}` }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${Config.MAIN_DOMEN}/privacy-policy` },
  openGraph: {
    title: `Privacy Policy — ${Config.SITE_NAME}`,
    description: `We collect nothing. All ${Config.SITE_NAME} tools run 100% in your browser — no tracking cookies, no ads, no account required.`,
    url: `${Config.MAIN_DOMEN}/privacy-policy`,
    type: "website",
    siteName: Config.SITE_NAME,
    images: [
      {
        url: `${Config.MAIN_DOMEN}/icon.png`,
        width: 1200,
        height: 630,
        alt: `${Config.SITE_NAME} Privacy Policy`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Privacy Policy — ${Config.SITE_NAME}`,
    description: `Zero data collected. ${Config.SITE_NAME} tools run entirely in your browser — no tracking, no ads, no signup.`,
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}