'use client';

import { useState, useCallback } from 'react';
import Config from "@/lib/config";

import "@/style/home.css";
import "@/style/tools.css";

const TOOL_URL  = `${Config.MAIN_DOMAIN_NO}/tools/generator/random-fact-generator`;
const TOOL_NAME = "Random Fact Generator";

const FAQ = [
  { q: "Where do the facts come from?",   a: "Facts are fetched live from the Random Useless Facts API (uselessfacts.jsph.pl). If that is unavailable, a secondary source (catfact.ninja) is tried automatically." },
  { q: "Are the facts accurate?",         a: "Facts come from curated, publicly maintained databases. While we cannot guarantee every fact, the sources are regularly reviewed for accuracy and quality." },
  { q: "Is any data sent to a server?",   a: "The only network requests made are to the public facts APIs to fetch a random fact. No personal data, inputs, or usage information is transmitted or stored by us." },
  { q: "How many facts are available?",   a: "The APIs combined provide thousands of unique facts. Click Generate as many times as you like — each result is fetched fresh." },
  { q: "What if the API is down?",        a: "Two independent APIs are tried in sequence. If both fail, a clear error is shown and you can try again. There is no hidden local fallback — all facts are always live." },
];

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: Config.SITE_NAME,
  url: Config.MAIN_DOMAIN_NO,
  potentialAction: {
    "@type": "SearchAction",
    target: `${Config.MAIN_DOMAIN_NO}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: TOOL_NAME,
  url: TOOL_URL,
  applicationCategory: "UtilityApplication",
  description: "Free random fact generator. Get surprising, verified facts instantly from live public APIs. No signup, 100% free.",
  operatingSystem: "Any — Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  author: {
    "@type": "Organization",
    name: Config.SITE_NAME,
    url: Config.MAIN_DOMAIN_NO,
  },
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
    { "@type": "ListItem", position: 1, name: "Home",  item: Config.MAIN_DOMAIN_NO },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${Config.MAIN_DOMAIN_NO}/tools` },
    { "@type": "ListItem", position: 3, name: TOOL_NAME, item: TOOL_URL },
  ],
};

// ── API sources (tried in order) ────────────────────────────────────────────
type FactResult = { fact: string; source: string };

async function fetchFromUselessFacts(): Promise<FactResult> {
  const res = await fetch(
    "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en",
    { headers: { Accept: "application/json" }, cache: "no-store" }
  );
  if (!res.ok) throw new Error(`uselessfacts status ${res.status}`);
  const data = await res.json();
  if (!data?.fact) throw new Error("uselessfacts: no fact in response");
  return { fact: data.fact as string, source: "uselessfacts.jsph.pl" };
}

async function fetchFromCatFacts(): Promise<FactResult> {
  const res = await fetch(
    "https://catfact.ninja/fact",
    { headers: { Accept: "application/json" }, cache: "no-store" }
  );
  if (!res.ok) throw new Error(`catfact status ${res.status}`);
  const data = await res.json();
  if (!data?.fact) throw new Error("catfact: no fact in response");
  return { fact: `Cat fact: ${data.fact as string}`, source: "catfact.ninja" };
}

async function fetchFact(): Promise<FactResult> {
  try {
    return await fetchFromUselessFacts();
  } catch (e1) {
    console.warn("Primary API failed, trying secondary:", e1);
    try {
      return await fetchFromCatFacts();
    } catch (e2) {
      console.warn("Secondary API also failed:", e2);
      throw new Error("All fact sources are currently unavailable. Please try again in a moment.");
    }
  }
}

// ── Tool section ─────────────────────────────────────────────────────────────
function RandomFactSection() {
  const [fact, setFact]       = useState<string | null>(null);
  const [source, setSource]   = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied]   = useState(false);
  const [errMsg, setErrMsg]   = useState<string | null>(null);
  const [count, setCount]     = useState(0);

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    setCopied(false);
    setErrMsg(null);

    try {
      const result = await fetchFact();
      setFact(result.fact);
      setSource(result.source);
      setCount((c) => c + 1);
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : "Unknown error");
      setFact(null);
      setSource(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const copyToClipboard = () => {
    if (!fact) return;
    navigator.clipboard.writeText(fact).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="generator" className="converter-preview" aria-labelledby="generator-h2">
      <div className="converter-container">
        <h2 id="generator-h2" className="converter-h2">{TOOL_NAME}</h2>

        <div className="converter-box">
          {/* Controls */}
          <div className="rng-controls">
            <button
              className={`rng-generate-btn${loading ? " rolling" : ""}`}
              onClick={handleGenerate}
              disabled={loading}
              aria-label="Generate a random fact"
            >
              {loading ? "⟳ Fetching…" : count === 0 ? "✦ Generate a Fact" : "✦ Another Fact"}
            </button>
          </div>

          {/* Error state */}
          {errMsg && (
            <div className="converter-empty-state" role="alert" aria-live="assertive">
              <p>⚠ {errMsg}</p>
            </div>
          )}

          {/* Result */}
          {fact && !errMsg && (
            <div
              className="converter-outputs"
              role="region"
              aria-live="polite"
              aria-label="Random fact result"
            >
              <div
                className={`converter-output rng-result-card${copied ? " copied" : ""}`}
                onClick={copyToClipboard}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") copyToClipboard(); }}
                aria-label="Click to copy this fact"
                title="Click to copy"
              >
                <span className="output-label">
                  Did you know?
                  {count > 0 && (
                    <span style={{ marginLeft: 8, color: "var(--ink-3)", fontWeight: 400 }}>
                      #{count}
                    </span>
                  )}
                </span>

                <code
                  className="output-code rng-result-number"
                  style={{
                    fontSize: "clamp(14px, 2vw, 20px)",
                    lineHeight: 1.55,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {fact}
                </code>

                <span className="output-desc">
                  Via {source} · click to copy
                </span>

                {copied && <span className="output-feedback">✓ Copied!</span>}
              </div>
            </div>
          )}

          {/* Empty state */}
          {!fact && !errMsg && (
            <div className="converter-empty-state">
              <p>Click <strong>Generate a Fact</strong> to discover something surprising</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function RandomFactGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* HERO */}
      <section className="hero" aria-labelledby="hero-h1">
        <div className="hero-meta">
          <span className="dot dot-live" /> Live API · Free · No Signup
        </div>
        <h1 id="hero-h1" className="hero-h1">
          Random Fact Generator
          <br />
          <em>learn something new.</em>
        </h1>
        <p className="hero-sub">
          Click Generate and discover a surprising, verified fact fetched live from a public API.
          Science, history, animals, and more — no signup, no ads, works in your browser.
        </p>
        <div className="hero-cta">
          <a href="#generator" className="btn btn-primary">Generate a Fact →</a>
          <a href="#how-it-works" className="btn btn-ghost">How it works</a>
        </div>
        <ul className="hero-stats" aria-label="Tool highlights">
          <li><strong>Live</strong><span>API data</span></li>
          <li><strong>1000s</strong><span>of facts</span></li>
          <li><strong>2</strong><span>API sources</span></li>
          <li><strong>Free</strong><span>forever</span></li>
        </ul>
      </section>

      {/* TOOL */}
      <RandomFactSection />

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="why" aria-labelledby="why-h2">
        <span className="eyebrow">/ 01 — How It Works</span>
        <h2 id="why-h2" className="section-h2">One click. One live fact.</h2>
        <div className="why-grid">
          <article className="why-card">
            <span className="why-num">01</span>
            <h3>Click Generate</h3>
            <p>A live request is sent to the Random Useless Facts API — a public, maintained database of thousands of verified facts.</p>
          </article>
          <article className="why-card">
            <span className="why-num">02</span>
            <h3>Automatic Fallback</h3>
            <p>If the primary API is unavailable, a secondary source (catfact.ninja) is tried automatically. Two APIs, one result.</p>
          </article>
          <article className="why-card">
            <span className="why-num">03</span>
            <h3>Copy & Share</h3>
            <p>Click the fact card to copy it to your clipboard instantly. Share it, save it, or paste it anywhere.</p>
          </article>
          <article className="why-card">
            <span className="why-num">04</span>
            <h3>All Facts Are Live</h3>
            <p>Every fact comes from a real API call — no hidden local database. The source URL is shown under each fact.</p>
          </article>
        </div>
      </section>

      {/* TOPICS */}
      <section className="why" aria-labelledby="topics-h2">
        <span className="eyebrow">/ 02 — Topics</span>
        <h2 id="topics-h2" className="section-h2">What kinds of facts will you find?</h2>
        <div className="formats-container">
          <div className="format-group">
            <h3 className="format-group-title">Science & Nature</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Physics & Chemistry</strong>
                <p>Surprising facts about the laws of nature, materials, reactions, and the physical world.</p>
                <code>Lightning is 5x hotter than the Sun's surface</code>
              </div>
              <div className="format-item">
                <strong>Biology & Animals</strong>
                <p>Incredible facts about animal behavior, anatomy, evolution, and the diversity of life.</p>
                <code>Octopuses have 3 hearts and 9 brains</code>
              </div>
            </div>
          </div>

          <div className="format-group">
            <h3 className="format-group-title">History & Culture</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Historical Events</strong>
                <p>Facts that put history into perspective — timelines, comparisons, and counterintuitive discoveries.</p>
                <code>The shortest war in history lasted 38 minutes</code>
              </div>
              <div className="format-item">
                <strong>Language & Words</strong>
                <p>Origins of words, phrases, and curious linguistic facts from around the world.</p>
                <code>The word "maverick" came from a real Texan named Maverick</code>
              </div>
            </div>
          </div>

          <div className="format-group">
            <h3 className="format-group-title">Space & Geography</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Space & Astronomy</strong>
                <p>Mind-bending facts about planets, stars, distances, and the scale of the universe.</p>
                <code>A day on Venus is longer than a year on Venus</code>
              </div>
              <div className="format-item">
                <strong>Earth & Geography</strong>
                <p>Surprising facts about countries, cities, oceans, and the geography of our planet.</p>
                <code>Cleopatra lived closer in time to the Moon landing than to the pyramids</code>
              </div>
            </div>
          </div>
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
        <h2>Ready to learn something surprising?</h2>
        <a href="#generator" className="btn btn-primary btn-lg">Generate a Fact Now →</a>
      </section>
    </>
  );
}