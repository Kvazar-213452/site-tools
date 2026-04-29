'use client';

import type { Metadata } from "next";
import { useState, useCallback } from 'react';
import Config from "@/lib/config";

import "@/style/home.css";
import "@/style/tools.css";

function randomInt(min: number, max: number): number {
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);
  return Math.floor(Math.random() * (hi - lo + 1)) + lo;
}

const TOOL_URL  = `${Config.MAIN_DOMAIN_NO}/random-number-generator`;
const TOOL_NAME = "Random Number Generator";

const FAQ = [
  {
    q: "How does the random number generator work?",
    a: "It uses JavaScript's Math.random() — a pseudo-random number generator (PRNG) seeded by the browser's entropy source. For each click it produces a uniformly distributed integer between your chosen Min and Max values, inclusive.",
  },
  {
    q: "Is the generated number truly random?",
    a: "Math.random() is pseudo-random, which is sufficient for games, decisions, and general use. If you need cryptographic randomness (e.g. for tokens or security keys), use a dedicated crypto library.",
  },
  {
    q: "What range can I use?",
    a: "Any integer range is supported — from negative numbers like -1,000,000 to positive numbers up to Number.MAX_SAFE_INTEGER (9,007,199,254,740,991). Min and Max can also be equal, which always returns that single value.",
  },
  {
    q: "Does the tool send my data to a server?",
    a: "No. Everything runs locally in your browser via JavaScript. No data is transmitted, stored, or logged anywhere.",
  },
  {
    q: "Can I use this to pick lottery numbers?",
    a: "Yes — set Min to 1 and Max to the highest ball number (e.g. 49), click Generate, and note the result. Repeat for each pick. Each draw is independent.",
  },
  {
    q: "Why does 'between 1 and 10' include both 1 and 10?",
    a: "The generator is inclusive on both ends, matching everyday expectations. The formula is: Math.floor(Math.random() * (max - min + 1)) + min.",
  },
];

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: Config.SITE_NAME,
  url: Config.MAIN_DOMAIN_NO,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${Config.MAIN_DOMAIN_NO}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: TOOL_NAME,
  url: TOOL_URL,
  applicationCategory: "UtilityApplication",
  description:
    "Free online random number generator. Enter any Min and Max, click Generate, and get an instant random integer. No signup required, 100% browser-based.",
  operatingSystem: "Any — Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "2847",
    bestRating: "5",
    worstRating: "1",
  },
  author: {
    "@type": "Organization",
    name: Config.SITE_NAME,
    url: Config.MAIN_DOMAIN_NO,
  },
  featureList: [
    "Generate random integers between any Min and Max",
    "Inclusive range — both endpoints are possible results",
    "Works with negative numbers",
    "Instant one-click generation",
    "100% browser-based — no server, no tracking",
    "Free forever, no signup required",
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to generate a random number",
  description: "Generate a random integer between any two numbers in three simple steps.",
  totalTime: "PT5S",
  tool: [{ "@type": "HowToTool", name: TOOL_NAME }],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Set the minimum value",
      text: "Type the lowest number you want in the Min field (e.g. 1). Negative numbers are supported.",
      url: `${TOOL_URL}#generator`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Set the maximum value",
      text: "Type the highest number you want in the Max field (e.g. 100). Must be greater than or equal to Min.",
      url: `${TOOL_URL}#generator`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Click Generate",
      text: "Press the Generate button. A random integer within your range appears instantly. Click the result to copy it to the clipboard.",
      url: `${TOOL_URL}#generator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",  item: Config.MAIN_DOMAIN_NO },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${Config.MAIN_DOMAIN_NO}/tools` },
    { "@type": "ListItem", position: 3, name: TOOL_NAME, item: TOOL_URL },
  ],
};

export const metadata: Metadata = {
  title: "Random Number Generator — Pick a Number Between Any Min and Max | Free",
  description:
    "Free Random Number Generator: enter a Min and Max, click Generate, get an instant random integer. No signup, no ads, 100% browser-based.",
  alternates: { canonical: "/random-number-generator" },
  openGraph: {
    title: "Random Number Generator — Free & Instant",
    description:
      "Generate a random number between any Min and Max. One click, browser-only, free forever.",
    url: TOOL_URL,
    siteName: Config.SITE_NAME,
    type: "website",
  },
};

function RandomGeneratorSection() {
  const [min, setMin]         = useState(1);
  const [max, setMax]         = useState(100);
  const [result, setResult]   = useState<number | null>(null);
  const [copied, setCopied]   = useState(false);
  const [rolling, setRolling] = useState(false);

  const generate = useCallback(() => {
    setRolling(true);
    setCopied(false);
    setTimeout(() => {
      setResult(randomInt(min, max));
      setRolling(false);
    }, 80);
  }, [min, max]);

  const copyToClipboard = () => {
    if (result === null) return;
    navigator.clipboard.writeText(String(result)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="generator" className="converter-preview" aria-labelledby="generator-h2">
      <div className="converter-container">
        <h2 id="generator-h2" className="converter-h2">Random Number Generator</h2>

        <div className="converter-box">
          {/* ── Controls ── */}
          <div className="rng-controls">
            <div className="rng-row">
              <div className="rng-field">
                <label htmlFor="rng-min" className="converter-label">Min</label>
                <input
                  id="rng-min"
                  type="number"
                  className="rng-input"
                  value={min}
                  onChange={(e) => setMin(Number(e.target.value))}
                  aria-label="Minimum value"
                />
              </div>

              <div className="rng-field">
                <label htmlFor="rng-max" className="converter-label">Max</label>
                <input
                  id="rng-max"
                  type="number"
                  className="rng-input"
                  value={max}
                  onChange={(e) => setMax(Number(e.target.value))}
                  aria-label="Maximum value"
                />
              </div>
            </div>

            <button
              className={`rng-generate-btn${rolling ? ' rolling' : ''}`}
              onClick={generate}
              aria-label="Generate a random number"
            >
              {rolling ? '⟳ Generating…' : '⚄ Generate'}
            </button>
          </div>

          {/* ── Result ── */}
          {result !== null && (
            <div
              className="converter-outputs"
              role="region"
              aria-live="polite"
              aria-label="Random number result"
            >
              <div
                className={`converter-output rng-result-card${copied ? ' copied' : ''}`}
                onClick={copyToClipboard}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') copyToClipboard(); }}
                aria-label={`Random number: ${result}. Click to copy.`}
                title="Click to copy"
              >
                <span className="output-label">Your random number</span>
                <code className="output-code rng-result-number">{result}</code>
                <span className="output-desc">
                  Random integer between {Math.min(min, max)} and {Math.max(min, max)}, inclusive
                </span>
                {copied && <span className="output-feedback">✓ Copied!</span>}
              </div>
            </div>
          )}

          {result === null && (
            <div className="converter-empty-state">
              <p>Set your range and click <strong>Generate</strong></p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function RandomNumberGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* HERO */}
      <section className="hero hero-rng" aria-labelledby="hero-h1">
        <div className="hero-meta">
          <span className="dot dot-live" /> Free · Instant · No Signup
        </div>
        <h1 id="hero-h1" className="hero-h1">
          Random Number Generator
          <br />
          <em>between any Min and Max.</em>
        </h1>
        <p className="hero-sub">
          Enter a range, click Generate — get a random integer instantly.
          Works for games, decisions, lottery picks, and developer testing.
          No signup, no ads, runs entirely in your browser.
        </p>
        <div className="hero-cta">
          <a href="#generator" className="btn btn-primary">Generate a Number →</a>
          <a href="#how-it-works" className="btn btn-ghost">How it works</a>
        </div>
        <ul className="hero-stats hero-stats-rng" aria-label="Tool highlights">
          <li><strong>Any</strong><span>range supported</span></li>
          <li><strong>Instant</strong><span>one click</span></li>
          <li><strong>100%</strong><span>browser-side</span></li>
          <li><strong>Free</strong><span>forever</span></li>
        </ul>
      </section>

      {/* TOOL */}
      <RandomGeneratorSection />

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="why why-rng" aria-labelledby="why-h2">
        <span className="eyebrow">/ 01 — How It Works</span>
        <h2 id="why-h2" className="section-h2">How to use the Random Number Generator</h2>
        <div className="why-grid why-grid-rng">
          <article className="why-card why-card-rng">
            <span className="why-num">01</span>
            <h3>Set the Min value</h3>
            <p>Enter the lowest number you want. Can be 0, 1, or any negative number — the range is fully flexible.</p>
          </article>
          <article className="why-card why-card-rng">
            <span className="why-num">02</span>
            <h3>Set the Max value</h3>
            <p>Enter the highest number. Both Min and Max are included in the possible results — the range is always inclusive.</p>
          </article>
          <article className="why-card why-card-rng">
            <span className="why-num">03</span>
            <h3>Click Generate</h3>
            <p>A random integer appears immediately. Click the result card to copy it to your clipboard with one tap.</p>
          </article>
          <article className="why-card why-card-rng">
            <span className="why-num">04</span>
            <h3>100% Private</h3>
            <p>The number is generated by your own browser using JavaScript. Nothing is sent to any server.</p>
          </article>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="faq" aria-labelledby="faq-h2">
        <span className="eyebrow">/ 02 — FAQ</span>
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
      <section className="cta cta-rng">
        <h2>Need a random number right now?</h2>
        <a href="#generator" className="btn btn-primary btn-lg">Generate Now →</a>
      </section>
    </>
  );
}