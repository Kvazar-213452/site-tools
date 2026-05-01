'use client';

import { useState, useCallback, useMemo } from 'react';
import Config from "@/lib/config";

import "@/style/home.css";
import "@/style/tools.css";
import "@/style/tools-extra.css";

const FAQ = [
  { q: "What is URL encoding?",                   a: "URL encoding (percent-encoding) converts characters that are not allowed in a URL into a format that can be transmitted. For example, spaces become %20 and & becomes %26." },
  { q: "What is the difference between the two modes?", a: "encodeURIComponent encodes all special characters including /, ?, &, and =. encodeURI preserves full URL structure and only encodes characters that are truly invalid in a URL." },
  { q: "Is my data sent to a server?",             a: "No. All encoding and decoding runs locally in your browser using built-in JavaScript functions. Your data never leaves your device." },
  { q: "When should I use URL encoding?",          a: "Use URL encoding when passing user input as query string parameters, building API requests, or embedding URLs inside other URLs to prevent parsing issues." },
  { q: "Can I decode multiple parameters at once?", a: "Yes. Paste the full query string or URL and the tool will decode the entire string at once, including all encoded characters." },
];

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: Config.SITE_NAME,
  url: Config.MAIN_DOMAIN_NO,
};

const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "URL Encoder & Decoder",
  applicationCategory: "DeveloperApplication",
  description: "Free online URL encoder and decoder. Encode or decode URLs and query strings instantly. No signup, 100% browser-based.",
  url: `${Config.MAIN_DOMAIN_NO}/tools/url-encoder`,
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
    { "@type": "ListItem", position: 1, name: "Home",        item: Config.MAIN_DOMAIN_NO },
    { "@type": "ListItem", position: 2, name: "URL Encoder", item: `${Config.MAIN_DOMAIN_NO}/url-encoder` },
  ],
};

type Mode         = 'encode' | 'decode';
type EncodeMethod = 'component' | 'full';

interface UrlResult {
  output: string;
  error:  string | null;
}

function processUrl(input: string, mode: Mode, method: EncodeMethod): UrlResult {
  if (!input.trim()) return { output: '', error: null };
  try {
    const output =
      mode === 'encode'
        ? method === 'component' ? encodeURIComponent(input) : encodeURI(input)
        : method === 'component' ? decodeURIComponent(input) : decodeURI(input);
    return { output, error: null };
  } catch (e: any) {
    return { output: '', error: e.message };
  }
}

/* ─── URL Syntax Highlighter ─────────────────────────────────────
   For ENCODED output  → highlights %XX sequences in accent color.
   For DECODED output  → highlights protocol, host, params.
──────────────────────────────────────────────────────────────────── */
function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function highlightEncoded(str: string): string {
  // Wrap every %XX (or %uXXXX) sequence with the accent span
  return esc(str).replace(
    /(%[0-9A-Fa-f]{2}|%u[0-9A-Fa-f]{4})/g,
    (m) => `<span class="url-encoded">${m}</span>`
  );
}

function highlightDecoded(str: string): string {
  // Try to parse as a full URL; fall back to plain escaped text
  try {
    const url = new URL(str);

    const proto  = esc(url.protocol + '//');
    const host   = esc(url.hostname + (url.port ? ':' + url.port : ''));
    const path   = esc(url.pathname);

    let queryHtml = '';
    if (url.search) {
      // Colour each key=value pair
      const parts = url.search.slice(1).split('&');
      queryHtml =
        '<span class="url-param-sep">?</span>' +
        parts
          .map((part, i) => {
            const [k, ...rest] = part.split('=');
            const v = rest.join('=');
            return (
              (i > 0 ? '<span class="url-param-sep">&amp;</span>' : '') +
              `<span class="url-param-key">${esc(k)}</span>` +
              (v !== undefined ? `<span class="url-param-sep">=</span><span class="url-param-value">${esc(v)}</span>` : '')
            );
          })
          .join('');
    }

    const fragment = url.hash ? `<span class="url-param-sep">${esc(url.hash)}</span>` : '';

    return (
      `<span class="url-protocol">${proto}</span>` +
      `<span class="url-host">${host}</span>` +
      `<span class="url-plain">${path}</span>` +
      queryHtml +
      fragment
    );
  } catch {
    // Not a full URL — just escape and return plain
    return `<span class="url-plain">${esc(str)}</span>`;
  }
}

function UrlEncoderSection() {
  const [input, setInput]   = useState('https://example.com/search?q=hello world&lang=en&filter=café');
  const [mode, setMode]     = useState<Mode>('encode');
  const [method, setMethod] = useState<EncodeMethod>('component');
  const [copied, setCopied] = useState(false);

  const result      = useMemo(() => processUrl(input, mode, method), [input, mode, method]);
  const highlighted = useMemo(() => {
    if (!result.output) return '';
    return mode === 'encode'
      ? highlightEncoded(result.output)
      : highlightDecoded(result.output);
  }, [result.output, mode]);

  const handleCopy = useCallback(() => {
    if (!result.output) return;
    navigator.clipboard.writeText(result.output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [result.output]);

  const clearInput = () => setInput('');

  const swapIO = () => {
    if (result.output) {
      setInput(result.output);
      setMode((m) => (m === 'encode' ? 'decode' : 'encode'));
    }
  };

  return (
    <section id="converter" className="converter-preview" aria-labelledby="converter-h2">
      <div className="converter-container">
        <h2 id="converter-h2" className="converter-h2">URL Encoder / Decoder</h2>

        <div className="converter-box">
          {/* Mode toggle */}
          <div className="converter-tabs" role="tablist" aria-label="Operation mode">
            {(['encode', 'decode'] as Mode[]).map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={mode === m}
                className={`converter-tab${mode === m ? ' active' : ''}`}
                onClick={() => setMode(m)}
              >
                {m === 'encode' ? '🔒 Encode' : '🔓 Decode'}
              </button>
            ))}
          </div>

          {/* Method toggle */}
          <div className="converter-subtabs" role="group" aria-label="Encoding method">
            <span className="converter-subtabs-label">Method:</span>
            {(['component', 'full'] as EncodeMethod[]).map((m) => (
              <button
                key={m}
                className={`converter-subtab${method === m ? ' active' : ''}`}
                onClick={() => setMethod(m)}
                title={
                  m === 'component'
                    ? 'encodeURIComponent — encodes all special chars including / ? & ='
                    : 'encodeURI — preserves URL structure, encodes only invalid chars'
                }
              >
                {m === 'component' ? 'encodeURIComponent' : 'encodeURI'}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="converter-input-wrapper">
            <label htmlFor="converter-textarea" className="converter-label">
              {mode === 'encode' ? 'Plain text or URL to encode:' : 'Encoded URL to decode:'}
            </label>
            <div className="converter-input-controls">
              <textarea
                id="converter-textarea"
                className={`converter-input converter-input-mono${result.error ? ' converter-input-error' : ''}`}
                placeholder={
                  mode === 'encode'
                    ? 'https://example.com/search?q=hello world'
                    : 'https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world'
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                aria-label="URL input"
                spellCheck={false}
              />
              {input && (
                <button className="converter-clear-btn" onClick={clearInput} aria-label="Clear input" title="Clear">
                  ✕
                </button>
              )}
            </div>
            <span className="converter-help-text">
              Paste a URL or string · Switch between Encode / Decode · 100% private
            </span>
          </div>

          {/* Error */}
          {result.error && (
            <div className="converter-error" role="alert">
              <strong>Error:</strong> {result.error}
            </div>
          )}

          {/* Output with syntax highlighting */}
          {input.trim() && !result.error && result.output && (
            <div className="converter-outputs" role="region" aria-live="polite" aria-label="Converted URL">
              <div className="converter-output converter-output-full">
                <div className="output-header">
                  <span className="output-label">
                    {mode === 'encode' ? 'Encoded URL' : 'Decoded URL'}
                  </span>
                  <div className="output-actions">
                    <button className="converter-swap-btn" onClick={swapIO} aria-label="Use output as new input" title="Use as input">
                      ⇄ Swap
                    </button>
                    <button className="converter-copy-btn" onClick={handleCopy} aria-label="Copy result">
                      {copied ? '✓ Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <pre className="output-pre">
                  <code
                    className="output-code output-code-block"
                    dangerouslySetInnerHTML={{ __html: highlighted }}
                  />
                </pre>

                <span className="output-desc">
                  {result.output.length} characters · {method === 'component' ? 'encodeURIComponent' : 'encodeURI'}
                </span>
              </div>
            </div>
          )}

          {!input.trim() && (
            <div className="converter-empty-state">
              <p>Paste a URL or string above to encode or decode it instantly</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function UrlEncoder() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="hero hero-url-encoder" aria-labelledby="hero-h1">
        <div className="hero-meta">
          <span className="dot dot-live" /> Free URL Encoder · Encode & Decode · No Signup
        </div>
        <h1 id="hero-h1" className="hero-h1">
          Encode and decode URLs
          <br />
          <em>instantly in your browser.</em>
        </h1>
        <p className="hero-sub">
          Paste any URL or string and instantly encode it for safe transport, or decode
          percent-encoded URLs back to plain text. Supports both encodeURI and encodeURIComponent.
          No signup, no ads, runs entirely in your browser.
        </p>
        <div className="hero-cta">
          <a href="#converter" className="btn btn-primary">Open URL Encoder →</a>
          <a href="#why" className="btn btn-ghost">How it works</a>
        </div>
        <ul className="hero-stats hero-stats-url-encoder" aria-label="Site statistics">
          <li><strong>2</strong><span>modes</span></li>
          <li><strong>Real-time</strong><span>conversion</span></li>
          <li><strong>100%</strong><span>browser-side</span></li>
          <li><strong>Free</strong><span>forever</span></li>
        </ul>
      </section>

      <UrlEncoderSection />

      <section id="why" className="why why-url-encoder" aria-labelledby="why-h2">
        <span className="eyebrow">/ 01 — How It Works</span>
        <h2 id="why-h2" className="section-h2">Why use a URL Encoder?</h2>
        <div className="why-grid why-grid-url-encoder">
          <article className="why-card why-card-url-encoder">
            <span className="why-num">01</span>
            <h3>For Developers</h3>
            <p>Encode query parameters before appending them to API requests. Prevent broken URLs caused by spaces, special characters, or non-ASCII input.</p>
          </article>
          <article className="why-card why-card-url-encoder">
            <span className="why-num">02</span>
            <h3>For QA & Testers</h3>
            <p>Decode percent-encoded URLs from logs and error reports to quickly understand what values were passed to an endpoint.</p>
          </article>
          <article className="why-card why-card-url-encoder">
            <span className="why-num">03</span>
            <h3>For Content & SEO</h3>
            <p>Encode international characters and spaces in URLs to ensure links work correctly across all browsers and platforms.</p>
          </article>
          <article className="why-card why-card-url-encoder">
            <span className="why-num">04</span>
            <h3>100% Private & Instant</h3>
            <p>All encoding happens in your browser using native JavaScript. Your URLs never touch any server. Works completely offline.</p>
          </article>
        </div>
      </section>

      <section className="why why-url-encoder" aria-labelledby="reference-h2">
        <span className="eyebrow">/ 02 — Reference</span>
        <h2 id="reference-h2" className="section-h2">Understanding URL encoding</h2>
        <div className="formats-container">
          <div className="format-group">
            <h3 className="format-group-title">Encoding Methods</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>encodeURIComponent</strong>
                <p>Encodes all characters except letters, digits, and <code>- _ . ! ~ * ' ( )</code>. Use for individual query string values.</p>
                <code>hello world → hello%20world</code>
              </div>
              <div className="format-item">
                <strong>encodeURI</strong>
                <p>Preserves URL structure — does not encode <code>/ ? & = # : @</code>. Use for complete URLs where structure must be kept.</p>
                <code>https://x.com/a b → https://x.com/a%20b</code>
              </div>
            </div>
          </div>
          <div className="format-group">
            <h3 className="format-group-title">Common Encoded Characters</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Space & Punctuation</strong>
                <p>The most common characters that need encoding when used inside query string values.</p>
                <code>space→%20 · &→%26 · =→%3D · +→%2B</code>
              </div>
              <div className="format-item">
                <strong>International Characters</strong>
                <p>Non-ASCII characters like accented letters and CJK characters are encoded as UTF-8 byte sequences.</p>
                <code>café → caf%C3%A9 · 日本 → %E6%97%A5%E6%9C%AC</code>
              </div>
            </div>
          </div>
          <div className="format-group">
            <h3 className="format-group-title">When to Encode</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Query Parameters</strong>
                <p>Always encode user-provided values in query strings. A raw <code>&</code> or <code>=</code> will break parameter parsing.</p>
                <code>?q=rock&roll → ?q=rock%26roll</code>
              </div>
              <div className="format-item">
                <strong>URL in a URL</strong>
                <p>When embedding a full URL as a parameter value, use encodeURIComponent to encode the entire inner URL.</p>
                <code>?redirect=https%3A%2F%2Fexample.com</code>
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

      <section className="cta cta-url-encoder">
        <h2>Encode your URL instantly.</h2>
        <a href="#converter" className="btn btn-primary btn-lg">Open URL Encoder →</a>
      </section>
    </>
  );
}