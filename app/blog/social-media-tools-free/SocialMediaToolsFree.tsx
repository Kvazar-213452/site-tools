"use client";

import "@/style/home.css";
import "@/style/tools.css";

interface FaqItem { q: string; a: string; }

const SCHEDULING_TOOLS = [
  {
    icon: "B",
    cat: "Scheduling",
    badge: "Free / $6 mo",
    name: "Buffer",
    desc: "Schedule posts across Facebook, Instagram, Twitter/X, LinkedIn, and Pinterest from one dashboard. Free plan supports 3 channels with 10 scheduled posts each. The cleanest, simplest free scheduler available.",
    href: "https://buffer.com",
  },
  {
    icon: "L",
    cat: "Scheduling",
    badge: "Free / $18 mo",
    name: "Later",
    desc: "Visual content calendar for Instagram, TikTok, Pinterest, and LinkedIn. Free plan includes 30 posts/month per profile. Drag-and-drop scheduler with best-time-to-post recommendations.",
    href: "https://later.com",
  },
  {
    icon: "M",
    cat: "Scheduling",
    badge: "Free / $18 mo",
    name: "Metricool",
    desc: "Schedule, analyze, and manage all social platforms plus Google Ads and websites in one place. Free plan supports 1 brand with unlimited scheduling — the most generous free tier in its category.",
    href: "https://metricool.com",
  },
];

const DESIGN_TOOLS = [
  {
    icon: "C",
    cat: "Design",
    badge: "Free / $13 mo",
    name: "Canva",
    desc: "Drag-and-drop graphic design with thousands of social media templates for every platform and format. Free tier includes 1M+ stock photos, 250,000+ templates, and basic AI tools. The most used design tool by social media managers worldwide.",
    href: "https://canva.com",
  },
  {
    icon: "AE",
    cat: "Design",
    badge: "Free / $9.99 mo",
    name: "Adobe Express",
    desc: "Adobe's free-to-start design tool for social media graphics, short videos, and web content. Integrates with Adobe Stock and Firefly AI image generation. Best choice if you're already in the Adobe ecosystem.",
    href: "https://express.adobe.com",
  },
  {
    icon: "U",
    cat: "Photography",
    badge: "Free",
    name: "Unsplash",
    desc: "Over 3 million free, high-resolution photos for commercial use with no attribution required. Essential for any social media manager who needs quality images without a photography budget.",
    href: "https://unsplash.com",
  },
];

const WRITING_TOOLS = [
  {
    icon: "✦",
    cat: "Copywriting",
    badge: "Free / $20 mo",
    name: "ChatGPT",
    desc: "Write social media captions, ad copy, hashtag strategies, bio rewrites, and content calendar ideas. Build a custom prompt template with your brand voice and generate a week of captions in 10 minutes.",
    href: "https://chat.openai.com",
  },
  {
    icon: "G",
    cat: "Editing",
    badge: "Free / $12 mo",
    name: "Grammarly",
    desc: "Grammar, clarity, and tone checker for all your social copy. The free browser extension works in every text field — LinkedIn posts, Twitter threads, Instagram captions, and your social media scheduler.",
    href: "https://grammarly.com",
  },
  {
    icon: "H",
    cat: "Hashtags",
    badge: "Free / $19 mo",
    name: "Hashtagify",
    desc: "Research hashtag popularity, find trending related hashtags, and discover what tags competitors use. Free tier shows basic popularity scores. Saves hours of manual hashtag research every week.",
    href: "https://hashtagify.me",
  },
];

const ANALYTICS_TOOLS = [
  {
    icon: "GA",
    cat: "Analytics",
    badge: "Free",
    name: "Google Analytics",
    desc: "Track which social media platforms drive the most website traffic, conversions, and revenue. Free forever. Create UTM links for every social post to see exactly which content drives results.",
    href: "https://analytics.google.com",
  },
  {
    icon: "MS",
    cat: "Analytics",
    badge: "Free",
    name: "Meta Business Suite",
    desc: "Facebook and Instagram analytics, scheduling, and ad management — completely free. Shows reach, engagement, audience demographics, and best posting times. The most complete free tool for Meta platforms.",
    href: "https://business.facebook.com",
  },
  {
    icon: "SS",
    cat: "Listening",
    badge: "Free",
    name: "Social Searcher",
    desc: "Free social media monitoring tool that tracks brand mentions, competitors, and keywords across platforms in real time. Get instant alerts when people talk about your brand or industry.",
    href: "https://social-searcher.com",
  },
];

const imgStyle: React.CSSProperties = {
  width: "100%", objectFit: "cover", borderRadius: "4px",
  border: "1px solid var(--line)", display: "block",
};

export default function SocialMediaToolsFree({ faq }: { faq: FaqItem[] }) {
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
            <span>Free Social Media Tools</span>
          </div>
        </nav>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
          <span className="tool-cat">Social Media</span>
          <span className="tool-cat">Free Tools</span>
          <span className="tool-cat">Marketing</span>
          <span className="tool-cat">April 30, 2025</span>
        </div>

        <h1 id="article-h1" className="hero-h1">
          Free Social Media<br />
          <em>Tools 2025</em>
        </h1>

        <p className="hero-sub">
          The complete list of 15 free tools to schedule posts, design graphics, write captions,
          and analyze performance — build a professional social media presence without spending a dollar.
        </p>

        <div className="hero-cta">
          <a href="#scheduling-tools" className="btn btn-primary">See the Tools →</a>
          <a href="#faq" className="btn btn-ghost">FAQ</a>
        </div>

        <ul className="hero-stats">
          <li><strong>15</strong><span>free tools</span></li>
          <li><strong>$0</strong><span>minimum cost</span></li>
          <li><strong>4</strong><span>categories</span></li>
          <li><strong>All</strong><span>platforms covered</span></li>
        </ul>
      </section>

      {/* ── FEATURED IMAGE ── */}
      <section className="why" style={{ borderTop: "none", paddingTop: 0, paddingBottom: "32px" }}>
        <figure style={{ margin: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1400&h=580&fit=crop&q=85"
            alt="Social media marketing dashboard showing analytics, scheduling, and content management tools"
            style={{ ...imgStyle, height: "clamp(260px, 38vw, 520px)" }}
            loading="eager"
            decoding="async"
          />
          <figcaption style={{ marginTop: "12px", fontSize: "12px", color: "var(--ink-3)", fontFamily: "var(--mono)" }}>
            A complete social media stack — scheduling, design, writing, and analytics — can be assembled for $0 in 2025.
          </figcaption>
        </figure>
      </section>

      {/* ── INTRO ── */}
      <section className="why" aria-labelledby="intro-h2">
        <span className="eyebrow">/ 00 — The Free Stack</span>
        <h2 id="intro-h2" className="section-h2">
          Professional Social Media<br /><em>Without the Budget</em>
        </h2>
        <p className="section-lede">
          Most paid social media tools have free alternatives that are genuinely good. This is the complete guide to building a $0 professional toolkit.
        </p>
        <div className="seo-copy" style={{ maxWidth: "100%", marginTop: "32px" }}>
          <p>
            The social media tool market is crowded with expensive platforms charging $99–$499/month for
            teams. But for solo creators, small businesses, and freelance social media managers,
            the <strong>free tiers of the right tools cover 90% of daily needs</strong>.
          </p>
          <p>
            The key insight: you need four tool types to run a complete social media operation.
            <strong> Scheduling</strong> (post at the right times without being glued to your phone).
            <strong> Design</strong> (create visuals without a graphic designer).
            <strong> Copywriting</strong> (write captions that get engagement).
            <strong> Analytics</strong> (understand what&apos;s actually working).
          </p>
          <p>
            This guide covers 15 free tools — one for every part of the social media workflow.
            Each entry notes which free tier features are available, what the paid upgrade adds,
            and which tool to use if you can only pick one per category.
          </p>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="why" aria-labelledby="benefits-h2">
        <span className="eyebrow">/ 01 — Why Free Works</span>
        <h2 id="benefits-h2" className="section-h2">
          What You Get with<br /><em>Free Tools in 2025</em>
        </h2>
        <div className="why-grid">
          <article className="why-card">
            <span className="why-num">01</span>
            <h3>Schedule Weeks Ahead</h3>
            <p>Buffer and Later free tiers let you schedule posts days or weeks in advance across multiple platforms — so you batch create once and show up consistently every day.</p>
          </article>
          <article className="why-card">
            <span className="why-num">02</span>
            <h3>Pro-Quality Design</h3>
            <p>Canva&apos;s free tier has over 250,000 templates for every social media format. Non-designers produce professional graphics in 10 minutes that look like agency work.</p>
          </article>
          <article className="why-card">
            <span className="why-num">03</span>
            <h3>AI Caption Writing</h3>
            <p>ChatGPT free tier writes a week of captions in one session. Build a brand voice prompt once, then generate unlimited variations — Instagram, LinkedIn, Twitter, and TikTok formats.</p>
          </article>
          <article className="why-card">
            <span className="why-num">04</span>
            <h3>Full Analytics Access</h3>
            <p>Meta Business Suite, Google Analytics, and each platform&apos;s native analytics are completely free with no limits — showing reach, engagement, demographics, and conversion data.</p>
          </article>
          <article className="why-card">
            <span className="why-num">05</span>
            <h3>Free Stock Photos</h3>
            <p>Unsplash, Pexels, and Pixabay provide millions of high-quality photos free for commercial use. Combine with Canva templates for complete, attribution-free visual content.</p>
          </article>
          <article className="why-card">
            <span className="why-num">06</span>
            <h3>Brand Monitoring</h3>
            <p>Social Searcher and Google Alerts track brand mentions across social platforms and the web in real time — both completely free with no usage limits.</p>
          </article>
        </div>
      </section>

      {/* ── SCHEDULING TOOLS ── */}
      <section id="scheduling-tools" className="tools" aria-labelledby="scheduling-h2">
        <div className="section-head">
          <div>
            <span className="eyebrow">/ 02 — Scheduling Tools</span>
            <h2 id="scheduling-h2" className="section-h2">
              Free Post<br /><em>Schedulers</em>
            </h2>
            <p className="section-lede">Schedule weeks of content in advance, post at optimal times automatically, and manage multiple accounts from one dashboard.</p>
          </div>
        </div>

        <figure style={{ margin: "0 0 32px" }}>
          <img
            src="https://images.unsplash.com/photo-1611162616305-c69b3037c7bb?w=1200&h=380&fit=crop&q=85"
            alt="Social media content calendar and scheduling dashboard — free scheduling tools for social media managers"
            style={{ ...imgStyle, height: "clamp(160px, 24vw, 340px)" }}
            loading="lazy"
          />
        </figure>

        <div className="tool-grid">
          {SCHEDULING_TOOLS.map((tool, i) => (
            <article key={i} className="tool-card">
              <a href={tool.href} target="_blank" rel="noopener noreferrer" className="tool-link"
                aria-label={`${tool.name} — free ${tool.cat} tool for social media`}>
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
          <h3>Buffer vs Later vs Metricool — Which Free Scheduler to Use</h3>
          <p>
            <strong>Buffer</strong> is best if you want the simplest possible experience across the widest
            platform range. <strong>Later</strong> is best for Instagram and TikTok creators who want a
            visual content calendar to plan their grid aesthetics. <strong>Metricool</strong> is best if
            you want the most data — it includes analytics that other free schedulers charge for.
          </p>
          <p>
            All three integrate with Meta Business Suite as a backup for Facebook and Instagram.
            Start with Buffer or Metricool — you can always switch later as your needs grow.
          </p>
        </div>
      </section>

      {/* ── DESIGN TOOLS ── */}
      <section className="tools" aria-labelledby="design-h2">
        <div className="section-head">
          <div>
            <span className="eyebrow">/ 03 — Design Tools</span>
            <h2 id="design-h2" className="section-h2">
              Free Design &amp;<br /><em>Visual Tools</em>
            </h2>
            <p className="section-lede">Create professional social media graphics, videos, and visuals without design skills or a stock photo subscription.</p>
          </div>
        </div>

        <div className="tool-grid">
          {DESIGN_TOOLS.map((tool, i) => (
            <article key={i} className="tool-card">
              <a href={tool.href} target="_blank" rel="noopener noreferrer" className="tool-link"
                aria-label={`${tool.name} — free ${tool.cat} tool for social media`}>
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

      {/* ── WRITING TOOLS ── */}
      <section className="tools" aria-labelledby="writing-h2">
        <div className="section-head">
          <div>
            <span className="eyebrow">/ 04 — Writing Tools</span>
            <h2 id="writing-h2" className="section-h2">
              Free Caption &amp;<br /><em>Copy Tools</em>
            </h2>
            <p className="section-lede">Write engaging captions, research hashtags, and polish every post with AI-powered writing assistance.</p>
          </div>
        </div>

        <div className="tool-grid">
          {WRITING_TOOLS.map((tool, i) => (
            <article key={i} className="tool-card">
              <a href={tool.href} target="_blank" rel="noopener noreferrer" className="tool-link"
                aria-label={`${tool.name} — free ${tool.cat} tool for social media`}>
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
          <h3>The Brand Voice Prompt: Write Captions in Your Voice, Not AI&apos;s</h3>
          <p>
            The biggest mistake when using ChatGPT for social media is asking for captions without context.
            Build a brand voice prompt once and reuse it for every session:
            <em> &quot;Write a [PLATFORM] caption for [TOPIC]. Brand voice: [ADJECTIVES].
            Target audience: [WHO]. Always include a question to drive comments.
            Hashtag strategy: [3 niche + 3 mid + 1 broad]. Length: [CHARS]. Emoji use: [YES/NO].&quot;</em>
          </p>
          <p>
            Save this prompt as a pinned note or Notion page. Every caption request starts with this
            context block — the output will sound like your brand, not like generic AI.
          </p>
        </div>
      </section>

      {/* ── ANALYTICS TOOLS ── */}
      <section className="tools" aria-labelledby="analytics-h2">
        <div className="section-head">
          <div>
            <span className="eyebrow">/ 05 — Analytics Tools</span>
            <h2 id="analytics-h2" className="section-h2">
              Free Social Media<br /><em>Analytics</em>
            </h2>
            <p className="section-lede">Understand what content works, which platforms convert, and when your audience is most active — all without paying for analytics software.</p>
          </div>
        </div>

        <div className="tool-grid">
          {ANALYTICS_TOOLS.map((tool, i) => (
            <article key={i} className="tool-card">
              <a href={tool.href} target="_blank" rel="noopener noreferrer" className="tool-link"
                aria-label={`${tool.name} — free ${tool.cat} tool for social media`}>
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
        <span className="eyebrow">/ 06 — FAQ</span>
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
          Build your free<br /><em>social media toolkit today</em>
        </h2>
        <p style={{ color: "var(--ink-2)", fontSize: "16px", maxWidth: "520px", margin: "0 auto 40px" }}>
          Explore our free AI-powered generators — write bio ideas, username suggestions, and content ideas in seconds.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/tools" className="btn btn-primary btn-lg">Explore Free Tools →</a>
          <a href="/blog" className="btn btn-ghost btn-lg">More Guides</a>
        </div>
      </section>
    </>
  );
}
