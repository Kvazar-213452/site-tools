'use client';

import { useState, useCallback, useRef } from 'react';
import Config from "@/lib/config";

import "@/style/home.css";
import "@/style/tools.css";

const TOOL_URL  = `${Config.MAIN_DOMAIN_NO}/tools/generator/random-country-generator`;
const TOOL_NAME = "Random Country Generator";

const REGIONS = [
  { label: "Any Region",  value: ""        },
  { label: "Africa",      value: "Africa"   },
  { label: "Americas",    value: "Americas" },
  { label: "Asia",        value: "Asia"     },
  { label: "Europe",      value: "Europe"   },
  { label: "Oceania",     value: "Oceania"  },
] as const;
type Region = typeof REGIONS[number]["value"];

const FAQ = [
  { q: "Where does the country data come from?",    a: "Data is fetched live from REST Countries (restcountries.com) — a free, open-source API with no key required. It provides data for all 250 countries worldwide." },
  { q: "Is any data sent to a server?",             a: "The only request made is to the REST Countries API to load country data. No personal data, inputs, or usage information is transmitted or stored by us." },
  { q: "Can I filter by region?",                   a: "Yes. Use the Region dropdown to limit results to Africa, Americas, Asia, Europe, or Oceania. Select Any Region for a fully random result from all 250 countries." },
  { q: "What information is shown for each country?", a: "Each result shows the country's name, flag, capital, region, subregion, population, area, languages, and currency." },
  { q: "How is the random country picked?",         a: "The full country list is fetched once from the API and cached in memory. Each click randomly selects one entry from the (optionally filtered) list — no repeated API calls needed." },
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
  description: "Free random country generator. Discover countries with flag, capital, population, area, languages, and currency. Filter by region. Powered by REST Countries API.",
  operatingSystem: "Any — Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
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

// ── Types ────────────────────────────────────────────────────────────────────
interface RawCountry {
  name:        { common: string; official: string };
  capital?:    string[];
  population:  number;
  area:        number;
  region:      string;
  subregion?:  string;
  flags:       { svg: string; png: string; alt?: string };
  languages?:  Record<string, string>;
  currencies?: Record<string, { name: string; symbol?: string }>;
  cca2:        string;
}

interface Country {
  name:       string;
  official:   string;
  capital:    string;
  population: number;
  area:       number;
  region:     string;
  subregion:  string;
  flagSvg:    string;
  flagPng:    string;
  flagAlt:    string;
  languages:  string;
  currency:   string;
  code:       string;
}

function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

function parseCountry(r: RawCountry): Country {
  const langs = r.languages ? Object.values(r.languages).join(", ") : "N/A";
  const curr  = r.currencies
    ? Object.values(r.currencies)
        .map((c) => `${c.name}${c.symbol ? ` (${c.symbol})` : ""}`)
        .join(", ")
    : "N/A";
  return {
    name:       r.name.common,
    official:   r.name.official,
    capital:    r.capital?.[0] ?? "N/A",
    population: r.population,
    area:       r.area,
    region:     r.region,
    subregion:  r.subregion ?? "",
    flagSvg:    r.flags.svg,
    flagPng:    r.flags.png,
    flagAlt:    r.flags.alt ?? `Flag of ${r.name.common}`,
    languages:  langs,
    currency:   curr,
    code:       r.cca2,
  };
}

// ── Tool section ──────────────────────────────────────────────────────────────
function RandomCountrySection() {
  const allCountriesRef = useRef<Country[]>([]);

  const [country, setCountry]   = useState<Country | null>(null);
  const [loading, setLoading]   = useState(false);
  const [errMsg, setErrMsg]     = useState<string | null>(null);
  const [count, setCount]       = useState(0);
  const [region, setRegion]     = useState<Region>("");
  const [copied, setCopied]     = useState(false);

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    setErrMsg(null);
    setCopied(false);

    try {
      // fetch + cache the full list once
      if (allCountriesRef.current.length === 0) {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,capital,population,area,region,subregion,flags,languages,currencies,cca2",
          { cache: "force-cache" }
        );
        if (!res.ok) throw new Error(`REST Countries API: status ${res.status}`);
        const raw: RawCountry[] = await res.json();
        allCountriesRef.current = raw.map(parseCountry);
      }

      let pool = allCountriesRef.current;
      if (region) pool = pool.filter((c) => c.region === region);
      if (pool.length === 0) throw new Error(`No countries found for region "${region}".`);

      const picked = pool[Math.floor(Math.random() * pool.length)];
      setCountry(picked);
      setCount((n) => n + 1);
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [region]);

  const copyName = () => {
    if (!country) return;
    navigator.clipboard.writeText(country.name).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
                <label htmlFor="region-select" className="converter-label">Region</label>
                <select
                  id="region-select"
                  className="rng-input"
                  value={region}
                  onChange={(e) => setRegion(e.target.value as Region)}
                  aria-label="Filter by region"
                >
                  {REGIONS.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              className={`rng-generate-btn${loading ? " rolling" : ""}`}
              onClick={handleGenerate}
              disabled={loading}
              aria-label="Generate a random country"
            >
              {loading ? "⟳ Loading…" : count === 0 ? "✦ Generate a Country" : "✦ Another Country"}
            </button>
          </div>

          {/* ── Error ── */}
          {errMsg && (
            <div className="converter-empty-state" role="alert" aria-live="assertive">
              <p>⚠ {errMsg}</p>
            </div>
          )}

          {/* ── Country card ── */}
          {country && !errMsg && (
            <div
              className="converter-outputs"
              role="region"
              aria-live="polite"
              aria-label="Random country result"
            >
              <div className="converter-output rng-result-card" style={{ cursor: "default" }}>

                {/* Flag + name header */}
                <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
                  <img
                    src={country.flagPng}
                    alt={country.flagAlt}
                    width={96}
                    height={64}
                    style={{ objectFit: "cover", border: "1px solid var(--line)", borderRadius: 2, flexShrink: 0 }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <code
                        className="output-code rng-result-number"
                        style={{ fontSize: "clamp(18px, 3vw, 32px)", lineHeight: 1.1 }}
                      >
                        {country.name}
                      </code>
                      {count > 0 && (
                        <span style={{ fontSize: 11, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>
                          #{count}
                        </span>
                      )}
                    </div>
                    <span className="output-desc" style={{ marginTop: 4, display: "block" }}>
                      {country.official}
                    </span>
                  </div>
                </div>

                {/* Stats grid */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: 1,
                  background: "var(--line)",
                  border: "1px solid var(--line)",
                  marginBottom: 16,
                }}>
                  {[
                    { label: "Capital",    value: country.capital    },
                    { label: "Region",     value: `${country.region}${country.subregion ? ` · ${country.subregion}` : ""}` },
                    { label: "Population", value: formatNumber(country.population) },
                    { label: "Area",       value: `${formatNumber(country.area)} km²` },
                    { label: "Languages",  value: country.languages  },
                    { label: "Currency",   value: country.currency   },
                    { label: "Code",       value: country.code       },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      style={{ background: "var(--bg)", padding: "16px 20px" }}
                    >
                      <span className="output-label" style={{ marginBottom: 4, display: "block" }}>{label}</span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--ink)", lineHeight: 1.4 }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Copy + source row */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <button
                    className={`btn btn-ghost${copied ? " copied" : ""}`}
                    onClick={copyName}
                    style={{ fontSize: 12, padding: "8px 16px" }}
                    aria-label="Copy country name"
                  >
                    {copied ? "✓ Copied!" : "Copy name"}
                  </button>
                  <span className="output-desc" style={{ margin: 0 }}>
                    Via restcountries.com · 250 countries
                  </span>
                </div>

              </div>
            </div>
          )}

          {/* ── Empty state ── */}
          {!country && !errMsg && (
            <div className="converter-empty-state">
              <p>Choose a region and click <strong>Generate a Country</strong> to explore the world</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function RandomCountryGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* HERO */}
      <section className="hero" aria-labelledby="hero-h1">
        <div className="hero-meta">
          <span className="dot dot-live" /> Live API · 250 Countries · No Signup
        </div>
        <h1 id="hero-h1" className="hero-h1">
          Random Country Generator
          <br />
          <em>explore the world.</em>
        </h1>
        <p className="hero-sub">
          Discover a random country with flag, capital, population, area, languages, and currency.
          Filter by region or go fully random across all 250 countries.
          Powered by REST Countries API — free, no signup.
        </p>
        <div className="hero-cta">
          <a href="#generator" className="btn btn-primary">Generate a Country →</a>
          <a href="#how-it-works" className="btn btn-ghost">How it works</a>
        </div>
        <ul className="hero-stats" aria-label="Tool highlights">
          <li><strong>250</strong><span>countries</span></li>
          <li><strong>5</strong><span>regions</span></li>
          <li><strong>7</strong><span>data fields</span></li>
          <li><strong>Free</strong><span>forever</span></li>
        </ul>
      </section>

      {/* TOOL */}
      <RandomCountrySection />

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="why" aria-labelledby="why-h2">
        <span className="eyebrow">/ 01 — How It Works</span>
        <h2 id="why-h2" className="section-h2">Pick a region. Discover a country.</h2>
        <div className="why-grid">
          <article className="why-card">
            <span className="why-num">01</span>
            <h3>Choose a Region</h3>
            <p>Filter by Africa, Americas, Asia, Europe, or Oceania. Or leave it on Any Region to get a fully random country from anywhere in the world.</p>
          </article>
          <article className="why-card">
            <span className="why-num">02</span>
            <h3>One API Call</h3>
            <p>The full country list is fetched once from REST Countries and cached in memory. Each subsequent click is instant — no extra network requests.</p>
          </article>
          <article className="why-card">
            <span className="why-num">03</span>
            <h3>Rich Data</h3>
            <p>Each result shows 7 fields: flag, capital, population, area, region, languages, and currency. Everything you need at a glance.</p>
          </article>
          <article className="why-card">
            <span className="why-num">04</span>
            <h3>Copy the Name</h3>
            <p>Click Copy name to save the country name to your clipboard instantly. Perfect for quizzes, geography games, and travel planning.</p>
          </article>
        </div>
      </section>

      {/* DATA GUIDE */}
      <section className="why" aria-labelledby="data-h2">
        <span className="eyebrow">/ 02 — Data Fields</span>
        <h2 id="data-h2" className="section-h2">What data is shown for each country?</h2>
        <div className="formats-container">
          <div className="format-group">
            <h3 className="format-group-title">Geography</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Capital City</strong>
                <p>The official capital city of the country. Some countries have multiple capitals — the primary one is shown.</p>
                <code>Example: Paris · Tokyo · Nairobi</code>
              </div>
              <div className="format-item">
                <strong>Region & Subregion</strong>
                <p>The continental region and more specific subregion the country belongs to.</p>
                <code>Example: Europe · Northern Europe</code>
              </div>
              <div className="format-item">
                <strong>Area</strong>
                <p>Total land area of the country in square kilometres, formatted with thousand separators.</p>
                <code>Example: 9,596,960 km² (China)</code>
              </div>
            </div>
          </div>

          <div className="format-group">
            <h3 className="format-group-title">People & Economy</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Population</strong>
                <p>The estimated total population of the country, formatted with thousand separators for readability.</p>
                <code>Example: 1,402,112,000 (India)</code>
              </div>
              <div className="format-item">
                <strong>Languages</strong>
                <p>Official languages spoken in the country. Multiple languages are comma-separated.</p>
                <code>Example: French, English (Canada)</code>
              </div>
              <div className="format-item">
                <strong>Currency</strong>
                <p>The official currency name and symbol used in the country.</p>
                <code>Example: Euro (EUR, €)</code>
              </div>
            </div>
          </div>

          <div className="format-group">
            <h3 className="format-group-title">Other Fields</h3>
            <div className="format-items">
              <div className="format-item">
                <strong>Country Code</strong>
                <p>The ISO 3166-1 alpha-2 two-letter country code used internationally for identification.</p>
                <code>Example: DE · JP · BR · AU</code>
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
        <h2>Ready to explore the world?</h2>
        <a href="#generator" className="btn btn-primary btn-lg">Generate a Country Now →</a>
      </section>
    </>
  );
}