export const dynamic = "force-static";

import type { Metadata } from "next";
import AiToolsForTikTok from "./AiToolsForTiktok";
import Config from "@/lib/config";

const ARTICLE_URL = `${Config.MAIN_DOMAIN_NO}/blog/ai-tools-for-tiktok`;
const PUBLISH_DATE = "2025-04-30";
const MODIFIED_DATE = "2025-04-30";

const FAQ = [
  {
    q: "What is the best AI tool for TikTok in 2025?",
    a: "CapCut is the most popular AI tool for TikTok — it's free, made by ByteDance (TikTok's parent company), and packed with AI features: auto-captions, smart cutout, trending effects, and auto-edit. Opus Clip is the best for repurposing long videos into TikTok-ready clips. For captions and hooks, ChatGPT is unbeatable for the price (free).",
  },
  {
    q: "How does Opus Clip work for TikTok?",
    a: "Opus Clip analyzes any long video (YouTube, Zoom recording, webinar), identifies the most engaging segments using AI virality scoring, and auto-clips them into vertical 9:16 format with captions. It detects the best speaker moments, adds animated captions, and even scores each clip's viral potential before you download.",
  },
  {
    q: "Can AI generate TikTok captions?",
    a: "Yes. ChatGPT is excellent for writing TikTok captions — give it your video topic and target audience, and ask for 5 caption options with hooks, hashtags, and CTAs. CapCut's AI auto-captions generate spoken captions directly from your video audio. Copy.ai has TikTok-specific templates for viral hooks and caption frameworks.",
  },
  {
    q: "How do I find trending TikTok sounds with AI?",
    a: "The TikTok Creative Center (free, official) shows trending sounds, hashtags, and ads by region in real time. Exploding Topics identifies rising trends before they peak. For audio creation, Soundraw generates royalty-free background music and ElevenLabs creates unique AI voiceovers so you're not competing for the same trending audio.",
  },
  {
    q: "Is CapCut AI free?",
    a: "Yes, CapCut's core AI features are free including auto-captions, background removal, smart cutout, trending effects, and basic auto-edit. The Pro plan ($7.99/mo) unlocks premium effects, no watermark for exported videos, and advanced AI features. For most TikTok creators, the free tier is more than sufficient.",
  },
  {
    q: "How can AI help grow a TikTok account?",
    a: "AI accelerates TikTok growth in several ways: faster content production (CapCut, Opus Clip), better hooks and captions (ChatGPT), trend research (TikTok Creative Center, Exploding Topics), consistent posting (Buffer or Later scheduling), and voice optimization (ElevenLabs for unique AI voiceovers). The key is using AI to increase posting frequency while maintaining quality.",
  },
];

export const metadata: Metadata = {
  title: `AI Tools for TikTok 2025 — 15 Best Apps for TikTok Growth`,
  description: `The best AI tools for TikTok creators in 2025. Auto-captions, viral clip creation, trend research, AI voiceovers, and scheduling — 15 tools reviewed with free options highlighted.`,
  keywords: [
    "AI tools for TikTok",
    "best AI tools TikTok",
    "TikTok AI tools 2025",
    "TikTok video AI",
    "AI TikTok caption generator",
    "CapCut AI TikTok",
    "Opus Clip TikTok",
    "TikTok automation tools",
    "AI for TikTok growth",
    "TikTok content AI",
    "best TikTok apps 2025",
    "TikTok creator tools AI",
    "free AI TikTok tools",
    "Vidyo.ai TikTok",
    "TikTok trending AI",
    "AI short video creator",
    "TikTok script AI",
    "ElevenLabs TikTok voiceover",
    "Buffer TikTok scheduling",
    "AI social media TikTok",
  ],
  authors: [{ name: Config.NAME_MAKE }],
  robots: { index: true, follow: true },
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: `AI Tools for TikTok 2025 — 15 Best Apps for Growth`,
    description: `CapCut, Opus Clip, ChatGPT and 12 more AI tools that help TikTok creators produce faster, go viral more often, and grow their audience.`,
    url: ARTICLE_URL,
    type: "article",
    siteName: Config.SITE_NAME,
    publishedTime: PUBLISH_DATE,
    modifiedTime: MODIFIED_DATE,
    images: [
      {
        url: "https://images.unsplash.com/photo-1611605698335-8441051e6b52?w=1200&h=630&fit=crop&q=85",
        width: 1200,
        height: 630,
        alt: "Person filming TikTok video with phone — AI Tools for TikTok 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `15 Best AI Tools for TikTok Creators in 2025`,
    description: `From CapCut to Opus Clip — the complete guide to AI tools that help TikTok creators post faster, go viral, and grow their audience.`,
  },
};

export default function AiToolsForTikTokPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "AI Tools for TikTok 2025 — 15 Best Apps for TikTok Growth",
    description: "15 AI-powered tools for TikTok creators — video creation, auto-captions, viral hooks, trend research, AI voiceovers, and scheduling.",
    image: "https://images.unsplash.com/photo-1611605698335-8441051e6b52?w=1200&h=630&fit=crop&q=85",
    datePublished: PUBLISH_DATE,
    dateModified: MODIFIED_DATE,
    author: { "@type": "Organization", name: Config.NAME_MAKE, url: Config.MAIN_DOMAIN_NO },
    publisher: {
      "@type": "Organization",
      name: Config.SITE_NAME,
      url: Config.MAIN_DOMAIN_NO,
      logo: { "@type": "ImageObject", url: `${Config.MAIN_DOMAIN_NO}/icon.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": ARTICLE_URL },
    keywords: "AI tools for TikTok, CapCut AI, Opus Clip, Vidyo.ai, TikTok automation, TikTok captions AI",
    articleSection: "Social Media",
    wordCount: 3000,
    inLanguage: "en-US",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: Config.MAIN_DOMAIN_NO },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${Config.MAIN_DOMAIN_NO}/blog` },
      { "@type": "ListItem", position: 3, name: "AI Tools for TikTok", item: ARTICLE_URL },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AiToolsForTikTok faq={FAQ} />
    </>
  );
}
