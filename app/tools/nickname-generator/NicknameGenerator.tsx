'use client';

import { useState, useCallback } from 'react';
import Config from "@/lib/config";

import "@/style/home.css";
import "@/style/tools.css";

const TOOL_URL  = `${Config.MAIN_DOMAIN_NO}/nickname-generator`;
const TOOL_NAME = "Nickname Generator";

const STYLES = [
  { label: "Any",     value: "any"   },
  { label: "Cool",    value: "cool"  },
  { label: "Funny",   value: "funny" },
  { label: "Gaming",  value: "game"  },
  { label: "Cosmic",  value: "space" },
] as const;
type Style = typeof STYLES[number]["value"];

const BATCH = 6;

const FAQ = [
  { q: "How are the nicknames generated?",     a: "Nicknames are fetched live from the Random Username API (usernameapiv1.vercel.app) — a free, CORS-enabled public API. If that source is unavailable, randomuser.me is used as a backup." },
  { q: "Are the nicknames unique?",            a: "Each request fetches a fresh batch from the API, so results are different every time. The API combines random prefixes, suffixes, and endings to create thousands of unique combinations." },
  { q: "Is any data sent to a server?",        a: "The only requests made are to the public nickname/username APIs. No personal data, inputs, or usage information is transmitted or stored by us." },
  { q: "Can I use these nicknames commercially?", a: "Yes. Generated nicknames are yours to use in any personal or commercial project, game, app, or profile — no attribution required." },
  { q: "What if I don't like any of the results?", a: "Click Generate again to get a fresh batch of 6 new nicknames. Each batch is fetched live, so you always get different results." },
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
  description: "Free nickname generator. Get unique, creative nicknames and usernames for games, social media, and any platform. Powered by public APIs. No signup, 100% free.",
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

// ── Style-based prefix / suffix wordlists (applied client-side on top of API) ─
const STYLE_PREFIXES: Record<Style, string[]> = {
  any:   [],
  cool:  ["Shadow", "Ice", "Steel", "Dark", "Blade", "Neo", "Void", "Neon"],
  funny: ["Soggy", "Wobbly", "Chunky", "Fluffy", "Sleepy", "Grumpy", "Derpy"],
  game:  ["Pro", "Elite", "Clutch", "Rage", "Sniper", "GG", "MVP", "Rush"],
  space: ["Nebula", "Pulsar", "Quasar", "Nova", "Comet", "Solar", "Lunar"],
};

const STYLE_SUFFIXES: Record<Style, string[]> = {
  any:   [],
  cool:  ["X", "Zero", "One", "Prime", "Edge", "Core", "Wave"],
  funny: ["Pants", "Nugget", "Pickle", "Waffle", "Noodle", "Biscuit", "Blob"],
  game:  ["99", "GG", "FTW", "1v1", "AFK", "PWN", "ACE"],
  space: ["Star", "Void", "Orbit", "Flux", "Galaxy", "Cosmos", "Rift"],
};

function applyStyle(name: string, style: Style): string {
  if (style === "any") return name;
  const prefixes = STYLE_PREFIXES[style];
  const suffixes = STYLE_SUFFIXES[style];
  const rndPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const rndSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  // randomly prepend OR append
  return Math.random() > 0.5
    ? `${rndPrefix}${name}`
    : `${name}${rndSuffix}`;
}

// ── API: Random Username API ─────────────────────────────────────────────────
async function fetchFromUsernameAPI(style: Style): Promise<{ names: string[]; source: string }> {
  const res = await fetch(
    `https://usernameapiv1.vercel.app/api/random-usernames?count=${BATCH}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error(`usernameapi status ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data.usernames) || data.usernames.length === 0)
    throw new Error("usernameapi: empty response");

  const names = (data.usernames as string[]).map((n) =>
    style !== "any" ? applyStyle(n, style) : n
  );
  return { names, source: "usernameapiv1.vercel.app" };
}

// ── API: Random User (fallback) ──────────────────────────────────────────────
async function fetchFromRandomUser(style: Style): Promise<{ names: string[]; source: string }> {
  const res = await fetch(
    `https://randomuser.me/api/?results=${BATCH}&inc=login&noinfo`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error(`randomuser status ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data.results) || data.results.length === 0)
    throw new Error("randomuser: empty response");

  const names = (data.results as Array<{ login: { username: string } }>).map(
    (r) => {
      const raw = r.login.username;
      return style !== "any" ? applyStyle(raw, style) : raw;
    }
  );
  return { names, source: "randomuser.me" };
}

// ── Orchestrator ─────────────────────────────────────────────────────────────
async function fetchNicknames(style: Style): Promise<{ names: string[]; source: string }> {
  try {
    return await fetchFromUsernameAPI(style);
  } catch (e1) {
    console.warn("Primary nickname API failed:", e1);
    try {
      return await fetchFromRandomUser(style);
    } catch (e2) {
      console.warn("Secondary nickname API failed:", e2);
      throw new Error("All nickname sources are currently unavailable. Please try again.");
    }
  }
}

// ── Tool section ─────────────────────────────────────────────────────────────
function NicknameSection() {
  const [names, setNames]       = useState<string[]>([]);
  const [source, setSource]     = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);
  const [errMsg, setErrMsg]     = useState<string | null>(null);
  const [copied, setCopied]     = useState<string | null>(null);
  const [count, setCount]       = useState(0);
  const [style, setStyle]       = useState<Style>("any");

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    setErrMsg(null);
    setCopied(null);
    setNames([]);

    try {
      const result = await fetchNicknames(style);
      setNames(result.names);
      setSource(result.source);
      setCount((c) => c + 1);
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [style]);

  const copyOne = (name: string) => {
    navigator.clipboard.writeText(name).then(() => {
      setCopied(name);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <section id="generator" className="converter-preview" aria-labelledby="generator-h2">
      <div className="converter-container">
        <h2 id="generator-h2" className="converter-h2">{TOOL_NAME}</h2>

        <div className="converter-box">
          {/* ── Controls ── */}
          <div className="rng-controls">
            <div className="rng-row">
              <div className="rng-field" style={{ flex: 1 }}>
                <label htmlFor="nick-style" className="converter-label">Style</label>
                <select
                  id="nick-style"
                  className="rng-input"
                  value={style}
                  onChange={(e) => setStyle(e.target.value as Style)}
                  aria-label="Nickname style"
                >
                  {STYLES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              className={`rng-generate-btn${loading ? " rolling" : ""}`}
              onClick={handleGenerate}
              disabled={loading}
              aria-label="Generate nicknames"
            >
              {loading ? "⟳ Generating…" : count === 0 ? "✦ Generate Nicknames" : "✦ Generate More"}
            </button>
          </div>

          {/* ── Error ── */}
          {errMsg && (
            <div className="converter-empty-state" role="alert" aria-live="assertive">
              <p>⚠ {errMsg}</p>
            </div>
          )}

          {/* ── Results grid ── */}
          {names.length > 0 && !errMsg && (
            <div
              className="converter-outputs converter-outputs-grid"
              role="region"
              aria-live="polite"
              aria-label="Generated nicknames"
            >
              {names.map((name) => (
                <div
                  key={name}
                  className={`converter-output${copied === name ? " copied" : ""}`}
                  onClick={() => copyOne(name)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") copyOne(name); }}
                  aria-label={`Copy nickname: ${name}`}
                  title="Click to copy"
                >
                  <span className="output-label">Nickname</span>
                  <code className="output-code" style={{ fontSize: "clamp(15px, 2vw, 22px)", wordBreak: "break-all" }}>
                    {name}
                  </code>
                  <span className="output-desc">
                    {copied === name ? "✓ Copied!" : "Click to copy"}
                  </span>
                  {copied === name && <span className="output-feedback">✓ Copied!</span>}
                </div>
              ))}
            </div>
          )}

          {/* ── Source footer ── */}
          {source && names.length > 0 && (
            <p style={{ marginTop: 16, fontSize: 12, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>
              Via {source} · {count > 0 && `batch #${count}`}
            </p>
          )}

          {/* ── Empty state ── */}
          {names.length === 0 && !errMsg && (
            <div className="converter-empty-state">
              <p>Choose a style and click <strong>Generate Nicknames</strong> to get {BATCH} unique options</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function NicknameGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* HERO */}
      <section className="hero" aria-labelledby="hero-h1">
        <div className="hero-meta">
          <span className="dot dot-live" /> Live API · 6 at a time · No Signup
        </div>
        <h1 id="hero-h1" className="hero-h1">
          Nickname Generator
          <br />
          <em>find your perfect handle.</em>
        </h1>
        <p className="hero-sub">
          Generate unique, creative nicknames for games, social media, Discord, and any platform.
          Get 6 options at once, pick your favourite, copy in one click. No signup, no ads.
        </p>
        <div className="hero-cta">
          <a href="#generator" className="btn btn-primary">Generate Nicknames →</a>
          <a href="#how-it-works" className="btn btn-ghost">How it works</a>
        </div>
        <ul className="hero-stats" aria-label="Tool highlights">
          <li><strong>6</strong><span>per batch</span></li>
          <li><strong>5</strong><span>styles</span></li>
          <li><strong>Live</strong><span>API data</span></li>
          <li><strong>Free</strong><span>forever</span></li>
        </ul>
      </section>

      {/* TOOL */}
      <NicknameSection />

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="why" aria-labelledby="why-h2">
        <span className="eyebrow">/ 01 — How It Works</span>
        <h2 id="why-h2" className="section-h2">Pick a style. Get 6 nicknames.</h2>
        <div className="why-grid">
          <article className="why-card">
            <span className="why-num">01</span>
            <h3>Choose a Style</h3>
            <p>Pick from Any, Cool, Funny, Gaming, or Cosmic. The style shapes the words combined with the API result to create themed nicknames.</p>
          </article>
          <article className="why-card">
            <span className="why-num">02</span>
            <h3>Get 6 Options</h3>
            <p>Each click fetches 6 fresh nicknames live from the API. More options means you find the right one faster — no guessing games.</p>
          </article>
          <article className="why-card">
            <span className="why-num">03</span>
            <h3>Copy in One Click</h3>
            <p>Click any nickname card to copy it to your clipboard instantly. Paste it wherever you need — no selecting, no right-clicking.</p>
          </article>
          <article className="why-card">
            <span className="why-num">04</span>
            <h3>Automatic Fallback</h3>
            <p>If the primary API is unavailable, randomuser.me is tried automatically. You always get results — never a dead page.</p>
          </article>
        </div>
      </section>

      {/* STYLES GUIDE */}
      <section className="why" aria-labelledby="styles-h2">
        <span className="eyebrow">/ 02 — Styles</span>
        <h2 id="styles-h2" className="section-h2">What style fits you?</h2>
        <div className="formats-container">
          <div className="format-group">
            <h3 className="format-group-title">Personality Styles</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Cool</strong>
                <p>Sharp, minimal, intimidating. Think Shadow, Ice, Void, Blade. Great for social profiles and usernames that make an impression.</p>
                <code>ShadowWolf_ · IceEnigma2048 · VoidMaster</code>
              </div>
              <div className="format-item">
                <strong>Funny</strong>
                <p>Silly, absurd, memorable. Soggy, Wobbly, Fluffy. Perfect when you want people to smile the moment they read your handle.</p>
                <code>SoggyNoodle · ChunkyPickle · WobblyBlob</code>
              </div>
            </div>
          </div>

          <div className="format-group">
            <h3 className="format-group-title">Platform Styles</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Gaming</strong>
                <p>Competitive, intense, recognizable. Pro, Elite, Clutch, GG. Designed for FPS, MOBA, battle royale, and any online game lobby.</p>
                <code>ProClutch99 · EliteSniper · RushACE</code>
              </div>
              <div className="format-item">
                <strong>Cosmic</strong>
                <p>Mysterious, vast, unique. Nebula, Pulsar, Nova, Quasar. Ideal for creative communities, Discord servers, and sci-fi themed games.</p>
                <code>NebulaVoid · PulsarStar · NovaCosmos</code>
              </div>
            </div>
          </div>

          <div className="format-group">
            <h3 className="format-group-title">Where to use them</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Gaming platforms</strong>
                <p>Steam, Xbox Live, PlayStation Network, Battle.net — anywhere you need a unique, memorable handle that isn't already taken.</p>
                <code>Works on: Steam · Xbox · PSN · Battle.net</code>
              </div>
              <div className="format-item">
                <strong>Social media</strong>
                <p>Instagram, TikTok, Twitter/X, Discord, Reddit — wherever a great username makes your profile stand out from the crowd.</p>
                <code>Works on: Discord · Reddit · TikTok · X</code>
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
        <h2>Ready to find your perfect nickname?</h2>
        <a href="#generator" className="btn btn-primary btn-lg">Generate Nicknames Now →</a>
      </section>
    </>
  );
}