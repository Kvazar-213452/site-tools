export const dynamic = "force-static";

import type { Metadata } from "next";
import AiToolsForStudents from "./AiToolsForStudents";
import Config from "@/lib/config";

const ARTICLE_URL = `${Config.MAIN_DOMAIN_NO}/blog/ai-tools-for-students`;
const PUBLISH_DATE = "2025-04-30";
const MODIFIED_DATE = "2025-04-30";

const FAQ = [
  {
    q: "Are AI tools free for students?",
    a: "Many AI tools offer free tiers for students. ChatGPT, Grammarly, Perplexity AI, and Wolfram Alpha all have free versions with solid capabilities. Notion AI and Grammarly Premium often offer student discounts with an .edu email address. A solid free toolkit (ChatGPT + Grammarly Free + Perplexity + Wolfram Alpha) costs $0 and covers most student needs.",
  },
  {
    q: "Is using AI tools for homework cheating?",
    a: "It depends on your institution's academic integrity policy. Using AI as a study aid, brainstorming helper, grammar checker, or for explaining concepts is generally acceptable. Submitting AI-generated content as your own original work may violate academic integrity rules. Always disclose AI use when required and check your school's specific policy.",
  },
  {
    q: "Which AI tool is best for writing research papers?",
    a: "For research papers, combine Perplexity AI (finding cited sources), Elicit (analyzing academic papers), and Grammarly (polishing your final draft). ChatGPT is excellent for outlining arguments and explaining complex concepts. Zotero with AI plugins helps manage citations and references automatically.",
  },
  {
    q: "Can AI tools help with STEM subjects?",
    a: "Absolutely. Wolfram Alpha handles mathematics, physics, chemistry, and engineering problems with step-by-step solutions. Photomath solves equations from photos. Socratic by Google provides STEM homework help with visual explanations. ChatGPT can explain concepts at any level and work through problems interactively.",
  },
  {
    q: "What AI tool is best for note-taking from lectures?",
    a: "Otter.ai is the top choice for transcribing lectures automatically in real time. Notion AI can then summarize and organize those transcriptions into structured notes. Microsoft OneNote with Copilot is also excellent for students in Microsoft ecosystems. For maximum retention, combine AI transcription with manual review and Anki flashcards.",
  },
  {
    q: "How much time can AI tools save students each week?",
    a: "Students typically save 3–7 hours per week with a good AI toolkit. The biggest time savings come from: automatic citation formatting (30–60 min/week), grammar checking vs manual proofreading (1–2 hours/week), AI-generated flashcards from notes (45 min/week), and faster research with cited summaries (1–3 hours/week).",
  },
  {
    q: "What is the best free AI tool for students in 2025?",
    a: "ChatGPT (free tier) remains the most versatile free AI tool for students — it handles writing, math, coding, explanations, and brainstorming. Perplexity AI (free) is the best for research with sources. Grammarly (free) is essential for writing quality. Together these three free tools cover the majority of student AI needs.",
  },
];

export const metadata: Metadata = {
  title: `AI Tools for Students 2025 — 15 Best Free & Paid Apps for Learning`,
  description: `Discover the 15 best AI tools for students in 2025. From ChatGPT and Grammarly to Perplexity and Wolfram Alpha — boost your grades, save 5+ hours per week, and study smarter with AI.`,
  keywords: [
    "AI tools for students",
    "best AI tools for students",
    "AI study tools",
    "AI tools for homework",
    "artificial intelligence tools students",
    "free AI tools students",
    "AI tools college students",
    "AI tools high school students",
    "best AI apps students 2025",
    "ChatGPT for students",
    "Grammarly for students",
    "Perplexity AI students",
    "AI writing tools students",
    "AI research tools students",
    "study tools with AI",
    "AI flashcard generator",
    "AI note taking students",
    "AI math solver students",
    "AI for academic writing",
    "student productivity AI",
    "Wolfram Alpha students",
    "AI tutor free",
    "best study apps AI",
    "AI tools for learning",
  ],
  authors: [{ name: Config.NAME_MAKE }],
  robots: { index: true, follow: true },
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: `AI Tools for Students 2025 — 15 Best Apps to Study Smarter`,
    description: `The complete guide to AI tools for students. Boost your GPA, save hours each week, and ace every assignment with these AI-powered apps.`,
    url: ARTICLE_URL,
    type: "article",
    siteName: Config.SITE_NAME,
    publishedTime: PUBLISH_DATE,
    modifiedTime: MODIFIED_DATE,
    images: [
      {
        url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=630&fit=crop&q=85",
        width: 1200,
        height: 630,
        alt: "Student using AI tools on laptop to study — AI Tools for Students 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `15 Best AI Tools for Students in 2025`,
    description: `From ChatGPT to Wolfram Alpha — the complete guide to AI tools that help students study smarter, write better, and save hours every week.`,
  },
};

export default function AiToolsForStudentsPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "AI Tools for Students 2025 — 15 Best Free & Paid Apps for Learning",
    description:
      "The complete guide to 15 AI-powered tools for students — study smarter, write better research papers, solve math, and save 5+ hours per week.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=630&fit=crop&q=85",
    datePublished: PUBLISH_DATE,
    dateModified: MODIFIED_DATE,
    author: {
      "@type": "Organization",
      name: Config.NAME_MAKE,
      url: Config.MAIN_DOMAIN_NO,
    },
    publisher: {
      "@type": "Organization",
      name: Config.SITE_NAME,
      url: Config.MAIN_DOMAIN_NO,
      logo: {
        "@type": "ImageObject",
        url: `${Config.MAIN_DOMAIN_NO}/icon.png`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": ARTICLE_URL },
    keywords:
      "AI tools for students, study tools AI, ChatGPT students, Grammarly, Perplexity, Wolfram Alpha, AI writing tools, AI research",
    articleSection: "Education Technology",
    wordCount: 3200,
    inLanguage: "en-US",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: Config.MAIN_DOMAIN_NO },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${Config.MAIN_DOMAIN_NO}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: "AI Tools for Students",
        item: ARTICLE_URL,
      },
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
    name: "Best AI Tools for Students 2025",
    description: "A curated list of the 15 best AI tools for students in 2025",
    numberOfItems: 15,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ChatGPT", url: "https://chat.openai.com" },
      { "@type": "ListItem", position: 2, name: "Grammarly", url: "https://grammarly.com" },
      { "@type": "ListItem", position: 3, name: "QuillBot", url: "https://quillbot.com" },
      { "@type": "ListItem", position: 4, name: "Perplexity AI", url: "https://perplexity.ai" },
      { "@type": "ListItem", position: 5, name: "Elicit", url: "https://elicit.com" },
      { "@type": "ListItem", position: 6, name: "Connected Papers", url: "https://connectedpapers.com" },
      { "@type": "ListItem", position: 7, name: "Anki", url: "https://apps.ankiweb.net" },
      { "@type": "ListItem", position: 8, name: "QuizGecko", url: "https://quizgecko.com" },
      { "@type": "ListItem", position: 9, name: "Khanmigo", url: "https://khanacademy.org" },
      { "@type": "ListItem", position: 10, name: "Wolfram Alpha", url: "https://wolframalpha.com" },
      { "@type": "ListItem", position: 11, name: "Photomath", url: "https://photomath.com" },
      { "@type": "ListItem", position: 12, name: "Socratic by Google", url: "https://socratic.org" },
      { "@type": "ListItem", position: 13, name: "Otter.ai", url: "https://otter.ai" },
      { "@type": "ListItem", position: 14, name: "Notion AI", url: "https://notion.so" },
      { "@type": "ListItem", position: 15, name: "Motion", url: "https://usemotion.com" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <AiToolsForStudents faq={FAQ} />
    </>
  );
}
