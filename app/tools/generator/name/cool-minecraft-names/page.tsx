export const dynamic = "force-static";

import type { Metadata } from "next";
import NicknameGenerator from "@/app/tools/generator/name/nickname-generator/NicknameGenerator";
import Config from "@/lib/config";

const ROUTE = "/tools/generator/name/cool-minecraft-names";
const TITLE = "Cool Minecraft Names";

export const metadata: Metadata = {
  title: `${TITLE} — Best Cool Usernames for Minecraft | Free`,
  description: `Get the coolest Minecraft usernames that instantly make an impression. Sharp, edgy, and memorable names for any server or game mode. Generate 6 at once, copy in one click. No signup, 100% free.`,
  keywords: [
    "cool minecraft names",
    "cool minecraft usernames",
    "best minecraft names",
    "edgy minecraft names",
    "awesome minecraft names",
    "minecraft username ideas cool",
    "unique minecraft names",
    "minecraft name generator cool",
    "cool minecraft gamertags",
    "minecraft names that aren't taken",
    "swag minecraft names",
    "badass minecraft names",
    "minecraft username generator",
    "cool minecraft player names",
    "minecraft name ideas 2024",
    "sick minecraft names",
    "drip minecraft names",
    "cool minecraft java names",
  ],
  authors: [{ name: Config.NAME_MAKE }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${Config.MAIN_DOMAIN_NO}${ROUTE}` },
  openGraph: {
    title: `${TITLE} — Best Cool Usernames for Minecraft`,
    description: `Generate sharp, edgy, memorable Minecraft names. 6 cool options per batch. Free, instant, no signup.`,
    url: `${Config.MAIN_DOMAIN_NO}${ROUTE}`,
    type: "website",
    siteName: Config.SITE_NAME,
    images: [{ url: `${Config.MAIN_DOMAIN_NO}/icon.png`, width: 1200, height: 630, alt: `${TITLE} Generator` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} — Best Cool Minecraft Usernames`,
    description: `Find sharp, edgy Minecraft names that make an impression. 6 options at once. Free, no signup.`,
  },
};

export default function CoolMinecraftNamesPage() {
  return (
    <NicknameGenerator
      toolName={TITLE}
      toolUrl={`${Config.MAIN_DOMAIN_NO}${ROUTE}`}
      heroTitle={TITLE}
      heroEm="sharp, edgy, impossible to forget."
      heroSub="Get a Minecraft username that makes an impression the moment players see it. Generate 6 cool names at once — copy the one that hits right. No signup, free forever."
      heroMeta="6 per batch · Cool style · No Signup"
      defaultStyle="cool"
      breadcrumbs={[
        { name: "Home", item: Config.MAIN_DOMAIN_NO },
        { name: TITLE, item: `${Config.MAIN_DOMAIN_NO}${ROUTE}` },
      ]}
      faq={[
        {
          q: "What makes a Minecraft name cool?",
          a: "Cool Minecraft names are typically short, sharp, and use powerful words — Shadow, Void, Blade, Neo. They avoid numbers crammed at the end and feel intentional rather than random. Think about what vibe you want other players to get at first glance.",
        },
        {
          q: "How do I get a cool name that isn't taken?",
          a: "Generate several batches here to find unique combinations. Names with custom prefixes or suffixes (ShadowCore, VoidEdge) are far less likely to be taken than common single words. Always check availability in your Minecraft account settings.",
        },
        {
          q: "Which style gives the coolest names?",
          a: "The Cool style combines edge words (Shadow, Ice, Steel, Neon) with clean endings (X, Zero, Prime, Core). The result is names like NeonPrime or SteelEdge — minimal and striking. Gaming style adds competitive flair if you want something more intense.",
        },
        {
          q: "Can I use these names on any Minecraft server?",
          a: "Yes. Your Minecraft username is set in your Mojang/Microsoft account and works on every server — Java Edition, Bedrock Edition, Realms, and custom servers alike.",
        },
        {
          q: "How many characters can a cool Minecraft name have?",
          a: "Minecraft allows 3 to 16 characters (letters, numbers, underscores). The sweetest spot for a cool name is 6–12 characters — long enough to be distinctive, short enough to look clean on the scoreboard.",
        },
      ]}
    />
  );
}
