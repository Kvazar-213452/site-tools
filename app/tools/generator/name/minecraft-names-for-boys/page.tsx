export const dynamic = "force-static";

import type { Metadata } from "next";
import NicknameGenerator from "@/app/tools/generator/name/nickname-generator/NicknameGenerator";
import Config from "@/lib/config";

const ROUTE = "/tools/generator/name/minecraft-names-for-boys";
const TITLE = "Minecraft Names for Boys";

export const metadata: Metadata = {
  title: `${TITLE} — Cool & Tough Boy Minecraft Usernames | Free`,
  description: `Find the best Minecraft names for boys. Generate cool, tough, and battle-ready Minecraft usernames instantly — perfect for PvP, survival, and multiplayer servers. 6 options per batch. No signup, 100% free.`,
  keywords: [
    "minecraft names for boys",
    "boy minecraft names",
    "minecraft username for boys",
    "cool minecraft names for boys",
    "tough minecraft names",
    "strong minecraft names",
    "pvp minecraft names",
    "minecraft boy username ideas",
    "best minecraft names for boys",
    "minecraft gamertag boys",
    "minecraft player names boys",
    "minecraft usernames for guys",
    "gaming names for boys",
    "minecraft name generator",
    "minecraft username generator",
    "boy gamer names minecraft",
    "minecraft java names boys",
    "minecraft bedrock names boys",
  ],
  authors: [{ name: Config.NAME_MAKE }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${Config.MAIN_DOMAIN_NO}${ROUTE}` },
  openGraph: {
    title: `${TITLE} — Cool & Tough Boy Minecraft Usernames`,
    description: `Generate the best Minecraft names for boys. Strong, PvP-ready usernames. 6 options at once. Free, instant, no signup.`,
    url: `${Config.MAIN_DOMAIN_NO}${ROUTE}`,
    type: "website",
    siteName: Config.SITE_NAME,
    images: [{ url: `${Config.MAIN_DOMAIN_NO}/icon.png`, width: 1200, height: 630, alt: `${TITLE} Generator` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} — Best Boy Minecraft Usernames`,
    description: `Find cool, tough Minecraft usernames for boys. Generate 6 options at once. Free, no signup.`,
  },
};

export default function MinecraftNamesForBoysPage() {
  return (
    <NicknameGenerator
      toolName={TITLE}
      toolUrl={`${Config.MAIN_DOMAIN_NO}${ROUTE}`}
      heroTitle={TITLE}
      heroEm="strong, sharp, unforgettable."
      heroSub="Find the perfect Minecraft username — tough, competitive, and battle-ready. Generate 6 boy-themed names at once for PvP, survival, and multiplayer servers. No signup, free forever."
      heroMeta="6 per batch · Gaming style · No Signup"
      defaultStyle="game"
      breadcrumbs={[
        { name: "Home", item: Config.MAIN_DOMAIN_NO },
        { name: TITLE, item: `${Config.MAIN_DOMAIN_NO}${ROUTE}` },
      ]}
      faq={[
        {
          q: "What makes a good Minecraft name for boys?",
          a: "A great boy Minecraft name is short (3–16 chars), memorable, and reflects your playstyle. Competitive players often go for sharp, strong words — Shadow, Blade, Clutch, Elite. Survival players prefer something unique and a bit mysterious.",
        },
        {
          q: "Can I use these names on Java Edition and Bedrock?",
          a: "Yes. Minecraft usernames work on both Java Edition and Bedrock Edition. Just make sure the name isn't already taken on your platform before you set it.",
        },
        {
          q: "Which style should I pick for a boy Minecraft name?",
          a: "Gaming style is perfect for competitive players — you'll get names like ProClutch99, EliteSniper, RushACE. Cool style adds edge with words like Shadow and Void. Try both and regenerate until one clicks.",
        },
        {
          q: "How many characters can a Minecraft username have?",
          a: "Minecraft usernames can be 3 to 16 characters long and may include letters, numbers, and underscores. Shorter names are easier to recognize in multiplayer chat and scoreboards.",
        },
        {
          q: "Are these names free to use?",
          a: "Yes — completely free. No attribution needed. Copy the name you like and set it as your Minecraft username. Generate as many batches as you need.",
        },
      ]}
    />
  );
}
