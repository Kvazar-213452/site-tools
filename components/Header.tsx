"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { THEMES, useTheme } from "@/components/ThemeProvider";

export function Header() {
  const { theme, setTheme, currentTheme } = useTheme();
  const [themeOpen, setThemeOpen] = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!themeOpen) return;
    const handler = (e: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [themeOpen]);

  return (
    <header className="nav" role="banner">
      <div className="nav-inner">
        {/* Logo */}
        <Link
          href="/"
          className="logo"
          aria-label="Toolsxm home"
          onClick={() => setMenuOpen(false)}
        >
          <span className="logo-mark" aria-hidden="true">◈</span>
          <span className="logo-text">toolsxm</span>
          <span className="logo-dot" aria-hidden="true">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="nav-links" aria-label="Primary">
          <a href="/tools">Tools</a>
          <a href="/#why">Why us</a>
          <a href="/#faq">FAQ</a>
        </nav>

        {/* Actions */}
        <div className="nav-actions">
          {/* Theme picker */}
          <div className="theme-wrap" ref={themeRef}>
            <button
              type="button"
              className="theme-btn"
              aria-label="Change theme"
              aria-expanded={themeOpen}
              aria-haspopup="listbox"
              onClick={() => setThemeOpen((v) => !v)}
            >
              <span aria-hidden="true">{currentTheme.emoji}</span>
              <span className="theme-name">{currentTheme.name}</span>
              <span className="chev" aria-hidden="true">▾</span>
            </button>

            {themeOpen && (
              <ul
                className="theme-menu"
                role="listbox"
                aria-label="Theme options"
              >
                {THEMES.map((t) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={theme === t.id}
                      className={`theme-opt${theme === t.id ? " is-active" : ""}`}
                      onClick={() => { setTheme(t.id); setThemeOpen(false); }}
                    >
                      <span aria-hidden="true">{t.emoji}</span>
                      <span>{t.name}</span>
                      {theme === t.id && (
                        <span className="check" aria-hidden="true">✓</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Burger — mobile only via CSS */}
          <button
            type="button"
            className={`burger${menuOpen ? " is-open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`mobile-menu${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <a href="/#tools" onClick={() => setMenuOpen(false)}>Tools</a>
        <a href="/#why"   onClick={() => setMenuOpen(false)}>Why us</a>
        <a href="/#faq"   onClick={() => setMenuOpen(false)}>FAQ</a>
      </div>
    </header>
  );
}