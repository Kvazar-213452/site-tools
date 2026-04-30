export const dynamic = "force-static";

import type { Metadata } from "next";
import SocialMediaToolsFree from "./SocialMediaToolsFree";
import Config from "@/lib/config";

const ARTICLE_URL = `${Config.MAIN_DOMAIN_NO}/blog/social-media-tools-free`;
const PUBLISH_DATE = "2025-04-30";
const MODIFIED_DATE = "2025-04-30";

const FAQ = [
  {
    q: "What is the best free social media scheduling tool?",
    a: "Buffer's free tier is widely considered the best free scheduler — it supports 3 channels, 10 scheduled posts per channel, and has a clean interface. Later (free) is excellent for visual platforms like Instagram and TikTok. Meta Business Suite is completely free and unlimited for Facebook and Instagram specifically.",
  },
  {
    q: "Is Canva free for social media?",
    a: "Yes, Canva's free tier is extremely generous for social media creators. It includes 250,000+ templates, 100GB of cloud storage, background remover (now included in free), and AI-powered design suggestions. Canva Pro ($13/mo) adds brand kits, Magic Resize, and more premium templates, but the free tier handles most social media needs.",
  },
  {
    q: "What free tools do professional social media managers use?",
    a: "Professional social media managers typically rely on: Meta Business Suite (free analytics + scheduling for Facebook/Instagram), Google Analytics (free website traffic from social), Canva free (graphics), ChatGPT free (caption writing), Buffer or Later free (cross-platform scheduling), and Grammarly free (copy proofreading). This $0 stack covers full campaign management.",
  },
  {
    q: "Are there free AI tools for social media captions?",
    a: "Yes. ChatGPT (free tier) is the most powerful — it writes platform-optimized captions, hashtag sets, and content calendars on demand. Copy.ai has a free tier with social media templates. Grammarly (free) polishes captions for grammar and clarity. Notion AI (limited free) can generate and organize content batches.",
  },
  {
    q: "What free tools are best for social media analytics?",
    a: "Google Analytics 4 (free) tracks traffic from all social platforms to your website. Meta Business Suite (free) provides deep analytics for Facebook and Instagram. Native platform analytics (Twitter/X Analytics, TikTok Creator Studio, YouTube Studio) are all free and surprisingly detailed. Social Blade (free) shows public follower growth trends for competitors.",
  },
  {
    q: "Can I manage all social media for free?",
    a: "Yes — a complete free stack exists: Buffer (scheduling), Canva (graphics), ChatGPT (content writing), Google Analytics (tracking), Grammarly (proofreading), Unsplash/Pexels (free images), and each platform's native analytics. This free toolkit handles everything except advanced automation, bulk scheduling beyond 10 posts, and team collaboration features.",
  },
];

export const metadata: Metadata = {
  title: `Best Free Social Media Tools 2025 — No Credit Card Required`,
  description: `15 genuinely free social media tools for scheduling, content creation, analytics, and writing. Buffer, Canva, ChatGPT, Grammarly and more — reviewed with free tier details.`,
  keywords: [
    "free social media tools",
    "social media tools free",
    "best free social media tools 2025",
    "free social media scheduler",
    "free social media management tools",
    "Buffer free tier",
    "Later free plan",
    "Canva free social media",
    "free content creation tools",
    "social media analytics free",
    "free Instagram tools",
    "free TikTok tools",
    "free Facebook management tools",
    "free social media calendar",
    "Hootsuite free alternative",
    "social media tools no credit card",
    "free influencer tools",
    "social media manager free tools",
    "best free marketing tools",
    "ChatGPT social media captions free",
  ],
  authors: [{ name: Config.NAME_MAKE }],
  robots: { index: true, follow: true },
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: `15 Best Free Social Media Tools in 2025`,
    description: `The complete free toolkit for social media managers and creators — scheduling, graphics, captions, analytics, and images. No credit card needed.`,
    url: ARTICLE_URL,
    type: "article",
    siteName: Config.SITE_NAME,
    publishedTime: PUBLISH_DATE,
    modifiedTime: MODIFIED_DATE,
    images: [
      {
        url: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&h=630&fit=crop&q=85",
        width: 1200,
        height: 630,
        alt: "Social media apps on smartphone — Best Free Social Media Tools 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `15 Best Free Social Media Tools in 2025`,
    description: `Buffer, Canva, ChatGPT, Grammarly and 11 more free tools for scheduling, creating, and analyzing social media — no paid plans needed.`,
  },
};

export default function SocialMediaToolsFreePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Free Social Media Tools 2025 — No Credit Card Required",
    description: "15 genuinely free social media tools for scheduling, content creation, analytics, and copywriting — reviewed with free tier details and limitations.",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&h=630&fit=crop&q=85",
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
    keywords: "free social media tools, Buffer free, Later free, Canva free, ChatGPT social media, Grammarly free",
    articleSection: "Social Media",
    wordCount: 2800,
    inLanguage: "en-US",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: Config.MAIN_DOMAIN_NO },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${Config.MAIN_DOMAIN_NO}/blog` },
      { "@type": "ListItem", position: 3, name: "Social Media Tools Free", item: ARTICLE_URL },
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
      <SocialMediaToolsFree faq={FAQ} />
    </>
  );
}
