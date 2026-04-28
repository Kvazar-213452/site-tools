import type { Metadata } from "next";
import Config from "@/lib/config";

import "@/style/home.css";

// ─── JSON-LD ──────────────────────────────────────────────────────────────

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",           item: Config.MAIN_DOMAIN_NO },
    { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${Config.MAIN_DOMAIN_NO}/privacy-policy` },
  ],
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `Privacy Policy — ${Config.SITE_NAME}`,
  url: `${Config.MAIN_DOMAIN_NO}/privacy-policy`,
  description: `Privacy Policy for ${Config.SITE_NAME}. We do not collect, store, or sell your personal data. All tools run 100% in your browser.`,
  publisher: {
    "@type": "Organization",
    name: Config.SITE_NAME,
    url: Config.MAIN_DOMAIN_NO,
  },
  dateModified: "2025-04-01",
};

// ─── Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: `Privacy Policy — ${Config.SITE_NAME}`,
  description: `${Config.SITE_NAME} does not collect, store, or sell your personal data. All tools run locally in your browser. Read our full privacy policy.`,
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: `Privacy Policy — ${Config.SITE_NAME}`,
    description: `We do not collect or store your data. All ${Config.SITE_NAME} tools run 100% in your browser — nothing is transmitted to our servers.`,
    url: `${Config.MAIN_DOMAIN_NO}/privacy-policy`,
    type: "website",
    siteName: Config.SITE_NAME,
  },
  robots: { index: true, follow: true },
};

// ─── Sections ─────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    num: "01",
    title: "Overview",
    body: `${Config.SITE_NAME} is built on a simple principle: your data belongs to you. Every tool on this site runs entirely in your browser using JavaScript. Nothing you type, generate, or produce is ever sent to our servers. This policy explains what little we do collect, why, and how.`,
  },
  {
    num: "02",
    title: "Data we do not collect",
    body: `We do not collect, store, log, or transmit: any text or values you enter into our tools; any output you generate (passwords, random numbers, UUIDs, hashes, QR codes, color palettes, etc.); your IP address in connection with tool usage; or any personally identifiable information. There is no account system and no signup.`,
  },
  {
    num: "03",
    title: "Anonymous analytics",
    body: `We may collect aggregated, anonymous analytics data — such as total page views and which tools are used most — solely to understand how to improve the Service. This data contains no personally identifiable information and cannot be traced back to any individual user. We do not use Google Analytics or any third-party advertising tracker.`,
  },
  {
    num: "04",
    title: "Cookies",
    body: `${Config.SITE_NAME} does not use cookies for tracking, advertising, or personalisation. We may set a minimal session cookie for theme preferences (light/dark mode) if that feature is present. No cookie data is shared with third parties.`,
  },
  {
    num: "05",
    title: "Local storage",
    body: `Some tools may save your last-used settings (e.g. preferred range, character rules) in your browser's localStorage solely for your convenience. This data never leaves your device and can be cleared at any time through your browser settings.`,
  },
  {
    num: "06",
    title: "Third-party services",
    body: `The Service may be hosted on third-party infrastructure (e.g. Vercel, Cloudflare). These providers may collect standard server logs (IP addresses, request timestamps) as part of normal operations. These logs are governed by the respective providers' privacy policies and are not accessible to ${Config.SITE_NAME} for user-level analysis.`,
  },
  {
    num: "07",
    title: "Children's privacy",
    body: `${Config.SITE_NAME} is a general-purpose utility site and is not directed at children under 13. We do not knowingly collect any information from children. If you believe a child has submitted personal information to us, please contact us and we will promptly delete it.`,
  },
  {
    num: "08",
    title: "Data security",
    body: `Because we do not collect your data, there is nothing to secure on our end. All sensitive operations — password generation, hashing, encryption-related tools — run entirely in your browser using the Web Crypto API. Your inputs are never exposed to a network request.`,
  },
  {
    num: "09",
    title: "Your rights",
    body: `Since we hold no personal data about you, there is nothing to request, correct, or delete. If you believe we have inadvertently collected personal information, contact us at ${Config.GMAIL} and we will investigate and rectify it immediately.`,
  },
  {
    num: "10",
    title: "Changes to this policy",
    body: `We may update this Privacy Policy from time to time. The date at the top of this page reflects the most recent revision. Continued use of the Service after a change constitutes acceptance of the updated policy. We will not make changes that reduce your privacy protections without clear notice.`,
  },
  {
    num: "11",
    title: "Contact",
    body: `Questions, concerns, or requests related to this Privacy Policy? Email us at ${Config.GMAIL}. We read every message and reply within 1–2 business days.`,
  },
];

const FAQ = [
  { q: "Does Toolsxm collect my data?",              a: "No. All tools run locally in your browser. Nothing you enter or generate is transmitted to our servers." },
  { q: "Do you use cookies or tracking?",            a: "We do not use tracking cookies or advertising trackers. We may set a minimal cookie for UI preferences like dark mode." },
  { q: "Can I use the tools anonymously?",           a: "Yes. There is no account system, no signup, and no login. You use every tool without identifying yourself in any way." },
  { q: "What happens to passwords I generate?",     a: "They are generated entirely in your browser and never leave your device. We never see them." },
  { q: "Who do I contact about a privacy concern?", a: `Email us at ${Config.GMAIL}. We take privacy concerns seriously and respond within 1–2 business days.` },
];

// ─── Page ─────────────────────────────────────────────────────────────────

export default function PrivacyPolicyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />

      {/* HERO */}
      <section className="hero" aria-labelledby="hero-h1">
        <div className="hero-meta">
          <span className="dot dot-live" /> Last updated: April 2025 · No tracking · No data collected
        </div>
        <h1 id="hero-h1" className="hero-h1">
          Privacy Policy
          <br />
          <em>we collect nothing.</em>
        </h1>
        <p className="hero-sub">
          Short version: every tool runs in your browser, nothing you type or generate
          ever reaches our servers, and there are no tracking cookies or ads.
          The full details are below.
        </p>
        <div className="hero-cta">
          <a href="#policy" className="btn btn-primary">Read the policy →</a>
          <a href="#faq"    className="btn btn-ghost">Quick FAQ</a>
        </div>
        <ul className="hero-stats" aria-label="Privacy highlights">
          <li><strong>Zero</strong><span>data collected</span></li>
          <li><strong>No</strong><span>tracking cookies</span></li>
          <li><strong>100%</strong><span>browser-side</span></li>
          <li><strong>No</strong><span>ads ever</span></li>
        </ul>
      </section>

      {/* POLICY SECTIONS */}
      <section id="policy" className="tools" aria-labelledby="policy-h2">
        <div className="section-head">
          <div>
            <span className="eyebrow">/ 01 — Policy</span>
            <h2 id="policy-h2" className="section-h2">Full privacy policy</h2>
            <p className="section-lede">
              This policy describes how {Config.SITE_NAME} handles — or rather, does not handle —
              your personal data. Effective date: April 1, 2025.
            </p>
          </div>
        </div>

        <ul className="tool-grid" role="list">
          {SECTIONS.map((s) => (
            <li key={s.num} className="tool-card">
              <div className="tool-top">
                <span className="tool-icon" aria-hidden="true">{s.num}</span>
              </div>
              <h3 className="tool-name">{s.title}</h3>
              <p className="tool-desc">{s.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* WHY */}
      <section className="why" aria-labelledby="why-h2">
        <span className="eyebrow">/ 02 — Our approach</span>
        <h2 id="why-h2" className="section-h2">Privacy by design, not by policy.</h2>
        <div className="why-grid">
          <article className="why-card">
            <span className="why-num">01</span>
            <h3>Local-first</h3>
            <p>Every tool runs in your browser. The architecture makes data collection impossible — there is no server receiving your input.</p>
          </article>
          <article className="why-card">
            <span className="why-num">02</span>
            <h3>No ads, ever</h3>
            <p>We have no advertisers and no ad network. There is no commercial incentive to track you — and we never will.</p>
          </article>
          <article className="why-card">
            <span className="why-num">03</span>
            <h3>No account needed</h3>
            <p>No signup, no login, no profile. You are anonymous by default and remain that way for every tool on this site.</p>
          </article>
          <article className="why-card">
            <span className="why-num">04</span>
            <h3>Auditable</h3>
            <p>The source code is open. You can verify for yourself that no data leaves your browser. Trust, but verify.</p>
          </article>
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
        <h2>Questions about this privacy policy?</h2>
        <a href={`mailto:${Config.GMAIL}`} className="btn btn-primary btn-lg">
          Email us →
        </a>
      </section>
    </>
  );
}