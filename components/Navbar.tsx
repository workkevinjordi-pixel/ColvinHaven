"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const PRIMARY_LINKS = [
  { href: "/", label: "Discover" },
  { href: "/editions", label: "Editions" },
  { href: "/collective", label: "Collective" },
  { href: "/write-to-us", label: "Write to us" },
];

// Same News destination as the navbar's own "II/VII" corner mark --
// grouped apart from the primary links (its own margin-top, a beat
// after the others) and rendered in that mark's roman-numeral type via
// navbar__overlay-link--roman instead of the plain style the rest use.
const SECONDARY_LINK = { href: "/news", label: "II/VII", roman: true };

type NavbarProps = {
  /**
   * Forces the solid/ink "scrolled" treatment from the first frame,
   * instead of the transparent-white-on-photo default. Used by pages
   * (like /editions) whose top section is the page's own light --bg
   * rather than a full-bleed dark hero image -- without this, the
   * default transparent navbar would render illegible white-on-cream
   * until the visitor scrolled past 60px.
   */
  solid?: boolean;
};

export default function Navbar({ solid = false }: NavbarProps) {
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
        className={`navbar${scrolled || solid ? " navbar--scrolled" : ""}${open ? " navbar--open" : ""}`}
      >
        <div className="navbar__inner">
          {/* The "II/VII" index mark doubles as the entry point to News --
              per direct instruction, this is how that page gets reached. */}
          <a href="/news" className="navbar__index" aria-label="News">
            II/VII
          </a>

          <div className="navbar__actions">
            <button
              type="button"
              className={`navbar__dot-trigger${open ? " navbar__dot-trigger--open" : ""}`}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <Image
                className="navbar__dot-trigger-img"
                src="/assets/dot-nav.png"
                alt=""
                width={40}
                height={40}
              />
            </button>
          </div>
        </div>
      </header>

      <div className={`navbar__overlay${open ? " navbar__overlay--visible" : ""}`}>
        <div className="navbar__overlay-panel">
          <p
            className="navbar__overlay-brand"
            style={{ transitionDelay: open ? "0.1s" : "0s" }}
          >
            Colvin Haven
          </p>
          <nav className="navbar__overlay-links">
            {PRIMARY_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                style={{ transitionDelay: open ? `${0.16 + i * 0.06}s` : "0s" }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="navbar__overlay-links-secondary">
              <a
                href={SECONDARY_LINK.href}
                className="navbar__overlay-link--roman"
                style={{
                  transitionDelay: open
                    ? `${0.16 + PRIMARY_LINKS.length * 0.06}s`
                    : "0s",
                }}
                onClick={() => setOpen(false)}
              >
                {SECONDARY_LINK.label}
              </a>
            </div>
          </nav>
        </div>
        <div className="navbar__overlay-media">
          <Image
            src="/assets/editions/tsuki-hero.png"
            alt=""
            fill
            sizes="(min-width: 900px) 40vw, 0px"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </>
  );
}
