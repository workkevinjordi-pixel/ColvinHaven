"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { Brand, MiniNav } from "./parts";

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

type PanelRefs = {
  el: HTMLElement | null;
  overlay: HTMLElement | null;
  content: HTMLElement | null;
  bg: HTMLElement | null;
};

/**
 * Owns the /option2 hero and the CTA/footer -- the two pinned bookends
 * of the page -- plus the scrolling stack between them (`children`).
 * One eased scroll loop drives both handoffs, and they are exact
 * mirrors of each other:
 *
 *  - Hero: fixed to the viewport; as the stack below rises and covers
 *    it, it eases back -- scales down, corners round, overlay darkens,
 *    the headline drifts up and fades, the photo parallaxes.
 *  - CTA/footer: also fixed; as the stack above scrolls up and off it,
 *    it does the same transition in reverse -- from receded to forward,
 *    scaling up into place. Same photo as the hero, driven the same way,
 *    so the two ends of the page read as one background plane.
 *
 * `prefers-reduced-motion` drops the eased transforms (see the media
 * query in globals.css, which returns the CTA to normal flow).
 */
export default function Option2Shell({ children }: { children: ReactNode }) {
  const heroRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLImageElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);

  const belowRef = useRef<HTMLDivElement>(null);

  const ctaRef = useRef<HTMLElement>(null);
  const ctaBgRef = useRef<HTMLDivElement>(null);
  const ctaContentRef = useRef<HTMLDivElement>(null);
  const ctaOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // k: 0 = fully forward (owns the viewport), 1 = fully receded.
    // dir: which way the content layer drifts as it recedes.
    const applyPanel = (r: PanelRefs, k: number, dir: -1 | 1) => {
      if (r.el) {
        r.el.style.transform = `scale(${(1 - k * 0.12).toFixed(4)})`;
        r.el.style.borderRadius = `${(k * 26).toFixed(1)}px`;
        r.el.style.visibility = k >= 0.999 ? "hidden" : "visible";
      }
      if (r.overlay) {
        r.overlay.style.opacity = (0.5 + k * 0.42).toFixed(3);
      }
      if (r.content) {
        r.content.style.transform = `translate3d(0, ${(dir * k * 7).toFixed(
          2,
        )}vh, 0)`;
        r.content.style.opacity = clamp(1 - k * 1.7, 0, 1).toFixed(3);
      }
      if (r.bg) {
        r.bg.style.transform = `translate3d(0, ${(k * 6).toFixed(
          2,
        )}%, 0) scale(${(1.03 + k * 0.06).toFixed(4)})`;
      }
    };

    const hero: PanelRefs = {
      el: heroRef.current,
      overlay: heroOverlayRef.current,
      content: heroContentRef.current,
      bg: heroBgRef.current,
    };
    const cta: PanelRefs = {
      el: ctaRef.current,
      overlay: ctaOverlayRef.current,
      content: ctaContentRef.current,
      bg: ctaBgRef.current,
    };

    let coverT = 0;
    let coverS = 0;
    let revealT = 0;
    let revealS = 0;
    let raf = 0;

    const measure = () => {
      const below = belowRef.current;
      if (!below) return;
      const vh = window.innerHeight;
      const rect = below.getBoundingClientRect();
      // The stack covers the hero as its top edge climbs from one
      // viewport down to 0...
      coverT = clamp((vh - rect.top) / vh, 0, 1);
      // ...and uncovers the CTA as its bottom edge climbs the same way.
      revealT = clamp((vh - rect.bottom) / vh, 0, 1);
    };

    const frame = () => {
      raf = 0;
      coverS += (coverT - coverS) * 0.12;
      revealS += (revealT - revealS) * 0.12;
      if (Math.abs(coverT - coverS) < 0.0005) coverS = coverT;
      if (Math.abs(revealT - revealS) < 0.0005) revealS = revealT;
      applyPanel(hero, coverS, -1);
      applyPanel(cta, 1 - revealS, 1);
      if (
        Math.abs(coverT - coverS) > 0.0005 ||
        Math.abs(revealT - revealS) > 0.0005
      ) {
        raf = requestAnimationFrame(frame);
      }
    };

    const onScroll = () => {
      measure();
      if (!raf) raf = requestAnimationFrame(frame);
    };

    applyPanel(hero, 0, -1);
    applyPanel(cta, 1, 1);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <header className="opt2-hero" ref={heroRef}>
        <Image
          ref={heroBgRef}
          className="opt2-hero__bg"
          src="/assets/option2/hero-bg.jpg"
          alt=""
          width={3018}
          height={1416}
          priority
          sizes="100vw"
        />
        <div className="opt2-hero__overlay" ref={heroOverlayRef} />
        <div className="opt2-hero__content" ref={heroContentRef}>
          <Brand className="opt2-hero__brand" />
          <div className="opt2-hero__center">
            <h1 className="opt2-hero__headline">
              Limited edition homes.
              <br />
              Where silence is luxury.
            </h1>
            <a href="#inquiry" className="opt2-btn opt2-btn--light">
              Inquiry
            </a>
          </div>
          <MiniNav className="opt2-hero__nav" />
        </div>
      </header>

      <div className="opt2-hero-spacer" aria-hidden="true" />

      <div className="opt2-below" ref={belowRef}>
        {children}
      </div>

      {/* Anchor target sits on the spacer so "Inquiry" scrolls to where
          the reveal begins (a fixed section is an unreliable target). */}
      <div className="opt2-cta-spacer" id="inquiry" aria-hidden="true" />

      <section className="opt2-cta" ref={ctaRef}>
        <div className="opt2-cta__bgwrap">
          <div className="opt2-pm__inner" ref={ctaBgRef}>
            <Image
              src="/assets/option2/hero-bg.jpg"
              alt=""
              fill
              sizes="100vw"
            />
          </div>
        </div>
        <div className="opt2-cta__overlay" ref={ctaOverlayRef} />
        <div className="opt2-cta__content" ref={ctaContentRef}>
          <div className="opt2-cta__panel">
            <p className="opt2-cta__text">
              We work with a select number of clients each year. Those who find
              us, were meant to.
            </p>
            <a href="#inquiry" className="opt2-btn opt2-btn--light">
              Inquiry
            </a>
          </div>
          <footer className="opt2-footer">
            <Brand className="opt2-footer__brand" />
            <MiniNav className="opt2-footer__nav" />
          </footer>
        </div>
      </section>
    </>
  );
}
