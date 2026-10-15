"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const PRIMARY_LINKS = [
  { href: "/editions", label: "Editions" },
  { href: "/collective", label: "Collective" },
  { href: "/", label: "Discover" },
  { href: "/write-to-us", label: "Write to us" },
];

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
  /**
   * Homepage only. On mobile, while the navbar is still over the hero
   * photo (not scrolled, menu closed), the gold "COLVIN HAVEN" wordmark
   * takes the "I/V" mark's place (Figma node 426:703). Desktop and the
   * scrolled/open states keep the "I/V" mark.
   */
  heroBrand?: boolean;
};

export default function Navbar({ solid = false, heroBrand = false }: NavbarProps) {
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
        className={`navbar${scrolled || solid ? " navbar--scrolled" : ""}${open ? " navbar--open" : ""}${heroBrand ? " navbar--hero-brand" : ""}`}
      >
        <div className="navbar__inner">
          {/* The "I/V" index mark doubles as the entry point to the Sora
              edition -- per direct instruction, this is how that page gets
              reached. (It previously pointed at /news, which now has no
              nav entry point of its own.) */}
          <a
            href="/editions/umah-sora"
            className="navbar__index"
            aria-label="Umah Sora"
          >
            I/V
          </a>
          {heroBrand && (
            <span className="navbar__wordmark" aria-hidden="true">
              Colvin Haven
            </span>
          )}

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
          {/* Brand and every link fade in together (no per-item stagger,
              no slide) -- matches the reference recording, where the
              whole text block settles in one plain opacity fade before
              the photo crossfades in after it (see .navbar__overlay-
              media's own delay in globals.css). */}
          <p className="navbar__overlay-brand">Colvin Haven</p>
          <nav className="navbar__overlay-links">
            {PRIMARY_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
          </nav>

          {/* Pinned near the panel's own bottom-left corner (position:
              absolute, independent of the brand/links centering above)
              rather than a third flex item in that group -- explicit
              request, added as its own standalone block at the bottom of
              the megamenu, not folded into PRIMARY_LINKS. Apply opens a
              mailto: (no dedicated application form/page exists yet). */}
          <div className="navbar__overlay-apply">
            <p className="navbar__overlay-apply-label">Join the collective.</p>
            <a
              href="mailto:info@colvinhaven.com"
              onClick={() => setOpen(false)}
            >
              Apply <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="navbar__overlay-media">
          <Image
            src="/assets/navbar/mega-menu.jpg"
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
