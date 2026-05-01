import Link from "next/link";
import type { Metadata } from "next";
import Config from "@/lib/config";

import "@/style/home.css";

const CATEGORIES = ["All", "Developer", "Design", "Security", "SEO", "Content", "Utility"];

const FAQ = [
  { q: "Are all tools on Toolsxm completely free?", a: "Yes. Every generator on Toolsxm is 100% free, with no signup, no rate limits, and no hidden upsells." },
  { q: "Is my data sent to a server?", a: "No. All generation runs locally in your browser using JavaScript and the Web Crypto API. Your input never leaves your device." },
  { q: "Can I use Toolsxm tools commercially?", a: "Absolutely. Output from our generators (passwords, palettes, QR codes, fake data) is yours to use in any commercial project." },
  { q: "Do you offer an API?", a: "Most tools are designed for the browser, but a public API for selected generators is on the roadmap." },
];

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: Config.SITE_NAME,
  alternateName: "Toolsxm — Free Online Generator Tools",
  url: Config.MAIN_DOMAIN_NO,
  potentialAction: {
    "@type": "SearchAction",
    target: `${Config.MAIN_DOMAIN_NO}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};
const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Free Online Generator Tools",
  numberOfItems: Config.TOOLS.length,
  itemListElement: Config.TOOLS.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    description: t.desc,
    url: `${Config.MAIN_DOMAIN_NO}/${t.slug}`,
  })),
};
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: Config.MAIN_DOMAIN_NO },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${Config.MAIN_DOMAIN_NO}/#tools` },
  ],
};

export const metadata: Metadata = {
  title: "Free Online Generator Tools — Build, Create, Generate Anything",
  description:
    "Toolsxm is a free collection of fast, browser-based generator tools: password generator, QR code generator, UUID generator, color palette generator, fake data generator, hash generator, lorem ipsum, meta tag generator, and more. No signup, no ads, no tracking.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      {/* Page-specific JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* HERO */}
      <section className="hero" aria-labelledby="hero-h1">
        <div className="hero-meta">
          <span className="dot dot-live" /> 12 generators · all free · no signup
        </div>
        <h1 id="hero-h1" className="hero-h1">
          Free online <em>generator</em> tools
          <br />
          for everything you build.
        </h1>
        <p className="hero-sub">
          Passwords, QR codes, UUIDs, color palettes, fake data, hashes — fast, private, and
          beautifully simple. Runs entirely in your browser.
        </p>
        <div className="hero-cta">
          <a href="#tools" className="btn btn-primary">Browse all tools →</a>
          <a href="#why" className="btn btn-ghost">Why Toolsxm</a>
        </div>
        <ul className="hero-stats" aria-label="Site statistics">
          <li><strong>12</strong><span>generators</span></li>
          <li><strong>0ms</strong><span>server latency</span></li>
          <li><strong>100%</strong><span>browser-side</span></li>
          <li><strong>$0</strong><span>forever</span></li>
        </ul>
      </section>

      {/* TOOLS */}
      <section id="tools" className="tools" aria-labelledby="tools-h2">
        <div className="section-head">
          <div>
            <span className="eyebrow">/ 01 — Catalog</span>
            <h2 id="tools-h2" className="section-h2">All generator tools</h2>
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
          {Config.TOOLS.map((t) => (
            <li key={t.slug} className="tool-card">
              <Link href={`/tools/${t.slug}`} className="tool-link" aria-labelledby={`t-${t.slug}`}>
                <div className="tool-top">
                  <span className="tool-icon" aria-hidden="true">{t.icon}</span>
                  <span className="tool-cat">{t.cat}</span>
                </div>
                <h3 id={`t-${t.slug}`} className="tool-name">{t.name}</h3>
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

      {/* WHY */}
      <section id="why" className="why" aria-labelledby="why-h2">
        <span className="eyebrow">/ 02 — Principles</span>
        <h2 id="why-h2" className="section-h2">Built different. On purpose.</h2>
        <div className="why-grid">
          <article className="why-card">
            <span className="why-num">01</span>
            <h3>Local-first</h3>
            <p>Everything runs in your browser. Your inputs never touch our servers.</p>
          </article>
          <article className="why-card">
            <span className="why-num">02</span>
            <h3>Zero clutter</h3>
            <p>No ads, no popups, no cookie banners begging for consent you didn't owe.</p>
          </article>
          <article className="why-card">
            <span className="why-num">03</span>
            <h3>Sub-100ms</h3>
            <p>Every page is statically generated and lighter than a single tweet.</p>
          </article>
          <article className="why-card">
            <span className="why-num">04</span>
            <h3>Open by default</h3>
            <p>Source code is on GitHub. Every algorithm is auditable end-to-end.</p>
          </article>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="faq" aria-labelledby="faq-h2">
        <span className="eyebrow">/ 03 — FAQ</span>
        <h2 id="faq-h2" className="section-h2">Questions people ask</h2>
        <div className="faq-list">
          {FAQ.map((f, i) => (
            <details key={i} className="faq-item">
              <summary>
                <span className="faq-q">{f.q}</span>
                <span className="faq-toggle" aria-hidden="true">+</span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Pick a tool. Get an answer. Move on with your day.</h2>
        <a href="#tools" className="btn btn-primary btn-lg">Open the catalog →</a>
      </section>
    </>
  );
}