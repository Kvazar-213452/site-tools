'use client';

import { useState, useCallback } from 'react';
import Config from "@/lib/config";

import "@/style/home.css";
import "@/style/tools.css";

const TOOL_URL  = `${Config.MAIN_DOMAIN_NO}/funny-usernames-for-tiktok`;
const TOOL_NAME = "Funny Usernames for TikTok";

const HUMOR_STYLES = [
  { label: "Any humor",           value: "any" },
  { label: "Self-deprecating",    value: "self-deprecating, relatable, poking fun at yourself" },
  { label: "Absurdist",           value: "absurdist, surreal, completely random and unhinged" },
  { label: "Dry & Deadpan",       value: "dry humor, deadpan, understated comedy" },
  { label: "Gen Z Chaotic",       value: "Gen Z chaotic energy, brainrot, unhinged vibes" },
  { label: "Ironic & Self-Aware", value: "ironic, meta, self-aware internet humor" },
  { label: "Pun & Wordplay",      value: "puns, wordplay, clever double meanings" },
  { label: "Wholesome & Silly",   value: "wholesome, silly, cute chaos" },
];

const NICHES = [
  { label: "No specific niche",   value: "" },
  { label: "Food & Cooking",      value: "food, cooking, recipes, snacks" },
  { label: "Fitness & Gym",       value: "fitness, gym, working out, gains" },
  { label: "Gaming",              value: "gaming, video games, streaming" },
  { label: "Study & School",      value: "studying, school, academic stress" },
  { label: "Finance & Money",     value: "personal finance, saving money, broke life" },
  { label: "Pet & Animals",       value: "pets, animals, cats, dogs" },
  { label: "Fashion & Beauty",    value: "fashion, beauty, GRWM, outfits" },
  { label: "Travel",              value: "travel, adventures, road trips" },
  { label: "Mental Health",       value: "mental health, anxiety, therapy humor" },
  { label: "Dating & Relationships", value: "dating, relationships, single life" },
  { label: "Horror & Spooky",     value: "horror, creepy, dark humor, spooky" },
];

const FAQ = [
  { q: "How are TikTok usernames generated?",       a: "Usernames are created by DeepSeek AI which understands TikTok culture, Gen Z humor, and viral trends. It avoids overused formats and creates handles that actually feel authentic to the platform." },
  { q: "Do these follow TikTok's username rules?",  a: "Yes. The AI is instructed to generate usernames with lowercase letters, numbers, underscores, and periods only — no spaces — within TikTok's 24-character limit." },
  { q: "Can I check if a username is available?",   a: "Not directly from this tool. Once you find a username you like, search for it directly on TikTok. We recommend generating a few favorites and checking availability on the app." },
  { q: "Why does the AI avoid common formats like 'just_a_girl_'?", a: "Those formats are so overused they've become invisible. The AI is specifically instructed to create memorable, unexpected handles that stand out in someone's For You Page comments." },
  { q: "Can I add my own word to the username?",    a: "Yes — use the optional Keyword field. The AI will creatively incorporate your word into the generated handles while keeping the humor and TikTok style intact." },
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
  applicationCategory: "SocialNetworkingApplication",
  description: "Free AI-powered funny TikTok username generator. Get 8 unique, funny, culturally-aware TikTok handles by humor style and niche. Powered by DeepSeek. No signup required.",
  operatingSystem: "Any — Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  author: { "@type": "Organization", name: Config.SITE_NAME, url: Config.MAIN_DOMAIN_NO },
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

interface TikTokUsername {
  username: string;
  vibe:     string;
  why:      string;
}

// ── Tool section ──────────────────────────────────────────────────────────────
function TikTokUsernameSection() {
  const [humor,     setHumor]     = useState("any");
  const [topic,     setTopic]     = useState("");
  const [keyword,   setKeyword]   = useState("");
  const [usernames, setUsernames] = useState<TikTokUsername[]>([]);
  const [loading,   setLoading]   = useState(false);
  const [errMsg,    setErrMsg]    = useState<string | null>(null);
  const [copied,    setCopied]    = useState<string | null>(null);
  const [count,     setCount]     = useState(0);

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    setErrMsg(null);
    setCopied(null);
    setUsernames([]);

    try {
      const res = await fetch("/api/generate-tiktok-usernames", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ humor, topic, keyword }),
      });

      const data = await res.json() as { usernames?: TikTokUsername[]; error?: string };

      if (!res.ok || data.error) {
        throw new Error(data.error ?? `Server error ${res.status}`);
      }

      if (!Array.isArray(data.usernames) || data.usernames.length === 0) {
        throw new Error("No usernames returned. Please try again.");
      }

      setUsernames(data.usernames);
      setCount((c) => c + 1);
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [humor, topic, keyword]);

  const copyUsername = (username: string) => {
    navigator.clipboard.writeText(`@${username}`).then(() => {
      setCopied(username);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <section id="generator" className="converter-preview" aria-labelledby="generator-h2">
      <div className="converter-container">
        <h2 id="generator-h2" className="converter-h2">TikTok Username Generator</h2>

        <div className="converter-box">
          {/* ── Inputs ── */}
          <div className="converter-input-wrapper">

            {/* Row 1: Humor + Niche */}
            <div className="rng-row" style={{ marginBottom: 16 }}>
              <div className="rng-field" style={{ flex: 1 }}>
                <label htmlFor="humor-select" className="converter-label">Humor Style</label>
                <select
                  id="humor-select"
                  className="rng-input"
                  value={humor}
                  onChange={(e) => setHumor(e.target.value)}
                  aria-label="Humor style"
                >
                  {HUMOR_STYLES.map((h) => (
                    <option key={h.value} value={h.value}>{h.label}</option>
                  ))}
                </select>
              </div>

              <div className="rng-field" style={{ flex: 1 }}>
                <label htmlFor="niche-select" className="converter-label">Content Niche</label>
                <select
                  id="niche-select"
                  className="rng-input"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  aria-label="Content niche"
                >
                  {NICHES.map((n) => (
                    <option key={n.value} value={n.value}>{n.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Keyword */}
            <label htmlFor="keyword-input" className="converter-label">
              Keyword <span style={{ color: "var(--ink-3)", fontWeight: 400 }}>(optional — AI weaves it in)</span>
            </label>
            <div style={{ position: "relative", marginBottom: 8 }}>
              <input
                id="keyword-input"
                type="text"
                className="rng-input"
                placeholder="e.g. chaos, potato, raccoon, vibes…"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                maxLength={20}
                aria-label="Optional keyword"
                style={{ width: "100%", boxSizing: "border-box" }}
              />
              {keyword && (
                <button
                  onClick={() => setKeyword("")}
                  style={{
                    position: "absolute", right: 12, top: "50%",
                    transform: "translateY(-50%)",
                    background: "none", border: "none",
                    color: "var(--ink-3)", cursor: "pointer", fontSize: 14,
                  }}
                  aria-label="Clear keyword"
                >
                  ✕
                </button>
              )}
            </div>

            <span className="converter-help-text">
              Leave everything on defaults for fully random chaotic TikTok energy
            </span>
          </div>

          {/* ── Generate button ── */}
          <div className="rng-controls" style={{ marginTop: 0 }}>
            <button
              className={`rng-generate-btn${loading ? " rolling" : ""}`}
              onClick={handleGenerate}
              disabled={loading}
              aria-label="Generate TikTok usernames"
            >
              {loading ? "⟳ Cooking up chaos…" : count === 0 ? "✨ Generate Usernames" : "✨ Generate More"}
            </button>
          </div>

          {/* ── Error ── */}
          {errMsg && (
            <div className="converter-empty-state" role="alert" aria-live="assertive">
              <p>⚠ {errMsg}</p>
            </div>
          )}

          {/* ── Results grid ── */}
          {usernames.length > 0 && !errMsg && (
            <>
              <div
                className="converter-outputs converter-outputs-grid"
                role="region"
                aria-live="polite"
                aria-label="Generated TikTok usernames"
              >
                {usernames.map((u) => (
                  <div
                    key={u.username}
                    className={`converter-output${copied === u.username ? " copied" : ""}`}
                    onClick={() => copyUsername(u.username)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") copyUsername(u.username); }}
                    aria-label={`Copy @${u.username}`}
                    title="Click to copy with @"
                  >
                    <span className="output-label">{u.vibe}</span>
                    <code
                      className="output-code"
                      style={{
                        fontSize: "clamp(14px, 2vw, 20px)",
                        wordBreak: "break-all",
                        letterSpacing: "0",
                      }}
                    >
                      @{u.username}
                    </code>
                    <span className="output-desc">{u.why}</span>
                    {copied === u.username && (
                      <span className="output-feedback">✓ Copied!</span>
                    )}
                  </div>
                ))}
              </div>

              <p style={{ marginTop: 12, fontSize: 12, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>
                Powered by DeepSeek AI · batch #{count} · copies with @ prefix · click to copy
              </p>
            </>
          )}

          {/* ── Empty state ── */}
          {usernames.length === 0 && !errMsg && (
            <div className="converter-empty-state">
              <p>Pick a humor style and click <strong>Generate Usernames</strong></p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function FunnyTikTokUsernamesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* HERO */}
      <section className="hero" aria-labelledby="hero-h1">
        <div className="hero-meta">
          <span className="dot dot-live" /> AI-Powered · 8 per batch · No Signup
        </div>
        <h1 id="hero-h1" className="hero-h1">
          Funny Usernames
          <br />
          <em>for TikTok.</em>
        </h1>
        <p className="hero-sub">
          Generate funny, clever, culturally-aware TikTok handles that people actually follow.
          Powered by DeepSeek AI — no cringe templates, no overused formats.
          8 fresh options per click. Free, no signup.
        </p>
        <div className="hero-cta">
          <a href="#generator" className="btn btn-primary">Generate Usernames →</a>
          <a href="#how-it-works" className="btn btn-ghost">How it works</a>
        </div>
        <ul className="hero-stats" aria-label="Tool highlights">
          <li><strong>8</strong><span>per batch</span></li>
          <li><strong>7</strong><span>humor styles</span></li>
          <li><strong>11</strong><span>niches</span></li>
          <li><strong>Free</strong><span>forever</span></li>
        </ul>
      </section>

      {/* TOOL */}
      <TikTokUsernameSection />

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="why" aria-labelledby="why-h2">
        <span className="eyebrow">/ 01 — How It Works</span>
        <h2 id="why-h2" className="section-h2">Pick your humor. Get 8 handles.</h2>
        <div className="why-grid">
          <article className="why-card">
            <span className="why-num">01</span>
            <h3>Choose Humor Style</h3>
            <p>Self-deprecating, Absurdist, Gen Z Chaotic, Dry & Deadpan, Ironic, Pun-based, or Wholesome Silly. Each style produces a completely different batch.</p>
          </article>
          <article className="why-card">
            <span className="why-num">02</span>
            <h3>Pick Your Niche</h3>
            <p>Food, Fitness, Gaming, Finance, Pets, Fashion, Travel, Mental Health, Dating — or leave it blank for wildcard energy across all topics.</p>
          </article>
          <article className="why-card">
            <span className="why-num">03</span>
            <h3>Add a Keyword</h3>
            <p>Drop in a word you're obsessed with — "raccoon", "chaos", "potato" — and watch the AI build hilarious handles around it.</p>
          </article>
          <article className="why-card">
            <span className="why-num">04</span>
            <h3>Copy with @</h3>
            <p>Click any card to copy the handle with the @ prefix ready to paste. Generate again for a completely fresh batch every time.</p>
          </article>
        </div>
      </section>

      {/* HUMOR STYLES GUIDE */}
      <section className="why" aria-labelledby="styles-h2">
        <span className="eyebrow">/ 02 — Styles</span>
        <h2 id="styles-h2" className="section-h2">What humor style works for TikTok?</h2>
        <div className="formats-container">
          <div className="format-group">
            <h3 className="format-group-title">High-performing styles</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Self-deprecating</strong>
                <p>Handles that poke fun at yourself are instantly relatable. TikTok's algorithm rewards content that makes people feel seen — starting with the username sets the tone.</p>
                <code>Example: professionally_lost · my_therapist_sighed</code>
              </div>
              <div className="format-item">
                <strong>Gen Z Chaotic</strong>
                <p>Brainrot, unhinged, random — this is the dominant TikTok energy in 2024-25. Names that make zero sense but feel exactly right.</p>
                <code>Example: eating_drywall_again · frog.on.mainstreet</code>
              </div>
              <div className="format-item">
                <strong>Absurdist</strong>
                <p>Completely surreal, makes no reference to anything real. The confusion IS the joke. Great for accounts that post unrelated chaos content.</p>
                <code>Example: tuesday_is_a_lie · the_spoon_called</code>
              </div>
            </div>
          </div>

          <div className="format-group">
            <h3 className="format-group-title">Niche-specific tips</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Food & Cooking</strong>
                <p>Food TikTok usernames that work best are either deeply specific ("only_microwave_meals") or chaotically unrelated to food. Avoid generic "foodie" labels.</p>
                <code>Example: i.burned.water · technically_edible</code>
              </div>
              <div className="format-item">
                <strong>Fitness & Gym</strong>
                <p>Gym TikTok has two winning lanes: aggressively dedicated ("squats_before_therapy") or hilariously honest about struggle ("almost_ran_once").</p>
                <code>Example: protein.or.nap · rest_day_every_day</code>
              </div>
              <div className="format-item">
                <strong>Finance & Money</strong>
                <p>Finance TikTok loves ironic broke-person humor. "Accidentally_rich" energy or "explain_it_to_a_5yo" positioning are both very followable.</p>
                <code>Example: financially_confused · roth_ira_is_my_bestie</code>
              </div>
            </div>
          </div>

          <div className="format-group">
            <h3 className="format-group-title">TikTok username rules</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>What is allowed</strong>
                <p>Lowercase letters, numbers, underscores (_), and periods (.). No spaces, no special characters, no emojis in the handle itself.</p>
                <code>Valid: funny.handle_99 · Invalid: funny handle!</code>
              </div>
              <div className="format-item">
                <strong>Character limit</strong>
                <p>TikTok allows up to 24 characters for usernames. Shorter is usually more memorable — aim for under 20 if possible.</p>
                <code>Sweet spot: 10-18 characters</code>
              </div>
              <div className="format-item">
                <strong>How to change it</strong>
                <p>TikTok allows username changes once every 30 days. Choose wisely — but don't overthink it. A handle you love beats a perfect one you'll never pick.</p>
                <code>Settings → Manage account → Username</code>
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
        <h2>Find your TikTok handle right now.</h2>
        <a href="#generator" className="btn btn-primary btn-lg">Generate Usernames Now →</a>
      </section>
    </>
  );
}