"use client";

import { useEffect, useState } from "react";
import { Opt3Brand } from "./parts";

const SECTIONS = [
  { id: "philosophy", no: "01", label: "Philosophy" },
  { id: "inspiration", no: "02", label: "Inspiration" },
  { id: "editions", no: "03", label: "Editions" },
  { id: "collective", no: "04", label: "Collective" },
  { id: "inquiry", no: "05", label: "Inquiry" },
];

/**
 * Fixed thin bar: transparent over the hero, cream-blur once scrolled.
 * The right side is a running index of the five chapters; the one
 * crossing the viewport middle is marked active via IntersectionObserver.
 * Under 820px the index collapses to a burger -> fullscreen menu, the
 * same interaction as Options 1 and 2.
 */
export default function Opt3Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.5, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
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
        className={`opt3-nav${solid ? " opt3-nav--solid" : ""}${
          open ? " opt3-nav--menu" : ""
        }`}
      >
        <a href="#" className="opt3-nav__brand" aria-label="Colvin Haven">
          <Opt3Brand />
        </a>

        <nav className="opt3-nav__index">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={active === s.id ? "is-active" : ""}
            >
              <span className="opt3-nav__no">{s.no}</span>
              {s.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="opt3-nav__burger"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div className={`opt3-menu${open ? " opt3-menu--open" : ""}`}>
        {SECTIONS.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            style={{ transitionDelay: open ? `${0.08 + i * 0.05}s` : "0s" }}
            onClick={() => setOpen(false)}
          >
            <span className="opt3-nav__no">{s.no}</span>
            {s.label}
          </a>
        ))}
      </div>
    </>
  );
}
