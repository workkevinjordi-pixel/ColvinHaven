"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// The footer's own nav is a curated pair, not the full site map -- News
// and Write to Us have never appeared here, matching the footer's prior
// (static) Editions + Collective behavior. Now that pair is dynamic:
// whichever of these three sections you're currently on drops out,
// leaving the other two.
const FOOTER_LINKS = [
  { href: "/", label: "Discover" },
  { href: "/editions", label: "Editions" },
  { href: "/collective", label: "Collective" },
];

function isCurrentSection(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  // Covers an edition's own detail page (/editions/umah-tsuki) too --
  // still "on Editions" as far as this nav is concerned.
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Footer() {
  const pathname = usePathname() ?? "/";
  const current = FOOTER_LINKS.find((link) =>
    isCurrentSection(pathname, link.href),
  );
  // Pages outside the three listed above (News, Write to Us) match
  // none of them -- default to excluding "/" there, so the footer still
  // reads as Editions + Collective rather than growing a third link.
  const excludeHref = current?.href ?? "/";
  const links = FOOTER_LINKS.filter((link) => link.href !== excludeHref);

  return (
    <footer className="footer">
      <p className="footer__mark" aria-label="Colvin Haven">
        CH
      </p>
      <nav className="footer__nav">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
