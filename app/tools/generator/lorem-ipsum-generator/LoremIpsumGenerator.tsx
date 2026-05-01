'use client';

import { useState, useCallback, useMemo } from 'react';
import Config from "@/lib/config";

import "@/style/home.css";
import "@/style/tools.css";
import "@/style/tools-extra.css";

/* ─── Data ──────────────────────────────────────────────────────── */
const LOREM_WORDS = [
  'lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit',
  'sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore',
  'magna','aliqua','enim','ad','minim','veniam','quis','nostrud','exercitation',
  'ullamco','laboris','nisi','aliquip','ex','ea','commodo','consequat','duis',
  'aute','irure','in','reprehenderit','voluptate','velit','esse','cillum',
  'eu','fugiat','nulla','pariatur','excepteur','sint','occaecat','cupidatat',
  'non','proident','sunt','culpa','qui','officia','deserunt','mollit','anim',
  'id','est','laborum','perspiciatis','unde','omnis','iste','natus','error',
  'voluptatem','accusantium','doloremque','laudantium','totam','rem','aperiam',
  'eaque','ipsa','quae','ab','illo','inventore','veritatis','quasi','architecto',
  'beatae','vitae','dicta','explicabo','nemo','ipsam','quia','voluptas',
  'aspernatur','odit','fugit','consequuntur','magni','dolores','eos','ratione',
  'sequi','nesciunt','neque','porro','quisquam','adipisci','numquam','eius',
  'modi','tempora','incidunt','magnam','quaerat','soluta','nobis','eligendi',
  'optio','cumque','impedit','quo','maxime','placeat','facere','possimus',
  'assumenda','repellendus','temporibus','autem','quibusdam','officiis',
  'debitis','rerum','necessitatibus','saepe','eveniet','voluptates','repudiandae',
  'recusandae','itaque','earum','hic','tenetur','sapiente','delectus',
];

const LOREM_START = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomWord(): string {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}

function generateSentence(classic: boolean, index: number): string {
  if (classic && index === 0) return LOREM_START;
  const len = rand(8, 18);
  const words: string[] = [];
  for (let i = 0; i < len; i++) words.push(randomWord());
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(' ') + '.';
}

function generateParagraph(classic: boolean, paraIndex: number, sentenceCount: number): string {
  const sentences: string[] = [];
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence(classic, paraIndex === 0 && i === 0 ? 0 : 1));
  }
  return sentences.join(' ');
}

type Unit = 'paragraphs' | 'sentences' | 'words';

function generate(amount: number, unit: Unit, classic: boolean): string {
  if (unit === 'paragraphs') {
    const paras: string[] = [];
    for (let i = 0; i < amount; i++) {
      paras.push(generateParagraph(classic, i, rand(4, 7)));
    }
    return paras.join('\n\n');
  }
  if (unit === 'sentences') {
    const sents: string[] = [];
    for (let i = 0; i < amount; i++) {
      sents.push(generateSentence(classic, i === 0 ? 0 : 1));
    }
    return sents.join(' ');
  }
  // words
  const words: string[] = [];
  if (classic) words.push('Lorem', 'ipsum');
  while (words.length < amount) words.push(randomWord());
  return words.slice(0, amount).join(' ');
}

/* ─── FAQ ───────────────────────────────────────────────────────── */
const FAQ = [
  { q: "What is Lorem Ipsum?", a: "Lorem Ipsum is placeholder text derived from a 45 BC work by Cicero. It has been the industry standard dummy text since the 1500s, used in printing and typesetting." },
  { q: "Why use Lorem Ipsum?", a: "Placeholder text lets designers focus on layout and visual hierarchy without being distracted by readable content. It simulates real text without carrying meaning." },
  { q: "Is the generated text sent to a server?", a: "No. All text is generated locally in your browser using JavaScript. Nothing is sent to any server." },
  { q: "What is the difference between Classic and Random mode?", a: "Classic mode always starts with 'Lorem ipsum dolor sit amet…' as designers expect. Random mode uses lorem vocabulary in different orders each time." },
  { q: "Can I generate by words, sentences, or paragraphs?", a: "Yes. Switch the unit control to generate exactly the amount you need — from a handful of words to dozens of paragraphs." },
];

/* ─── JSON-LD ────────────────────────────────────────────────────── */
const websiteJsonLd   = { "@context": "https://schema.org", "@type": "WebSite", name: Config.SITE_NAME, url: Config.MAIN_DOMAIN_NO };
const softwareJsonLd  = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Lorem Ipsum Generator", applicationCategory: "UtilityApplication", description: "Free lorem ipsum placeholder text generator.", url: `${Config.MAIN_DOMAIN_NO}/lorem-ipsum-generator`, operatingSystem: "Web Browser", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
const faqJsonLd       = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: Config.MAIN_DOMAIN_NO }, { "@type": "ListItem", position: 2, name: "Lorem Ipsum Generator", item: `${Config.MAIN_DOMAIN_NO}/lorem-ipsum-generator` }] };

/* ─── Tool Section ───────────────────────────────────────────────── */
function LoremIpsumSection() {
  const [amount,  setAmount]  = useState(3);
  const [unit,    setUnit]    = useState<Unit>('paragraphs');
  const [classic, setClassic] = useState(true);
  const [seed,    setSeed]    = useState(0); // increment to re-generate
  const [copied,  setCopied]  = useState(false);

  const output = useMemo(() => generate(amount, unit, classic), [amount, unit, classic, seed]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [output]);

  const wordCount = output.trim() ? output.trim().split(/\s+/).length : 0;
  const charCount = output.length;

  return (
    <section id="converter" className="converter-preview" aria-labelledby="converter-h2">
      <div className="converter-container">
        <h2 id="converter-h2" className="converter-h2">Lorem Ipsum Generator</h2>

        <div className="converter-box">
          {/* Controls */}
          <div className="generator-controls">
            {/* Amount */}
            <div className="generator-field">
              <label className="converter-label" htmlFor="lorem-amount">Amount</label>
              <div className="generator-number-wrap">
                <button
                  className="generator-step-btn"
                  onClick={() => setAmount((n) => Math.max(1, n - 1))}
                  aria-label="Decrease"
                >−</button>
                <input
                  id="lorem-amount"
                  type="number"
                  min={1}
                  max={100}
                  value={amount}
                  onChange={(e) => setAmount(Math.max(1, Math.min(100, Number(e.target.value))))}
                  className="rng-input generator-number-input"
                />
                <button
                  className="generator-step-btn"
                  onClick={() => setAmount((n) => Math.min(100, n + 1))}
                  aria-label="Increase"
                >+</button>
              </div>
            </div>

            {/* Unit */}
            <div className="generator-field">
              <label className="converter-label">Unit</label>
              <div className="converter-tabs" role="group" aria-label="Unit">
                {(['paragraphs', 'sentences', 'words'] as Unit[]).map((u) => (
                  <button
                    key={u}
                    className={`converter-tab${unit === u ? ' active' : ''}`}
                    onClick={() => setUnit(u)}
                  >
                    {u.charAt(0).toUpperCase() + u.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode */}
            <div className="generator-field">
              <label className="converter-label">Mode</label>
              <div className="converter-tabs" role="group" aria-label="Mode">
                <button
                  className={`converter-tab${classic ? ' active' : ''}`}
                  onClick={() => setClassic(true)}
                >Classic</button>
                <button
                  className={`converter-tab${!classic ? ' active' : ''}`}
                  onClick={() => setClassic(false)}
                >Random</button>
              </div>
            </div>

            {/* Generate */}
            <button
              className="rng-generate-btn"
              onClick={() => setSeed((s) => s + 1)}
            >
              ↺ Generate
            </button>
          </div>

          {/* Output */}
          <div className="converter-outputs" role="region" aria-live="polite">
            <div className="converter-output converter-output-full">
              <div className="output-header">
                <span className="output-label">Generated Text</span>
                <div className="output-actions">
                  <span className="output-meta">{wordCount} words · {charCount} chars</span>
                  <button className="converter-copy-btn" onClick={handleCopy}>
                    {copied ? '✓ Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
              <div className="output-pre output-text-block">
                {output.split('\n\n').map((para, i) => (
                  <p key={i} className="lorem-para">{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function LoremIpsumGenerator() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="hero hero-lorem-ipsum" aria-labelledby="hero-h1">
        <div className="hero-meta">
          <span className="dot dot-live" /> Free Lorem Ipsum · Paragraphs, Sentences & Words · No Signup
        </div>
        <h1 id="hero-h1" className="hero-h1">
          Generate placeholder text
          <br />
          <em>exactly the way you need it.</em>
        </h1>
        <p className="hero-sub">
          Choose paragraphs, sentences, or words. Switch between classic Lorem Ipsum and random
          variations. Copy instantly. No signup, no ads, runs entirely in your browser.
        </p>
        <div className="hero-cta">
          <a href="#converter" className="btn btn-primary">Generate Lorem Ipsum →</a>
          <a href="#why" className="btn btn-ghost">How it works</a>
        </div>
        <ul className="hero-stats" aria-label="Site statistics">
          <li><strong>3</strong><span>units</span></li>
          <li><strong>2</strong><span>modes</span></li>
          <li><strong>100%</strong><span>browser-side</span></li>
          <li><strong>Free</strong><span>forever</span></li>
        </ul>
      </section>

      <LoremIpsumSection />

      <section id="why" className="why" aria-labelledby="why-h2">
        <span className="eyebrow">/ 01 — How It Works</span>
        <h2 id="why-h2" className="section-h2">Why use Lorem Ipsum?</h2>
        <div className="why-grid">
          <article className="why-card">
            <span className="why-num">01</span>
            <h3>For Designers</h3>
            <p>Fill wireframes and mockups with realistic-looking text so clients and stakeholders focus on layout, not content.</p>
          </article>
          <article className="why-card">
            <span className="why-num">02</span>
            <h3>For Developers</h3>
            <p>Seed databases, populate UI components, and test rendering with variable-length content without writing real copy.</p>
          </article>
          <article className="why-card">
            <span className="why-num">03</span>
            <h3>For Content Teams</h3>
            <p>Hold layout space while copy is in review. Swap placeholder text for final content without touching the design.</p>
          </article>
          <article className="why-card">
            <span className="why-num">04</span>
            <h3>100% Private & Instant</h3>
            <p>All generation happens locally in your browser. No data is sent anywhere. Works completely offline.</p>
          </article>
        </div>
      </section>

      <section className="why" aria-labelledby="reference-h2">
        <span className="eyebrow">/ 02 — Reference</span>
        <h2 id="reference-h2" className="section-h2">Understanding the options</h2>
        <div className="formats-container">
          <div className="format-group">
            <h3 className="format-group-title">Units</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Paragraphs</strong>
                <p>Generates full paragraphs of 4–7 sentences each. Best for filling page layouts and article mockups.</p>
                <code>1 paragraph ≈ 60–120 words</code>
              </div>
              <div className="format-item">
                <strong>Sentences</strong>
                <p>Generates individual sentences of 8–18 words. Useful for headings, captions, and short copy blocks.</p>
                <code>1 sentence ≈ 8–18 words</code>
              </div>
              <div className="format-item">
                <strong>Words</strong>
                <p>Generates an exact number of words. Perfect for testing character limits or filling small UI elements.</p>
                <code>Exact count, no extra punctuation</code>
              </div>
            </div>
          </div>
          <div className="format-group">
            <h3 className="format-group-title">Modes</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Classic</strong>
                <p>Always starts with "Lorem ipsum dolor sit amet…" — the standard placeholder text designers expect since 1500s.</p>
                <code>Lorem ipsum dolor sit amet…</code>
              </div>
              <div className="format-item">
                <strong>Random</strong>
                <p>Uses the same lorem ipsum vocabulary but in a different order each time. Produces fresh text on every generation.</p>
                <code>Unique output on each click</code>
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
        <h2>Generate your placeholder text now.</h2>
        <a href="#converter" className="btn btn-primary btn-lg">Generate Lorem Ipsum →</a>
      </section>
    </>
  );
}