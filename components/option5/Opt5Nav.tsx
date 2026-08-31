"use client";

import { useEffect, useState } from "react";
import { Opt5Wordmark } from "./parts";

const LINKS = [
  { href: "#editions", label: "Editions" },
  { href: "#collective", label: "Collective" },
  { href: "#inquiry", label: "Enquire" },
];

/**
 * Norm-style minimal header: wordmark left, a few small uppercase links
 * right. Transparent and blend-mode over the hero image, settling to a
 * plain bar with a hairline rule once scrolled. Under 640px the links
 * collapse to a Menu toggle -> full-screen overlay.
 */
export default function Opt5Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
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
        className={`opt5-nav${solid ? " opt5-nav--solid" : ""}${
          open ? " opt5-nav--open" : ""
        }`}
      >
        <a href="#top" className="opt5-nav__brand" aria-label="Colvin Haven">
          <Opt5Wordmark />
        </a>

        <nav className="opt5-nav__links">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="opt5-nav__toggle"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>

      <div className={`opt5-menu${open ? " opt5-menu--open" : ""}`}>
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
      </div>
    </>
  );
}
