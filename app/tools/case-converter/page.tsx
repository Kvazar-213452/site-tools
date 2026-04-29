export const dynamic = "force-static";

import type { Metadata } from "next";
import CaseConverter from "./CaseConverter";
import Config from "@/lib/config";

export const metadata: Metadata = {
  title: `Case Converter — Convert Text to UPPERCASE, lowercase, camelCase, snake_case & More | Free`,
  description: `Free Case Converter: Instantly transform text between UPPERCASE, lowercase, Title Case, camelCase, PascalCase, snake_case, kebab-case, and 12+ more formats. No signup, no ads, 100% browser-based and private.`,
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
    "case formatter",
    "text formatter",
    "online case converter",
    "free case converter",
    "developer tools",
    "text conversion",
    "variable name converter",
  ],
  authors: [{ name: `${Config.NAME_MAKE}` }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${Config.MAIN_DOMEN}/case-converter` },
  openGraph: {
    title: `Case Converter — Free Text Case Conversion`,
    description: `Transform text between 12+ case formats instantly: camelCase, snake_case, kebab-case, PascalCase, Title Case, UPPERCASE, and more. 100% browser-based, no signup, completely private.`,
    url: `${Config.MAIN_DOMEN}/case-converter`,
    type: "website",
    siteName: Config.SITE_NAME,
    images: [
      {
        url: `${Config.MAIN_DOMEN}/icon.png`,
        width: 1200,
        height: 630,
        alt: `Case Converter — Free Text Case Conversion`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Case Converter — Convert Text to Any Case Format`,
    description: `Convert text between camelCase, snake_case, kebab-case, PascalCase, UPPERCASE, Title Case, and 12+ more formats instantly. 100% browser-based, no signup.`,
  },
};

export default function CaseConverterPage() {
  return <CaseConverter />;
}