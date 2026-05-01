'use client';

import { useState, useCallback, useMemo } from 'react';
import Config from "@/lib/config";

import "@/style/home.css";
import "@/style/tools.css";
import "@/style/tools-extra.css";

const FAQ = [
  { q: "What does JSON Formatter do?",         a: "JSON Formatter instantly beautifies, minifies, and validates JSON. It detects syntax errors, highlights them, and lets you copy the result with one click." },
  { q: "Is my JSON sent to a server?",          a: "No. All formatting and validation runs locally in your browser using JavaScript. Your data never leaves your device." },
  { q: "What counts as valid JSON?",            a: "Valid JSON must have double-quoted keys, properly nested brackets and braces, no trailing commas, and correct value types (string, number, boolean, null, array, object)." },
  { q: "What is the difference between Beautify and Minify?", a: "Beautify adds indentation and line breaks to make JSON readable. Minify removes all whitespace to reduce file size — useful for APIs and storage." },
  { q: "Can I paste large JSON files?",         a: "Yes. The formatter handles large JSON documents instantly without any performance issues. All processing runs in-browser." },
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
  name: "JSON Formatter",
  applicationCategory: "DeveloperApplication",
  description: "Free online JSON formatter and validator. Beautify, minify, and validate JSON instantly. No signup, 100% browser-based.",
  url: `${Config.MAIN_DOMAIN_NO}/tools/json-formatter`,
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
    { "@type": "ListItem", position: 1, name: "Home",         item: Config.MAIN_DOMAIN_NO },
    { "@type": "ListItem", position: 2, name: "JSON Formatter", item: `${Config.MAIN_DOMAIN_NO}/json-formatter` },
  ],
};

type Mode = 'beautify' | 'minify';

interface JsonResult {
  output: string;
  error: string | null;
  isValid: boolean;
}

function processJson(input: string, mode: Mode): JsonResult {
  if (!input.trim()) return { output: '', error: null, isValid: true };
  try {
    const parsed = JSON.parse(input);
    const output =
      mode === 'beautify'
        ? JSON.stringify(parsed, null, 2)
        : JSON.stringify(parsed);
    return { output, error: null, isValid: true };
  } catch (e: any) {
    return { output: '', error: e.message, isValid: false };
  }
}

/* ─── JSON Syntax Highlighter ────────────────────────────────────── */
function highlightJson(json: string): string {
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?|[{}\[\],:])/g,
    (match) => {
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          const key = match.slice(0, match.lastIndexOf(':'));
          return `<span class="json-key">${esc(key)}</span><span class="json-punct">:</span>`;
        }
        return `<span class="json-string">${esc(match)}</span>`;
      }
      if (/^(true|false)$/.test(match))
        return `<span class="json-boolean">${esc(match)}</span>`;
      if (match === 'null')
        return `<span class="json-null">${esc(match)}</span>`;
      if (!isNaN(Number(match)) && match.trim() !== '')
        return `<span class="json-number">${esc(match)}</span>`;
      return `<span class="json-punct">${esc(match)}</span>`;
    }
  );
}

function JsonFormatterSection() {
  const [input, setInput]   = useState('{\n  "name": "JSON Formatter",\n  "type": "tool",\n  "free": true,\n  "version": 1,\n  "features": ["beautify", "minify", "validate"],\n  "author": null\n}');
  const [mode, setMode]     = useState<Mode>('beautify');
  const [copied, setCopied] = useState(false);

  const result      = useMemo(() => processJson(input, mode), [input, mode]);
  const highlighted = useMemo(() => (result.output ? highlightJson(result.output) : ''), [result.output]);

  const handleCopy = useCallback(() => {
    if (!result.output) return;
    navigator.clipboard.writeText(result.output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [result.output]);

  const clearInput = () => setInput('');

  return (
    <section id="converter" className="converter-preview" aria-labelledby="converter-h2">
      <div className="converter-container">
        <h2 id="converter-h2" className="converter-h2">JSON Formatter</h2>

        <div className="converter-box">
          <div className="converter-tabs" role="tablist" aria-label="Formatter mode">
            {(['beautify', 'minify'] as Mode[]).map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={mode === m}
                className={`converter-tab${mode === m ? ' active' : ''}`}
                onClick={() => setMode(m)}
              >
                {m === 'beautify' ? '✦ Beautify' : '⚡ Minify'}
              </button>
            ))}
          </div>

          <div className="converter-input-wrapper">
            <label htmlFor="converter-textarea" className="converter-label">
              Paste your JSON:
            </label>
            <div className="converter-input-controls">
              <textarea
                id="converter-textarea"
                className={`converter-input converter-input-mono${result.error ? ' converter-input-error' : ''}`}
                placeholder='{ "key": "value" }'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                aria-label="JSON input"
                spellCheck={false}
              />
              {input && (
                <button className="converter-clear-btn" onClick={clearInput} aria-label="Clear input" title="Clear">
                  ✕
                </button>
              )}
            </div>
            <span className="converter-help-text">
              Paste JSON · Choose Beautify or Minify · Instant validation · 100% private
            </span>
          </div>

          {result.error && (
            <div className="converter-error" role="alert">
              <strong>Invalid JSON:</strong> {result.error}
            </div>
          )}

          {input.trim() && result.isValid && result.output && (
            <div className="converter-outputs" role="region" aria-live="polite" aria-label="Formatted JSON">
              <div className="converter-output converter-output-full">
                <div className="output-header">
                  <span className="output-label">
                    {mode === 'beautify' ? 'Beautified JSON' : 'Minified JSON'}
                  </span>
                  <button className="converter-copy-btn" onClick={handleCopy} aria-label="Copy formatted JSON">
                    {copied ? '✓ Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="output-pre">
                  <code
                    className="output-code output-code-block"
                    dangerouslySetInnerHTML={{ __html: highlighted }}
                  />
                </pre>
                <span className="output-desc">
                  {mode === 'beautify'
                    ? `${result.output.split('\n').length} lines · readable format`
                    : `${result.output.length} chars · minified`}
                </span>
              </div>
            </div>
          )}

          {!input.trim() && (
            <div className="converter-empty-state">
              <p>Paste JSON above to format or validate it instantly</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function JsonFormatter() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="hero hero-json-formatter" aria-labelledby="hero-h1">
        <div className="hero-meta">
          <span className="dot dot-live" /> Free JSON Formatter · Instant Validation · No Signup
        </div>
        <h1 id="hero-h1" className="hero-h1">
          Beautify, minify, and validate
          <br />
          <em>JSON in one click.</em>
        </h1>
        <p className="hero-sub">
          Paste your JSON and instantly beautify it for readability, minify it for production,
          or validate it for errors. No signup, no ads, runs entirely in your browser.
        </p>
        <div className="hero-cta">
          <a href="#converter" className="btn btn-primary">Open JSON Formatter →</a>
          <a href="#why" className="btn btn-ghost">How it works</a>
        </div>
        <ul className="hero-stats hero-stats-json-formatter" aria-label="Site statistics">
          <li><strong>3</strong><span>modes</span></li>
          <li><strong>Real-time</strong><span>validation</span></li>
          <li><strong>100%</strong><span>browser-side</span></li>
          <li><strong>Free</strong><span>forever</span></li>
        </ul>
      </section>

      <JsonFormatterSection />

      <section id="why" className="why why-json-formatter" aria-labelledby="why-h2">
        <span className="eyebrow">/ 01 — How It Works</span>
        <h2 id="why-h2" className="section-h2">Why use a JSON Formatter?</h2>
        <div className="why-grid why-grid-json-formatter">
          <article className="why-card why-card-json-formatter">
            <span className="why-num">01</span>
            <h3>For Developers</h3>
            <p>Debug API responses, format config files, and quickly spot errors in nested JSON structures without any IDE required.</p>
          </article>
          <article className="why-card why-card-json-formatter">
            <span className="why-num">02</span>
            <h3>For QA & Testers</h3>
            <p>Validate JSON payloads before sending to endpoints. Catch syntax errors early and avoid cryptic server-side failures.</p>
          </article>
          <article className="why-card why-card-json-formatter">
            <span className="why-num">03</span>
            <h3>For Data Engineers</h3>
            <p>Minify JSON for storage and transport, or beautify raw data exports for human review and documentation purposes.</p>
          </article>
          <article className="why-card why-card-json-formatter">
            <span className="why-num">04</span>
            <h3>100% Private & Instant</h3>
            <p>All formatting happens in your browser. Your JSON never touches any server. Works completely offline with real-time updates.</p>
          </article>
        </div>
      </section>

      <section className="why why-json-formatter" aria-labelledby="reference-h2">
        <span className="eyebrow">/ 02 — Reference</span>
        <h2 id="reference-h2" className="section-h2">Understanding the modes</h2>
        <div className="formats-container">
          <div className="format-group">
            <h3 className="format-group-title">Formatting Modes</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Beautify</strong>
                <p>Adds proper indentation (2 spaces) and line breaks to make JSON human-readable. Best for debugging and documentation.</p>
                <code>{'{"a":1} → {\n  "a": 1\n}'}</code>
              </div>
              <div className="format-item">
                <strong>Minify</strong>
                <p>Strips all whitespace and line breaks to produce the smallest possible JSON string. Best for APIs and file storage.</p>
                <code>{'{\n  "a": 1\n} → {"a":1}'}</code>
              </div>
            </div>
          </div>
          <div className="format-group">
            <h3 className="format-group-title">Validation</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Syntax Errors</strong>
                <p>The formatter detects all JSON syntax errors, including missing commas, unquoted keys, trailing commas, and mismatched brackets.</p>
                <code>SyntaxError: Unexpected token</code>
              </div>
              <div className="format-item">
                <strong>Valid JSON Types</strong>
                <p>JSON supports strings, numbers, booleans, null, arrays, and objects. All other types will cause a validation error.</p>
                <code>string · number · boolean · null · [] · {'{}'}</code>
              </div>
            </div>
          </div>
          <div className="format-group">
            <h3 className="format-group-title">Common Mistakes</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Trailing Commas</strong>
                <p>JSON does not allow trailing commas after the last item in an array or object, unlike JavaScript.</p>
                <code>{'{"a": 1,} ← invalid'}</code>
              </div>
              <div className="format-item">
                <strong>Single Quotes</strong>
                <p>All strings and keys must use double quotes. Single quotes are not valid in JSON.</p>
                <code>{"{'key': 'val'} ← invalid"}</code>
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

      <section className="cta cta-json-formatter">
        <h2>Format your JSON instantly.</h2>
        <a href="#converter" className="btn btn-primary btn-lg">Open JSON Formatter →</a>
      </section>
    </>
  );
}