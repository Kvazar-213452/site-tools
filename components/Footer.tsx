import Link from "next/link";

const TOOLS_FOOTER = [
  { slug: "password-generator",    name: "Password Generator" },
  { slug: "qr-code-generator",     name: "QR Code Generator" },
  { slug: "uuid-generator",        name: "UUID Generator" },
  { slug: "color-palette-generator", name: "Color Palette Generator" },
  { slug: "fake-data-generator",   name: "Fake Data Generator" },
  { slug: "hash-generator",        name: "Hash Generator" },
];

export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-row">
        {/* Brand */}
        <div>
          <Link href="/" className="logo logo-sm" aria-label="Toolsxm home">
            <span className="logo-mark" aria-hidden="true">◈</span>
            <span className="logo-text">toolsxm</span>
          </Link>
          <p className="footer-tag">Free generator tools, forever.</p>
        </div>

        {/* Tools */}
        <nav aria-label="Footer tools">
          <h4>Tools</h4>
          <ul>
            {TOOLS_FOOTER.map((t) => (
              <li key={t.slug}>
                <Link href={`/tools/${t.slug}`}>{t.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Site */}
        <nav aria-label="Footer site">
          <h4>Site</h4>
          <ul>
            <li><a href="/#tools">All tools</a></li>
            <li><a href="/#why">Why Toolsxm</a></li>
            <li><a href="/#faq">FAQ</a></li>
            <li><Link href="/sitemap.xml">Sitemap</Link></li>
          </ul>
        </nav>

        {/* Legal */}
        <nav aria-label="Footer legal">
          <h4>Legal</h4>
          <ul>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Toolsxm. All tools free, all rights reserved.
        </span>
        <span className="footer-mono">v1.0 · made with restraint</span>
      </div>
    </footer>
  );
}