export const dynamic = "force-static";

import type { Metadata } from "next";
import NicknameGenerator from "@/app/tools/generator/name/nickname-generator/NicknameGenerator";
import Config from "@/lib/config";

const ROUTE = "/tools/generator/name/minecraft-clan-names";
const TITLE = "Minecraft Clan Names";

export const metadata: Metadata = {
  title: `${TITLE} — Best Team & Faction Names for Minecraft | Free`,
  description: `Find the perfect Minecraft clan name for your squad. Generate bold, powerful team and faction names for PvP clans, faction servers, and multiplayer groups. 6 options per batch. No signup, 100% free.`,
  keywords: [
    "minecraft clan names",
    "minecraft team names",
    "minecraft faction names",
    "minecraft guild names",
    "minecraft squad names",
    "best minecraft clan names",
    "cool minecraft clan names",
    "minecraft pvp clan names",
    "minecraft faction server names",
    "minecraft group names",
    "minecraft alliance names",
    "minecraft clan name generator",
    "minecraft team name ideas",
    "minecraft clan name ideas 2024",
    "minecraft server clan names",
    "competitive minecraft clan names",
    "minecraft faction name generator",
    "good minecraft clan names",
  ],
  authors: [{ name: Config.NAME_MAKE }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${Config.MAIN_DOMAIN_NO}${ROUTE}` },
  openGraph: {
    title: `${TITLE} — Best Team & Faction Names for Minecraft`,
    description: `Generate bold, powerful Minecraft clan and faction names for your squad. 6 options per batch. Free, instant, no signup.`,
    url: `${Config.MAIN_DOMAIN_NO}${ROUTE}`,
    type: "website",
    siteName: Config.SITE_NAME,
    images: [{ url: `${Config.MAIN_DOMAIN_NO}/icon.png`, width: 1200, height: 630, alt: `${TITLE} Generator` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} — Best Minecraft Team & Faction Names`,
    description: `Find bold, powerful Minecraft clan and faction names. Generate 6 options at once. Free, no signup.`,
  },
};

export default function MinecraftClanNamesPage() {
  return (
    <NicknameGenerator
      toolName={TITLE}
      toolUrl={`${Config.MAIN_DOMAIN_NO}${ROUTE}`}
      heroTitle={TITLE}
      heroEm="bold, powerful, feared by all."
      heroSub="Find the perfect name for your Minecraft clan, faction, or squad. Generate 6 bold team names at once — built for PvP servers, faction wars, and multiplayer domination. No signup, free forever."
      heroMeta="6 per batch · Gaming style · No Signup"
      defaultStyle="game"
      breadcrumbs={[
        { name: "Home", item: Config.MAIN_DOMAIN_NO },
        { name: TITLE, item: `${Config.MAIN_DOMAIN_NO}${ROUTE}` },
      ]}
      faq={[
        {
          q: "What makes a great Minecraft clan name?",
          a: "Great clan names are short, intimidating, and easy to remember. They should work as a prefix or tag — like [RUSH] or [ELITE]. Avoid spaces (use underscores if needed) and keep it under 12 characters so it fits cleanly in chat.",
        },
        {
          q: "Can I use these names as a clan tag on faction servers?",
          a: "Yes. Most faction and PvP server plugins support clan tags in chat. Generate a name here and use it as your faction or clan name when you create your group in-game.",
        },
        {
          q: "Which style gives the best clan names?",
          a: "Gaming style produces competitive names like ProClutch, EliteRush, or RageMVP — perfect for PvP clans. Cool style gives darker, more intimidating names like ShadowVoid or BladeCore. Try both styles to see what fits your group's identity.",
        },
        {
          q: "How many members can be in a Minecraft clan?",
          a: "That depends on the server plugin or rules. Most faction servers allow 10–50 members per faction. The clan name itself has no member limit — it's just a label you choose when creating your group.",
        },
        {
          q: "Can I use these names on any Minecraft server?",
          a: "Yes. These names work as faction names, team names, or just a shared prefix your group uses. They're not account-bound — you can use any name as your clan's identity regardless of platform.",
        },
      ]}
    />
  );
}
