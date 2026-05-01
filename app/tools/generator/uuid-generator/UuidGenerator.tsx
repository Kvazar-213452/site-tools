'use client';

import { useState, useCallback, useMemo } from 'react';
import Config from "@/lib/config";

import "@/style/home.css";
import "@/style/tools.css";
import "@/style/tools-extra.css";

/* ─── UUID v4 generator ─────────────────────────────────────────── */
function generateUUID(): string {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  arr[6] = (arr[6] & 0x0f) | 0x40; // version 4
  arr[8] = (arr[8] & 0x3f) | 0x80; // variant
  const hex = Array.from(arr).map((b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
}

/* ─── FAQ ───────────────────────────────────────────────────────── */
const FAQ = [
  { q: "What is a UUID?", a: "UUID (Universally Unique Identifier) is a 128-bit label used to uniquely identify information in computer systems. The standard form is 32 hexadecimal digits in 5 groups: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx." },
  { q: "What is UUID v4?", a: "UUID v4 is randomly generated. 122 of its 128 bits are random, making collisions practically impossible. It is the most widely used UUID version for generating unique IDs without a central registry." },
  { q: "Are generated UUIDs stored anywhere?", a: "No. UUIDs are generated locally using the Web Crypto API and are never sent to any server. They exist only in your browser." },
  { q: "Can two generated UUIDs be the same?", a: "Theoretically yes, but the probability is astronomically small. With 2^122 possible values, you'd need to generate billions of UUIDs per second for millions of years to expect a collision." },
  { q: "What is the difference between UUID and GUID?", a: "GUID (Globally Unique Identifier) is Microsoft's implementation of the UUID standard. They are functionally identical — the terms are used interchangeably." },
];

/* ─── JSON-LD ───────────────────────────────────────────────────── */
const websiteJsonLd    = { "@context": "https://schema.org", "@type": "WebSite", name: Config.SITE_NAME, url: Config.MAIN_DOMAIN_NO };
const softwareJsonLd   = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "UUID Generator", applicationCategory: "DeveloperApplication", description: "Free UUID v4 generator. Never stored, 100% browser-based.", url: `${Config.MAIN_DOMAIN_NO}/uuid-generator`, operatingSystem: "Web Browser", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
const faqJsonLd        = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: Config.MAIN_DOMAIN_NO }, { "@type": "ListItem", position: 2, name: "UUID Generator", item: `${Config.MAIN_DOMAIN_NO}/uuid-generator` }] };

/* ─── Highlight UUID parts ──────────────────────────────────────── */
function highlightUUID(uuid: string): string {
  const parts = uuid.split('-');
  const classes = ['pwd-upper', 'pwd-digit', 'pwd-digit', 'pwd-lower', 'pwd-symbol'];
  return parts.map((p, i) =>
    `<span class="${classes[i] ?? 'pwd-lower'}">${p}</span>`
  ).join('<span style="opacity:0.35">-</span>');
}

/* ─── Tool Section ───────────────────────────────────────────────── */
function UuidSection() {
  const [count,  setCount]  = useState(1);
  const [upper,  setUpper]  = useState(false);
  const [seed,   setSeed]   = useState(0);
  const [copied, setCopied] = useState(false);

  const uuids = useMemo(
    () => Array.from({ length: count }, () => {
      const u = generateUUID();
      return upper ? u.toUpperCase() : u;
    }),
    [count, upper, seed] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const handleCopy = useCallback((uuid: string) => {
    navigator.clipboard.writeText(uuid).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  const handleCopyAll = useCallback(() => {
    navigator.clipboard.writeText(uuids.join('\n')).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [uuids]);

  return (
    <section id="converter" className="converter-preview" aria-labelledby="converter-h2">
      <div className="converter-container">
        <h2 id="converter-h2" className="converter-h2">UUID Generator</h2>

        <div className="converter-box">
          {/* Controls */}
          <div className="generator-controls">
            {/* Count */}
            <div className="generator-field">
              <label className="converter-label" htmlFor="uuid-count">Count</label>
              <div className="generator-number-wrap">
                <button className="generator-step-btn" onClick={() => setCount((n) => Math.max(1, n - 1))}>−</button>
                <input
                  id="uuid-count"
                  type="number" min={1} max={100}
                  value={count}
                  onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
                  className="rng-input generator-number-input"
                />
                <button className="generator-step-btn" onClick={() => setCount((n) => Math.min(100, n + 1))}>+</button>
              </div>
            </div>

            {/* Version badge */}
            <div className="generator-field">
              <label className="converter-label">Version</label>
              <div className="converter-tabs" role="group" aria-label="UUID version">
                <button className="converter-tab active">v4 (random)</button>
              </div>
            </div>

            {/* Case */}
            <div className="generator-field">
              <label className="converter-label">Case</label>
              <div className="converter-tabs" role="group" aria-label="Case">
                <button
                  className={`converter-tab${!upper ? ' active' : ''}`}
                  onClick={() => setUpper(false)}
                >lowercase</button>
                <button
                  className={`converter-tab${upper ? ' active' : ''}`}
                  onClick={() => setUpper(true)}
                >UPPERCASE</button>
              </div>
            </div>

            <button className="rng-generate-btn" onClick={() => setSeed((s) => s + 1)}>
              ↺ Generate
            </button>
          </div>

          {/* Output */}
          <div className="converter-outputs" role="region" aria-live="polite">
            {uuids.map((uuid, i) => (
              <div key={i} className="converter-output converter-output-full pwd-output-row">
                <div className="output-header">
                  {count > 1 && <span className="output-label">#{i + 1}</span>}
                  <button
                    className="converter-copy-btn"
                    onClick={() => handleCopy(uuid)}
                    aria-label={`Copy UUID ${i + 1}`}
                  >
                    Copy
                  </button>
                </div>
                <pre className="output-pre output-pre-sm">
                  <code
                    className="output-code output-code-block pwd-code"
                    dangerouslySetInnerHTML={{ __html: highlightUUID(uuid) }}
                  />
                </pre>
              </div>
            ))}

            {count > 1 && (
              <button className="converter-copy-btn converter-copy-all-btn" onClick={handleCopyAll}>
                {copied ? '✓ Copied All!' : `Copy All ${count} UUIDs`}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function UuidGenerator() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="hero hero-uuid-generator" aria-labelledby="hero-h1">
        <div className="hero-meta">
          <span className="dot dot-live" /> Free UUID Generator · v4 Random · No Signup
        </div>
        <h1 id="hero-h1" className="hero-h1">
          Generate unique UUIDs
          <br />
          <em>instantly in your browser.</em>
        </h1>
        <p className="hero-sub">
          Create RFC 4122 v4 UUIDs in bulk using the Web Crypto API.
          Choose lowercase or uppercase, generate up to 100 at once.
          No signup, no ads, 100% private.
        </p>
        <div className="hero-cta">
          <a href="#converter" className="btn btn-primary">Generate UUID →</a>
          <a href="#why" className="btn btn-ghost">How it works</a>
        </div>
        <ul className="hero-stats" aria-label="Site statistics">
          <li><strong>v4</strong><span>RFC 4122</span></li>
          <li><strong>128</strong><span>bit random</span></li>
          <li><strong>100%</strong><span>browser-side</span></li>
          <li><strong>Free</strong><span>forever</span></li>
        </ul>
      </section>

      <UuidSection />

      <section id="why" className="why" aria-labelledby="why-h2">
        <span className="eyebrow">/ 01 — How It Works</span>
        <h2 id="why-h2" className="section-h2">Why use a UUID Generator?</h2>
        <div className="why-grid">
          <article className="why-card">
            <span className="why-num">01</span>
            <h3>For Developers</h3>
            <p>Generate unique identifiers for database records, sessions, file names, or any resource that needs a globally unique ID without a central registry.</p>
          </article>
          <article className="why-card">
            <span className="why-num">02</span>
            <h3>Cryptographically Random</h3>
            <p>Uses <code>crypto.getRandomValues()</code> — the same entropy source used by browsers for cryptographic operations. Not Math.random().</p>
          </article>
          <article className="why-card">
            <span className="why-num">03</span>
            <h3>Bulk Generation</h3>
            <p>Generate up to 100 UUIDs at once. Copy individually or copy all to clipboard with one click for seeding databases or test fixtures.</p>
          </article>
          <article className="why-card">
            <span className="why-num">04</span>
            <h3>100% Private</h3>
            <p>UUIDs are generated locally in your browser. Nothing is logged, stored, or transmitted. Works completely offline.</p>
          </article>
        </div>
      </section>

      <section className="why" aria-labelledby="reference-h2">
        <span className="eyebrow">/ 02 — Reference</span>
        <h2 id="reference-h2" className="section-h2">UUID format guide</h2>
        <div className="formats-container">
          <div className="format-group">
            <h3 className="format-group-title">Structure</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>8 hex digits</strong>
                <p>First segment. 32 bits of random data in the time_low field position (v4 ignores time fields).</p>
                <code>xxxxxxxx-…</code>
              </div>
              <div className="format-item">
                <strong>4 + 4 hex digits</strong>
                <p>Middle segments. The third group's first nibble is always <code>4</code>, indicating UUID version 4.</p>
                <code>…-xxxx-4xxx-…</code>
              </div>
              <div className="format-item">
                <strong>12 hex digits</strong>
                <p>Final segment. The first nibble is <code>8</code>, <code>9</code>, <code>a</code>, or <code>b</code> — the RFC 4122 variant bits.</p>
                <code>…-xxxxxxxxxxxx</code>
              </div>
            </div>
          </div>
          <div className="format-group">
            <h3 className="format-group-title">Common uses</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Database primary keys</strong>
                <p>UUID primary keys work across distributed systems without coordination, preventing ID collisions during merges.</p>
                <code>id UUID PRIMARY KEY DEFAULT gen_random_uuid()</code>
              </div>
              <div className="format-item">
                <strong>File & asset naming</strong>
                <p>Rename uploaded files to UUIDs to prevent collisions and avoid exposing sequential IDs to users.</p>
                <code>a3f2c1d0-….jpg</code>
              </div>
              <div className="format-item">
                <strong>Session & token IDs</strong>
                <p>Use UUIDs as opaque session tokens. Their randomness makes them hard to guess or enumerate.</p>
                <code>session_id = uuid_v4()</code>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <section className="cta">
        <h2>Generate unique UUIDs now.</h2>
        <a href="#converter" className="btn btn-primary btn-lg">Generate UUID →</a>
      </section>
    </>
  );
}