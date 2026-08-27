"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const LINKS = [
  { href: "#editions", label: "Editions" },
  { href: "#collective", label: "Collective" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
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
        className={`navbar${scrolled ? " navbar--scrolled" : ""}${open ? " navbar--open" : ""}`}
      >
        <div className="navbar__inner">
          <a href="#" className="navbar__brand brand" aria-label="Colvin Haven">
            <span className="brand__word">Colvin</span>
            <Image
              className="brand__dot"
              src="/assets/dot-nav.png"
              alt=""
              width={20}
              height={20}
            />
            <span className="brand__word">Haven</span>
          </a>

          <div className="navbar__actions">
            <a href="#inquiry" className="navbar__cta">
              Inquiry
            </a>

            <button
              type="button"
              className="navbar__burger"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="navbar__burger-line" />
              <span className="navbar__burger-line" />
              <span className="navbar__burger-line" />
            </button>
          </div>
        </div>
      </header>

      <div className={`navbar__overlay${open ? " navbar__overlay--visible" : ""}`}>
        <nav className="navbar__overlay-links">
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
