"use client";

import { useEffect, useState } from "react";
import { Opt6Wordmark } from "./parts";

const PRIMARY = [
  { href: "#editions", label: "Editions" },
  { href: "#collective", label: "Guiding Values" },
  { href: "#land", label: "The Land" },
];

const MENU = [
  { href: "#editions", label: "Editions" },
  { href: "#collective", label: "Guiding Values" },
  { href: "#silence", label: "Silence / Luxury" },
  { href: "#land", label: "The Land" },
  { href: "#inquiry", label: "Enquire" },
];

/**
 * Zecchinon-style header: a wordmark, bullet-prefixed primary links, a
 * language switch and a "Menu •" toggle, over a slim secondary strip.
 * Transparent (white) over the hero, resolving to a white bar with a
 * hairline once scrolled; the secondary strip collapses at the same
 * time. The toggle opens a plain full-screen menu.
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
        <div className="opt6-nav__bar">
          <a href="#top" className="opt6-nav__brand" aria-label="Colvin Haven">
            <Opt6Wordmark />
          </a>

          <nav className="opt6-nav__primary">
            {PRIMARY.map((link) => (
              <a key={link.href} href={link.href} className="opt6-bullet">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="opt6-nav__right">
            <span className="opt6-nav__lang">
              <b>IT</b> / EN / FR
            </span>
            <a href="#inquiry" className="opt6-bullet opt6-nav__enquire">
              Enquire
            </a>
            <button
              type="button"
              className="opt6-nav__toggle"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"} <span aria-hidden="true">&bull;</span>
            </button>
          </div>
        </div>

        <div className="opt6-nav__strip">
          <span>Pererenan, Bali</span>
          <span>Wellness Architecture &amp; Design</span>
          <span>Est. in the trees</span>
        </div>
      </header>

      <div className={`opt6-menu${open ? " opt6-menu--open" : ""}`}>
        <nav className="opt6-menu__links">
          {MENU.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              style={{ transitionDelay: open ? `${0.08 + i * 0.05}s` : "0s" }}
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
