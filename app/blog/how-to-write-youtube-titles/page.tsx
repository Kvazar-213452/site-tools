export const dynamic = "force-static";

import type { Metadata } from "next";
import HowToWriteYoutubeTitles from "./HowToWriteYoutubeTitles";
import Config from "@/lib/config";

const ARTICLE_URL = `${Config.MAIN_DOMAIN_NO}/blog/how-to-write-youtube-titles`;
const PUBLISH_DATE = "2025-04-30";
const MODIFIED_DATE = "2025-04-30";

const FAQ = [
  {
    q: "How long should a YouTube title be?",
    a: "YouTube titles should be 50–60 characters long. YouTube truncates titles after about 60 characters in search results and up to 70 characters on desktop browse. The most important keywords should appear in the first 40 characters. Shorter titles (40–55 chars) often outperform longer ones because viewers can read them instantly without truncation.",
  },
  {
    q: "What makes a good YouTube title?",
    a: "A great YouTube title does four things: (1) includes the target keyword naturally, (2) creates curiosity or promises a specific benefit, (3) is easy to read in under 2 seconds, and (4) matches search intent. The best titles are specific rather than vague — '7 Python Tricks Senior Devs Use' outperforms 'Python Tips for Beginners' every time.",
  },
  {
    q: "Should I use numbers in YouTube titles?",
    a: "Yes. Numbered titles consistently outperform non-numbered titles in CTR studies. Numbers signal specificity and set clear expectations — '5 Ways to...' tells viewers exactly what they'll get. Odd numbers (3, 5, 7, 9) tend to perform slightly better than even numbers. Use numerals (7) not words (seven) for faster visual processing.",
  },
  {
    q: "How do I find good keywords for YouTube titles?",
    a: "Use VidIQ or TubeBuddy to research keywords with high search volume and low competition. Type your topic into YouTube's search bar and study the autocomplete suggestions — these are actual searches people make. Check competitor videos with high views for keyword patterns. Google Keyword Planner also works since many YouTube searches originate from Google.",
  },
  {
    q: "Can I use ChatGPT to write YouTube titles?",
    a: "Yes, and it's highly effective. Give ChatGPT your video topic, target keyword, primary audience, and 2–3 title examples from successful videos in your niche. Ask for 20 variations using different formulas (curiosity gap, numbered list, how-to, before/after). Then use VidIQ or TubeBuddy to check which titles have the best keyword scores before publishing.",
  },
  {
    q: "What are the best YouTube title formulas?",
    a: "The highest-performing YouTube title formulas are: (1) 'How I [Achieved Result] in [Timeframe]' — personal story with specific outcome; (2) '[Number] [Things] That [Benefit]' — numbered list with clear value; (3) 'Why [Common Belief] Is Wrong' — curiosity gap/controversy; (4) 'The [Adjective] Guide to [Topic]' — authority positioning; (5) '[Do This] Before You [Common Action]' — urgency and stakes.",
  },
  {
    q: "How do I improve CTR on YouTube?",
    a: "Click-through rate (CTR) is improved by better titles and thumbnails working together. For titles: use power words (Secret, Brutal, Finally, Nobody), add specificity (exact numbers, timeframes, names), and create a curiosity gap. Test titles with TubeBuddy's A/B testing tool. The average YouTube CTR is 4–5% — anything above 7% is excellent.",
  },
];

export const metadata: Metadata = {
  title: `How to Write YouTube Titles That Get Clicks — Complete Guide 2025`,
  description: `Learn how to write YouTube titles that maximize click-through rate. Proven formulas, power words, keyword placement, AI tools, and before/after examples to boost your CTR in 2025.`,
  keywords: [
    "how to write YouTube titles",
    "YouTube title formulas",
    "YouTube title tips",
    "best YouTube title examples",
    "YouTube CTR optimization",
    "YouTube title keywords",
    "write better YouTube titles",
    "YouTube title length",
    "YouTube title generator",
    "AI YouTube title writer",
    "YouTube click through rate",
    "YouTube SEO titles",
    "YouTube title best practices",
    "TubeBuddy title AB test",
    "VidIQ title score",
    "power words YouTube titles",
    "YouTube title 2025",
    "how to improve YouTube CTR",
    "YouTube title optimization",
    "catchy YouTube titles",
  ],
  authors: [{ name: Config.NAME_MAKE }],
  robots: { index: true, follow: true },
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: `How to Write YouTube Titles That Get Clicks — 2025 Guide`,
    description: `Proven formulas, power words, keyword placement, and AI tools for writing YouTube titles that maximize CTR and channel growth.`,
    url: ARTICLE_URL,
    type: "article",
    siteName: Config.SITE_NAME,
    publishedTime: PUBLISH_DATE,
    modifiedTime: MODIFIED_DATE,
    images: [
      {
        url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=630&fit=crop&q=85",
        width: 1200,
        height: 630,
        alt: "YouTube title writing guide — how to write click-worthy YouTube titles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `How to Write YouTube Titles That Get Clicks (2025)`,
    description: `Proven formulas, power words, and AI tools to write YouTube titles that boost CTR and grow your channel.`,
  },
};

export default function HowToWriteYoutubeTitlesPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Write YouTube Titles That Get Clicks — Complete Guide 2025",
    description: "Proven YouTube title formulas, power words, keyword placement strategies, and AI tools to maximize click-through rate and grow your channel.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=630&fit=crop&q=85",
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
    keywords: "how to write YouTube titles, YouTube title formulas, YouTube CTR, YouTube SEO titles, power words YouTube",
    articleSection: "YouTube Marketing",
    wordCount: 3500,
    inLanguage: "en-US",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: Config.MAIN_DOMAIN_NO },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${Config.MAIN_DOMAIN_NO}/blog` },
      { "@type": "ListItem", position: 3, name: "How to Write YouTube Titles", item: ARTICLE_URL },
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

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Write YouTube Titles That Get Clicks",
    description: "A step-by-step guide to writing YouTube titles that maximize click-through rate.",
    totalTime: "PT15M",
    step: [
      { "@type": "HowToStep", name: "Research your target keyword", text: "Use VidIQ or TubeBuddy to find a keyword with good search volume and manageable competition for your channel size." },
      { "@type": "HowToStep", name: "Choose a title formula", text: "Select a proven formula: numbered list, how-to, curiosity gap, or personal story. Match the formula to your content type." },
      { "@type": "HowToStep", name: "Place your keyword in the first 40 characters", text: "Put the most important keyword at the start of the title so it appears before any truncation in search results." },
      { "@type": "HowToStep", name: "Add a power word or emotional trigger", text: "Include a word like Secret, Finally, Brutal, Simple, or Never to increase emotional resonance and urgency." },
      { "@type": "HowToStep", name: "Keep it under 60 characters", text: "Count your characters and trim to 50–60 to avoid truncation in YouTube search results on mobile." },
      { "@type": "HowToStep", name: "Test with AI and analytics tools", text: "Generate 10–20 variations with ChatGPT, score them with VidIQ, and A/B test the top two with TubeBuddy." },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <HowToWriteYoutubeTitles faq={FAQ} />
    </>
  );
}
