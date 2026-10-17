"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const INSTAGRAM_URL = "https://www.instagram.com/colvinhaven/";

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
};

export default function Navbar({ solid = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [markHidden, setMarkHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      // The wordmark tucks away while scrolling down and returns on any
      // upward scroll (and at the very top); the dot stays. Small jitter
      // is ignored, and the CSS only applies this on phones.
      const delta = y - lastY;
      if (y < 80 || delta < -4) setMarkHidden(false);
      else if (delta > 4) setMarkHidden(true);
      if (Math.abs(delta) > 4) lastY = y;
    };
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
        className={`navbar${scrolled || solid ? " navbar--scrolled" : ""}${open ? " navbar--open" : ""}${markHidden ? " navbar--mark-hidden" : ""}${scrolled && !markHidden ? " navbar--bar" : ""}`}
      >
        <div className="navbar__inner">
          <Link href="/" className="navbar__index" aria-label="Colvin Haven">
            Colvin Haven
          </Link>

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

      <div
        className={`navbar__overlay${open ? " navbar__overlay--visible" : ""}`}
      >
        <div className="navbar__overlay-panel">
          {/* Every link fades in together (no per-item stagger, no
              slide) -- matches the reference recording, where the whole
              text block settles in one plain opacity fade before the
              photo crossfades in after it (see .navbar__overlay-media's
              own delay in globals.css). The big "Colvin Haven" label
              that used to sit above the list is gone; the gold wordmark
              in the bar above already says it. */}
          <nav className="navbar__overlay-links">
            {PRIMARY_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {/* Last item: the brand's Instagram. Opens in a new tab so the
                visitor keeps this page (and the menu) open. */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow on Instagram (opens in a new tab)"
            >
              Follow
            </a>
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
