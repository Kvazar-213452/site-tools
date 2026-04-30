"use client";

import "@/style/home.css";
import "@/style/tools.css";

interface FaqItem { q: string; a: string; }

const EDITING_TOOLS = [
  {
    icon: "C",
    cat: "Editing",
    badge: "Free",
    name: "CapCut AI",
    desc: "The most powerful free TikTok video editor — built by ByteDance. AI auto-captions, background removal, smart cut, beat sync, trending templates, and text-to-video. Optimizes exports for TikTok's algorithm.",
    href: "https://capcut.com",
  },
  {
    icon: "O",
    cat: "Repurposing",
    badge: "Free / $15 mo",
    name: "Opus Clip",
    desc: "Turn long videos into short TikTok clips automatically. AI finds the most engaging moments, adds captions, reformats to 9:16 vertical, and scores each clip's viral potential before you post.",
    href: "https://opus.pro",
  },
  {
    icon: "R",
    cat: "Visual Effects",
    badge: "$12 mo",
    name: "Runway ML",
    desc: "Cinematic AI video effects for TikTok — generate video from text, remove backgrounds without green screen, create slow motion, apply style transfers, and produce AI transitions that stop the scroll.",
    href: "https://runwayml.com",
  },
];

const CONTENT_TOOLS = [
  {
    icon: "✦",
    cat: "Copywriting",
    badge: "Free / $20 mo",
    name: "ChatGPT",
    desc: "Write scroll-stopping TikTok hooks, caption variations, hashtag strategies, video scripts, and content series ideas. Give it your niche and ask for 20 hook variations — test what gets highest completion rate.",
    href: "https://chat.openai.com",
  },
  {
    icon: "EL",
    cat: "Voiceover",
    badge: "Free / $5 mo",
    name: "ElevenLabs",
    desc: "Generate hyper-realistic AI voiceovers for faceless TikTok channels. Clone your own voice for consistent branding, or choose from 300+ voices in 29 languages for international reach.",
    href: "https://elevenlabs.io",
  },
  {
    icon: "CA",
    cat: "Design",
    badge: "Free / $13 mo",
    name: "Canva AI",
    desc: "Create TikTok cover images, graphics, and overlay text with thousands of templates. Magic Edit, background removal, and AI image generation make professional visuals accessible to any creator.",
    href: "https://canva.com",
  },
];

const GROWTH_TOOLS = [
  {
    icon: "L",
    cat: "Scheduling",
    badge: "Free / $18 mo",
    name: "Later",
    desc: "Schedule TikTok posts at optimal times, plan your content calendar visually, and get AI-suggested captions based on your brand. The free plan covers 1 profile with 30 posts per month.",
    href: "https://later.com",
  },
  {
    icon: "TC",
    cat: "Trends",
    badge: "Free",
    name: "TikTok Creative Center",
    desc: "TikTok's own free analytics tool — discover trending sounds, hashtags, and content formats in real time, filtered by country and category. Essential for riding trends before they peak.",
    href: "https://ads.tiktok.com/business/creativecenter",
  },
  {
    icon: "ET",
    cat: "Analytics",
    badge: "Free / $49 mo",
    name: "Exploding Topics",
    desc: "Identify trending topics 6–18 months before they peak on mainstream platforms. Find the next viral TikTok niche before your competitors do and build authority early.",
    href: "https://explodingtopics.com",
  },
];

const imgStyle: React.CSSProperties = {
  width: "100%", objectFit: "cover", borderRadius: "4px",
  border: "1px solid var(--line)", display: "block",
};

export default function AiToolsForTikTok({ faq }: { faq: FaqItem[] }) {
  return (
    <>
      {/* ── HERO ── */}
      <section className="hero" aria-labelledby="article-h1">
        <nav aria-label="Breadcrumb">
          <div className="hero-meta">
            <span className="dot dot-live" />
            <a href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</a>
            <span style={{ color: "var(--ink-3)" }}>/</span>
            <a href="/blog" style={{ color: "inherit", textDecoration: "none" }}>Blog</a>
            <span style={{ color: "var(--ink-3)" }}>/</span>
            <span>AI Tools for TikTok</span>
          </div>
        </nav>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
          <span className="tool-cat">TikTok</span>
          <span className="tool-cat">Short-Form Video</span>
          <span className="tool-cat">AI Tools</span>
          <span className="tool-cat">April 30, 2025</span>
        </div>

        <h1 id="article-h1" className="hero-h1">
          AI Tools for<br />
          <em>TikTok 2025</em>
        </h1>

        <p className="hero-sub">
          The complete guide to 12 AI tools for TikTok — automate editing, write viral hooks,
          generate voiceovers, spot trends early, and grow your account faster without burning out.
        </p>

        <div className="hero-cta">
          <a href="#editing-tools" className="btn btn-primary">Browse Tools →</a>
          <a href="#faq" className="btn btn-ghost">FAQ</a>
        </div>

        <ul className="hero-stats">
          <li><strong>12</strong><span>tools reviewed</span></li>
          <li><strong>Free</strong><span>options exist</span></li>
          <li><strong>3</strong><span>categories</span></li>
          <li><strong>1B+</strong><span>TikTok users</span></li>
        </ul>
      </section>

      {/* ── FEATURED IMAGE ── */}
      <section className="why" style={{ borderTop: "none", paddingTop: 0, paddingBottom: "32px" }}>
        <figure style={{ margin: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1611605698335-8b1569810432?w=1400&h=580&fit=crop&q=85"
            alt="Person using smartphone to create TikTok content with AI video editing tools"
            style={{ ...imgStyle, height: "clamp(260px, 38vw, 520px)" }}
            loading="eager"
            decoding="async"
          />
          <figcaption style={{ marginTop: "12px", fontSize: "12px", color: "var(--ink-3)", fontFamily: "var(--mono)" }}>
            TikTok&apos;s algorithm rewards consistency and engagement — AI tools make both achievable for solo creators.
          </figcaption>
        </figure>
      </section>

      {/* ── INTRO ── */}
      <section className="why" aria-labelledby="intro-h2">
        <span className="eyebrow">/ 00 — Why AI for TikTok</span>
        <h2 id="intro-h2" className="section-h2">
          TikTok Rewards<br /><em>Speed &amp; Volume</em>
        </h2>
        <p className="section-lede">
          Top TikTok accounts post 1–3 times per day. AI tools are the only way to maintain that cadence as a solo creator without compromising quality.
        </p>
        <div className="seo-copy" style={{ maxWidth: "100%", marginTop: "32px" }}>
          <p>
            TikTok&apos;s algorithm is uniquely merit-based — a new account&apos;s video can reach millions of
            people if the engagement signals are strong. This means <strong>the first 2 seconds (the hook)
            and the completion rate</strong> matter more than follower count. AI tools directly improve both.
          </p>
          <p>
            <strong>CapCut AI</strong> edits a raw clip into a polished, captioned TikTok in under 10 minutes.
            <strong> ChatGPT</strong> writes 20 hook variations until you find one that grabs attention.
            <strong> Opus Clip</strong> turns one interview into 10 clips. <strong>TikTok Creative Center</strong>
            shows you exactly which sounds and formats are trending before you create.
          </p>
          <p>
            This guide covers the 12 best AI tools across three TikTok creator workflows:
            <strong> video editing &amp; effects</strong> (produce polished content fast),
            <strong> caption &amp; script writing</strong> (maximize hooks and engagement), and
            <strong> growth &amp; scheduling</strong> (publish consistently at the right times).
          </p>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="why" aria-labelledby="benefits-h2">
        <span className="eyebrow">/ 01 — What AI Changes</span>
        <h2 id="benefits-h2" className="section-h2">
          How AI Gives TikTok<br /><em>Creators an Edge</em>
        </h2>
        <div className="why-grid">
          <article className="why-card">
            <span className="why-num">01</span>
            <h3>Faster Editing</h3>
            <p>CapCut AI auto-captions, removes backgrounds, syncs to beat, and applies trending effects in minutes — work that used to take hours of manual editing in Premiere Pro.</p>
          </article>
          <article className="why-card">
            <span className="why-num">02</span>
            <h3>Hook Writing at Scale</h3>
            <p>ChatGPT generates 20 hook variations for any video topic in 30 seconds. Test different angles, emotions, and formats until you find what resonates with your audience.</p>
          </article>
          <article className="why-card">
            <span className="why-num">03</span>
            <h3>Faceless Channels</h3>
            <p>ElevenLabs voiceovers + Runway ML visuals + CapCut editing = a complete TikTok production pipeline that requires zero on-camera presence. Perfect for privacy-first creators.</p>
          </article>
          <article className="why-card">
            <span className="why-num">04</span>
            <h3>Trend Detection</h3>
            <p>TikTok Creative Center and Exploding Topics reveal what sounds, formats, and topics are trending before they peak — letting you create relevant content early instead of chasing trends.</p>
          </article>
          <article className="why-card">
            <span className="why-num">05</span>
            <h3>Content Repurposing</h3>
            <p>Opus Clip turns a 30-minute podcast or YouTube video into 10 TikTok-ready clips with captions and optimal framing. One long recording = one week of daily TikTok content.</p>
          </article>
          <article className="why-card">
            <span className="why-num">06</span>
            <h3>Consistent Publishing</h3>
            <p>Later AI schedules TikToks at peak engagement times automatically. Combined with batch-produced AI content, posting daily becomes a 30-minute weekly task instead of a daily grind.</p>
          </article>
        </div>
      </section>

      {/* ── EDITING TOOLS ── */}
      <section id="editing-tools" className="tools" aria-labelledby="edit-h2">
        <div className="section-head">
          <div>
            <span className="eyebrow">/ 02 — Editing &amp; Effects</span>
            <h2 id="edit-h2" className="section-h2">
              AI Video Editing<br /><em>Tools</em>
            </h2>
            <p className="section-lede">Edit raw footage into polished TikToks, add cinematic effects, and repurpose long content into short viral clips.</p>
          </div>
        </div>

        <figure style={{ margin: "0 0 32px" }}>
          <img
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=380&fit=crop&q=85"
            alt="Smartphone showing short-form video editing interface — AI TikTok editing tools"
            style={{ ...imgStyle, height: "clamp(160px, 24vw, 340px)" }}
            loading="lazy"
          />
        </figure>

        <div className="tool-grid">
          {EDITING_TOOLS.map((tool, i) => (
            <article key={i} className="tool-card">
              <a href={tool.href} target="_blank" rel="noopener noreferrer" className="tool-link"
                aria-label={`${tool.name} — ${tool.cat} tool for TikTok`}>
                <div className="tool-top">
                  <span className="tool-icon">{tool.icon}</span>
                  <span className="tool-cat">{tool.badge}</span>
                </div>
                <h3 className="tool-name">{tool.name}</h3>
                <p className="tool-desc">{tool.desc}</p>
                <div className="tool-arrow">
                  <span className="tool-cat">{tool.cat}</span>
                  <span>→</span>
                </div>
              </a>
            </article>
          ))}
        </div>

        <div className="seo-copy" style={{ marginTop: "40px" }}>
          <h3>Why CapCut Is the #1 Free TikTok Tool</h3>
          <p>
            CapCut is made by ByteDance — the same company that owns TikTok. This means CapCut templates,
            effects, and sounds are <strong>natively optimized for TikTok&apos;s algorithm</strong>.
            Videos edited in CapCut and exported directly to TikTok consistently see higher reach than
            videos edited in third-party tools, likely because CapCut uses TikTok-native encoding.
          </p>
          <p>
            The AI auto-caption feature alone is worth the price of admission (free). Captions increase
            completion rates by 15–25% because many users watch TikTok without sound.
            <strong> Always caption your TikToks.</strong>
          </p>
        </div>
      </section>

      {/* ── CONTENT TOOLS ── */}
      <section className="tools" aria-labelledby="content-h2">
        <div className="section-head">
          <div>
            <span className="eyebrow">/ 03 — Writing &amp; Voiceover</span>
            <h2 id="content-h2" className="section-h2">
              AI Caption &amp;<br /><em>Voice Tools</em>
            </h2>
            <p className="section-lede">Write hooks that stop the scroll, generate captions at scale, and create studio-quality voiceovers without recording equipment.</p>
          </div>
        </div>

        <div className="tool-grid">
          {CONTENT_TOOLS.map((tool, i) => (
            <article key={i} className="tool-card">
              <a href={tool.href} target="_blank" rel="noopener noreferrer" className="tool-link"
                aria-label={`${tool.name} — ${tool.cat} tool for TikTok`}>
                <div className="tool-top">
                  <span className="tool-icon">{tool.icon}</span>
                  <span className="tool-cat">{tool.badge}</span>
                </div>
                <h3 className="tool-name">{tool.name}</h3>
                <p className="tool-desc">{tool.desc}</p>
                <div className="tool-arrow">
                  <span className="tool-cat">{tool.cat}</span>
                  <span>→</span>
                </div>
              </a>
            </article>
          ))}
        </div>

        <div className="seo-copy" style={{ marginTop: "40px" }}>
          <h3>The TikTok Hook Formula That Works in 2025</h3>
          <p>
            The best TikTok hooks answer <em>&quot;Why should I keep watching?&quot;</em> in under 2 seconds.
            Proven formats: <strong>&quot;Nobody talks about this, but...&quot;</strong> (forbidden knowledge),
            <strong> &quot;I tried [X] for 30 days and...&quot;</strong> (personal experiment),
            <strong> &quot;Stop doing [common mistake]&quot;</strong> (pain-point correction).
          </p>
          <p>
            Use ChatGPT: <em>&quot;Write 15 TikTok hook variations for a video about [TOPIC]. My target audience
            is [AUDIENCE]. Use different emotional triggers: curiosity, fear of missing out, controversy,
            and surprise. Keep each hook under 10 words.&quot;</em>
            Test 3–5 hooks per topic and double down on what gets the highest 3-second view rate.
          </p>
        </div>
      </section>

      {/* ── GROWTH TOOLS ── */}
      <section className="tools" aria-labelledby="growth-h2">
        <div className="section-head">
          <div>
            <span className="eyebrow">/ 04 — Growth &amp; Scheduling</span>
            <h2 id="growth-h2" className="section-h2">
              TikTok Growth<br /><em>Tools</em>
            </h2>
            <p className="section-lede">Schedule posts at peak times, detect trends before they peak, and analyze what content actually drives follower growth.</p>
          </div>
        </div>

        <div className="tool-grid">
          {GROWTH_TOOLS.map((tool, i) => (
            <article key={i} className="tool-card">
              <a href={tool.href} target="_blank" rel="noopener noreferrer" className="tool-link"
                aria-label={`${tool.name} — ${tool.cat} tool for TikTok`}>
                <div className="tool-top">
                  <span className="tool-icon">{tool.icon}</span>
                  <span className="tool-cat">{tool.badge}</span>
                </div>
                <h3 className="tool-name">{tool.name}</h3>
                <p className="tool-desc">{tool.desc}</p>
                <div className="tool-arrow">
                  <span className="tool-cat">{tool.cat}</span>
                  <span>→</span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="faq" aria-labelledby="faq-h2">
        <span className="eyebrow">/ 05 — FAQ</span>
        <h2 id="faq-h2" className="section-h2">Frequently Asked<br /><em>Questions</em></h2>
        <div className="faq-list">
          {faq.map((item, i) => (
            <details key={i} className="faq-item">
              <summary>
                <span className="faq-q">{item.q}</span>
                <span className="faq-toggle" aria-hidden="true">+</span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta" aria-labelledby="cta-h2">
        <h2 id="cta-h2">
          Ready to grow your<br /><em>TikTok with AI?</em>
        </h2>
        <p style={{ color: "var(--ink-2)", fontSize: "16px", maxWidth: "520px", margin: "0 auto 40px" }}>
          Try our free AI-powered tools — generate usernames, content ideas, and captions for TikTok in seconds.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/tools/generator/tiktok-username-generator" className="btn btn-primary btn-lg">TikTok Username Generator →</a>
          <a href="/tools" className="btn btn-ghost btn-lg">All Tools</a>
        </div>
      </section>
    </>
  );
}
