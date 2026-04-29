'use client';

import { useState, useCallback } from 'react';
import Config from "@/lib/config";

import "@/style/home.css";
import "@/style/tools.css";

const TOOL_URL  = `${Config.MAIN_DOMAIN_NO}/random-question-generator`;
const TOOL_NAME = "Random Question Generator";

const CATEGORIES = [
  { label: "Any",           id: ""   },
  { label: "General",       id: "9"  },
  { label: "Science",       id: "17" },
  { label: "History",       id: "23" },
  { label: "Geography",     id: "22" },
  { label: "Sports",        id: "21" },
  { label: "Animals",       id: "27" },
  { label: "Computers",     id: "18" },
  { label: "Mythology",     id: "20" },
  { label: "Film",          id: "11" },
  { label: "Music",         id: "12" },
  { label: "Video Games",   id: "15" },
];

const DIFFICULTIES = ["Any", "easy", "medium", "hard"] as const;
type Difficulty = typeof DIFFICULTIES[number];

const FAQ = [
  { q: "Where do the questions come from?",    a: "Questions are fetched live from the Open Trivia Database (opentdb.com) — a free, community-maintained trivia database with over 4,000 verified questions. A secondary API (the-trivia-api.com) is used as backup." },
  { q: "Is any data sent to a server?",        a: "The only requests made are to the public trivia APIs to fetch a question. No personal data is transmitted or stored by us." },
  { q: "Can I filter by category or difficulty?", a: "Yes. Use the category and difficulty dropdowns to narrow results. Select 'Any' for a fully random question across all topics." },
  { q: "What does the answer reveal button do?", a: "Each question comes with the correct answer hidden. Click 'Reveal Answer' to see it. The answer is always fetched alongside the question from the API." },
  { q: "How many questions are available?",    a: "The Open Trivia DB has over 4,000 verified questions across 24 categories and 3 difficulty levels. Combined with the secondary API, you have thousands of unique questions." },
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
  description: "Free random question generator. Get trivia questions by category and difficulty from the Open Trivia Database. No signup, 100% free.",
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

function decodeHtml(html: string): string {
  if (typeof document === "undefined") return html;
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

interface QuestionResult {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  category: string;
  difficulty: string;
  type: string;
  source: string;
}

async function fetchFromOpenTDB(
  categoryId: string,
  difficulty: Difficulty
): Promise<QuestionResult> {
  let url = "https://opentdb.com/api.php?amount=1&encode=url3986";
  if (categoryId) url += `&category=${categoryId}`;
  if (difficulty !== "Any") url += `&difficulty=${difficulty}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`opentdb status ${res.status}`);
  const data = await res.json();
  if (data.response_code !== 0) throw new Error(`opentdb code ${data.response_code as number}`);

  const q = data.results[0];
  return {
    question:           decodeHtml(decodeURIComponent(q.question as string)),
    correct_answer:     decodeHtml(decodeURIComponent(q.correct_answer as string)),
    incorrect_answers:  (q.incorrect_answers as string[]).map((a: string) => decodeHtml(decodeURIComponent(a))),
    category:           decodeHtml(decodeURIComponent(q.category as string)),
    difficulty:         q.difficulty as string,
    type:               q.type as string,
    source:             "opentdb.com",
  };
}

async function fetchFromTheTriviaAPI(
  difficulty: Difficulty
): Promise<QuestionResult> {
  let url = "https://the-trivia-api.com/v2/questions?limit=1";
  if (difficulty !== "Any") url += `&difficulty=${difficulty}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`the-trivia-api status ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) throw new Error("the-trivia-api: empty");

  const q = data[0];
  return {
    question:          q.question?.text as string ?? "Unknown question",
    correct_answer:    q.correctAnswer as string,
    incorrect_answers: q.incorrectAnswers as string[],
    category:          q.category as string,
    difficulty:        q.difficulty as string,
    type:              "multiple",
    source:            "the-trivia-api.com",
  };
}

async function fetchQuestion(
  categoryId: string,
  difficulty: Difficulty
): Promise<QuestionResult> {
  try {
    return await fetchFromOpenTDB(categoryId, difficulty);
  } catch (e1) {
    console.warn("Primary API failed:", e1);
    try {
      return await fetchFromTheTriviaAPI(difficulty);
    } catch (e2) {
      console.warn("Secondary API also failed:", e2);
      throw new Error("All question sources are currently unavailable. Please try again.");
    }
  }
}

function shuffleAnswers(correct: string, incorrect: string[]): string[] {
  const all = [...incorrect, correct];
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all;
}

function RandomQuestionSection() {
  const [question, setQuestion]   = useState<QuestionResult | null>(null);
  const [answers, setAnswers]     = useState<string[]>([]);
  const [revealed, setRevealed]   = useState(false);
  const [selected, setSelected]   = useState<string | null>(null);
  const [loading, setLoading]     = useState(false);
  const [errMsg, setErrMsg]       = useState<string | null>(null);
  const [count, setCount]         = useState(0);
  const [category, setCategory]   = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("Any");

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    setErrMsg(null);
    setRevealed(false);
    setSelected(null);
    setQuestion(null);

    try {
      const result = await fetchQuestion(category, difficulty);
      const shuffled = result.type === "boolean"
        ? ["True", "False"]
        : shuffleAnswers(result.correct_answer, result.incorrect_answers);
      setQuestion(result);
      setAnswers(shuffled);
      setCount((c) => c + 1);
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [category, difficulty]);

  const handleSelect = (ans: string) => {
    if (revealed) return;
    setSelected(ans);
    setRevealed(true);
  };

  const difficultyColor: Record<string, string> = {
    easy:   "var(--accent)",
    medium: "#f5a623",
    hard:   "#e05252",
  };

  return (
    <section id="generator" className="converter-preview" aria-labelledby="generator-h2">
      <div className="converter-container">
        <h2 id="generator-h2" className="converter-h2">{TOOL_NAME}</h2>

        <div className="converter-box">
          {/* ── Controls ── */}
          <div className="rng-controls">
            <div className="rng-row">
              <div className="rng-field">
                <label htmlFor="q-category" className="converter-label">Category</label>
                <select
                  id="q-category"
                  className="rng-input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  aria-label="Question category"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div className="rng-field">
                <label htmlFor="q-difficulty" className="converter-label">Difficulty</label>
                <select
                  id="q-difficulty"
                  className="rng-input"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                  aria-label="Question difficulty"
                >
                  {DIFFICULTIES.map((d) => (
                    <option key={d} value={d}>{d === "Any" ? "Any" : d.charAt(0).toUpperCase() + d.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              className={`rng-generate-btn${loading ? " rolling" : ""}`}
              onClick={handleGenerate}
              disabled={loading}
              aria-label="Generate a random question"
            >
              {loading ? "⟳ Loading…" : count === 0 ? "✦ Generate a Question" : "✦ Next Question"}
            </button>
          </div>

          {/* ── Error ── */}
          {errMsg && (
            <div className="converter-empty-state" role="alert" aria-live="assertive">
              <p>⚠ {errMsg}</p>
            </div>
          )}

          {/* ── Question card ── */}
          {question && !errMsg && (
            <div
              className="converter-outputs"
              role="region"
              aria-live="polite"
              aria-label="Question result"
            >
              <div className="converter-output rng-result-card" style={{ cursor: "default" }}>
                {/* Meta row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                  <span className="output-label" style={{ margin: 0 }}>
                    {question.category}
                    {count > 0 && (
                      <span style={{ marginLeft: 8, color: "var(--ink-3)", fontWeight: 400 }}>#{count}</span>
                    )}
                  </span>
                  <span
                    className="tool-cat"
                    style={{
                      borderColor: difficultyColor[question.difficulty] ?? "var(--line-2)",
                      color: difficultyColor[question.difficulty] ?? "var(--ink-3)",
                    }}
                  >
                    {question.difficulty}
                  </span>
                </div>

                {/* Question text */}
                <code
                  className="output-code rng-result-number"
                  style={{
                    fontSize: "clamp(15px, 2.2vw, 22px)",
                    lineHeight: 1.5,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    marginBottom: 24,
                    display: "block",
                  }}
                >
                  {question.question}
                </code>

                {/* Answer buttons */}
                {answers.length > 0 && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: question.type === "boolean" ? "1fr 1fr" : "1fr 1fr",
                      gap: 8,
                      marginBottom: 16,
                    }}
                  >
                    {answers.map((ans) => {
                      const isCorrect = ans === question.correct_answer;
                      const isSelected = ans === selected;
                      let bg = "var(--surface)";
                      let border = "var(--line)";
                      let color = "var(--ink)";
                      if (revealed) {
                        if (isCorrect) { bg = "color-mix(in srgb, var(--accent) 15%, var(--bg))"; border = "var(--accent)"; color = "var(--ink)"; }
                        else if (isSelected) { bg = "color-mix(in srgb, #e05252 15%, var(--bg))"; border = "#e05252"; color = "var(--ink)"; }
                      }
                      return (
                        <button
                          key={ans}
                          onClick={() => handleSelect(ans)}
                          disabled={revealed}
                          aria-pressed={isSelected}
                          style={{
                            padding: "12px 16px",
                            border: `1px solid ${border}`,
                            borderRadius: 4,
                            background: bg,
                            color,
                            fontSize: 13,
                            fontFamily: "var(--mono)",
                            textAlign: "left",
                            cursor: revealed ? "default" : "pointer",
                            transition: "all 0.2s",
                            lineHeight: 1.4,
                          }}
                        >
                          {revealed && isCorrect && "✓ "}
                          {revealed && isSelected && !isCorrect && "✗ "}
                          {ans}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Reveal / answer area */}
                {!revealed && (
                  <button
                    className="btn btn-ghost"
                    onClick={() => setRevealed(true)}
                    style={{ fontSize: 12, padding: "8px 16px" }}
                  >
                    Reveal Answer
                  </button>
                )}

                {revealed && (
                  <div
                    style={{
                      padding: "10px 16px",
                      background: "color-mix(in srgb, var(--accent) 8%, var(--bg))",
                      border: "1px solid var(--accent)",
                      borderRadius: 4,
                      fontSize: 13,
                      color: "var(--ink)",
                      fontFamily: "var(--mono)",
                    }}
                  >
                    ✓ Correct answer: <strong>{question.correct_answer}</strong>
                  </div>
                )}

                <span className="output-desc" style={{ marginTop: 12, display: "block" }}>
                  Via {question.source} · {question.type === "boolean" ? "True / False" : "Multiple choice"}
                </span>
              </div>
            </div>
          )}

          {/* ── Empty state ── */}
          {!question && !errMsg && (
            <div className="converter-empty-state">
              <p>Choose a category and difficulty, then click <strong>Generate a Question</strong></p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function RandomQuestionGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* HERO */}
      <section className="hero" aria-labelledby="hero-h1">
        <div className="hero-meta">
          <span className="dot dot-live" /> Live API · 4000+ Questions · No Signup
        </div>
        <h1 id="hero-h1" className="hero-h1">
          Random Question Generator
          <br />
          <em>test your knowledge.</em>
        </h1>
        <p className="hero-sub">
          Get a random trivia question by category and difficulty. Pick an answer,
          reveal the correct one. Powered by the Open Trivia Database — free, no signup, works in your browser.
        </p>
        <div className="hero-cta">
          <a href="#generator" className="btn btn-primary">Generate a Question →</a>
          <a href="#how-it-works" className="btn btn-ghost">How it works</a>
        </div>
        <ul className="hero-stats" aria-label="Tool highlights">
          <li><strong>4000+</strong><span>questions</span></li>
          <li><strong>12</strong><span>categories</span></li>
          <li><strong>3</strong><span>difficulty levels</span></li>
          <li><strong>Free</strong><span>forever</span></li>
        </ul>
      </section>

      {/* TOOL */}
      <RandomQuestionSection />

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="why" aria-labelledby="why-h2">
        <span className="eyebrow">/ 01 — How It Works</span>
        <h2 id="why-h2" className="section-h2">Pick a category. Get a question.</h2>
        <div className="why-grid">
          <article className="why-card">
            <span className="why-num">01</span>
            <h3>Choose Category</h3>
            <p>Select from 12 categories — Science, History, Geography, Sports, Animals, Film, Music, and more. Or pick Any for a fully random question.</p>
          </article>
          <article className="why-card">
            <span className="why-num">02</span>
            <h3>Set Difficulty</h3>
            <p>Filter by Easy, Medium, or Hard. Leave it on Any to get a mixed experience across all difficulty levels.</p>
          </article>
          <article className="why-card">
            <span className="why-num">03</span>
            <h3>Answer & Reveal</h3>
            <p>Click an answer option to make your guess, or click Reveal Answer directly. The correct answer is highlighted immediately.</p>
          </article>
          <article className="why-card">
            <span className="why-num">04</span>
            <h3>Automatic Fallback</h3>
            <p>If the primary API (opentdb.com) is unavailable, a secondary source (the-trivia-api.com) is tried automatically — zero downtime.</p>
          </article>
        </div>
      </section>

      {/* CATEGORIES GUIDE */}
      <section className="why" aria-labelledby="categories-h2">
        <span className="eyebrow">/ 02 — Categories</span>
        <h2 id="categories-h2" className="section-h2">What topics can you explore?</h2>
        <div className="formats-container">
          <div className="format-group">
            <h3 className="format-group-title">Knowledge & Science</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Science & Nature</strong>
                <p>Biology, chemistry, physics, astronomy, and natural sciences. From the microscopic to the cosmic.</p>
                <code>Category ID: 17</code>
              </div>
              <div className="format-item">
                <strong>Computers</strong>
                <p>Hardware, software, programming languages, algorithms, and the history of computing.</p>
                <code>Category ID: 18</code>
              </div>
              <div className="format-item">
                <strong>History</strong>
                <p>World history, wars, empires, revolutions, and the key events that shaped civilization.</p>
                <code>Category ID: 23</code>
              </div>
            </div>
          </div>

          <div className="format-group">
            <h3 className="format-group-title">Arts & Entertainment</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Film & TV</strong>
                <p>Questions about movies, directors, actors, iconic scenes, and television series.</p>
                <code>Category ID: 11</code>
              </div>
              <div className="format-item">
                <strong>Music</strong>
                <p>Artists, albums, lyrics, music history, genres, and musical theory questions.</p>
                <code>Category ID: 12</code>
              </div>
              <div className="format-item">
                <strong>Video Games</strong>
                <p>Games, consoles, characters, game studios, and gaming history from Atari to modern day.</p>
                <code>Category ID: 15</code>
              </div>
            </div>
          </div>

          <div className="format-group">
            <h3 className="format-group-title">World & Sports</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Geography</strong>
                <p>Countries, capitals, continents, flags, rivers, mountains, and world maps.</p>
                <code>Category ID: 22</code>
              </div>
              <div className="format-item">
                <strong>Sports</strong>
                <p>Athletics, football, basketball, tennis, Olympics, records, and sporting history.</p>
                <code>Category ID: 21</code>
              </div>
              <div className="format-item">
                <strong>Animals</strong>
                <p>Wildlife, habitats, behaviors, animal records, and the animal kingdom in all its diversity.</p>
                <code>Category ID: 27</code>
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
        <h2>Ready to test your knowledge?</h2>
        <a href="#generator" className="btn btn-primary btn-lg">Generate a Question Now →</a>
      </section>
    </>
  );
}