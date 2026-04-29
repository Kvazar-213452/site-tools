export const dynamic = "force-static";

import type { Metadata } from "next";
import RandomQuestionGenerator from "./RandomQuestionGenerator";
import Config from "@/lib/config";

export const metadata: Metadata = {
  title: `Random Question Generator — Trivia Questions by Category & Difficulty | Free`,
  description: `Free Random Question Generator: get trivia questions by category and difficulty. Science, history, geography, sports, animals, film, music, and more. Powered by Open Trivia DB. No signup, no ads, 100% free.`,
  keywords: [
    "random question generator",
    "random trivia questions",
    "trivia generator",
    "quiz question generator",
    "random quiz",
    "trivia questions online",
    "free trivia questions",
    "science trivia",
    "history trivia",
    "geography trivia",
    "sports trivia",
    "pub quiz questions",
    "random questions",
    "question of the day",
    "open trivia database",
    "trivia by category",
    "trivia by difficulty",
    "quiz generator free",
  ],
  authors: [{ name: `${Config.NAME_MAKE}` }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${Config.MAIN_DOMEN}/random-question-generator` },
  openGraph: {
    title: `Random Question Generator — Trivia by Category & Difficulty`,
    description: `Get random trivia questions from 12 categories and 3 difficulty levels. Powered by Open Trivia DB. Pick an answer, reveal the correct one — free, instant, no signup.`,
    url: `${Config.MAIN_DOMEN}/random-question-generator`,
    type: "website",
    siteName: Config.SITE_NAME,
    images: [
      {
        url: `${Config.MAIN_DOMEN}/icon.png`,
        width: 1200,
        height: 630,
        alt: `Random Question Generator — Free Trivia Tool`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Random Question Generator — Free Trivia Questions`,
    description: `Random trivia questions by category and difficulty. Science, history, geography, sports, and more. Pick an answer, see if you're right. Free, no signup.`,
  },
};

export default function RandomQuestionGeneratorPage() {
  return <RandomQuestionGenerator />;
}