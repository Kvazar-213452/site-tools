import Link from "next/link";
import type { Metadata } from "next";
import Config from "@/lib/config";

import "@/style/home.css";

type Tool = {
  slug: string;
  name: string;
  desc: string;
  cat: string;
  icon: string;
};

const TOOLS: Tool[] = [
  { slug: "password-generator",      name: "Password Generator",      desc: "Generate strong, cryptographically secure passwords with custom length and character rules.",                   cat: "Security",  icon: "◇"   },
  { slug: "qr-code-generator",       name: "QR Code Generator",       desc: "Create high-resolution QR codes for URLs, text, Wi-Fi, vCards, and payments — free and unlimited.",             cat: "Utility",   icon: "▦"   },
  { slug: "uuid-generator",          name: "UUID Generator",          desc: "Generate UUID v1, v4, v7 and ULID identifiers in bulk for databases and APIs.",                                  cat: "Developer", icon: "◈"   },
  { slug: "color-palette-generator", name: "Color Palette Generator", desc: "Build harmonious color palettes from a base hue with HEX, RGB, HSL, and OKLCH output.",                         cat: "Design",    icon: "◐"   },
  { slug: "fake-data-generator",     name: "Fake Data Generator",     desc: "Generate realistic mock JSON, CSV, and SQL data: names, emails, addresses, phones for testing.",                 cat: "Developer", icon: "◇"   },
  { slug: "hash-generator",          name: "Hash Generator",          desc: "Compute MD5, SHA-1, SHA-256, SHA-512, and bcrypt hashes locally in your browser.",                              cat: "Security",  icon: "⬡"   },
  { slug: "lorem-ipsum-generator",   name: "Lorem Ipsum Generator",   desc: "Generate placeholder text by paragraphs, sentences, or words — classic or modern variants.",                    cat: "Content",   icon: "¶"   },
  { slug: "meta-tag-generator",      name: "Meta Tag Generator",      desc: "Build SEO-ready meta tags, Open Graph, Twitter Cards, and JSON-LD schema in one click.",                        cat: "SEO",       icon: "◊"   },
  { slug: "gradient-generator",      name: "CSS Gradient Generator",  desc: "Design linear, radial, and conic CSS gradients with live preview and copy-ready code.",                         cat: "Design",    icon: "◑"   },
  { slug: "username-generator",      name: "Username Generator",      desc: "Invent unique, memorable usernames and handles for any platform or game.",                                       cat: "Content",   icon: "◇"   },
  { slug: "json-generator",          name: "JSON Generator",          desc: "Generate, format, and validate JSON from schemas — perfect for API mocking.",                                    cat: "Developer", icon: "{ }" },
  { slug: "favicon-generator",       name: "Favicon Generator",       desc: "Convert any image into a complete favicon set for all modern browsers and devices.",                             cat: "Design",    icon: "★"   },
];

const CATEGORIES = ["All", "Developer", "Design", "Security", "SEO", "Content", "Utility"];

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Free Online Generator Tools",
  numberOfItems: TOOLS.length,
  itemListElement: TOOLS.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    description: t.desc,
    url: `${Config.MAIN_DOMAIN_NO}/tools/${t.slug}`,
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",  item: Config.MAIN_DOMAIN_NO },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${Config.MAIN_DOMAIN_NO}/tools` },
  ],
};

export const metadata: Metadata = {
  title: "All Free Online Generator Tools — Toolsxm",
  description:
    "Browse all free browser-based generator tools on Toolsxm: password generator, QR code generator, UUID generator, color palette generator, fake data generator, hash generator, lorem ipsum, meta tag generator, and more. No signup, no ads.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section id="tools" className="tools" aria-labelledby="tools-h1">
        <div className="section-head">
          <div>
            <span className="eyebrow">/ Catalog</span>
            <h1 id="tools-h1" className="section-h2">All generator tools</h1>
            <p className="section-lede">
              Every tool below is free, runs in your browser, and works offline once loaded. Pick a
              category or jump straight to the generator you need.
            </p>
          </div>
          <ul className="cats" aria-label="Tool categories">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <a href={`#${c.toLowerCase()}`} className="cat">{c}</a>
              </li>
            ))}
          </ul>
        </div>

        <ul className="tool-grid" role="list">
          {TOOLS.map((t) => (
            <li key={t.slug} className="tool-card">
              <Link href={`/tools/${t.slug}`} className="tool-link" aria-labelledby={`t-${t.slug}`}>
                <div className="tool-top">
                  <span className="tool-icon" aria-hidden="true">{t.icon}</span>
                  <span className="tool-cat">{t.cat}</span>
                </div>
                <h2 id={`t-${t.slug}`} className="tool-name">{t.name}</h2>
                <p className="tool-desc">{t.desc}</p>
                <span className="tool-arrow" aria-hidden="true">Open <span>→</span></span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="seo-copy">
          <h3>The complete suite of online generator tools</h3>
          <p>
            Toolsxm brings together the most-used <strong>online generators</strong> developers, designers, and
            content creators rely on every day. Generate <strong>secure passwords</strong>, create{" "}
            <strong>QR codes</strong> for any URL or Wi-Fi network, mint <strong>UUIDs</strong> for your database,
            build <strong>color palettes</strong> for your next brand, produce <strong>realistic fake data</strong>{" "}
            for testing, and compute <strong>cryptographic hashes</strong> — all from a single, fast page.
          </p>
          <p>
            We keep the catalog focused on what people actually search for:{" "}
            <em>
              password generator, qr code generator online free, uuid v4 generator, color palette generator from
              image, fake data generator for testing, sha256 hash generator, lorem ipsum generator, meta tag
              generator for seo, css gradient generator, random username generator, json data generator, favicon
              generator from png
            </em>
            . If you have a generator you'd like to see next, the list is community-driven.
          </p>
        </div>
      </section>
    </>
  );
}