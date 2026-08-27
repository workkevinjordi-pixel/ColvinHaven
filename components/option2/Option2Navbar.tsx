"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const LINKS = [
  { href: "#editions", label: "Editions" },
  { href: "#collective", label: "Collective" },
];

/**
 * Same interaction as the Option 1 navbar (fixed bar, burger -> fullscreen
 * megamenu with staggered links), but it isn't there on the hero: it
 * slides down and fades in over the hero -> Philosophy handoff, keyed to
 * how far the section below has covered the hero. The hero's own mini-nav
 * and CTA drift up and fade over the same scroll (see Option2Shell), so
 * the two read as the menu + CTA relocating into the bar.
 */
export default function Option2Navbar() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // How far the stack below has risen over the hero (0..1), mirroring
    // Option2Shell's own measure.
    const coverProgress = () => {
      const below = document.querySelector<HTMLElement>(".opt2-below");
      if (!below) return 1;
      const vh = window.innerHeight;
      return Math.max(
        0,
        Math.min(1, (vh - below.getBoundingClientRect().top) / vh),
      );
    };

    // Bar eases in between 12% and 60% covered; only clickable once solid.
    const apply = (cover: number) => {
      const n = Math.max(0, Math.min(1, (cover - 0.12) / 0.48));
      el.style.setProperty("--nav-in", n.toFixed(3));
      el.style.pointerEvents = n >= 0.9 ? "auto" : "none";
    };

    if (reduce) {
      const onScroll = () => apply(coverProgress() > 0.4 ? 1 : 0);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    }

    let target = 0;
    let shown = 0;
    let raf = 0;
    const frame = () => {
      raf = 0;
      shown += (target - shown) * 0.14;
      if (Math.abs(target - shown) < 0.0008) shown = target;
      apply(shown);
      if (Math.abs(target - shown) > 0.0008) raf = requestAnimationFrame(frame);
    };
    const onScroll = () => {
      target = coverProgress();
      if (!raf) raf = requestAnimationFrame(frame);
    };
    apply(0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
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
        ref={headerRef}
        className={`opt2-navbar${open ? " opt2-navbar--open" : ""}`}
      >
        <div className="opt2-navbar__inner">
          <a
            href="#"
            className="opt2-navbar__brand opt2-brand"
            aria-label="Colvin Haven"
          >
            <span className="opt2-brand__word">Colvin</span>
            <Image
              className="opt2-brand__dot"
              src="/assets/dot-nav.png"
              alt=""
              width={28}
              height={28}
            />
            <span className="opt2-brand__word">Haven</span>
          </a>

          <div className="opt2-navbar__actions">
            <a href="#inquiry" className="opt2-navbar__cta">
              Inquiry
            </a>
            <button
              type="button"
              className="opt2-navbar__burger"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="opt2-navbar__burger-line" />
              <span className="opt2-navbar__burger-line" />
              <span className="opt2-navbar__burger-line" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`opt2-navbar__overlay${
          open ? " opt2-navbar__overlay--visible" : ""
        }`}
      >
        <nav className="opt2-navbar__overlay-links">
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
