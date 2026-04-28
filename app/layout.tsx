import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import "@/style/globals.css";
import "@/style/header.css";
import "@/style/footer.css";

export const metadata: Metadata = {
  title: {
    default: "Toolsxm — Free Online Generator Tools",
    template: "%s | Toolsxm",
  },
  description:
    "Toolsxm is a free collection of fast, browser-based generator tools: password generator, QR code generator, UUID generator, color palette generator, fake data generator, hash generator, lorem ipsum, meta tag generator, and more. No signup, no ads, no tracking — just instant results.",
  keywords: [
    "online tools", "free generator", "password generator", "qr code generator",
    "uuid generator", "color palette", "fake data generator", "hash generator",
    "lorem ipsum", "meta tag generator", "css gradient", "json generator",
    "favicon generator", "developer tools", "web tools",
  ],
  authors: [{ name: "Toolsxm", url: "https://toolsxm.com" }],
  creator: "Toolsxm",
  metadataBase: new URL("https://toolsxm.com"),
  alternates: {
    canonical: "/",
    languages: { "en": "/", "x-default": "/" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Toolsxm",
    title: "Toolsxm — Free Online Generator Tools",
    description:
      "Free browser-based generators for passwords, QR codes, UUIDs, color palettes, fake data, hashes and more. No signup. No ads.",
    url: "https://toolsxm.com",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Toolsxm — Free Online Generator Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@toolsxm",
    creator: "@toolsxm",
    title: "Toolsxm — Free Online Generator Tools",
    description:
      "Free browser-based generators for passwords, QR codes, UUIDs, color palettes, fake data, hashes and more.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          FOUC prevention: inline script виконується синхронно до першого paint,
          одразу застосовуючи збережену тему до <html> без будь-якого мерехтіння.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('toolsxm-theme');if(t&&['light','dark','paper','ocean'].indexOf(t)!==-1)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,800&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <a href="#tools" className="skip-link">Skip to tools</a>

          <div className="grid-bg" aria-hidden="true" />
          <div className="noise"   aria-hidden="true" />

          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}