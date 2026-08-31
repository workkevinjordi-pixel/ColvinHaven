"use client";

import { useEffect, useState } from "react";
import { Opt4Wordmark } from "./parts";

const LINKS = [
  { href: "#editions", label: "Editions" },
  { href: "#collective", label: "Collective" },
  { href: "#inquiry", label: "Enquire" },
];

/**
 * Aman-style header: MENU on the left, a centred wordmark, ENQUIRE on the
 * right. Transparent over the hero, settling to a cream bar once scrolled
 * past it. MENU opens a full-screen overlay with large serif links.
 */
export default function Opt4Nav() {
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
        className={`opt4-nav${solid ? " opt4-nav--solid" : ""}${
          open ? " opt4-nav--open" : ""
        }`}
      >
        <button
          type="button"
          className="opt4-nav__menu"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="opt4-nav__menu-lines" aria-hidden="true">
            <span />
            <span />
          </span>
          <span className="opt4-nav__menu-label">{open ? "Close" : "Menu"}</span>
        </button>

        <a href="#top" className="opt4-nav__brand" aria-label="Colvin Haven">
          <Opt4Wordmark light dotSize={18} />
        </a>

        <a href="#inquiry" className="opt4-nav__enquire">
          Enquire
        </a>
      </header>

      <div className={`opt4-menu${open ? " opt4-menu--open" : ""}`}>
        <nav className="opt4-menu__links">
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              style={{ transitionDelay: open ? `${0.12 + i * 0.07}s` : "0s" }}
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
