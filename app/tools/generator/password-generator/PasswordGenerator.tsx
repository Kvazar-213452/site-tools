'use client';

import { useState, useCallback, useMemo } from 'react';
import Config from "@/lib/config";

import "@/style/home.css";
import "@/style/tools.css";
import "@/style/tools-extra.css";

/* ─── Charset constants ─────────────────────────────────────────── */
const CHARS = {
  upper:   'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower:   'abcdefghijklmnopqrstuvwxyz',
  digits:  '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  similar: 'iIlL1oO0',
};

interface Options {
  length:       number;
  upper:        boolean;
  lower:        boolean;
  digits:       boolean;
  symbols:      boolean;
  noSimilar:    boolean;
  noDuplicate:  boolean;
}

function generatePassword(opts: Options): string {
  let pool = '';
  if (opts.upper)   pool += CHARS.upper;
  if (opts.lower)   pool += CHARS.lower;
  if (opts.digits)  pool += CHARS.digits;
  if (opts.symbols) pool += CHARS.symbols;
  if (!pool) pool = CHARS.lower;
  if (opts.noSimilar) pool = pool.split('').filter(c => !CHARS.similar.includes(c)).join('');

  const arr = new Uint32Array(opts.length * 2);
  crypto.getRandomValues(arr);

  const result: string[] = [];
  const used = new Set<string>();
  let i = 0;

  while (result.length < opts.length && i < arr.length) {
    const char = pool[arr[i] % pool.length];
    i++;
    if (opts.noDuplicate && used.has(char)) continue;
    used.add(char);
    result.push(char);
  }

  // If noDuplicate exhausted the pool, just fill without that constraint
  while (result.length < opts.length) {
    const extra = new Uint32Array(1);
    crypto.getRandomValues(extra);
    result.push(pool[extra[0] % pool.length]);
  }

  return result.join('');
}

function strengthScore(pwd: string): { score: number; label: string; color: string } {
  let s = 0;
  if (pwd.length >= 8)  s++;
  if (pwd.length >= 12) s++;
  if (pwd.length >= 16) s++;
  if (/[A-Z]/.test(pwd)) s++;
  if (/[a-z]/.test(pwd)) s++;
  if (/[0-9]/.test(pwd)) s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;

  if (s <= 2) return { score: s, label: 'Weak',   color: '#e53e3e' };
  if (s <= 4) return { score: s, label: 'Fair',   color: '#d69e2e' };
  if (s <= 5) return { score: s, label: 'Good',   color: '#38a169' };
  return             { score: s, label: 'Strong', color: 'var(--accent)' };
}

/* ─── FAQ ───────────────────────────────────────────────────────── */
const FAQ = [
  { q: "Are generated passwords stored anywhere?", a: "No. Passwords are generated locally using the Web Crypto API and are never sent to any server. They exist only in your browser." },
  { q: "How random are the passwords?", a: "Passwords use crypto.getRandomValues() — the cryptographically secure random number generator built into every modern browser. It is suitable for security-sensitive use." },
  { q: "What password length should I use?", a: "For most accounts, 16 characters is a good minimum. For high-security accounts like email or banking, use 20 or more characters." },
  { q: "Should I include symbols?", a: "Yes, when the site allows it. Symbols greatly increase entropy. If a site rejects certain symbols, disable them and regenerate." },
  { q: "What is the 'No Similar' option?", a: "It removes visually ambiguous characters like i, I, l, L, 1, o, O, and 0 that can be confused when reading a password aloud or typing it manually." },
];

/* ─── JSON-LD ───────────────────────────────────────────────────── */
const websiteJsonLd    = { "@context": "https://schema.org", "@type": "WebSite", name: Config.SITE_NAME, url: Config.MAIN_DOMAIN_NO };
const softwareJsonLd   = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Password Generator", applicationCategory: "SecurityApplication", description: "Free secure password generator. Never stored, 100% browser-based.", url: `${Config.MAIN_DOMAIN_NO}/password-generator`, operatingSystem: "Web Browser", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
const faqJsonLd        = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: Config.MAIN_DOMAIN_NO }, { "@type": "ListItem", position: 2, name: "Password Generator", item: `${Config.MAIN_DOMAIN_NO}/password-generator` }] };

/* ─── Highlight password chars ──────────────────────────────────── */
function highlightPassword(pwd: string): string {
  return pwd.split('').map((c) => {
    if (/[A-Z]/.test(c)) return `<span class="pwd-upper">${c}</span>`;
    if (/[a-z]/.test(c)) return `<span class="pwd-lower">${c}</span>`;
    if (/[0-9]/.test(c)) return `<span class="pwd-digit">${c}</span>`;
    return `<span class="pwd-symbol">${c.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</span>`;
  }).join('');
}

/* ─── Tool Section ───────────────────────────────────────────────── */
function PasswordSection() {
  const [opts, setOpts] = useState<Options>({
    length: 16, upper: true, lower: true, digits: true,
    symbols: true, noSimilar: false, noDuplicate: false,
  });
  const [seed,    setSeed]    = useState(0);
  const [copied,  setCopied]  = useState(false);
  const [count,   setCount]   = useState(1);

  const passwords = useMemo(
    () => Array.from({ length: count }, () => generatePassword(opts)),
    [opts, seed, count] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const toggle = (key: keyof Options) =>
    setOpts((o) => ({ ...o, [key]: !o[key] }));

  const handleCopy = useCallback((pwd: string) => {
    navigator.clipboard.writeText(pwd).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  const handleCopyAll = useCallback(() => {
    navigator.clipboard.writeText(passwords.join('\n')).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [passwords]);

  const strength = strengthScore(passwords[0] ?? '');

  return (
    <section id="converter" className="converter-preview" aria-labelledby="converter-h2">
      <div className="converter-container">
        <h2 id="converter-h2" className="converter-h2">Password Generator</h2>

        <div className="converter-box">
          {/* Length */}
          <div className="generator-controls">
            <div className="generator-field generator-field-wide">
              <label className="converter-label" htmlFor="pwd-length">
                Length: <strong>{opts.length}</strong>
              </label>
              <input
                id="pwd-length"
                type="range"
                min={4} max={128}
                value={opts.length}
                onChange={(e) => setOpts((o) => ({ ...o, length: Number(e.target.value) }))}
                className="generator-slider"
              />
              <div className="generator-slider-marks">
                {[4, 8, 12, 16, 24, 32, 64, 128].map((v) => (
                  <span key={v} onClick={() => setOpts((o) => ({ ...o, length: v }))}>{v}</span>
                ))}
              </div>
            </div>

            {/* Count */}
            <div className="generator-field">
              <label className="converter-label" htmlFor="pwd-count">Count</label>
              <div className="generator-number-wrap">
                <button className="generator-step-btn" onClick={() => setCount((n) => Math.max(1, n - 1))}>−</button>
                <input
                  id="pwd-count"
                  type="number" min={1} max={20}
                  value={count}
                  onChange={(e) => setCount(Math.max(1, Math.min(20, Number(e.target.value))))}
                  className="rng-input generator-number-input"
                />
                <button className="generator-step-btn" onClick={() => setCount((n) => Math.min(20, n + 1))}>+</button>
              </div>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="generator-checkboxes">
            {([
              ['upper',       'A–Z Uppercase'],
              ['lower',       'a–z Lowercase'],
              ['digits',      '0–9 Digits'],
              ['symbols',     '!@# Symbols'],
              ['noSimilar',   'No Similar  (i, l, 1, O, 0)'],
              ['noDuplicate', 'No Duplicate chars'],
            ] as [keyof Options, string][]).map(([key, label]) => (
              <label key={key} className="generator-checkbox-label">
                <input
                  type="checkbox"
                  checked={opts[key] as boolean}
                  onChange={() => toggle(key)}
                  className="generator-checkbox"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>

          {/* Generate */}
          <button className="rng-generate-btn" onClick={() => setSeed((s) => s + 1)}>
            ↺ Generate
          </button>

          {/* Output */}
          <div className="converter-outputs" role="region" aria-live="polite">
            {/* Strength bar (based on first password) */}
            <div className="pwd-strength-bar-wrap">
              <div
                className="pwd-strength-bar"
                style={{ width: `${(strength.score / 7) * 100}%`, background: strength.color }}
              />
            </div>
            <div className="pwd-strength-label" style={{ color: strength.color }}>
              Strength: <strong>{strength.label}</strong>
            </div>

            {passwords.map((pwd, i) => (
              <div key={i} className="converter-output converter-output-full pwd-output-row">
                <div className="output-header">
                  {count > 1 && <span className="output-label">#{i + 1}</span>}
                  <button
                    className="converter-copy-btn"
                    onClick={() => handleCopy(pwd)}
                    aria-label={`Copy password ${i + 1}`}
                  >
                    Copy
                  </button>
                </div>
                <pre className="output-pre output-pre-sm">
                  <code
                    className="output-code output-code-block pwd-code"
                    dangerouslySetInnerHTML={{ __html: highlightPassword(pwd) }}
                  />
                </pre>
              </div>
            ))}

            {count > 1 && (
              <button className="converter-copy-btn converter-copy-all-btn" onClick={handleCopyAll}>
                {copied ? '✓ Copied All!' : `Copy All ${count} Passwords`}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function PasswordGenerator() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="hero hero-password-generator" aria-labelledby="hero-h1">
        <div className="hero-meta">
          <span className="dot dot-live" /> Free Password Generator · Cryptographically Secure · No Signup
        </div>
        <h1 id="hero-h1" className="hero-h1">
          Generate strong, secure passwords
          <br />
          <em>instantly in your browser.</em>
        </h1>
        <p className="hero-sub">
          Create random passwords with custom length, character sets, and strength options.
          Uses the Web Crypto API — passwords are never stored or sent anywhere.
          No signup, no ads, 100% private.
        </p>
        <div className="hero-cta">
          <a href="#converter" className="btn btn-primary">Generate Password →</a>
          <a href="#why" className="btn btn-ghost">How it works</a>
        </div>
        <ul className="hero-stats" aria-label="Site statistics">
          <li><strong>128</strong><span>max chars</span></li>
          <li><strong>Crypto</strong><span>random</span></li>
          <li><strong>100%</strong><span>browser-side</span></li>
          <li><strong>Free</strong><span>forever</span></li>
        </ul>
      </section>

      <PasswordSection />

      <section id="why" className="why" aria-labelledby="why-h2">
        <span className="eyebrow">/ 01 — How It Works</span>
        <h2 id="why-h2" className="section-h2">Why use a Password Generator?</h2>
        <div className="why-grid">
          <article className="why-card">
            <span className="why-num">01</span>
            <h3>For Everyone</h3>
            <p>Stop reusing weak passwords. Generate a unique strong password for every site and store them in a password manager.</p>
          </article>
          <article className="why-card">
            <span className="why-num">02</span>
            <h3>Cryptographically Secure</h3>
            <p>Uses <code>crypto.getRandomValues()</code> — the same entropy source used by security professionals and browser cryptography.</p>
          </article>
          <article className="why-card">
            <span className="why-num">03</span>
            <h3>Fully Customizable</h3>
            <p>Control length, character sets, exclude ambiguous characters, and generate up to 20 passwords at once.</p>
          </article>
          <article className="why-card">
            <span className="why-num">04</span>
            <h3>100% Private</h3>
            <p>Your passwords never leave your browser. Nothing is logged, stored, or transmitted. Works completely offline.</p>
          </article>
        </div>
      </section>

      <section className="why" aria-labelledby="reference-h2">
        <span className="eyebrow">/ 02 — Reference</span>
        <h2 id="reference-h2" className="section-h2">Password strength guide</h2>
        <div className="formats-container">
          <div className="format-group">
            <h3 className="format-group-title">Length Guidelines</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>8 characters</strong>
                <p>Minimum acceptable length for low-risk accounts. Can be brute-forced in hours with modern hardware.</p>
                <code>Weak — avoid for important accounts</code>
              </div>
              <div className="format-item">
                <strong>16 characters</strong>
                <p>Good default for most accounts. With mixed character sets this provides very high security for everyday use.</p>
                <code>Recommended minimum</code>
              </div>
              <div className="format-item">
                <strong>32+ characters</strong>
                <p>Use for master passwords, API keys, and high-value accounts. Practically unbreakable with current technology.</p>
                <code>Ideal for password managers & SSH</code>
              </div>
            </div>
          </div>
          <div className="format-group">
            <h3 className="format-group-title">Character Sets</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Uppercase + Lowercase</strong>
                <p>Using both cases doubles the character pool from 26 to 52 and significantly increases brute-force resistance.</p>
                <code>Pool size: 52 chars</code>
              </div>
              <div className="format-item">
                <strong>+ Digits</strong>
                <p>Adding numbers expands the pool to 62 characters. Almost universally supported by all services.</p>
                <code>Pool size: 62 chars</code>
              </div>
              <div className="format-item">
                <strong>+ Symbols</strong>
                <p>Symbols expand the pool to ~90 characters and exponentially increase the number of possible combinations.</p>
                <code>Pool size: ~90 chars</code>
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
        <h2>Generate a strong password now.</h2>
        <a href="#converter" className="btn btn-primary btn-lg">Generate Password →</a>
      </section>
    </>
  );
}