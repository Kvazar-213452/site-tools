"use client";

import "@/style/home.css";
import "@/style/tools.css";

interface FaqItem { q: string; a: string; }

const TITLE_TOOLS = [
  {
    icon: "V",
    cat: "Keyword Research",
    badge: "Free / $7.50 mo",
    name: "VidIQ",
    desc: "Scores any title for keyword strength, shows search volume vs competition, and suggests related keywords. Use the Score feature to compare title variations before publishing.",
    href: "https://vidiq.com",
  },
  {
    icon: "T",
    cat: "A/B Testing",
    badge: "Free / $4.99 mo",
    name: "TubeBuddy",
    desc: "The only YouTube tool that A/B tests titles and thumbnails on real traffic. Shows which title version drives more clicks with statistical significance — the most direct way to improve CTR.",
    href: "https://tubebuddy.com",
  },
  {
    icon: "✦",
    cat: "Title Writing",
    badge: "Free / $20 mo",
    name: "ChatGPT",
    desc: "Generate 20 title variations in 30 seconds. Provide your topic, keyword, and 3 example titles from top-performing videos in your niche — ask for variations using different emotional triggers and formulas.",
    href: "https://chat.openai.com",
  },
];

const FORMULAS = [
  { num: "01", name: "The Number List", example: "7 Python Tricks That 10× Your Code Speed", why: "Numbers signal specificity. Viewers know exactly what they're getting. Odd numbers (5, 7, 9) test slightly better than even." },
  { num: "02", name: "The How-To", example: "How to Lose 10kg Without Going to the Gym", why: "Directly matches 'how to' search intent. Add a specific result or constraint to differentiate from 100 other how-to videos on the same topic." },
  { num: "03", name: "The Curiosity Gap", example: "The YouTube Mistake Nobody Talks About (Costs You Views)", why: "Creates an information gap the viewer must close by watching. Works best when the 'secret' is genuinely non-obvious — not clickbait." },
  { num: "04", name: "Personal Story + Result", example: "I Posted Every Day for 365 Days — Here's What Happened", why: "Combines personal narrative with a compelling outcome. The vulnerability of 'I' builds trust; the specific result (365 days) sets stakes." },
  { num: "05", name: "The Warning / Mistake", example: "Stop Making This Resume Mistake (It's Costing You Jobs)", why: "Pain-point framing — fear of loss is a stronger motivator than potential gain. Works in any niche where common mistakes exist." },
  { num: "06", name: "Comparison / Versus", example: "React vs Vue in 2025 — Which Should You Learn?", why: "Targets high-intent searches from people actively deciding. The year makes it feel current. Questions in titles drive higher CTR than statements." },
];

const POWER_WORDS = [
  { category: "Urgency", words: ["Finally", "Now", "Today", "Before You", "Stop", "Last Chance"] },
  { category: "Exclusivity", words: ["Secret", "Hidden", "Nobody Talks About", "Most People Don't Know", "Insider"] },
  { category: "Superlative", words: ["Best", "Worst", "Fastest", "Easiest", "Most Powerful", "Ultimate"] },
  { category: "Specificity", words: ["Exactly", "Step-by-Step", "Complete", "Full", "Real", "Actual"] },
  { category: "Curiosity", words: ["Why", "How", "What Happens When", "The Truth About", "This Changes Everything"] },
  { category: "Personal", words: ["I Tried", "My", "I Made", "How I", "Why I Quit", "After 30 Days"] },
];

const BEFORE_AFTER = [
  {
    before: "How to Make Money Online",
    after: "How I Made $4,200 in My First Month Freelancing (No Experience)",
    why: "Specific income figure + timeframe + relatable constraint turns a generic title into a compelling personal story.",
  },
  {
    before: "Python Tutorial for Beginners",
    after: "Learn Python in 4 Hours — The Only Tutorial You'll Need (2025)",
    why: "Specific timeframe + bold benefit claim + year signal creates urgency and positions it as the definitive resource.",
  },
  {
    before: "Best Budget Laptops",
    after: "7 Best Laptops Under $600 in 2025 — I Tested Them All",
    why: "Number + specific price constraint + year + personal testing adds credibility and search specificity.",
  },
  {
    before: "Productivity Tips",
    after: "I Used These 5 Productivity Systems for 90 Days — Here Are My Results",
    why: "Personal experiment + specific duration + promised result turns advice into a story people are curious about.",
  },
];

const imgStyle: React.CSSProperties = {
  width: "100%", objectFit: "cover", borderRadius: "4px",
  border: "1px solid var(--line)", display: "block",
};

export default function HowToWriteYoutubeTitles({ faq }: { faq: FaqItem[] }) {
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
            <span>How to Write YouTube Titles</span>
          </div>
        </nav>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
          <span className="tool-cat">YouTube</span>
          <span className="tool-cat">SEO</span>
          <span className="tool-cat">CTR Optimization</span>
          <span className="tool-cat">April 30, 2025</span>
        </div>

        <h1 id="article-h1" className="hero-h1">
          How to Write<br />
          <em>YouTube Titles</em>
        </h1>

        <p className="hero-sub">
          The complete guide to writing YouTube titles that maximize click-through rate — 6 proven formulas,
          30+ power words, real before/after examples, and AI tools to test what works.
        </p>

        <div className="hero-cta">
          <a href="#formulas" className="btn btn-primary">See the Formulas →</a>
          <a href="#before-after" className="btn btn-ghost">Before &amp; After Examples</a>
        </div>

        <ul className="hero-stats">
          <li><strong>6</strong><span>title formulas</span></li>
          <li><strong>30+</strong><span>power words</span></li>
          <li><strong>4%→8%</strong><span>avg CTR gain</span></li>
          <li><strong>60 ch</strong><span>ideal length</span></li>
        </ul>
      </section>

      {/* ── FEATURED IMAGE ── */}
      <section className="why" style={{ borderTop: "none", paddingTop: 0, paddingBottom: "32px" }}>
        <figure style={{ margin: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1400&h=580&fit=crop&q=85"
            alt="YouTube channel interface showing video thumbnails and titles — guide to writing click-worthy YouTube titles"
            style={{ ...imgStyle, height: "clamp(260px, 38vw, 520px)" }}
            loading="eager"
            decoding="async"
          />
          <figcaption style={{ marginTop: "12px", fontSize: "12px", color: "var(--ink-3)", fontFamily: "var(--mono)" }}>
            Your title and thumbnail are the only two things YouTube shows before someone decides to click. Both must work together.
          </figcaption>
        </figure>
      </section>

      {/* ── INTRO ── */}
      <section className="why" aria-labelledby="intro-h2">
        <span className="eyebrow">/ 00 — Why Titles Matter</span>
        <h2 id="intro-h2" className="section-h2">
          The Title Is Half<br /><em>Your Video&apos;s Performance</em>
        </h2>
        <p className="section-lede">
          Click-through rate (CTR) determines how many people YouTube shows your video to. Your title is one of two variables that drive it — the other is your thumbnail.
        </p>
        <div className="seo-copy" style={{ maxWidth: "100%", marginTop: "32px" }}>
          <p>
            YouTube&apos;s algorithm uses CTR as a signal of video quality. A video with a <strong>7% CTR</strong>
            gets shown to significantly more people than the same video with a 3% CTR — even if the watch time
            is identical. The title is the single highest-leverage optimization most creators neglect.
          </p>
          <p>
            The average YouTube CTR across all channels is <strong>4–5%</strong>. A well-optimized title on a
            well-targeted topic can push CTR to <strong>8–12%</strong> — meaning 2–3× more impressions convert
            to views. That&apos;s free growth from a 30-second title rewrite.
          </p>
          <p>
            A great YouTube title does three things simultaneously:
            <strong> ranks for a specific keyword</strong> (so YouTube shows it to people searching that topic),
            <strong> creates click motivation</strong> (curiosity, benefit, urgency, or social proof), and
            <strong> sets accurate expectations</strong> (so watch time stays high, not just CTR).
            This guide covers exactly how to achieve all three.
          </p>
        </div>
      </section>

      {/* ── ANATOMY ── */}
      <section className="why" aria-labelledby="anatomy-h2">
        <span className="eyebrow">/ 01 — Title Anatomy</span>
        <h2 id="anatomy-h2" className="section-h2">
          What Every Great Title<br /><em>Has in Common</em>
        </h2>
        <div className="why-grid">
          <article className="why-card">
            <span className="why-num">01</span>
            <h3>Keyword First</h3>
            <p>Put your primary keyword in the first 40 characters. YouTube truncates titles in search — your keyword must appear before any cutoff. It also signals relevance to the algorithm immediately.</p>
          </article>
          <article className="why-card">
            <span className="why-num">02</span>
            <h3>Specific Over Vague</h3>
            <p>&quot;7 Python Tricks Senior Devs Use Daily&quot; dramatically outperforms &quot;Python Tips.&quot; Specificity sets expectations, filters for the right audience, and signals credibility.</p>
          </article>
          <article className="why-card">
            <span className="why-num">03</span>
            <h3>Under 60 Characters</h3>
            <p>YouTube shows approximately 60 characters in search results and 70 on desktop browse. Write the full title, then trim. The most important information must land before any truncation.</p>
          </article>
          <article className="why-card">
            <span className="why-num">04</span>
            <h3>Emotional Trigger</h3>
            <p>Every great title activates an emotion: curiosity (&quot;Nobody talks about...&quot;), fear of loss (&quot;Stop doing X&quot;), aspiration (&quot;How I achieved Y&quot;), or urgency (&quot;Before you do Z&quot;).</p>
          </article>
          <article className="why-card">
            <span className="why-num">05</span>
            <h3>Honest Framing</h3>
            <p>Clickbait hurts long-term growth by increasing abandonment rate, which signals poor quality to the algorithm. Titles must be compelling AND accurate — high CTR with high watch time wins.</p>
          </article>
          <article className="why-card">
            <span className="why-num">06</span>
            <h3>Match Search Intent</h3>
            <p>A tutorial title should feel like a tutorial. A story title should feel like a story. Mismatched intent (using &quot;How to&quot; for a rant video) confuses both viewers and the algorithm.</p>
          </article>
        </div>
      </section>

      {/* ── FORMULAS ── */}
      <section id="formulas" className="why" aria-labelledby="formulas-h2">
        <span className="eyebrow">/ 02 — Title Formulas</span>
        <h2 id="formulas-h2" className="section-h2">
          6 Proven Title Formulas<br /><em>That Drive Clicks</em>
        </h2>
        <p className="section-lede">
          These formulas are derived from analyzing millions of high-CTR YouTube videos. Pick the formula that matches your content type and fill in your specifics.
        </p>
        <div className="why-grid">
          {FORMULAS.map((f, i) => (
            <article key={i} className="why-card">
              <span className="why-num">{f.num}</span>
              <h3>{f.name}</h3>
              <p style={{ marginBottom: "12px" }}><em style={{ color: "var(--accent)", fontStyle: "normal", fontSize: "13px" }}>&quot;{f.example}&quot;</em></p>
              <p>{f.why}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── POWER WORDS ── */}
      <section className="why" aria-labelledby="power-h2">
        <span className="eyebrow">/ 03 — Power Words</span>
        <h2 id="power-h2" className="section-h2">
          30+ Power Words That<br /><em>Boost Click-Through Rate</em>
        </h2>
        <p className="section-lede">
          Power words increase emotional resonance and create cognitive urgency — they make viewers feel something before they&apos;ve even watched a frame.
        </p>
        <div className="seo-copy" style={{ maxWidth: "100%", marginTop: "32px" }}>
          {POWER_WORDS.map((group, i) => (
            <div key={i} style={{ marginBottom: "20px" }}>
              <strong style={{ color: "var(--accent)", fontFamily: "var(--mono)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {group.category}
              </strong>
              <p style={{ marginTop: "8px" }}>
                {group.words.join(" · ")}
              </p>
            </div>
          ))}
          <p style={{ marginTop: "24px" }}>
            <strong>Important:</strong> Power words work when they&apos;re accurate. Using &quot;Secret&quot;
            implies you&apos;re revealing something genuinely non-obvious. Using &quot;Finally&quot; implies a
            long-awaited solution. Misusing power words for generic content trains your audience to ignore
            them — and trains YouTube to treat your CTR as artificial signal.
          </p>
        </div>
      </section>

      {/* ── BEFORE / AFTER ── */}
      <section id="before-after" className="why" aria-labelledby="examples-h2">
        <span className="eyebrow">/ 04 — Before &amp; After</span>
        <h2 id="examples-h2" className="section-h2">
          Real Title Rewrites<br /><em>That Doubled CTR</em>
        </h2>
        <p className="section-lede">
          The difference between a 3% CTR title and an 8% CTR title is usually specificity, emotion, or search-intent alignment — not length or cleverness.
        </p>
        <div className="seo-copy" style={{ maxWidth: "100%", marginTop: "32px" }}>
          {BEFORE_AFTER.map((item, i) => (
            <div key={i} style={{ marginBottom: "32px", paddingBottom: "32px", borderBottom: i < BEFORE_AFTER.length - 1 ? "1px solid var(--line)" : "none" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "12px" }}>
                <div style={{ padding: "16px", background: "var(--bg)", border: "1px solid var(--line)", borderRadius: "4px" }}>
                  <span style={{ fontSize: "11px", color: "var(--ink-3)", fontFamily: "var(--mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Before</span>
                  <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--ink-2)" }}>{item.before}</p>
                </div>
                <div style={{ padding: "16px", background: "color-mix(in srgb, var(--accent) 8%, var(--surface))", border: "1px solid var(--accent)", borderRadius: "4px" }}>
                  <span style={{ fontSize: "11px", color: "var(--accent)", fontFamily: "var(--mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}>After</span>
                  <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--ink)", fontWeight: 500 }}>{item.after}</p>
                </div>
              </div>
              <p style={{ fontSize: "13px", color: "var(--ink-2)", lineHeight: 1.6 }}><strong>Why it works:</strong> {item.why}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── AI TOOLS ── */}
      <section className="tools" aria-labelledby="tools-h2">
        <div className="section-head">
          <div>
            <span className="eyebrow">/ 05 — AI Title Tools</span>
            <h2 id="tools-h2" className="section-h2">
              Tools to Write &amp;<br /><em>Test Better Titles</em>
            </h2>
            <p className="section-lede">Research keywords, generate variations with AI, and A/B test on real traffic to find what actually works for your channel.</p>
          </div>
        </div>

        <figure style={{ margin: "0 0 32px" }}>
          <img
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=360&fit=crop&q=85"
            alt="Person writing YouTube titles on laptop with keyword research and AI writing tools open"
            style={{ ...imgStyle, height: "clamp(160px, 22vw, 320px)" }}
            loading="lazy"
          />
        </figure>

        <div className="tool-grid">
          {TITLE_TOOLS.map((tool, i) => (
            <article key={i} className="tool-card">
              <a href={tool.href} target="_blank" rel="noopener noreferrer" className="tool-link"
                aria-label={`${tool.name} — ${tool.cat} tool for YouTube titles`}>
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
          <h3>The ChatGPT Title Generation Prompt</h3>
          <p>
            Copy this prompt and fill in the brackets. It consistently produces 15–20 usable title variations in one shot:
          </p>
          <p>
            <em>&quot;I&apos;m writing a YouTube video about [TOPIC]. My target keyword is [KEYWORD].
            My audience is [AUDIENCE DESCRIPTION]. My channel style is [TONE: casual/educational/entertaining].
            Write 20 YouTube title variations using these formulas: numbered list, how-to, curiosity gap,
            personal story, warning/mistake, and comparison. Keep each title under 60 characters.
            Include the target keyword naturally in each title. Mix different emotional triggers.&quot;</em>
          </p>
          <p>
            Run the top 5 results through <strong>VidIQ</strong> to check keyword scores, then pick the top 2
            and A/B test with <strong>TubeBuddy</strong> after publishing. Let the data tell you which title works —
            <strong> your gut is wrong more often than you think</strong>.
          </p>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="why" aria-labelledby="mistakes-h2">
        <span className="eyebrow">/ 06 — Common Mistakes</span>
        <h2 id="mistakes-h2" className="section-h2">
          7 YouTube Title Mistakes<br /><em>Killing Your CTR</em>
        </h2>
        <div className="why-grid">
          <article className="why-card">
            <span className="why-num">✗</span>
            <h3>Over 70 Characters</h3>
            <p>Long titles get cut off in search results. Viewers can&apos;t read your full value proposition. Every extra word after 60 characters adds friction without adding benefit.</p>
          </article>
          <article className="why-card">
            <span className="why-num">✗</span>
            <h3>Channel Name in Title</h3>
            <p>YouTube already shows your channel name next to the title. Repeating it wastes 10–15 characters that could go toward your keyword or value proposition.</p>
          </article>
          <article className="why-card">
            <span className="why-num">✗</span>
            <h3>Episode Numbers Only</h3>
            <p>&quot;Podcast Episode 47&quot; tells a viewer nothing about whether this video is relevant to them. Always include the topic — episode numbers belong in descriptions.</p>
          </article>
          <article className="why-card">
            <span className="why-num">✗</span>
            <h3>Vague Adjectives</h3>
            <p>&quot;Amazing&quot;, &quot;Great&quot;, &quot;Incredible&quot; don&apos;t differentiate your video or trigger specific emotions. Replace with specific benefits: &quot;2× faster&quot;, &quot;without paying&quot;, &quot;in 10 minutes.&quot;</p>
          </article>
          <article className="why-card">
            <span className="why-num">✗</span>
            <h3>Keyword Stuffing</h3>
            <p>&quot;Python Tutorial Python Programming Python for Beginners 2025&quot; reads as spam to viewers and gets flagged by YouTube&apos;s algorithm. One primary keyword, used naturally, is enough.</p>
          </article>
          <article className="why-card">
            <span className="why-num">✗</span>
            <h3>Pure Clickbait</h3>
            <p>Titles that overpromise and underdeliver spike CTR but crater watch time. The algorithm learns this pattern quickly and reduces distribution — high CTR + low watch time = algorithm penalty.</p>
          </article>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="faq" aria-labelledby="faq-h2">
        <span className="eyebrow">/ 07 — FAQ</span>
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
          Ready to write titles<br /><em>that actually get clicked?</em>
        </h2>
        <p style={{ color: "var(--ink-2)", fontSize: "16px", maxWidth: "520px", margin: "0 auto 40px" }}>
          Explore our free AI tools — generate content ideas, username suggestions, and more without signing up.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/tools" className="btn btn-primary btn-lg">Try Free Tools →</a>
          <a href="/blog/ai-tools-for-youtube" className="btn btn-ghost btn-lg">AI Tools for YouTube</a>
        </div>
      </section>
    </>
  );
}
