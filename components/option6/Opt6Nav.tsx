"use client";

import { useEffect, useState } from "react";
import { Opt6Wordmark } from "./parts";

const LINKS = [
  { href: "#editions", label: "Editions" },
  { href: "#collective", label: "Guiding Values" },
  { href: "#land", label: "The Land" },
  { href: "#inquiry", label: "Enquire" },
];

/**
 * Kettal-style fixed left rail: wordmark at the top, a small vertical
 * index below it, a location note pinned to the bottom. Under 1024px it
 * folds to a thin top bar with a Menu toggle that drops a small-type
 * panel.
 */
export default function Opt6Nav() {
  const [open, setOpen] = useState(false);

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
      <header className={`opt6-side${open ? " opt6-side--open" : ""}`}>
        <a href="#top" className="opt6-side__brand" aria-label="Colvin Haven">
          <Opt6Wordmark />
        </a>

        <nav className="opt6-side__nav">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <p className="opt6-side__meta">
          Pererenan, Bali
          <br />
          Wellness architecture &amp; design
        </p>

        <button
          type="button"
          className="opt6-side__toggle"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>

      <div className={`opt6-drawer${open ? " opt6-drawer--open" : ""}`}>
        <nav className="opt6-drawer__nav">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
