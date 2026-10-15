import Link from "next/link";

// The footer's own nav is a fixed pair on every page (Figma node
// 325:39474): Editions + Collective. It used to drop whichever of
// Editions/Collective/Discover you were currently on; the current frame
// shows the same two links everywhere instead.
const FOOTER_LINKS = [
  { href: "/editions", label: "Editions" },
  { href: "/collective", label: "Collective" },
];

// Footer is switched off sitewide for now (explicit request). Flip this
// back to true to bring it back on every page -- every page still renders
// <Footer />, it just returns nothing while this is false.
const FOOTER_ENABLED = false;

export default function Footer() {
  if (!FOOTER_ENABLED) return null;

  return (
    <footer className="footer">
      <p className="footer__mark" aria-label="Colvin Haven">
        CH
      </p>
      <nav className="footer__nav">
        {FOOTER_LINKS.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
