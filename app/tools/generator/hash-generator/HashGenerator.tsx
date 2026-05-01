'use client';

import { useState, useCallback, useEffect } from 'react';
import Config from "@/lib/config";

import "@/style/home.css";
import "@/style/tools.css";
import "@/style/tools-extra.css";

/* ─── Hash algorithms ───────────────────────────────────────────── */
type Algorithm = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

const ALGORITHMS: { id: Algorithm; label: string; bits: number }[] = [
  { id: 'SHA-1',   label: 'SHA-1',   bits: 160 },
  { id: 'SHA-256', label: 'SHA-256', bits: 256 },
  { id: 'SHA-384', label: 'SHA-384', bits: 384 },
  { id: 'SHA-512', label: 'SHA-512', bits: 512 },
];

async function computeHash(text: string, algo: Algorithm): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algo, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/* ─── FAQ ───────────────────────────────────────────────────────── */
const FAQ = [
  { q: "What is a hash function?", a: "A hash function takes input data of any size and produces a fixed-length string. The same input always produces the same output, but even a tiny change in input produces a completely different hash." },
  { q: "Is hashing the same as encryption?", a: "No. Hashing is one-way — you cannot recover the original text from a hash. Encryption is two-way and requires a key to decrypt. Hashes are used for integrity verification, not secrecy." },
  { q: "Which algorithm should I use?", a: "Use SHA-256 or SHA-512 for security purposes. SHA-1 is considered weak against collision attacks and should be avoided for security. MD5 is broken for security use but still common for checksums." },
  { q: "Is the input text sent to a server?", a: "No. Hashing is performed entirely in your browser using the Web Crypto API (crypto.subtle). Your text never leaves your device." },
  { q: "Why does the same text always produce the same hash?", a: "Hash functions are deterministic. This property is what makes them useful for verifying integrity — if two hashes match, the inputs were identical." },
];

/* ─── JSON-LD ───────────────────────────────────────────────────── */
const websiteJsonLd    = { "@context": "https://schema.org", "@type": "WebSite", name: Config.SITE_NAME, url: Config.MAIN_DOMAIN_NO };
const softwareJsonLd   = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Hash Generator", applicationCategory: "DeveloperApplication", description: "Free SHA-1, SHA-256, SHA-384, SHA-512 hash generator. 100% browser-based.", url: `${Config.MAIN_DOMAIN_NO}/hash-generator`, operatingSystem: "Web Browser", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
const faqJsonLd        = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: Config.MAIN_DOMAIN_NO }, { "@type": "ListItem", position: 2, name: "Hash Generator", item: `${Config.MAIN_DOMAIN_NO}/hash-generator` }] };

/* ─── Tool Section ───────────────────────────────────────────────── */
function HashSection() {
  const [input,   setInput]   = useState('');
  const [algo,    setAlgo]    = useState<Algorithm>('SHA-256');
  const [hashes,  setHashes]  = useState<Record<Algorithm, string>>({ 'SHA-1': '', 'SHA-256': '', 'SHA-384': '', 'SHA-512': '' });
  const [upper,   setUpper]   = useState(false);
  const [copied,  setCopied]  = useState<string | null>(null);
  const [allMode, setAllMode] = useState(false);

  // Recompute all hashes whenever input changes
  useEffect(() => {
    if (!input) {
      setHashes({ 'SHA-1': '', 'SHA-256': '', 'SHA-384': '', 'SHA-512': '' });
      return;
    }
    (async () => {
      const results = await Promise.all(
        ALGORITHMS.map(async (a) => [a.id, await computeHash(input, a.id)] as const)
      );
      setHashes(Object.fromEntries(results) as Record<Algorithm, string>);
    })();
  }, [input]);

  const fmt = (h: string) => upper ? h.toUpperCase() : h;

  const handleCopy = useCallback((text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  }, []);

  const displayedAlgos = allMode ? ALGORITHMS : ALGORITHMS.filter((a) => a.id === algo);

  return (
    <section id="converter" className="converter-preview" aria-labelledby="converter-h2">
      <div className="converter-container">
        <h2 id="converter-h2" className="converter-h2">Hash Generator</h2>

        <div className="converter-box">
          {/* Input */}
          <div className="converter-input-wrapper">
            <label className="converter-label" htmlFor="hash-input">Input text</label>
            <textarea
              id="hash-input"
              className="converter-input"
              placeholder="Type or paste text to hash…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={5}
              spellCheck={false}
            />
          </div>

          {/* Controls */}
          <div className="generator-controls">
            {/* Algorithm */}
            <div className="generator-field">
              <label className="converter-label">Algorithm</label>
              <div className="converter-tabs" role="group" aria-label="Algorithm">
                {ALGORITHMS.map((a) => (
                  <button
                    key={a.id}
                    className={`converter-tab${!allMode && algo === a.id ? ' active' : ''}`}
                    onClick={() => { setAlgo(a.id); setAllMode(false); }}
                  >
                    {a.label}
                  </button>
                ))}
                <button
                  className={`converter-tab${allMode ? ' active' : ''}`}
                  onClick={() => setAllMode(true)}
                >
                  All
                </button>
              </div>
            </div>

            {/* Case */}
            <div className="generator-field">
              <label className="converter-label">Output case</label>
              <div className="converter-tabs" role="group" aria-label="Case">
                <button className={`converter-tab${!upper ? ' active' : ''}`} onClick={() => setUpper(false)}>lowercase</button>
                <button className={`converter-tab${upper ? ' active' : ''}`}  onClick={() => setUpper(true)}>UPPERCASE</button>
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="converter-outputs" role="region" aria-live="polite">
            {input === '' && (
              <p className="hash-empty-state">Enter text above to compute hashes.</p>
            )}

            {input !== '' && displayedAlgos.map((a) => {
              const hash = fmt(hashes[a.id]);
              return (
                <div key={a.id} className="converter-output converter-output-full pwd-output-row">
                  <div className="output-header">
                    <span className="output-label">{a.label} — {a.bits} bits</span>
                    <button
                      className="converter-copy-btn"
                      onClick={() => handleCopy(hash, a.id)}
                      aria-label={`Copy ${a.label} hash`}
                    >
                      {copied === a.id ? '✓ Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="output-pre output-pre-sm">
                    <code className="output-code output-code-block hash-code">
                      {hash || '—'}
                    </code>
                  </pre>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function HashGenerator() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="hero hero-hash-generator" aria-labelledby="hero-h1">
        <div className="hero-meta">
          <span className="dot dot-live" /> Free Hash Generator · SHA-256, SHA-512, SHA-1 · No Signup
        </div>
        <h1 id="hero-h1" className="hero-h1">
          Compute cryptographic hashes
          <br />
          <em>instantly in your browser.</em>
        </h1>
        <p className="hero-sub">
          Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes from any text using
          the Web Crypto API. Input is never stored or sent anywhere.
          No signup, no ads, 100% private.
        </p>
        <div className="hero-cta">
          <a href="#converter" className="btn btn-primary">Generate Hash →</a>
          <a href="#why" className="btn btn-ghost">How it works</a>
        </div>
        <ul className="hero-stats" aria-label="Site statistics">
          <li><strong>4</strong><span>algorithms</span></li>
          <li><strong>512</strong><span>bit max</span></li>
          <li><strong>100%</strong><span>browser-side</span></li>
          <li><strong>Free</strong><span>forever</span></li>
        </ul>
      </section>

      <HashSection />

      <section id="why" className="why" aria-labelledby="why-h2">
        <span className="eyebrow">/ 01 — How It Works</span>
        <h2 id="why-h2" className="section-h2">Why use a Hash Generator?</h2>
        <div className="why-grid">
          <article className="why-card">
            <span className="why-num">01</span>
            <h3>Verify File Integrity</h3>
            <p>Compare a file's hash against a published checksum to confirm it hasn't been tampered with or corrupted during download.</p>
          </article>
          <article className="why-card">
            <span className="why-num">02</span>
            <h3>Web Crypto API</h3>
            <p>Uses <code>crypto.subtle.digest()</code> — the browser's native cryptographic engine. No third-party libraries, no dependencies.</p>
          </article>
          <article className="why-card">
            <span className="why-num">03</span>
            <h3>All Major Algorithms</h3>
            <p>SHA-1, SHA-256, SHA-384, and SHA-512 in one place. Switch algorithms instantly or view all four hashes simultaneously.</p>
          </article>
          <article className="why-card">
            <span className="why-num">04</span>
            <h3>100% Private</h3>
            <p>Your input text never leaves your browser. Nothing is logged, stored, or transmitted. Works completely offline.</p>
          </article>
        </div>
      </section>

      <section className="why" aria-labelledby="reference-h2">
        <span className="eyebrow">/ 02 — Reference</span>
        <h2 id="reference-h2" className="section-h2">Algorithm comparison</h2>
        <div className="formats-container">
          <div className="format-group">
            <h3 className="format-group-title">Security</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>SHA-1 — 160 bits</strong>
                <p>Deprecated for security use. Collision attacks are practical. Still used for Git commits and legacy checksums.</p>
                <code>Avoid for new security applications</code>
              </div>
              <div className="format-item">
                <strong>SHA-256 — 256 bits</strong>
                <p>The current standard for most security applications including TLS certificates, code signing, and blockchain.</p>
                <code>Recommended for general use</code>
              </div>
              <div className="format-item">
                <strong>SHA-512 — 512 bits</strong>
                <p>Highest security margin. Faster than SHA-256 on 64-bit hardware. Use for password hashing and high-security applications.</p>
                <code>Best for high-security use cases</code>
              </div>
            </div>
          </div>
          <div className="format-group">
            <h3 className="format-group-title">Output length</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>SHA-1</strong>
                <p>Produces a 40 character hex string representing 160 bits of output.</p>
                <code>40 hex chars</code>
              </div>
              <div className="format-item">
                <strong>SHA-256</strong>
                <p>Produces a 64 character hex string representing 256 bits of output.</p>
                <code>64 hex chars</code>
              </div>
              <div className="format-item">
                <strong>SHA-512</strong>
                <p>Produces a 128 character hex string representing 512 bits of output.</p>
                <code>128 hex chars</code>
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
        <h2>Compute your hash now.</h2>
        <a href="#converter" className="btn btn-primary btn-lg">Generate Hash →</a>
      </section>
    </>
  );
}