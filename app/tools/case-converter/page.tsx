export const dynamic = "force-static";

import type { Metadata } from "next";
import CaseConverter from "./CaseConverter";
import Config from "@/lib/config";

const PAGE_URL = `${Config.MAIN_DOMAIN_NO}/tools/case-converter`;

export const metadata: Metadata = {
  title: `Case Converter — UPPERCASE, lowercase, camelCase, snake_case & 12 More | Free`,
  description: `Free online Case Converter: instantly transform text between UPPERCASE, lowercase, Title Case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, and 12+ more formats. No signup, no ads, 100% browser-based.`,
  keywords: [
    "case converter",
    "text case converter",
    "camelCase converter",
    "snake_case converter",
    "kebab-case converter",
    "PascalCase converter",
    "Title Case converter",
    "UPPERCASE converter",
    "lowercase converter",
    "CONSTANT_CASE converter",
    "dot.case converter",
    "path/case converter",
    "case formatter online",
    "text formatter free",
    "online case converter",
    "free case converter",
    "developer tools text",
    "text case conversion tool",
    "variable name converter",
    "convert text to camelCase",
    "convert text to snake_case",
    "text transform online",
    "case converter 2025",
    "sentence case converter",
    "alternating case converter",
  ],
  authors: [{ name: Config.NAME_MAKE }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `Case Converter — Free Text Case Conversion Tool`,
    description: `Transform text between 12+ case formats instantly: camelCase, snake_case, kebab-case, PascalCase, Title Case, UPPERCASE, and more. 100% browser-based, no signup.`,
    url: PAGE_URL,
    type: "website",
    siteName: Config.SITE_NAME,
    locale: "en_US",
    images: [{ url: `${Config.MAIN_DOMAIN_NO}/icon.png`, width: 1200, height: 630, alt: `Case Converter — Free Text Case Conversion` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Case Converter — Convert Text to Any Case Format`,
    description: `Convert text between camelCase, snake_case, kebab-case, PascalCase, UPPERCASE, Title Case, and 12+ more formats. Browser-based, no signup.`,
  },
};

export default function CaseConverterPage() {
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Case Converter",
    url: PAGE_URL,
    description: "Free online tool to convert text between 12+ case formats: camelCase, snake_case, kebab-case, PascalCase, UPPERCASE, lowercase, Title Case, and more.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "camelCase conversion",
      "snake_case conversion",
      "kebab-case conversion",
      "PascalCase conversion",
      "UPPERCASE conversion",
      "lowercase conversion",
      "Title Case conversion",
      "CONSTANT_CASE conversion",
      "Sentence case conversion",
      "Alternating case conversion",
      "dot.case conversion",
      "path/case conversion",
      "One-click copy",
      "Real-time preview",
      "No signup required",
    ],
    author: { "@type": "Organization", name: Config.SITE_NAME, url: Config.MAIN_DOMAIN_NO },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: Config.MAIN_DOMAIN_NO },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${Config.MAIN_DOMAIN_NO}/tools` },
      { "@type": "ListItem", position: 3, name: "Case Converter", item: PAGE_URL },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a case converter?",
        acceptedAnswer: { "@type": "Answer", text: "A case converter is a tool that transforms text between different capitalization formats such as camelCase, snake_case, kebab-case, PascalCase, UPPERCASE, and Title Case. It's commonly used by developers, writers, and content creators." },
      },
      {
        "@type": "Question",
        name: "What is the difference between camelCase and PascalCase?",
        acceptedAnswer: { "@type": "Answer", text: "camelCase starts with a lowercase letter and capitalizes each subsequent word (e.g., myVariableName). PascalCase capitalizes every word including the first (e.g., MyVariableName). camelCase is common in JavaScript variables, PascalCase in class names." },
      },
      {
        "@type": "Question",
        name: "What is snake_case used for?",
        acceptedAnswer: { "@type": "Answer", text: "snake_case uses underscores between words with all lowercase letters (e.g., my_variable_name). It's the standard naming convention in Python, Ruby, and SQL column names, and is widely used in database field names and file names." },
      },
      {
        "@type": "Question",
        name: "What is kebab-case?",
        acceptedAnswer: { "@type": "Answer", text: "kebab-case uses hyphens between words with all lowercase letters (e.g., my-variable-name). It's the standard format for CSS class names, HTML attributes, URL slugs, and file names in web projects." },
      },
      {
        "@type": "Question",
        name: "Is this case converter free?",
        acceptedAnswer: { "@type": "Answer", text: "Yes, completely free. No signup, no account, no usage limits. All conversion happens in your browser — your text is never sent to a server." },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CaseConverter />
    </>
  );
}
