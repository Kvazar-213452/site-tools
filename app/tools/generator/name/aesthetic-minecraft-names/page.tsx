export const dynamic = "force-static";

import type { Metadata } from "next";
import NicknameGenerator from "@/app/tools/generator/name/nickname-generator/NicknameGenerator";
import Config from "@/lib/config";

const ROUTE = "/tools/generator/name/aesthetic-minecraft-names";
const TITLE = "Aesthetic Minecraft Names";

export const metadata: Metadata = {
  title: `${TITLE} — Soft & Beautiful Minecraft Usernames | Free`,
  description: `Find beautiful, soft, and artistic Minecraft usernames with an aesthetic vibe. Perfect for creative servers, building communities, and cozy survival worlds. 6 options per batch. No signup, 100% free.`,
  keywords: [
    "aesthetic minecraft names",
    "aesthetic minecraft usernames",
    "soft minecraft names",
    "cute aesthetic minecraft names",
    "pretty minecraft names",
    "artistic minecraft usernames",
    "minecraft aesthetic username ideas",
    "cozy minecraft names",
    "soft minecraft username generator",
    "dreamy minecraft names",
    "minecraft creative server names",
    "kawaii minecraft names",
    "pastel minecraft names",
    "vibe minecraft usernames",
    "minecraft name generator aesthetic",
    "cottagecore minecraft names",
    "nature minecraft names",
    "aesthetic minecraft name ideas 2024",
  ],
  authors: [{ name: Config.NAME_MAKE }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${Config.MAIN_DOMAIN_NO}${ROUTE}` },
  openGraph: {
    title: `${TITLE} — Soft & Beautiful Minecraft Usernames`,
    description: `Generate soft, artistic, beautiful Minecraft usernames. Perfect for creative and cozy servers. 6 options per batch. Free, instant, no signup.`,
    url: `${Config.MAIN_DOMAIN_NO}${ROUTE}`,
    type: "website",
    siteName: Config.SITE_NAME,
    images: [{ url: `${Config.MAIN_DOMAIN_NO}/icon.png`, width: 1200, height: 630, alt: `${TITLE} Generator` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} — Soft & Beautiful Minecraft Usernames`,
    description: `Find soft, artistic, aesthetic Minecraft names. Generate 6 options at once. Free, no signup.`,
  },
};

export default function AestheticMinecraftNamesPage() {
  return (
    <NicknameGenerator
      toolName={TITLE}
      toolUrl={`${Config.MAIN_DOMAIN_NO}${ROUTE}`}
      heroTitle={TITLE}
      heroEm="soft, dreamy, beautifully yours."
      heroSub="Find a Minecraft username that feels like a mood — soft, cosmic, artistic. Perfect for creative servers, building communities, and cozy survival worlds. Generate 6 aesthetic names at once. No signup, free forever."
      heroMeta="6 per batch · Cosmic style · No Signup"
      defaultStyle="space"
      breadcrumbs={[
        { name: "Home", item: Config.MAIN_DOMAIN_NO },
        { name: TITLE, item: `${Config.MAIN_DOMAIN_NO}${ROUTE}` },
      ]}
      faq={[
        {
          q: "What makes a Minecraft name aesthetic?",
          a: "Aesthetic Minecraft names often use natural, cosmic, or soft-sounding words — Luna, Nebula, Ivy, Solaris, Willow. They feel intentional and poetic rather than random. Short names (5–10 chars) with a single evocative word or clean combination work best.",
        },
        {
          q: "Which style gives the most aesthetic names?",
          a: "Cosmic style produces names like NebulaVoid, LunarRift, or SolarFlux — dreamy and distinctive. Cool style gives cleaner, minimal names like NeonWave or SteelPrime. Try Cosmic first, then Cool for variety.",
        },
        {
          q: "Can I use these names on creative servers?",
          a: "Yes. Your Minecraft username works on every server — Creative, Survival, Roleplay, and Faction. Set the name in your Mojang/Microsoft account settings and it'll show up everywhere you play.",
        },
        {
          q: "How often can I change my Minecraft username?",
          a: "Minecraft (via Microsoft accounts) allows you to change your username. Check the current cooldown period in your Microsoft account settings — it's typically allowed periodically.",
        },
        {
          q: "Are these names free to use?",
          a: "Yes — completely free. Generate as many batches as you need until you find the perfect aesthetic username. No signup, no cost, no attribution required.",
        },
      ]}
    />
  );
}
