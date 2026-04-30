export const dynamic = "force-static";

import type { Metadata } from "next";
import AiToolsForYouTube from "./AiToolsForYoutube";
import Config from "@/lib/config";

const ARTICLE_URL = `${Config.MAIN_DOMAIN_NO}/blog/ai-tools-for-youtube`;
const PUBLISH_DATE = "2025-04-30";
const MODIFIED_DATE = "2025-04-30";

const FAQ = [
  {
    q: "What is the best AI tool for YouTube in 2025?",
    a: "The best overall AI tool for YouTube depends on your need. For SEO and keyword research, TubeBuddy or VidIQ are industry standards. For scripting, ChatGPT is the most flexible free option. For editing, Descript dramatically speeds up the post-production workflow. Most serious creators use 3–5 tools together.",
  },
  {
    q: "Is TubeBuddy or VidIQ better for YouTube SEO?",
    a: "Both are excellent but serve slightly different needs. TubeBuddy excels at A/B testing thumbnails and titles, and bulk editing tools for large channels. VidIQ is stronger for real-time SEO suggestions, competitor tracking, and trend alerts. Many creators use both — TubeBuddy for optimization, VidIQ for research.",
  },
  {
    q: "Can AI write my YouTube scripts?",
    a: "Yes — ChatGPT, Jasper, and Copy.ai can generate full YouTube scripts. The best approach: give the AI your topic, target audience, video length, and hook ideas, then refine the output in your own voice. AI-generated scripts need human editing to feel authentic, but they dramatically reduce the time from idea to camera-ready script.",
  },
  {
    q: "How does Opus Clip work for YouTube Shorts?",
    a: "Opus Clip analyzes your long-form YouTube video, identifies the most engaging 30–90 second segments using AI, and automatically clips, captions, and formats them for vertical video. It detects speaker focus, adds auto-captions, and reframes to 9:16. Creators typically get 5–10 Shorts clips from a single long video.",
  },
  {
    q: "Are AI thumbnail tools worth it?",
    a: "Yes, especially Canva AI and Adobe Firefly for generating custom background images and design elements. TubeBuddy's A/B thumbnail testing feature is particularly valuable — it shows you which thumbnail variant actually gets more clicks over real traffic, removing the guesswork from thumbnail optimization.",
  },
  {
    q: "Can AI help grow a small YouTube channel?",
    a: "Absolutely. For small channels, VidIQ and TubeBuddy free tiers provide keyword research that helps you target low-competition search terms you can actually rank for. ChatGPT helps you create more content in less time. Descript makes editing faster so you can publish more consistently — the biggest growth factor for small channels.",
  },
];

export const metadata: Metadata = {
  title: `AI Tools for YouTube 2025 — 15 Best Apps for Content Creators`,
  description: `The best AI tools for YouTube creators in 2025. Script writing, SEO optimization, video editing, thumbnail design, and voiceovers — 15 tools reviewed with pricing and use cases.`,
  keywords: [
    "AI tools for YouTube",
    "best AI tools for YouTubers",
    "YouTube AI tools 2025",
    "YouTube script writer AI",
    "AI thumbnail generator YouTube",
    "YouTube SEO AI tool",
    "TubeBuddy AI",
    "VidIQ review",
    "Descript YouTube editing",
    "CapCut YouTube AI",
    "Opus Clip YouTube Shorts",
    "AI video editing YouTube",
    "ElevenLabs YouTube voiceover",
    "Murf AI YouTube",
    "Canva AI thumbnails",
    "ChatGPT YouTube scripts",
    "best YouTube creator tools",
    "AI for YouTube growth",
    "YouTube automation AI",
    "YouTube content creation AI",
  ],
  authors: [{ name: Config.NAME_MAKE }],
  robots: { index: true, follow: true },
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: `AI Tools for YouTube 2025 — 15 Best Apps for Creators`,
    description: `Script faster, edit smarter, rank higher. 15 AI tools that help YouTubers grow — from keyword research to AI voiceovers and auto Shorts clipping.`,
    url: ARTICLE_URL,
    type: "article",
    siteName: Config.SITE_NAME,
    publishedTime: PUBLISH_DATE,
    modifiedTime: MODIFIED_DATE,
    images: [
      {
        url: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1200&h=630&fit=crop&q=85",
        width: 1200,
        height: 630,
        alt: "YouTube creator using AI tools for content creation — AI Tools for YouTube 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `15 Best AI Tools for YouTube Creators in 2025`,
    description: `From TubeBuddy to Opus Clip — the complete guide to AI tools that help YouTubers script, edit, optimize, and grow faster.`,
  },
};

export default function AiToolsForYouTubePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "AI Tools for YouTube 2025 — 15 Best Apps for Content Creators",
    description: "15 AI-powered tools for YouTube creators — script writing, SEO, video editing, thumbnail design, and voiceovers reviewed with pricing.",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1200&h=630&fit=crop&q=85",
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
    keywords: "AI tools for YouTube, TubeBuddy, VidIQ, Descript, Opus Clip, CapCut, ChatGPT YouTube scripts",
    articleSection: "Content Creation",
    wordCount: 3000,
    inLanguage: "en-US",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: Config.MAIN_DOMAIN_NO },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${Config.MAIN_DOMAIN_NO}/blog` },
      { "@type": "ListItem", position: 3, name: "AI Tools for YouTube", item: ARTICLE_URL },
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

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best AI Tools for YouTube 2025",
    numberOfItems: 15,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ChatGPT", url: "https://chat.openai.com" },
      { "@type": "ListItem", position: 2, name: "Jasper", url: "https://jasper.ai" },
      { "@type": "ListItem", position: 3, name: "Copy.ai", url: "https://copy.ai" },
      { "@type": "ListItem", position: 4, name: "TubeBuddy", url: "https://tubebuddy.com" },
      { "@type": "ListItem", position: 5, name: "VidIQ", url: "https://vidiq.com" },
      { "@type": "ListItem", position: 6, name: "Descript", url: "https://descript.com" },
      { "@type": "ListItem", position: 7, name: "CapCut", url: "https://capcut.com" },
      { "@type": "ListItem", position: 8, name: "Opus Clip", url: "https://opus.pro" },
      { "@type": "ListItem", position: 9, name: "Canva AI", url: "https://canva.com" },
      { "@type": "ListItem", position: 10, name: "Adobe Firefly", url: "https://firefly.adobe.com" },
      { "@type": "ListItem", position: 11, name: "ElevenLabs", url: "https://elevenlabs.io" },
      { "@type": "ListItem", position: 12, name: "Murf AI", url: "https://murf.ai" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <AiToolsForYouTube faq={FAQ} />
    </>
  );
}
