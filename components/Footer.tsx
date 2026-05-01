import Link from "next/link";

const TOOLS_FOOTER = [
  { slug: "/tools/generator/password-generator", name: "Password Generator" },

  { slug: "/tools/case-converter", name: "Case Converter" },
  { slug: "/tools/word-counter", name: "Word Counter" },
  { slug: "/tools/json-formatter", name: "JSON Formatter" },

  { slug: "/tools/url-encoder", name: "URL Encoder" },
  { slug: "/tools/url-decode", name: "URL Decoder" },

  { slug: "/tools/generator/uuid-generator", name: "UUID Generator" },
];

export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-row">
        {/* Brand */}
        <div>
          <Link href="/" className="logo logo-sm" aria-label="besttoolsfree home">
            <span className="logo-mark" aria-hidden="true">◈</span>
            <span className="logo-text">besttoolsfree</span>
          </Link>
          <p className="footer-tag">Free generator tools, forever.</p>
        </div>

        {/* Tools */}
        <nav aria-label="Footer tools">
          <h4>Tools</h4>
          <ul>
            {TOOLS_FOOTER.map((t) => (
              <li key={t.slug}>
                <Link href={`/${t.slug}`}>{t.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Site */}
        <nav aria-label="Footer site">
          <h4>Site</h4>
          <ul>
            <li><a href="/tools">All tools</a></li>
            <li><a href="/#why">Why besttoolsfree</a></li>
            <li><a href="/#faq">FAQ</a></li>
          </ul>
        </nav>

        {/* Legal */}
        <nav aria-label="Footer legal">
          <h4>Legal</h4>
          <ul>
            <li><Link href="/privacy-policy">Privacy</Link></li>
            <li><Link href="/terms-of-service">Terms</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} besttoolsfree. All tools free, all rights reserved.
        </span>
        <span className="footer-mono">v1.0 · made with restraint</span>
      </div>
    </footer>
  );
}