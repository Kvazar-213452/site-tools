export const dynamic = "force-static";

import type { Metadata } from "next";
import NicknameGenerator from "./NicknameGenerator";
import Config from "@/lib/config";

export const metadata: Metadata = {
  title: `Nickname Generator — Unique Nicknames for Gaming, Discord & Social Media | Free`,
  description: `Free Nickname Generator: get 6 unique, creative nicknames instantly for games, Discord, Instagram, TikTok, Minecraft, and any platform. Choose from Cool, Funny, Gaming, or Cosmic styles. No signup, no ads, 100% free.`,
  keywords: [
    "nickname generator",
    "username generator",
    "gaming nickname generator",
    "cool nickname generator",
    "funny nickname generator",
    "discord nickname generator",
    "minecraft nickname generator",
    "minecraft username generator",
    "random nickname",
    "unique username generator",
    "gamer tag generator",
    "steam username generator",
    "instagram username generator",
    "tiktok username generator",
    "reddit username generator",
    "random username",
    "creative nickname",
    "free nickname generator",
    "nickname ideas",
    "username ideas",
    "online nickname generator",
    "cool gamer names",
  ],
  authors: [{ name: `${Config.NAME_MAKE}` }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${Config.MAIN_DOMAIN_NO}/tools/generator/name/nickname-generator` },
  openGraph: {
    title: `Nickname Generator — Unique Nicknames for Any Platform`,
    description: `Get 6 creative nicknames at once for games, Discord, Minecraft, social media, and more. Cool, Funny, Gaming, or Cosmic styles. Free, instant, no signup.`,
    url: `${Config.MAIN_DOMAIN_NO}/tools/generator/name/nickname-generator`,
    type: "website",
    siteName: Config.SITE_NAME,
    images: [
      {
        url: `${Config.MAIN_DOMAIN_NO}/icon.png`,
        width: 1200,
        height: 630,
        alt: `Nickname Generator — Free & Instant`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Nickname Generator — Find Your Perfect Handle`,
    description: `Generate 6 unique nicknames instantly. Cool, Funny, Gaming, Cosmic styles. For games, Discord, Minecraft, Instagram, TikTok, and more. Free, no signup.`,
  },
};

export default function NicknameGeneratorPage() {
  return <NicknameGenerator />;
}