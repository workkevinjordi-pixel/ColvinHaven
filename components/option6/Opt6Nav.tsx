"use client";

import { useEffect, useState } from "react";
import { Opt6Wordmark } from "./parts";

const LINKS = [
  { href: "#editions", label: "Editions" },
  { href: "#collective", label: "Collective" },
  { href: "#land", label: "The Land" },
  { href: "#inquiry", label: "Enquire" },
];

/**
 * Refined luxury-hospitality header (ayana.com register): a short link
 * set on the left, a centred serif wordmark, a brass "Enquire" button on
 * the right. Transparent over the hero, settling to a cream bar with a
 * hairline once scrolled. Under 900px the links collapse to a menu
 * toggle -> full-screen forest overlay.
 */
export default function Opt6Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`opt6-nav${solid ? " opt6-nav--solid" : ""}${
          open ? " opt6-nav--open" : ""
        }`}
      >
        <nav className="opt6-nav__links">
          {LINKS.slice(0, 3).map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#top" className="opt6-nav__brand" aria-label="Colvin Haven">
          <Opt6Wordmark />
        </a>

        <div className="opt6-nav__right">
          <a href="#inquiry" className="opt6-nav__cta">
            Enquire
          </a>
          <button
            type="button"
            className="opt6-nav__toggle"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`opt6-menu${open ? " opt6-menu--open" : ""}`}>
        <nav className="opt6-menu__links">
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              style={{ transitionDelay: open ? `${0.1 + i * 0.06}s` : "0s" }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
