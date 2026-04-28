'use client';

import type { Metadata } from "next";
import { useState, useEffect } from 'react';
import { convertToAll } from './utils';
import Config from "@/lib/config";

import "@/style/home.css";
import "@/style/tools.css";


const FAQ = [
  { q: "What case formats does Case Converter support?",  a: "We support 12 major case formats: UPPERCASE, lowercase, Title Case, camelCase, PascalCase, snake_case, kebab-case, dot.case, path/case, CONSTANT_CASE, Sentence case, and Alternating case." },
  { q: "Is my data sent to a server?",               a: "No. All conversion runs locally in your browser using JavaScript. Your text never leaves your device." },
  { q: "Can I convert multiple texts at once?",      a: "Yes. Paste multiple lines or paragraphs and each will be converted across all 12 case formats simultaneously." },
  { q: "Does it preserve special characters?",      a: "It intelligently handles special characters — removing or converting them based on the target case format for optimal results." },
  { q: "Why do I need a case converter?",           a: "Developers use it for variable names (camelCase), constants (CONSTANT_CASE), and URLs (kebab-case). Writers use it for consistent text formatting." },
];

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: Config.SITE_NAME,
  alternateName: "Toolsxm — Free Online Text & Developer Tools",
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
  name: "Case Converter",
  applicationCategory: "UtilityApplication",
  description: "Free online case converter tool to transform text between UPPERCASE, lowercase, camelCase, snake_case, and 12+ more formats. Instantly convert, 100% browser-based.",
  url: `${Config.MAIN_DOMAIN_NO}`,
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
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
    { "@type": "ListItem", position: 2, name: "Tools", item: `${Config.MAIN_DOMAIN_NO}/#tools` },
  ],
};

export const metadata: Metadata = {
  title: "Case Converter — Convert Text to UPPERCASE, lowercase, camelCase, snake_case & More | Free",
  description:
    "Free Case Converter: Instantly transform text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, PascalCase, and 12+ more formats. No signup, no ads, 100% browser-based.",
  alternates: { canonical: "/" },
};

interface ConversionResult {
  id: string;
  label: string;
  result: string;
  description: string;
}

function CaseConverterSection() {
  const [input, setInput] = useState('hello world example');
  const [conversions, setConversions] = useState<ConversionResult[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  // Update conversions whenever input changes
  useEffect(() => {
    if (input.trim()) {
      const results = convertToAll(input);
      setConversions([
        { id: 'uppercase', label: 'UPPERCASE', result: results.uppercase, description: 'All letters capitalized' },
        { id: 'lowercase', label: 'lowercase', result: results.lowercase, description: 'All letters in lowercase' },
        { id: 'titlecase', label: 'Title Case', result: results.titlecase, description: 'First letter of each word capitalized' },
        { id: 'camelcase', label: 'camelCase', result: results.camelcase, description: 'First word lowercase, subsequent capitalized' },
        { id: 'pascalcase', label: 'PascalCase', result: results.pascalcase, description: 'All words capitalized' },
        { id: 'snakecase', label: 'snake_case', result: results.snakecase, description: 'Words separated by underscores' },
        { id: 'kebabcase', label: 'kebab-case', result: results.kebabcase, description: 'Words separated by hyphens' },
        { id: 'dotcase', label: 'dot.case', result: results.dotcase, description: 'Words separated by dots' },
        { id: 'pathcase', label: 'path/case', result: results.pathcase, description: 'Words separated by slashes' },
        { id: 'constantcase', label: 'CONSTANT_CASE', result: results.constantcase, description: 'All caps with underscores' },
        { id: 'sentencecase', label: 'Sentence case', result: results.sentencecase, description: 'First letter capitalized' },
        { id: 'alternating', label: 'AlTeRnAtInG', result: results.alternating, description: 'Alternating upper/lowercase' },
      ]);
    } else {
      setConversions([]);
    }
  }, [input]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const clearInput = () => {
    setInput('');
  };

  return (
    <section id="converter" className="converter-preview" aria-labelledby="converter-h2">
      <div className="converter-container">
        <h2 id="converter-h2" className="converter-h2">Case Converter</h2>
        
        <div className="converter-box">
          <div className="converter-input-wrapper">
            <label htmlFor="converter-textarea" className="converter-label">
              Paste or type your text:
            </label>
            <div className="converter-input-controls">
              <textarea
                id="converter-textarea"
                className="converter-input"
                placeholder="Enter any text, variable name, or phrase..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                aria-label="Text to convert"
              />
              {input && (
                <button
                  className="converter-clear-btn"
                  onClick={clearInput}
                  aria-label="Clear input"
                  title="Clear"
                >
                  ✕
                </button>
              )}
            </div>
            <span className="converter-help-text">
              {input.length} characters • Supports: camelCase, snake_case, kebab-case, UPPERCASE, and more
            </span>
          </div>

          {conversions.length > 0 && (
            <div className="converter-outputs converter-outputs-grid" role="region" aria-live="polite" aria-label="Case conversion results">
              {conversions.map((conversion) => (
                <div
                  key={conversion.id}
                  className={`converter-output ${copied === conversion.id ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(conversion.result, conversion.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      copyToClipboard(conversion.result, conversion.id);
                    }
                  }}
                  aria-label={`Copy ${conversion.label}: ${conversion.result}`}
                  title="Click to copy"
                >
                  <span className="output-label">{conversion.label}</span>
                  <code className="output-code">{conversion.result}</code>
                  <span className="output-desc">{conversion.description}</span>
                  {copied === conversion.id && (
                    <span className="output-feedback">✓ Copied!</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {!input.trim() && (
            <div className="converter-empty-state">
              <p>Start typing or paste text to see all case format conversions</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* HERO */}
      <section className="hero hero-case-converter" aria-labelledby="hero-h1">
        <div className="hero-meta">
          <span className="dot dot-live" /> Free Case Converter · Instant Results · No Signup
        </div>
        <h1 id="hero-h1" className="hero-h1">
          Convert text to any <em>case format</em>
          <br />
          UPPERCASE, lowercase, camelCase & beyond.
        </h1>
        <p className="hero-sub">
          Transform your text instantly between 12+ case formats — camelCase, snake_case, kebab-case, 
          PascalCase, Title Case, and more. No signup, no ads, runs entirely in your browser.
        </p>
        <div className="hero-cta">
          <a href="#converter" className="btn btn-primary">Open Case Converter →</a>
          <a href="#why"   className="btn btn-ghost">How it works</a>
        </div>
        <ul className="hero-stats hero-stats-case" aria-label="Site statistics">
          <li><strong>12+</strong><span>case formats</span></li>
          <li><strong>Instant</strong><span>conversion</span></li>
          <li><strong>100%</strong><span>browser-side</span></li>
          <li><strong>Free</strong><span>forever</span></li>
        </ul>
      </section>

      {/* CONVERTER TOOL - INTERACTIVE COMPONENT */}
      <CaseConverterSection />

      {/* WHY SECTION */}
      <section id="why" className="why why-case-converter" aria-labelledby="why-h2">
        <span className="eyebrow">/ 01 — How It Works</span>
        <h2 id="why-h2" className="section-h2">Why use a Case Converter?</h2>
        <div className="why-grid why-grid-case">
          <article className="why-card why-card-case">
            <span className="why-num">01</span>
            <h3>For Developers</h3>
            <p>Convert variable names between JavaScript camelCase, Python snake_case, and PHP CONSTANT_CASE. Essential for maintaining code standards.</p>
          </article>
          <article className="why-card why-card-case">
            <span className="why-num">02</span>
            <h3>For Content Writers</h3>
            <p>Instantly format titles, headlines, and text to Title Case, Sentence case, or UPPERCASE for consistent, professional writing.</p>
          </article>
          <article className="why-card why-card-case">
            <span className="why-num">03</span>
            <h3>For Database & APIs</h3>
            <p>Transform database column names, URL parameters, and API endpoints between naming conventions with one click.</p>
          </article>
          <article className="why-card why-card-case">
            <span className="why-num">04</span>
            <h3>100% Private & Fast</h3>
            <p>All conversion happens in your browser instantly. Your text never touches any server. Works completely offline.</p>
          </article>
        </div>
      </section>

      {/* CASE FORMATS GUIDE */}
      <section className="case-formats-guide" aria-labelledby="formats-h2">
        <span className="eyebrow">/ 02 — Reference</span>
        <h2 id="formats-h2" className="section-h2">Complete case format guide</h2>
        <div className="formats-container">
          <div className="format-group">
            <h3 className="format-group-title">Programming & Development</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>camelCase</strong>
                <p>Standard in JavaScript, Java, and most modern languages. First word lowercase, subsequent words capitalized, no separators.</p>
                <code>myVariableName</code>
              </div>
              <div className="format-item">
                <strong>PascalCase</strong>
                <p>Used for class names and constructors. All words capitalized, no separators.</p>
                <code>MyVariableName</code>
              </div>
              <div className="format-item">
                <strong>snake_case</strong>
                <p>Standard in Python, Ruby, and databases. Words separated by underscores, all lowercase.</p>
                <code>my_variable_name</code>
              </div>
              <div className="format-item">
                <strong>CONSTANT_CASE</strong>
                <p>Used for constants and environment variables. All uppercase with underscores between words.</p>
                <code>MY_VARIABLE_NAME</code>
              </div>
              <div className="format-item">
                <strong>kebab-case</strong>
                <p>Common in URLs, CSS classes, and HTML attributes. Words separated by hyphens, all lowercase.</p>
                <code>my-variable-name</code>
              </div>
            </div>
          </div>

          <div className="format-group">
            <h3 className="format-group-title">Writing & Content</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Title Case</strong>
                <p>Perfect for headlines and titles. First letter of each word capitalized.</p>
                <code>My Variable Name</code>
              </div>
              <div className="format-item">
                <strong>Sentence case</strong>
                <p>Standard English formatting. First letter capitalized, rest lowercase.</p>
                <code>My variable name</code>
              </div>
              <div className="format-item">
                <strong>UPPERCASE</strong>
                <p>All letters capitalized. Use for emphasis, acronyms, or section headers.</p>
                <code>MY VARIABLE NAME</code>
              </div>
              <div className="format-item">
                <strong>lowercase</strong>
                <p>All letters in lowercase. Standard for URLs, slugs, and minimal formatting.</p>
                <code>my variable name</code>
              </div>
            </div>
          </div>

          <div className="format-group">
            <h3 className="format-group-title">Special Formats</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>dot.case</strong>
                <p>Words separated by dots. Used in some configuration systems and file naming.</p>
                <code>my.variable.name</code>
              </div>
              <div className="format-item">
                <strong>path/case</strong>
                <p>Words separated by forward slashes. Common in file paths and URLs.</p>
                <code>my/variable/name</code>
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
      <section className="cta cta-case-converter">
        <h2>Convert any text format in seconds.</h2>
        <a href="#converter" className="btn btn-primary btn-lg">Start Converting Now →</a>
      </section>
    </>
  );
}