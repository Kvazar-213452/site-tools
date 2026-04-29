'use client';

import type { Metadata } from "next";
import { useState, useEffect } from 'react';
import Config from "@/lib/config";

import "@/style/home.css";
import "@/style/tools.css";

const FAQ = [
  { q: "What does Word Counter measure?",  a: "Word Counter counts characters, words, sentences, paragraphs, reading time, and more. It updates instantly as you type." },
  { q: "Is my text sent to a server?",               a: "No. All counting runs locally in your browser using JavaScript. Your text never leaves your device." },
  { q: "What counts as a word?",      a: "A word is any sequence of characters separated by spaces or punctuation. Numbers and hyphenated words count as single words." },
  { q: "How is reading time calculated?",      a: "Reading time is based on an average reading speed of 200 words per minute. It updates as you type." },
  { q: "Can I paste large texts?",           a: "Yes. You can paste texts of any length. The counter handles large documents instantly without any performance issues." },
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
  name: "Word Counter",
  applicationCategory: "UtilityApplication",
  description: "Free online word counter tool. Count words, characters, sentences, paragraphs, and get reading time instantly. No signup, 100% browser-based.",
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
  title: "Word Counter — Count Words, Characters, Sentences & Reading Time | Free",
  description:
    "Free Word Counter: Instantly count words, characters, sentences, paragraphs, and calculate reading time. No signup, no ads, 100% browser-based and private.",
  alternates: { canonical: "/word-counter" },
};

interface WordStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: string;
  averageWordLength: number;
}

function calculateStats(text: string): WordStats {
  const trimmedText = text.trim();
  
  // Characters
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  
  // Words
  const words = trimmedText ? trimmedText.split(/\s+/).length : 0;
  
  // Sentences (ends with . ! ?)
  const sentences = trimmedText ? (trimmedText.match(/[.!?]+/g) || []).length : 0;
  
  // Paragraphs (separated by newlines)
  const paragraphs = trimmedText ? trimmedText.split(/\n\n+/).filter(p => p.trim()).length : 0;
  
  // Reading time (200 words per minute)
  const readingTimeMinutes = Math.ceil(words / 200);
  const readingTime = readingTimeMinutes < 1 ? "< 1 min" : `${readingTimeMinutes} min`;
  
  // Average word length
  const averageWordLength = words > 0 ? Math.round((charactersNoSpaces / words) * 10) / 10 : 0;
  
  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    readingTime,
    averageWordLength,
  };
}

function WordCounterSection() {
  const [input, setInput] = useState('Paste your text here or start typing to see word count, character count, reading time, and more statistics.');
  const [stats, setStats] = useState<WordStats>(calculateStats('Paste your text here or start typing to see word count, character count, reading time, and more statistics.'));

  useEffect(() => {
    setStats(calculateStats(input));
  }, [input]);

  const clearInput = () => {
    setInput('');
  };

  return (
    <section id="converter" className="converter-preview" aria-labelledby="converter-h2">
      <div className="converter-container">
        <h2 id="converter-h2" className="converter-h2">Word Counter</h2>
        
        <div className="converter-box">
          <div className="converter-input-wrapper">
            <label htmlFor="converter-textarea" className="converter-label">
              Paste or type your text:
            </label>
            <div className="converter-input-controls">
              <textarea
                id="converter-textarea"
                className="converter-input"
                placeholder="Enter text, paste an article, or copy from anywhere..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                aria-label="Text to analyze"
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
              Analyze your text in real-time • Instant statistics • 100% private
            </span>
          </div>

          {input.trim() && (
            <div className="converter-outputs converter-outputs-grid" role="region" aria-live="polite" aria-label="Word count statistics">
              <div className="converter-output stats-card">
                <span className="output-label">Words</span>
                <code className="output-code">{stats.words}</code>
                <span className="output-desc">Total word count</span>
              </div>

              <div className="converter-output stats-card">
                <span className="output-label">Characters</span>
                <code className="output-code">{stats.characters}</code>
                <span className="output-desc">Including spaces</span>
              </div>

              <div className="converter-output stats-card">
                <span className="output-label">Characters (No Spaces)</span>
                <code className="output-code">{stats.charactersNoSpaces}</code>
                <span className="output-desc">Without spaces</span>
              </div>

              <div className="converter-output stats-card">
                <span className="output-label">Sentences</span>
                <code className="output-code">{stats.sentences}</code>
                <span className="output-desc">Detected by . ! ?</span>
              </div>

              <div className="converter-output stats-card">
                <span className="output-label">Paragraphs</span>
                <code className="output-code">{stats.paragraphs}</code>
                <span className="output-desc">Separated by line breaks</span>
              </div>

              <div className="converter-output stats-card">
                <span className="output-label">Reading Time</span>
                <code className="output-code">{stats.readingTime}</code>
                <span className="output-desc">At 200 WPM</span>
              </div>

              <div className="converter-output stats-card">
                <span className="output-label">Avg Word Length</span>
                <code className="output-code">{stats.averageWordLength}</code>
                <span className="output-desc">Characters per word</span>
              </div>

              <div className="converter-output stats-card">
                <span className="output-label">Density</span>
                <code className="output-code">{stats.words > 0 ? Math.round((stats.charactersNoSpaces / stats.words) * 100) / 100 : 0}</code>
                <span className="output-desc">Chars per word ratio</span>
              </div>
            </div>
          )}

          {!input.trim() && (
            <div className="converter-empty-state">
              <p>Paste text or start typing to see instant statistics</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function WordCounterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* HERO */}
      <section className="hero hero-word-counter" aria-labelledby="hero-h1">
        <div className="hero-meta">
          <span className="dot dot-live" /> Free Word Counter · Instant Stats · No Signup
        </div>
        <h1 id="hero-h1" className="hero-h1">
          Count words, characters,
          <br />
          <em>and reading time instantly.</em>
        </h1>
        <p className="hero-sub">
          Paste or type your text and get instant statistics: word count, character count, sentences, 
          paragraphs, reading time, and more. No signup, no ads, runs entirely in your browser.
        </p>
        <div className="hero-cta">
          <a href="#converter" className="btn btn-primary">Open Word Counter →</a>
          <a href="#why"   className="btn btn-ghost">How it works</a>
        </div>
        <ul className="hero-stats hero-stats-word-counter" aria-label="Site statistics">
          <li><strong>8</strong><span>metrics</span></li>
          <li><strong>Real-time</strong><span>counting</span></li>
          <li><strong>100%</strong><span>browser-side</span></li>
          <li><strong>Free</strong><span>forever</span></li>
        </ul>
      </section>

      {/* CONVERTER TOOL - INTERACTIVE COMPONENT */}
      <WordCounterSection />

      {/* WHY SECTION */}
      <section id="why" className="why why-word-counter" aria-labelledby="why-h2">
        <span className="eyebrow">/ 01 — How It Works</span>
        <h2 id="why-h2" className="section-h2">Why use a Word Counter?</h2>
        <div className="why-grid why-grid-word-counter">
          <article className="why-card why-card-word-counter">
            <span className="why-num">01</span>
            <h3>For Writers & Journalists</h3>
            <p>Track word count for articles, essays, and blog posts. Monitor reading time and adjust content to match your target length.</p>
          </article>
          <article className="why-card why-card-word-counter">
            <span className="why-num">02</span>
            <h3>For Students</h3>
            <p>Verify that essays and assignments meet minimum or maximum word count requirements. Check reading complexity instantly.</p>
          </article>
          <article className="why-card why-card-word-counter">
            <span className="why-num">03</span>
            <h3>For SEO & Content Marketing</h3>
            <p>Analyze content density, optimize for readability, and ensure posts meet SEO word count guidelines (typically 300-3000 words).</p>
          </article>
          <article className="why-card why-card-word-counter">
            <span className="why-num">04</span>
            <h3>100% Private & Instant</h3>
            <p>All analysis happens in your browser. Your text never touches any server. Works completely offline with real-time updates.</p>
          </article>
        </div>
      </section>

      {/* METRICS GUIDE */}
      <section className="why why-word-counter"  aria-labelledby="metrics-h2">
        <span className="eyebrow">/ 02 — Reference</span>
        <h2 id="metrics-h2" className="section-h2">Understanding the metrics</h2>
        <div className="formats-container">
          <div className="format-group">
            <h3 className="format-group-title">Basic Counts</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Words</strong>
                <p>Total number of words in your text. Counted by splitting on spaces and punctuation.</p>
                <code>Example: "Hello world" = 2 words</code>
              </div>
              <div className="format-item">
                <strong>Characters (with spaces)</strong>
                <p>Total count of all characters including letters, numbers, punctuation, and spaces.</p>
                <code>Example: "Hi!" = 3 characters</code>
              </div>
              <div className="format-item">
                <strong>Characters (without spaces)</strong>
                <p>Count of all characters excluding whitespace. Useful for character-limited platforms.</p>
                <code>Example: "Hi!" = 3 characters (no spaces)</code>
              </div>
            </div>
          </div>

          <div className="format-group">
            <h3 className="format-group-title">Text Analysis</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Sentences</strong>
                <p>Number of sentences detected by periods, exclamation marks, and question marks.</p>
                <code>Example: "Hello. How are you?" = 2 sentences</code>
              </div>
              <div className="format-item">
                <strong>Paragraphs</strong>
                <p>Number of paragraphs detected by line breaks and empty lines in your text.</p>
                <code>Double line breaks separate paragraphs</code>
              </div>
              <div className="format-item">
                <strong>Reading Time</strong>
                <p>Estimated reading time based on average reading speed of 200 words per minute.</p>
                <code>100 words ~= 0.5 min (less than 1 min)</code>
              </div>
            </div>
          </div>

          <div className="format-group">
            <h3 className="format-group-title">Advanced Metrics</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Average Word Length</strong>
                <p>Average number of characters per word. Higher = more complex vocabulary.</p>
                <code>Example: "The quick fox" = 4.33 chars/word</code>
              </div>
              <div className="format-item">
                <strong>Density</strong>
                <p>Ratio of characters to words. Indicates text complexity and word variety.</p>
                <code>Higher density = longer, more complex words</code>
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
      <section className="cta cta-word-counter">
        <h2>Analyze your text instantly.</h2>
        <a href="#converter" className="btn btn-primary btn-lg">Start Counting Now →</a>
      </section>
    </>
  );
}