export const dynamic = "force-static";

import type { Metadata } from "next";
import PasswordGenerator from "./PasswordGenerator";
import Config from "@/lib/config";

export const metadata: Metadata = {
  title: `Password Generator — Generate Strong, Secure Passwords | Free`,
  description: `Free Password Generator: Instantly create strong, random passwords with custom length and character sets. No signup, never stored, 100% browser-based and private.`,
  keywords: [
    "password generator",
    "random password",
    "strong password generator",
    "secure password",
    "password creator",
    "online password generator",
    "free password generator",
    "complex password",
    "password maker",
    "generate password",
    "safe password",
    "cybersecurity tools",
  ],
  authors: [{ name: `${Config.NAME_MAKE}` }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${Config.MAIN_DOMEN}/tools/generator/password-generator` },
  openGraph: {
    title: `Password Generator — Generate Strong, Secure Passwords Instantly`,
    description: `Free password generator with customizable length and character sets. Passwords are never stored or sent anywhere. 100% browser-based.`,
    url: `${Config.MAIN_DOMEN}/tools/generator/password-generator`,
    type: "website",
    siteName: Config.SITE_NAME,
    images: [{ url: `${Config.MAIN_DOMEN}/icon.png`, width: 1200, height: 630, alt: `Password Generator` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Password Generator — Secure & Instant`,
    description: `Generate strong random passwords with custom length and character sets. Never stored, 100% private.`,
  },
};

export default function PasswordGeneratorPage() {
  return <PasswordGenerator />;
}