export const dynamic = "force-static";

import type { Metadata } from "next";
import CoolGamerUsernames from "./CoolGamerUsernames";
import Config from "@/lib/config";

export const metadata: Metadata = {
  title: `Cool Usernames for Gamers — AI-Generated Gamer Tags | Free`,
  description: `Free AI gamer username generator. Get 8 cool, unique gaming usernames by theme, vibe, and platform. FPS, RPG, Battle Royale, Sci-Fi, and more. Powered by DeepSeek AI. No signup, no ads.`,
  keywords: [
    "cool usernames for gamers",
    "gamer username generator",
    "gaming username generator",
    "cool gamer names",
    "gamer tag generator",
    "cool gaming names",
    "unique gamer usernames",
    "gaming name ideas",
    "cool username ideas",
    "steam username generator",
    "xbox username generator",
    "playstation username generator",
    "valorant username generator",
    "league of legends username",
    "cool names for games",
    "best gamer names",
    "AI username generator",
    "free gamer name generator",
    "gaming handle generator",
    "cool gamertag ideas",
  ],
  authors: [{ name: `${Config.NAME_MAKE}` }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${Config.MAIN_DOMAIN_NO}/tools/generator/name/cool-usernames-for-gamers` },
  openGraph: {
    title: `Cool Usernames for Gamers — AI-Generated & Free`,
    description: `Generate 8 cool, unique gamer usernames by theme and vibe. FPS, RPG, Battle Royale, Sci-Fi, Horror, and more. Powered by DeepSeek AI. Free, no signup.`,
    url: `${Config.MAIN_DOMAIN_NO}/tools/generator/name/cool-usernames-for-gamers`,
    type: "website",
    siteName: Config.SITE_NAME,
    images: [
      {
        url: `${Config.MAIN_DOMAIN_NO}/icon.png`,
        width: 1200,
        height: 630,
        alt: `Cool Usernames for Gamers — AI Generator`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Cool Usernames for Gamers — AI-Generated`,
    description: `8 unique gamer usernames per batch. FPS, RPG, Battle Royale, Sci-Fi themes. Fierce, Mysterious, Funny vibes. Free, no signup.`,
  },
};

export default function CoolGamerUsernamesPage() {
  return <CoolGamerUsernames />;
}