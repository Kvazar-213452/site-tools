import type { Metadata } from "next";
import Config from "@/lib/config";

import "@/style/home.css";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: Config.SITE_NAME,
  url: Config.MAIN_DOMAIN_NO,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: Config.GMAIL,
    availableLanguage: ["English"],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",    item: Config.MAIN_DOMAIN_NO },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${Config.MAIN_DOMAIN_NO}/contact` },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How can I contact Toolsxm?",
      acceptedAnswer: { "@type": "Answer", text: `You can reach the ${Config.SITE_NAME} team directly by email at ${Config.GMAIL}. We read every message and reply within 1–2 business days.` },
    },
    {
      "@type": "Question",
      name: "How quickly do you respond?",
      acceptedAnswer: { "@type": "Answer", text: "We aim to reply within 1–2 business days. Bug reports and urgent tool issues are prioritised for same-day responses." },
    },
    {
      "@type": "Question",
      name: "Can I request a new tool?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — describe the tool you need in your email and we will evaluate it for the next release. The catalog is community-driven." },
    },
    {
      "@type": "Question",
      name: "Where do I report a bug?",
      acceptedAnswer: { "@type": "Answer", text: "Email us with the tool name, what you expected, and what actually happened. Screenshots or screen recordings are very welcome." },
    },
  ],
};

export const metadata: Metadata = {
  title: `Contact Us — ${Config.SITE_NAME}`,
  description:
    `Have a question, bug report, or tool request? Contact the ${Config.SITE_NAME} team by email. We read every message and reply within 1–2 business days.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact — ${Config.SITE_NAME}`,
    description: `Reach the ${Config.SITE_NAME} team for bug reports, tool requests, or general questions. We reply within 1–2 business days.`,
    url: `${Config.MAIN_DOMAIN_NO}/contact`,
    type: "website",
    siteName: Config.SITE_NAME,
  },
  twitter: {
    card: "summary",
    title: `Contact — ${Config.SITE_NAME}`,
    description: `Reach the ${Config.SITE_NAME} team for bug reports, tool requests, or general questions.`,
  },
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section className="hero" aria-labelledby="hero-h1">
        <div className="hero-meta">
          <span className="dot dot-live" /> Real humans · No chatbots · 1–2 day reply
        </div>
        <h1 id="hero-h1" className="hero-h1">
          Got a question or idea?
          <br />
          <em>We want to hear it.</em>
        </h1>
        <p className="hero-sub">
          Drop us an email — whether it is a bug, a tool request, a partnership idea, or just
          a question. Every message is read and replied to by a real person.
        </p>
        <div className="hero-cta">
          <a href={`mailto:${Config.GMAIL}`} className="btn btn-primary">
            Email us →
          </a>
          <a href="#why" className="btn btn-ghost">What to expect</a>
        </div>
        <ul className="hero-stats" aria-label="Contact highlights">
          <li><strong>1–2</strong><span>day reply</span></li>
          <li><strong>Every</strong><span>message read</span></li>
          <li><strong>No</strong><span>chatbots</span></li>
          <li><strong>Free</strong><span>support</span></li>
        </ul>
      </section>

      {/* CONTACT */}
      <section id="contact" className="tools" aria-labelledby="contact-h2">
        <div className="section-head">
          <div>
            <span className="eyebrow">/ 01 — Contact</span>
            <h2 id="contact-h2" className="section-h2">Reach us by email</h2>
            <p className="section-lede">
              The fastest way to reach us is a direct email. No contact form, no ticket queue —
              just a real conversation.
            </p>
          </div>
        </div>

        <ul className="tool-grid" role="list">
          <li className="tool-card">
            <a
              href={`mailto:${Config.GMAIL}`}
              className="tool-link"
              aria-label={`Send email to ${Config.GMAIL}`}
            >
              <div className="tool-top">
                <span className="tool-icon" aria-hidden="true">✉</span>
                <span className="tool-cat">Gmail</span>
              </div>
              <h3 className="tool-name">{Config.GMAIL}</h3>
              <p className="tool-desc">
                Click to open your email client and write to us directly. We reply within 1–2 business days.
              </p>
              <span className="tool-arrow" aria-hidden="true">Write us <span>→</span></span>
            </a>
          </li>
        </ul>

        <div className="seo-copy">
          <h3>How to write an effective message</h3>
          <p>
            For <strong>bug reports</strong> — include the tool name, your browser and OS, what you
            expected to happen, and what actually happened. A screenshot speeds things up considerably.
          </p>
          <p>
            For <strong>tool requests</strong> — describe the tool you need, what input it takes, and
            what output you expect. The more specific, the better. Our catalog is community-driven and
            new tools are prioritised by demand.
          </p>
          <p>
            For <strong>general questions</strong> about how a tool works, privacy, data handling, or
            the technology behind {Config.SITE_NAME} — just ask. We answer in plain language without
            technical jargon unless you want it.
          </p>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section id="why" className="why" aria-labelledby="why-h2">
        <span className="eyebrow">/ 02 — What to expect</span>
        <h2 id="why-h2" className="section-h2">How we handle your message.</h2>
        <div className="why-grid">
          <article className="why-card">
            <span className="why-num">01</span>
            <h3>Bug reports</h3>
            <p>Critical issues get same-day attention. Include tool name, browser, and a short description of what went wrong.</p>
          </article>
          <article className="why-card">
            <span className="why-num">02</span>
            <h3>Tool requests</h3>
            <p>The catalog is community-driven. Describe what you need — popular requests get built first.</p>
          </article>
          <article className="why-card">
            <span className="why-num">03</span>
            <h3>General questions</h3>
            <p>Ask anything about how a tool works, our privacy approach, or the tech behind it. No question is too small.</p>
          </article>
          <article className="why-card">
            <span className="why-num">04</span>
            <h3>Response time</h3>
            <p>We reply within 1–2 business days. For complex requests we will keep you updated on progress.</p>
          </article>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="faq" aria-labelledby="faq-h2">
        <span className="eyebrow">/ 03 — FAQ</span>
        <h2 id="faq-h2" className="section-h2">Questions people ask</h2>
        <div className="faq-list">
          {[
            { q: "How can I contact Toolsxm?",       a: `Send an email to ${Config.GMAIL}. We read every message and reply within 1–2 business days.` },
            { q: "How quickly do you respond?",      a: "We aim to reply within 1–2 business days. Bug reports and urgent issues are prioritised for same-day responses." },
            { q: "Can I request a new tool?",        a: "Yes — describe the tool you need in your email. The catalog is community-driven and popular requests get built first." },
            { q: "Where do I report a bug?",         a: "Email us with the tool name, what you expected, and what happened. Screenshots are very welcome." },
          ].map((f, i) => (
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
        <h2>Have a question or idea? We want to hear it.</h2>
        <a href={`mailto:${Config.GMAIL}`} className="btn btn-primary btn-lg">
          Email us now →
        </a>
      </section>
    </>
  );
}