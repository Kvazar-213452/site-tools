export const dynamic = "force-static";

import type { Metadata } from "next";
import Contact from "./Contact";
import Config from "@/lib/config";

export const metadata: Metadata = {
  title: `Contact Us — ${Config.SITE_NAME}`,
  description: `Have a question, bug report, or tool request? Contact the ${Config.SITE_NAME} team by email. Real humans, no chatbots — we reply within 1–2 business days.`,
  keywords: [
    "contact",
    "contact us",
    "email support",
    "customer support",
    "bug report",
    "tool request",
    "feature request",
    "feedback",
    "get in touch",
    "reach us",
    "help",
    "support email",
    "report an issue",
    `contact ${Config.SITE_NAME}`,
    `${Config.SITE_NAME} support`,
  ],
  authors: [{ name: `${Config.NAME_MAKE}` }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${Config.MAIN_DOMEN}/contact` },
  openGraph: {
    title: `Contact — ${Config.SITE_NAME}`,
    description: `Reach the ${Config.SITE_NAME} team for bug reports, tool requests, or general questions. Real humans, no chatbots — reply within 1–2 business days.`,
    url: `${Config.MAIN_DOMEN}/contact`,
    type: "website",
    siteName: Config.SITE_NAME,
    images: [
      {
        url: `${Config.MAIN_DOMEN}/icon.png`,
        width: 1200,
        height: 630,
        alt: `Contact ${Config.SITE_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact — ${Config.SITE_NAME}`,
    description: `Reach the ${Config.SITE_NAME} team for bug reports, tool requests, or general questions. We reply within 1–2 business days.`,
  },
};

export default function ContactPage() {
  return <Contact />;
}