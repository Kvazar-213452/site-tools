export const dynamic = "force-static";

import type { Metadata } from "next";
import StartupIdeaGenerator from "./StartupIdeaGenerator";
import Config from "@/lib/config";

export const metadata: Metadata = {
  title: `Startup Idea Generator — AI-Powered Ideas for Any Industry | Free`,
  description: `Free AI Startup Idea Generator powered by DeepSeek. Get 4 specific, actionable startup ideas with problem, solution, target audience, revenue model, and difficulty rating. No signup, 100% free.`,
  keywords: [
    "startup idea generator",
    "AI startup ideas",
    "startup ideas",
    "business idea generator",
    "startup idea AI",
    "startup generator",
    "startup concept generator",
    "business concept ideas",
    "entrepreneurship ideas",
    "new business ideas",
    "tech startup ideas",
    "SaaS ideas",
    "startup ideas 2024",
    "startup ideas by industry",
    "generate startup ideas",
    "free startup idea generator",
    "startup inspiration",
    "founder ideas tool",
  ],
  authors: [{ name: `${Config.NAME_MAKE}` }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${Config.MAIN_DOMEN}/startup-idea-generator` },
  openGraph: {
    title: `Startup Idea Generator — AI-Powered & Free`,
    description: `Get 4 actionable startup ideas with problem, solution, revenue model, and difficulty rating. Powered by DeepSeek AI. Free, no signup required.`,
    url: `${Config.MAIN_DOMEN}/startup-idea-generator`,
    type: "website",
    siteName: Config.SITE_NAME,
    images: [
      {
        url: `${Config.MAIN_DOMEN}/icon.png`,
        width: 1200,
        height: 630,
        alt: `Startup Idea Generator — AI-Powered`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Startup Idea Generator — AI-Powered & Free`,
    description: `4 actionable startup ideas with problem, solution, audience, and revenue model. Powered by DeepSeek AI. Free, no signup.`,
  },
};

export default function StartupIdeaGeneratorPage() {
  return <StartupIdeaGenerator />;
}