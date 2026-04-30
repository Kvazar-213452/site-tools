export const dynamic = "force-static";

import type { Metadata } from "next";
import NicknameGenerator from "@/app/tools/generator/name/nickname-generator/NicknameGenerator";
import Config from "@/lib/config";

const ROUTE = "/tools/generator/name/minecraft-names-for-girls";
const TITLE = "Minecraft Names for Girls";

export const metadata: Metadata = {
  title: `${TITLE} — Cute & Cool Girl Minecraft Usernames | Free`,
  description: `Discover the best Minecraft names for girls. Generate cute, creative, and unique girl Minecraft usernames instantly — for any server, game mode, or community. 6 options per batch. No signup, 100% free.`,
  keywords: [
    "minecraft names for girls",
    "girl minecraft names",
    "minecraft username for girls",
    "cute minecraft names for girls",
    "cool minecraft names for girls",
    "minecraft girl username ideas",
    "best minecraft names for girls",
    "aesthetic minecraft names girls",
    "minecraft gamertag girls",
    "minecraft player names girls",
    "minecraft usernames for girls",
    "girl gamer names minecraft",
    "pretty minecraft names",
    "creative minecraft names girls",
    "minecraft name generator girls",
    "soft minecraft names",
    "minecraft java names girls",
    "minecraft bedrock names girls",
  ],
  authors: [{ name: Config.NAME_MAKE }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${Config.MAIN_DOMAIN_NO}${ROUTE}` },
  openGraph: {
    title: `${TITLE} — Cute & Cool Girl Minecraft Usernames`,
    description: `Generate the best Minecraft names for girls. Cute, creative, uniquely yours. 6 options at once. Free, instant, no signup.`,
    url: `${Config.MAIN_DOMAIN_NO}${ROUTE}`,
    type: "website",
    siteName: Config.SITE_NAME,
    images: [{ url: `${Config.MAIN_DOMAIN_NO}/icon.png`, width: 1200, height: 630, alt: `${TITLE} Generator` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} — Best Girl Minecraft Usernames`,
    description: `Find cute, cool, and creative Minecraft usernames for girls. Generate 6 options at once. Free, no signup.`,
  },
};

export default function MinecraftNamesForGirlsPage() {
  return (
    <NicknameGenerator
      toolName={TITLE}
      toolUrl={`${Config.MAIN_DOMAIN_NO}${ROUTE}`}
      heroTitle={TITLE}
      heroEm="cute, creative, uniquely yours."
      heroSub="Discover the perfect girl Minecraft username — soft, stylish, or downright badass. Generate 6 names at once for any server or game mode. No signup, free forever."
      heroMeta="6 per batch · Cool & Cosmic styles · No Signup"
      defaultStyle="cool"
      breadcrumbs={[
        { name: "Home", item: Config.MAIN_DOMAIN_NO },
        { name: TITLE, item: `${Config.MAIN_DOMAIN_NO}${ROUTE}` },
      ]}
      faq={[
        {
          q: "What makes a good Minecraft name for girls?",
          a: "A great girl Minecraft name is memorable, reflects your personality, and is short enough to read quickly in multiplayer. Soft aesthetic names (Luna, Nova, Ivy) work beautifully, as do cool sharp names like Blade or Vex.",
        },
        {
          q: "Which style should I pick for a girl Minecraft name?",
          a: "Cool style gives you clean, sharp names. Cosmic (space) style produces aesthetic-sounding names like NebulaVoid or LunarRift. Try both and regenerate a few times — you'll find something that fits perfectly.",
        },
        {
          q: "Can I use these names on Java Edition and Bedrock?",
          a: "Yes. Minecraft usernames work across both editions. Make sure the name isn't already taken when you go to change it in your account settings.",
        },
        {
          q: "How long can a Minecraft username be?",
          a: "Minecraft usernames must be between 3 and 16 characters, using only letters, numbers, and underscores. Short, clean names (6–10 chars) are easiest for other players to remember and type.",
        },
        {
          q: "Are these names free to use?",
          a: "Completely free. No signup, no credits, no attribution needed. Copy any name you like and use it as your Minecraft username immediately.",
        },
      ]}
    />
  );
}
