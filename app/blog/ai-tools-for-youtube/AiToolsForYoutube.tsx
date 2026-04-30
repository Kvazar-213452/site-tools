"use client";

import "@/style/home.css";
import "@/style/tools.css";

interface FaqItem { q: string; a: string; }

const SEO_TOOLS = [
  {
    icon: "V",
    cat: "SEO & Analytics",
    badge: "Free / $7.50 mo",
    name: "VidIQ",
    desc: "AI-powered YouTube analytics and keyword research. Shows keyword score, search volume, competition, and daily video ideas. Grades your video optimization before you publish.",
    href: "https://vidiq.com",
  },
  {
    icon: "T",
    cat: "SEO & Analytics",
    badge: "Free / $4.99 mo",
    name: "TubeBuddy",
    desc: "Browser extension for YouTube SEO with A/B title testing, bulk processing, tag explorer, and thumbnail A/B split testing. The only tool that lets you scientifically test what drives more clicks.",
    href: "https://tubebuddy.com",
  },
  {
    icon: "◈",
    cat: "SEO & Analytics",
    badge: "Free / $29 mo",
    name: "Morningfame",
    desc: "YouTube analytics platform focused on growth metrics — tracks which videos drive subscribers, which topics perform best for your channel, and grades your optimization against top performers.",
    href: "https://morningfa.me",
  },
];

const SCRIPT_TOOLS = [
  {
    icon: "✦",
    cat: "Scripting",
    badge: "Free / $20 mo",
    name: "ChatGPT",
    desc: "Write full YouTube scripts, generate title variations, draft video descriptions with keywords, create timestamps, and build email newsletters from your video content — all in seconds.",
    href: "https://chat.openai.com",
  },
  {
    icon: "P",
    cat: "Scripting",
    badge: "Free / $19 mo",
    name: "Pictory",
    desc: "Turn blog posts, articles, or scripts into videos automatically. AI selects relevant stock footage, adds captions, and creates a narrated video — great for repurposing written content.",
    href: "https://pictory.ai",
  },
  {
    icon: "E",
    cat: "Voiceover",
    badge: "Free / $5 mo",
    name: "ElevenLabs",
    desc: "Generate ultra-realistic AI voiceovers for YouTube videos. Clone your own voice or choose from hundreds of voices. Ideal for faceless channels, language dubbing, and accessibility.",
    href: "https://elevenlabs.io",
  },
];

const EDITING_TOOLS = [
  {
    icon: "D",
    cat: "Editing",
    badge: "Free / $12 mo",
    name: "Descript",
    desc: "Edit video by editing the transcript. Delete a word from the text — the video cuts automatically. Removes filler words in one click, enhances audio with Studio Sound, and enables face-cam overdub.",
    href: "https://descript.com",
  },
  {
    icon: "O",
    cat: "Repurposing",
    badge: "Free / $15 mo",
    name: "Opus Clip",
    desc: "Upload any long YouTube video and AI finds the most engaging 30–90 second clips. Auto-captions, reframes to vertical, and scores each clip's virality potential for Shorts and Reels.",
    href: "https://opus.pro",
  },
  {
    icon: "C",
    cat: "Thumbnails",
    badge: "Free / $13 mo",
    name: "Canva AI",
    desc: "Design YouTube thumbnails with AI-powered tools: background removal, Magic Edit, text effects, and thousands of thumbnail templates. Create professional thumbnails without design experience.",
    href: "https://canva.com",
  },
];

const imgStyle: React.CSSProperties = {
  width: "100%", objectFit: "cover", borderRadius: "4px",
  border: "1px solid var(--line)", display: "block",
};

export default function AiToolsForYouTube({ faq }: { faq: FaqItem[] }) {
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
            <span>AI Tools for YouTube</span>
          </div>
        </nav>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
          <span className="tool-cat">YouTube</span>
          <span className="tool-cat">Content Creation</span>
          <span className="tool-cat">AI Tools</span>
          <span className="tool-cat">April 30, 2025</span>
        </div>

        <h1 id="article-h1" className="hero-h1">
          AI Tools for<br />
          <em>YouTube 2025</em>
        </h1>

        <p className="hero-sub">
          The complete guide to 12 AI tools that automate YouTube keyword research, scripting, editing,
          thumbnail design, and repurposing — so you publish more, faster, without sacrificing quality.
        </p>

        <div className="hero-cta">
          <a href="#seo-tools" className="btn btn-primary">Browse Tools →</a>
          <a href="#faq" className="btn btn-ghost">FAQ</a>
        </div>

        <ul className="hero-stats">
          <li><strong>12</strong><span>tools reviewed</span></li>
          <li><strong>10h+</strong><span>saved per video</span></li>
          <li><strong>3</strong><span>categories</span></li>
          <li><strong>Free</strong><span>tiers available</span></li>
        </ul>
      </section>

      {/* ── FEATURED IMAGE ── */}
      <section className="why" style={{ borderTop: "none", paddingTop: 0, paddingBottom: "32px" }}>
        <figure style={{ margin: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1400&h=580&fit=crop&q=85"
            alt="YouTube content creator at a desk with camera and laptop using AI tools to grow their channel"
            style={{ ...imgStyle, height: "clamp(260px, 38vw, 520px)" }}
            loading="eager"
            decoding="async"
          />
          <figcaption style={{ marginTop: "12px", fontSize: "12px", color: "var(--ink-3)", fontFamily: "var(--mono)" }}>
            AI tools let solo creators compete with full production teams — at a fraction of the cost.
          </figcaption>
        </figure>
      </section>

      {/* ── INTRO ── */}
      <section className="why" aria-labelledby="intro-h2">
        <span className="eyebrow">/ 00 — Why AI for YouTube</span>
        <h2 id="intro-h2" className="section-h2">
          From 1 Video a Month<br /><em>to 1 Video a Week</em>
        </h2>
        <p className="section-lede">
          The biggest bottleneck for most YouTubers isn&apos;t ideas or talent — it&apos;s time. AI eliminates the slow parts of the production pipeline.
        </p>
        <div className="seo-copy" style={{ maxWidth: "100%", marginTop: "32px" }}>
          <p>
            The average YouTube video takes <strong>20–40 hours to produce</strong> from idea to publish.
            AI tools can compress that timeline dramatically: keyword research that took 3 hours now takes 10 minutes
            with VidIQ. Scripting a 10-minute video that took a full day takes 30 minutes with ChatGPT.
            Clipping a podcast into 5 Shorts that took an afternoon takes 20 minutes with Opus Clip.
          </p>
          <p>
            YouTube&apos;s algorithm rewards <strong>consistent publishing</strong> above almost everything else.
            Channels that publish weekly grow faster than channels that publish monthly with better videos.
            AI tools make weekly publishing achievable for solo creators without a team or agency budget.
          </p>
          <p>
            This guide covers the 12 best AI tools across three stages of YouTube production:
            <strong> SEO &amp; keyword research</strong> (find topics worth making), <strong>scripting &amp; voiceover</strong>
            (create content efficiently), and <strong>editing &amp; repurposing</strong> (maximize every video&apos;s reach).
          </p>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="why" aria-labelledby="benefits-h2">
        <span className="eyebrow">/ 01 — What AI Changes</span>
        <h2 id="benefits-h2" className="section-h2">
          6 Parts of YouTube<br /><em>AI Automates</em>
        </h2>
        <div className="why-grid">
          <article className="why-card">
            <span className="why-num">01</span>
            <h3>Keyword Research</h3>
            <p>VidIQ and TubeBuddy analyze search volume, competition, and trending topics — turning days of research into a 10-minute morning routine before you film.</p>
          </article>
          <article className="why-card">
            <span className="why-num">02</span>
            <h3>Script Writing</h3>
            <p>ChatGPT drafts full video scripts, intro hooks, and outro CTAs in minutes. Provide your outline and tone — the AI handles the structure and transitions.</p>
          </article>
          <article className="why-card">
            <span className="why-num">03</span>
            <h3>Video Editing</h3>
            <p>Descript lets you edit video like a text document — delete a word, the clip disappears. It also removes filler words and enhances audio automatically.</p>
          </article>
          <article className="why-card">
            <span className="why-num">04</span>
            <h3>Content Repurposing</h3>
            <p>Opus Clip turns a 30-minute video into 8 short clips for YouTube Shorts, TikTok, and Reels — tripling your content output from each recording session.</p>
          </article>
          <article className="why-card">
            <span className="why-num">05</span>
            <h3>Thumbnail Design</h3>
            <p>Canva AI removes backgrounds, generates text effects, and suggests thumbnail layouts based on top-performing videos in your niche — no design skills required.</p>
          </article>
          <article className="why-card">
            <span className="why-num">06</span>
            <h3>Title & Description</h3>
            <p>TubeBuddy A/B tests titles while ChatGPT writes keyword-optimized descriptions, timestamps, and tags. Higher CTR + better SEO = more impressions from YouTube.</p>
          </article>
        </div>
      </section>

      {/* ── SEO TOOLS ── */}
      <section id="seo-tools" className="tools" aria-labelledby="seo-h2">
        <div className="section-head">
          <div>
            <span className="eyebrow">/ 02 — SEO &amp; Analytics</span>
            <h2 id="seo-h2" className="section-h2">
              YouTube SEO<br /><em>Tools</em>
            </h2>
            <p className="section-lede">Find keywords people actually search, optimize every video before publishing, and track what drives growth.</p>
          </div>
        </div>

        <figure style={{ margin: "0 0 32px" }}>
          <img
            src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&h=380&fit=crop&q=85"
            alt="YouTube analytics dashboard showing video performance metrics and AI keyword research tools"
            style={{ ...imgStyle, height: "clamp(160px, 24vw, 340px)" }}
            loading="lazy"
          />
        </figure>

        <div className="tool-grid">
          {SEO_TOOLS.map((tool, i) => (
            <article key={i} className="tool-card">
              <a href={tool.href} target="_blank" rel="noopener noreferrer" className="tool-link"
                aria-label={`${tool.name} — ${tool.cat} tool for YouTube`}>
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
          <h3>VidIQ vs TubeBuddy: Which Should You Use?</h3>
          <p>
            Use <strong>VidIQ</strong> if you&apos;re focused on finding new video topics and keyword research —
            its daily video ideas feature and keyword scores are best-in-class. Use <strong>TubeBuddy</strong>
            if you want to optimize existing videos and run A/B tests on titles and thumbnails.
            Many serious YouTubers use both: VidIQ for research, TubeBuddy for optimization.
          </p>
          <p>
            Both have free tiers that are genuinely useful for channels under 10,000 subscribers.
            The paid plans are worth it once you&apos;re publishing consistently — <strong>one well-optimized
            video that finds its audience pays for months of subscription</strong>.
          </p>
        </div>
      </section>

      {/* ── SCRIPT & VOICEOVER TOOLS ── */}
      <section className="tools" aria-labelledby="script-h2">
        <div className="section-head">
          <div>
            <span className="eyebrow">/ 03 — Scripting &amp; Voiceover</span>
            <h2 id="script-h2" className="section-h2">
              AI Writing &amp;<br /><em>Voice Tools</em>
            </h2>
            <p className="section-lede">Script full videos in minutes, turn articles into narrated videos, and add studio-quality voiceover without recording.</p>
          </div>
        </div>

        <div className="tool-grid">
          {SCRIPT_TOOLS.map((tool, i) => (
            <article key={i} className="tool-card">
              <a href={tool.href} target="_blank" rel="noopener noreferrer" className="tool-link"
                aria-label={`${tool.name} — ${tool.cat} tool for YouTube`}>
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
          <h3>The ChatGPT YouTube Script Prompt That Works</h3>
          <p>
            Don&apos;t ask ChatGPT to &quot;write a script about X.&quot; Instead, give it full context:
            <em> &quot;Write a 10-minute YouTube script about [TOPIC] for [AUDIENCE]. My channel style is [TONE].
            Start with a hook that creates curiosity in the first 15 seconds. Include timestamps every 2–3 minutes.
            End with a CTA to subscribe and watch [RELATED VIDEO].&quot;</em>
          </p>
          <p>
            The output will be a solid first draft. Edit it to add your personal stories, specific examples,
            and your natural speaking patterns. <strong>AI provides the structure; you provide the authenticity.</strong>
          </p>
        </div>
      </section>

      {/* ── EDITING TOOLS ── */}
      <section className="tools" aria-labelledby="edit-h2">
        <div className="section-head">
          <div>
            <span className="eyebrow">/ 04 — Editing &amp; Repurposing</span>
            <h2 id="edit-h2" className="section-h2">
              AI Editing &amp;<br /><em>Repurposing</em>
            </h2>
            <p className="section-lede">Edit faster, remove mistakes automatically, and turn every long video into a week of short-form content.</p>
          </div>
        </div>

        <figure style={{ margin: "0 0 32px" }}>
          <img
            src="https://images.unsplash.com/photo-1574717024453-354fea5dc0a2?w=1200&h=380&fit=crop&q=85"
            alt="Video editing timeline on a computer — AI video editing tools for YouTube creators"
            style={{ ...imgStyle, height: "clamp(160px, 24vw, 340px)" }}
            loading="lazy"
          />
        </figure>

        <div className="tool-grid">
          {EDITING_TOOLS.map((tool, i) => (
            <article key={i} className="tool-card">
              <a href={tool.href} target="_blank" rel="noopener noreferrer" className="tool-link"
                aria-label={`${tool.name} — ${tool.cat} tool for YouTube`}>
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
          <h3>The Repurposing Workflow: 1 Video → 10 Pieces of Content</h3>
          <p>
            Record one 20–30 minute video. Upload to <strong>Opus Clip</strong> — you get 8–12 short clips for
            YouTube Shorts, TikTok, and Instagram Reels. Use <strong>Descript</strong> to edit the full video
            and export a podcast-ready audio version. Ask <strong>ChatGPT</strong> to convert the transcript
            into a blog post, email newsletter, and 5 Twitter threads.
          </p>
          <p>
            One recording session becomes: <strong>1 long-form video + 10 short clips + 1 podcast episode +
            1 blog post + 1 newsletter + 5 tweets</strong> — 19 pieces of content from a single production day.
            This is how solo creators build an audience across multiple platforms without burning out.
          </p>
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
          Ready to grow your<br /><em>YouTube channel with AI?</em>
        </h2>
        <p style={{ color: "var(--ink-2)", fontSize: "16px", maxWidth: "520px", margin: "0 auto 40px" }}>
          Explore our free AI-powered generators — write better titles, descriptions, and content ideas in seconds.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/tools" className="btn btn-primary btn-lg">Try Free Tools →</a>
          <a href="/blog/how-to-write-youtube-titles" className="btn btn-ghost btn-lg">Write Better Titles</a>
        </div>
      </section>
    </>
  );
}
