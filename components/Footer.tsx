import Image from "next/image";
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

/**
 * `variant="wave"` (Figma 510:3935, Collective + Editions): a 237px band of
 * the dark wave photo, "CH" at the left and the year at the right, both in
 * gold. It is always on, regardless of FOOTER_ENABLED (that switch is for
 * the plain footer).
 */
export default function Footer({ variant }: { variant?: "wave" } = {}) {
  if (variant === "wave") {
    return (
      <footer className="footer footer--wave">
        <Image
          className="footer__bg"
          src="/assets/hero-bg.webp"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className="footer__shade" />
        <p className="footer__mark" aria-label="Colvin Haven trademark">
          CH
          <sup className="footer__tm" aria-hidden="true">
            TM
          </sup>
        </p>
        <p className="footer__year">{new Date().getFullYear()}</p>
      </footer>
    );
  }
  if (!FOOTER_ENABLED) return null;

  return (
    <footer className="footer">
      <p className="footer__mark" aria-label="Colvin Haven trademark">
        CH
        <sup className="footer__tm" aria-hidden="true">
          TM
        </sup>
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
