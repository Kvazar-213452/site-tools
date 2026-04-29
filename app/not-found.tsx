'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import "@/style/home.css";
import "@/style/not-found.css";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="not-found-hero" aria-labelledby="not-found-h1">
      <h1 id="not-found-h1" className={`not-found-number ${mounted ? 'visible' : 'hidden'}`}>
        404
      </h1>
      
      <h2 className={`not-found-title ${mounted ? 'visible' : 'hidden'}`}>
        Page not found
      </h2>
      
      <p className={`not-found-subtitle ${mounted ? 'visible' : 'hidden'}`}>
        Sorry, the page you're looking for doesn't exist.
        But don't worry — we've got plenty of free tools to help you get back on track.
      </p>

      <div className={`not-found-cta ${mounted ? 'visible' : 'hidden'}`}>
        <Link href="/" className="btn btn-primary">
          Back to Home →
        </Link>
        <Link href="/tools" className="btn btn-ghost">
          Browse Tools
        </Link>
      </div>

      <div className={`not-found-suggestions ${mounted ? 'visible' : 'hidden'}`}>
        <Link href="/tools/password-generator" className="suggestion-card">
          <span className="suggestion-icon">◇</span>
          <div className="suggestion-title">Password Generator</div>
          <div className="suggestion-desc">Generate strong, secure passwords instantly</div>
          <div className="suggestion-arrow">Explore →</div>
        </Link>

        <Link href="/tools/qr-code-generator" className="suggestion-card">
          <span className="suggestion-icon">▦</span>
          <div className="suggestion-title">QR Code Generator</div>
          <div className="suggestion-desc">Create QR codes for URLs and text</div>
          <div className="suggestion-arrow">Explore →</div>
        </Link>

        <Link href="/tools/uuid-generator" className="suggestion-card">
          <span className="suggestion-icon">◈</span>
          <div className="suggestion-title">UUID Generator</div>
          <div className="suggestion-desc">Generate unique identifiers for databases</div>
          <div className="suggestion-arrow">Explore →</div>
        </Link>

        <Link href="/tools/color-palette-generator" className="suggestion-card">
          <span className="suggestion-icon">◐</span>
          <div className="suggestion-title">Color Palette Generator</div>
          <div className="suggestion-desc">Build harmonious color palettes easily</div>
          <div className="suggestion-arrow">Explore →</div>
        </Link>

        <Link href="/tools/hash-generator" className="suggestion-card">
          <span className="suggestion-icon">⬡</span>
          <div className="suggestion-title">Hash Generator</div>
          <div className="suggestion-desc">Compute MD5, SHA, and bcrypt hashes</div>
          <div className="suggestion-arrow">Explore →</div>
        </Link>

        <Link href="/contact" className="suggestion-card">
          <span className="suggestion-icon">✉</span>
          <div className="suggestion-title">Contact Support</div>
          <div className="suggestion-desc">Report a broken link or get help</div>
          <div className="suggestion-arrow">Reach out →</div>
        </Link>
      </div>

      <div className={`not-found-footer ${mounted ? 'visible' : 'hidden'}`}>
        Error code: 404 · Page not found · <Link href="/">Return to home</Link>
      </div>
    </section>
  );
}