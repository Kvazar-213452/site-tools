export const dynamic = "force-static";

import type { Metadata } from "next";
import FunnyTikTokUsernames from "./FunnyTikTokUsernames";
import Config from "@/lib/config";

export const metadata: Metadata = {
  title: `Funny Usernames for TikTok — AI-Generated Handles | Free`,
  description: `Free AI TikTok username generator. Get 8 funny, creative, culturally-aware TikTok handles by humor style and niche. Self-deprecating, Absurdist, Gen Z Chaotic, and more. Powered by DeepSeek. No signup.`,
  keywords: [
    "funny usernames for tiktok",
    "tiktok username generator",
    "funny tiktok names",
    "tiktok handle generator",
    "creative tiktok usernames",
    "unique tiktok names",
    "funny username ideas tiktok",
    "tiktok name ideas",
    "tiktok username ideas funny",
    "gen z username generator",
    "cool tiktok usernames",
    "funny social media usernames",
    "tiktok handle ideas",
    "aesthetic tiktok names",
    "random tiktok username generator",
    "AI tiktok username generator",
    "best tiktok usernames",
    "funny username generator",
    "tiktok account name ideas",
  ],
  authors: [{ name: `${Config.NAME_MAKE}` }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${Config.MAIN_DOMAIN_NO}/tools/generator/name/funny-usernames-for-tiktok` },
  openGraph: {
    title: `Funny Usernames for TikTok — AI-Generated & Free`,
    description: `Generate 8 funny, clever TikTok handles by humor style and niche. Self-deprecating, Absurdist, Gen Z Chaotic, Dry humor, and more. Free, no signup.`,
    url: `${Config.MAIN_DOMAIN_NO}/tools/generator/name/funny-usernames-for-tiktok`,
    type: "website",
    siteName: Config.SITE_NAME,
    images: [
      {
        url: `${Config.MAIN_DOMAIN_NO}/icon.png`,
        width: 1200,
        height: 630,
        alt: `Funny TikTok Username Generator — AI-Powered`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Funny Usernames for TikTok — AI-Generated`,
    description: `8 funny TikTok handles per batch. Self-deprecating, Absurdist, Gen Z Chaotic, Puns, Dry humor. Free, no signup, powered by DeepSeek AI.`,
  },
};

export default function FunnyTikTokUsernamesPage() {
  return <FunnyTikTokUsernames />;
}