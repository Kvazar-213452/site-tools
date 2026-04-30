"use client";

import "@/style/home.css";
import "@/style/tools.css";

interface FaqItem {
  q: string;
  a: string;
}

const WRITING_TOOLS = [
  {
    icon: "✦",
    cat: "Writing",
    badge: "Free / $20 mo",
    name: "ChatGPT",
    desc: "OpenAI's flagship AI assistant. Draft essays, brainstorm arguments, debug code, and get any concept explained at any depth. The single most versatile student tool available.",
    href: "https://chat.openai.com",
  },
  {
    icon: "G",
    cat: "Writing",
    badge: "Free / $12 mo",
    name: "Grammarly",
    desc: "AI grammar and style checker that integrates with Google Docs, Word, and every browser. Catches errors, suggests clarity improvements, and adapts to academic writing tone.",
    href: "https://grammarly.com",
  },
  {
    icon: "Q",
    cat: "Writing",
    badge: "Free / $9.95 mo",
    name: "QuillBot",
    desc: "Paraphrase, summarize, and rephrase text in seconds. Ideal for understanding dense academic sources, restructuring your own writing, and generating citation-ready summaries.",
    href: "https://quillbot.com",
  },
];

const RESEARCH_TOOLS = [
  {
    icon: "⊕",
    cat: "Research",
    badge: "Free / $20 mo",
    name: "Perplexity AI",
    desc: "AI search engine that answers research questions with inline citations from credible sources. Think Google, but it reads the pages for you and gives cited summaries.",
    href: "https://perplexity.ai",
  },
  {
    icon: "E",
    cat: "Research",
    badge: "Free",
    name: "Elicit",
    desc: "AI research assistant trained on academic papers. Upload a question and Elicit finds relevant studies, extracts key findings, and compares methods across multiple papers.",
    href: "https://elicit.com",
  },
  {
    icon: "◈",
    cat: "Research",
    badge: "Free",
    name: "Connected Papers",
    desc: "Visual tool that maps relationships between academic papers. Find all related work by building a graph from one seed paper — great for literature reviews.",
    href: "https://connectedpapers.com",
  },
];

const STUDY_TOOLS = [
  {
    icon: "♠",
    cat: "Study",
    badge: "Free / $5 mo",
    name: "Anki",
    desc: "Spaced-repetition flashcard system trusted by medical and law students worldwide. Use AI plugins to auto-generate cards from your notes, textbooks, or paste any text.",
    href: "https://apps.ankiweb.net",
  },
  {
    icon: "⚡",
    cat: "Study",
    badge: "Free / $8.99 mo",
    name: "QuizGecko",
    desc: "Paste any text, URL, or PDF and get an instant quiz. Generate multiple-choice, true/false, and short-answer questions from your lecture notes or readings.",
    href: "https://quizgecko.com",
  },
  {
    icon: "K",
    cat: "Study",
    badge: "Free",
    name: "Khanmigo",
    desc: "Khan Academy's AI tutor powered by GPT-4. Asks Socratic questions rather than giving answers directly, so you actually learn the material instead of just getting solutions.",
    href: "https://khanacademy.org",
  },
];

const MATH_TOOLS = [
  {
    icon: "∑",
    cat: "Math & Science",
    badge: "Free / $7.99 mo",
    name: "Wolfram Alpha",
    desc: "The gold standard for STEM students. Solves calculus, linear algebra, statistics, chemistry, and physics problems with step-by-step explanations and graphs.",
    href: "https://wolframalpha.com",
  },
  {
    icon: "∫",
    cat: "Math & Science",
    badge: "Free",
    name: "Photomath",
    desc: "Point your camera at a handwritten or printed equation and get an instant step-by-step solution. Covers arithmetic through calculus. Essential for checking your work.",
    href: "https://photomath.com",
  },
  {
    icon: "S",
    cat: "Math & Science",
    badge: "Free",
    name: "Socratic by Google",
    desc: "Take a photo of a homework problem and Socratic provides visual explanations, relevant videos, and step-by-step answers across STEM and humanities subjects.",
    href: "https://socratic.org",
  },
];

const PRODUCTIVITY_TOOLS = [
  {
    icon: "◎",
    cat: "Productivity",
    badge: "Free / $16.99 mo",
    name: "Otter.ai",
    desc: "Real-time AI transcription for lectures, study groups, and meetings. Automatically generates a searchable transcript with speaker identification and key highlight summaries.",
    href: "https://otter.ai",
  },
  {
    icon: "N",
    cat: "Productivity",
    badge: "Free / $10 mo",
    name: "Notion AI",
    desc: "All-in-one workspace with AI built in. Summarize lecture notes, generate study plans, draft assignment outlines, and build a second-brain knowledge base for your entire degree.",
    href: "https://notion.so",
  },
  {
    icon: "M",
    cat: "Productivity",
    badge: "$19 mo",
    name: "Motion",
    desc: "AI calendar and task manager that automatically schedules your assignments, study sessions, and deadlines based on priority and available time — no manual planning needed.",
    href: "https://usemotion.com",
  },
];

const imgStyle: React.CSSProperties = {
  width: "100%",
  objectFit: "cover",
  borderRadius: "4px",
  border: "1px solid var(--line)",
  display: "block",
};

const figStyle: React.CSSProperties = { margin: "0 0 0 0" };

const captionStyle: React.CSSProperties = {
  marginTop: "12px",
  fontSize: "12px",
  color: "var(--ink-3)",
  fontFamily: "var(--mono)",
};

export default function AiToolsForStudents({ faq }: { faq: FaqItem[] }) {
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
            <span>AI Tools for Students</span>
          </div>
        </nav>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
          <span className="tool-cat">Education</span>
          <span className="tool-cat">AI Tools</span>
          <span className="tool-cat">Productivity</span>
          <span className="tool-cat">April 30, 2025</span>
        </div>

        <h1 id="article-h1" className="hero-h1">
          AI Tools for<br />
          <em>Students 2025</em>
        </h1>

        <p className="hero-sub">
          The complete guide to 15 AI-powered tools that help you study smarter,
          write better research papers, solve complex math, and save 5+ hours every single week.
        </p>

        <div className="hero-cta">
          <a href="#writing-tools" className="btn btn-primary">Browse Tools →</a>
          <a href="#faq" className="btn btn-ghost">FAQ</a>
        </div>

        <ul className="hero-stats">
          <li><strong>15</strong><span>tools reviewed</span></li>
          <li><strong>5h+</strong><span>saved per week</span></li>
          <li><strong>6</strong><span>categories</span></li>
          <li><strong>Free</strong><span>options exist</span></li>
        </ul>
      </section>

      {/* ── FEATURED IMAGE ── */}
      <section className="why" style={{ borderTop: "none", paddingTop: 0, paddingBottom: "32px" }}>
        <figure style={figStyle}>
          <img
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1400&h=580&fit=crop&q=85"
            alt="Student sitting at a desk using a laptop with AI tools to study and complete assignments"
            style={{ ...imgStyle, height: "clamp(260px, 38vw, 520px)" }}
            loading="eager"
            decoding="async"
          />
          <figcaption style={captionStyle}>
            Modern students use AI to compress research, writing, and study time — without cutting corners on learning.
          </figcaption>
        </figure>
      </section>

      {/* ── INTRODUCTION ── */}
      <section className="why" aria-labelledby="intro-h2">
        <span className="eyebrow">/ 00 — Introduction</span>
        <h2 id="intro-h2" className="section-h2">
          Why AI Is the New<br /><em>Study Partner</em>
        </h2>
        <p className="section-lede">
          AI tools have fundamentally changed how students research, write, and learn — and the gap between students who use them and those who don&apos;t is growing fast.
        </p>

        <div className="seo-copy" style={{ maxWidth: "100%", marginTop: "32px" }}>
          <p>
            The average college student spends <strong>17+ hours per week</strong> on coursework outside of class.
            The right AI toolkit can compress that time significantly — not by doing your work for you,
            but by eliminating the tedious parts: formatting citations, running grammar checks,
            turning lecture notes into flashcards, and sifting through dozens of Google results for a single stat.
          </p>
          <p>
            In 2025, AI tools for students have become remarkably powerful. <strong>ChatGPT</strong> explains
            calculus concepts from six different angles until one clicks. <strong>Perplexity AI</strong> finds
            peer-reviewed research with citations in under 10 seconds. <strong>Wolfram Alpha</strong> solves
            differential equations step by step. And <strong>Otter.ai</strong> transcribes your entire 90-minute
            lecture while you stay focused on understanding.
          </p>
          <p>
            This guide reviews the <strong>15 best AI tools for students</strong> across 5 categories:
            writing assistance, academic research, active studying, math &amp; science, and productivity.
            For each tool we cover what it does, who benefits most, pricing, and practical tips.
          </p>
          <p>
            <em>On academic integrity:</em> AI tools are force multipliers for learning, not shortcuts around it.
            Always check your institution&apos;s academic integrity policy before using AI on graded work,
            and disclose AI assistance where required.
          </p>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="why" aria-labelledby="benefits-h2">
        <span className="eyebrow">/ 01 — The Benefits</span>
        <h2 id="benefits-h2" className="section-h2">
          6 Ways AI Makes You<br /><em>a Better Student</em>
        </h2>
        <div className="why-grid">
          <article className="why-card">
            <span className="why-num">01</span>
            <h3>Save 5+ Hours Weekly</h3>
            <p>AI automates citation formatting, reading summaries, practice question generation, and grammar checks — returning hours to your schedule every single week.</p>
          </article>
          <article className="why-card">
            <span className="why-num">02</span>
            <h3>Write Stronger Papers</h3>
            <p>Grammarly and ChatGPT catch errors, suggest stronger phrasing, and help structure arguments — improving your writing quality with every assignment you submit.</p>
          </article>
          <article className="why-card">
            <span className="why-num">03</span>
            <h3>Research in Minutes</h3>
            <p>Instead of sifting through hundreds of results, AI tools like Perplexity and Elicit surface relevant, cited academic sources in seconds and summarize key findings.</p>
          </article>
          <article className="why-card">
            <span className="why-num">04</span>
            <h3>24/7 Personal Tutor</h3>
            <p>AI tutors never sleep. Stuck on thermodynamics at 2 AM or need a concept explained five different ways? AI assistants are infinitely patient and always available.</p>
          </article>
          <article className="why-card">
            <span className="why-num">05</span>
            <h3>Personalized Learning</h3>
            <p>AI adapts to your knowledge level, pace, and learning style. Tools like Khanmigo remember where you struggled and provide targeted practice on exactly those gaps.</p>
          </article>
          <article className="why-card">
            <span className="why-num">06</span>
            <h3>Smarter Exam Prep</h3>
            <p>Generate unlimited practice quizzes, create spaced-repetition flashcard decks from your notes, and get instant explanations for wrong answers — all powered by AI.</p>
          </article>
        </div>
      </section>

      {/* ── WRITING TOOLS ── */}
      <section id="writing-tools" className="tools" aria-labelledby="writing-h2">
        <div className="section-head">
          <div>
            <span className="eyebrow">/ 02 — Writing Assistants</span>
            <h2 id="writing-h2" className="section-h2">
              AI Writing<br /><em>Tools</em>
            </h2>
            <p className="section-lede">Draft essays, fix grammar, paraphrase dense material, and polish every paper before submission.</p>
          </div>
        </div>

        <figure style={figStyle}>
          <img
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=420&fit=crop&q=85"
            alt="Person typing on a laptop using AI writing tools to draft an academic essay"
            style={{ ...imgStyle, height: "clamp(180px, 28vw, 380px)", marginBottom: "32px" }}
            loading="lazy"
          />
        </figure>

        <div className="tool-grid">
          {WRITING_TOOLS.map((tool, i) => (
            <article key={i} className="tool-card">
              <a
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="tool-link"
                aria-label={`${tool.name} — AI ${tool.cat} tool for students`}
              >
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
          <h3>How to Use AI Writing Tools Without Getting in Trouble</h3>
          <p>
            The most effective use of writing AI is as a <strong>feedback loop</strong>, not a ghostwriter.
            Write a rough draft yourself, then paste it into ChatGPT and ask: <em>&quot;What arguments are weakest here?
            What evidence am I missing? Is my thesis clear?&quot;</em> You get the benefits of AI review while the
            intellectual work remains genuinely yours.
          </p>
          <p>
            <strong>Grammarly</strong> is universally safe to use — checking grammar and style is equivalent
            to using a spell-checker. <strong>QuillBot&apos;s summarizer</strong> is excellent for digesting
            long readings, helping you understand source material faster before you write about it.
          </p>
        </div>
      </section>

      {/* ── RESEARCH TOOLS ── */}
      <section className="tools" aria-labelledby="research-h2">
        <div className="section-head">
          <div>
            <span className="eyebrow">/ 03 — Research Tools</span>
            <h2 id="research-h2" className="section-h2">
              AI Research<br /><em>Assistants</em>
            </h2>
            <p className="section-lede">Find peer-reviewed sources, analyze academic papers, and map research fields in minutes.</p>
          </div>
        </div>

        <figure style={figStyle}>
          <img
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=420&fit=crop&q=85"
            alt="Open books in a university library — AI research tools help students find academic sources faster"
            style={{ ...imgStyle, height: "clamp(180px, 28vw, 380px)", marginBottom: "32px" }}
            loading="lazy"
          />
        </figure>

        <div className="tool-grid">
          {RESEARCH_TOOLS.map((tool, i) => (
            <article key={i} className="tool-card">
              <a
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="tool-link"
                aria-label={`${tool.name} — AI ${tool.cat} tool for students`}
              >
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
          <h3>The Research Workflow: AI at Every Stage</h3>
          <p>
            Start with <strong>Perplexity AI</strong> to map the landscape of your topic and identify key papers.
            Use those papers as seeds in <strong>Connected Papers</strong> to discover the surrounding literature visually.
            Then bring the most relevant papers into <strong>Elicit</strong> to extract findings, methods,
            and limitations side-by-side — turning a week of literature review into an afternoon.
          </p>
          <p>
            Always verify AI-cited sources directly. Perplexity and Elicit link to real papers,
            but confirm that quotes and statistics appear in the original source before citing them in your work.
            <strong> AI tools find sources; you verify them.</strong>
          </p>
        </div>
      </section>

      {/* ── STUDY TOOLS ── */}
      <section className="tools" aria-labelledby="study-h2">
        <div className="section-head">
          <div>
            <span className="eyebrow">/ 04 — Study &amp; Learning</span>
            <h2 id="study-h2" className="section-h2">
              AI Study<br /><em>Tools</em>
            </h2>
            <p className="section-lede">Generate flashcards, take adaptive quizzes, and work with an AI tutor that actually teaches instead of just answering.</p>
          </div>
        </div>

        <figure style={figStyle}>
          <img
            src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=420&fit=crop&q=85"
            alt="Student studying with flashcards and notes — AI study tools help with spaced repetition and quiz generation"
            style={{ ...imgStyle, height: "clamp(180px, 28vw, 380px)", marginBottom: "32px" }}
            loading="lazy"
          />
        </figure>

        <div className="tool-grid">
          {STUDY_TOOLS.map((tool, i) => (
            <article key={i} className="tool-card">
              <a
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="tool-link"
                aria-label={`${tool.name} — AI ${tool.cat} tool for students`}
              >
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
          <h3>The Science Behind AI-Powered Study</h3>
          <p>
            Spaced repetition — reviewing material at increasing intervals just before you forget it — is the
            most evidence-backed study technique in cognitive science. <strong>Anki</strong> automates this
            scheduling. Combine it with AI: paste your lecture notes into ChatGPT and ask it to generate
            50 Anki-formatted flashcard pairs, then import them directly. What used to take 2 hours takes 10 minutes.
          </p>
          <p>
            <strong>Khanmigo</strong> takes a Socratic approach — instead of saying &quot;the answer is X,&quot;
            it asks &quot;what do you think happens if...?&quot; This forces active recall and deeper processing,
            which leads to better retention than passive reading or watching solutions.
          </p>
        </div>
      </section>

      {/* ── MATH & SCIENCE ── */}
      <section className="tools" aria-labelledby="math-h2">
        <div className="section-head">
          <div>
            <span className="eyebrow">/ 05 — Math &amp; Science</span>
            <h2 id="math-h2" className="section-h2">
              AI Math &amp;<br /><em>Science Solvers</em>
            </h2>
            <p className="section-lede">Step-by-step solutions, interactive graphs, and instant equation solving — for every STEM course.</p>
          </div>
        </div>

        <figure style={figStyle}>
          <img
            src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=420&fit=crop&q=85"
            alt="Mathematics equations and formulas on a blackboard — AI math tools for students solve problems step by step"
            style={{ ...imgStyle, height: "clamp(180px, 28vw, 380px)", marginBottom: "32px" }}
            loading="lazy"
          />
        </figure>

        <div className="tool-grid">
          {MATH_TOOLS.map((tool, i) => (
            <article key={i} className="tool-card">
              <a
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="tool-link"
                aria-label={`${tool.name} — AI ${tool.cat} tool for students`}
              >
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
          <h3>Using AI Math Tools the Right Way</h3>
          <p>
            The trap with tools like Wolfram Alpha and Photomath is using them as answer machines.
            The right approach: <strong>attempt the problem first</strong>, then use AI to check your
            work and understand where you went wrong. Ask ChatGPT to explain the underlying concept,
            not just verify your answer.
          </p>
          <p>
            For exam prep, Wolfram Alpha is invaluable for generating worked examples in any topic.
            Type &quot;solve [problem type] step by step&quot; and study the method, not just the answer.
            <strong> Understanding the process matters on exams where you can&apos;t use AI.</strong>
          </p>
        </div>
      </section>

      {/* ── PRODUCTIVITY TOOLS ── */}
      <section className="tools" aria-labelledby="productivity-h2">
        <div className="section-head">
          <div>
            <span className="eyebrow">/ 06 — Note-Taking &amp; Productivity</span>
            <h2 id="productivity-h2" className="section-h2">
              AI Productivity<br /><em>Tools</em>
            </h2>
            <p className="section-lede">Transcribe lectures automatically, organize knowledge intelligently, and let AI schedule your week so you never miss a deadline.</p>
          </div>
        </div>

        <figure style={figStyle}>
          <img
            src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=420&fit=crop&q=85"
            alt="Student planning and organizing study schedule with AI productivity tools and a notebook"
            style={{ ...imgStyle, height: "clamp(180px, 28vw, 380px)", marginBottom: "32px" }}
            loading="lazy"
          />
        </figure>

        <div className="tool-grid">
          {PRODUCTIVITY_TOOLS.map((tool, i) => (
            <article key={i} className="tool-card">
              <a
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="tool-link"
                aria-label={`${tool.name} — AI ${tool.cat} tool for students`}
              >
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
          <h3>Building a Second Brain with Notion AI</h3>
          <p>
            Notion AI is most powerful when used as a long-term knowledge repository.
            After each lecture, paste your Otter.ai transcript into Notion and prompt:
            <em> &quot;Summarize this lecture into 5 key concepts with examples. Then generate 10 quiz questions.&quot;</em>
            Over a semester, you build a searchable, AI-enriched knowledge base for every course.
          </p>
          <p>
            <strong>Motion</strong> solves the planning problem most students struggle with:
            they have deadlines but no system for allocating work time intelligently.
            Motion takes your tasks, deadlines, and available calendar time, and builds
            a realistic daily schedule automatically — rescheduling when things run over.
          </p>
        </div>
      </section>

      {/* ── ETHICS & ACADEMIC INTEGRITY ── */}
      <section className="why" aria-labelledby="ethics-h2">
        <span className="eyebrow">/ 07 — Academic Integrity</span>
        <h2 id="ethics-h2" className="section-h2">
          Using AI Tools<br /><em>Ethically</em>
        </h2>
        <p className="section-lede">
          AI is a powerful learning accelerator — but misuse can undermine your education and violate academic policies.
        </p>
        <div className="why-grid">
          <article className="why-card">
            <span className="why-num">✓</span>
            <h3>Use AI to Understand</h3>
            <p>Ask AI to explain concepts, break down difficult readings, and generate practice problems. This accelerates genuine learning and is universally acceptable.</p>
          </article>
          <article className="why-card">
            <span className="why-num">✓</span>
            <h3>Use AI to Improve</h3>
            <p>Grammar checks, clarity suggestions, and feedback on your own drafts are widely permitted. Grammarly-style assistance is analogous to a spell-checker.</p>
          </article>
          <article className="why-card">
            <span className="why-num">✓</span>
            <h3>Use AI to Research</h3>
            <p>Finding sources, summarizing papers, and mapping research fields with AI is acceptable — just verify sources directly and cite the original papers, not the AI.</p>
          </article>
          <article className="why-card">
            <span className="why-num">✗</span>
            <h3>Don&apos;t Submit AI as Your Work</h3>
            <p>Submitting AI-generated text as your own original writing is academic dishonesty at most institutions. The learning you skip today becomes a gap in knowledge tomorrow.</p>
          </article>
          <article className="why-card">
            <span className="why-num">✗</span>
            <h3>Don&apos;t Skip the Thinking</h3>
            <p>Having AI solve every problem means you won&apos;t be able to solve them on exams or in your career. Use AI to check understanding, not to bypass it.</p>
          </article>
          <article className="why-card">
            <span className="why-num">!</span>
            <h3>Always Check Your Policy</h3>
            <p>AI policies vary widely between institutions, departments, and even individual professors. When in doubt, ask — most educators appreciate the proactive conversation.</p>
          </article>
        </div>
      </section>

      {/* ── COMPARISON / QUICK GUIDE ── */}
      <section className="why" aria-labelledby="guide-h2">
        <span className="eyebrow">/ 08 — Quick Start Guide</span>
        <h2 id="guide-h2" className="section-h2">
          Build Your Free<br /><em>AI Student Toolkit</em>
        </h2>
        <p className="section-lede">
          You don&apos;t need to pay for anything to get started. This free stack covers 90% of student needs.
        </p>
        <div className="seo-copy" style={{ maxWidth: "100%", marginTop: "32px" }}>
          <h3>The $0 AI Student Stack</h3>
          <p>
            <strong>Step 1 — Writing:</strong> Install <strong>Grammarly&apos;s free browser extension</strong>.
            It works everywhere — Google Docs, email, your university LMS. Zero effort, immediate improvement.
          </p>
          <p>
            <strong>Step 2 — Research:</strong> Bookmark <strong>Perplexity AI</strong> and use it as your
            primary research starting point. Every answer includes source citations you can follow directly.
            Great for finding 3–5 solid sources in under a minute.
          </p>
          <p>
            <strong>Step 3 — Understanding:</strong> Use <strong>ChatGPT (free tier)</strong> to explain
            concepts from your readings in simpler terms, generate practice problems, and get feedback
            on your draft arguments. Think of it as a tireless study partner.
          </p>
          <p>
            <strong>Step 4 — STEM:</strong> Bookmark <strong>Wolfram Alpha</strong> for math and science.
            Use it to check your work and study step-by-step solutions. Install <strong>Photomath</strong>
            on your phone for on-the-go equation help.
          </p>
          <p>
            <strong>Step 5 — Memorization:</strong> Download <strong>Anki (free)</strong> and start making
            flashcard decks. Use ChatGPT to generate 20–50 cards per lecture in seconds. Review daily for
            15 minutes and watch your exam scores improve.
          </p>
          <p>
            Once you&apos;re comfortable with the free tools, consider upgrading: <strong>Notion AI ($10/mo)</strong>
            is worth it if you have many courses, and <strong>Otter.ai ($17/mo)</strong> is transformative
            if your lectures are dense and fast-paced.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="faq" aria-labelledby="faq-h2">
        <span className="eyebrow">/ 09 — FAQ</span>
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
          Ready to study smarter<br />
          <em>with AI tools?</em>
        </h2>
        <p style={{ color: "var(--ink-2)", fontSize: "16px", marginBottom: "40px", maxWidth: "520px", margin: "0 auto 40px" }}>
          Explore our free AI-powered generators and writing tools — built for students, no signup required.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/tools" className="btn btn-primary btn-lg">Explore Free Tools →</a>
          <a href="/blog" className="btn btn-ghost btn-lg">More Articles</a>
        </div>
      </section>
    </>
  );
}
