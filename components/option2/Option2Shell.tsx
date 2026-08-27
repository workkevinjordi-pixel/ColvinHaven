"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import ParallaxMedia from "./ParallaxMedia";
import Reveal from "./Reveal";
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
 * Owns the two "pin, then get covered" moments on /option2, both driven
 * by one eased scroll loop:
 *
 *  - Hero -> Philosophy: the hero is fixed; the stack below rises and
 *    covers it while it eases back (scale down, round, darken, headline
 *    drifts up + fades, photo parallax).
 *  - Quotes -> CTA/footer: Quotes sticks to the viewport while the
 *    CTA/footer slides straight up over it (a plain opaque panel, no
 *    scroll of its own perceptible), and Quotes eases back the same way
 *    underneath it.
 *
 * Both reverse cleanly on the way back up. The Quotes pin is desktop
 * only; `prefers-reduced-motion` drops the eased transforms entirely.
 */
export default function Option2Shell({ children }: { children: ReactNode }) {
  const heroRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLImageElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);

  const belowRef = useRef<HTMLDivElement>(null);

  const quotesRef = useRef<HTMLElement>(null);
  const quotesRecedeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // k: 0 = fully forward (owns the viewport), 1 = fully receded.
    const applyPanel = (r: PanelRefs, k: number, dir: -1 | 1) => {
      if (r.el) {
        r.el.style.transform = `scale(${(1 - k * 0.12).toFixed(4)})`;
        r.el.style.borderRadius = `${(k * 26).toFixed(1)}px`;
        r.el.style.visibility = k >= 0.999 ? "hidden" : "visible";
      }
      if (r.overlay) r.overlay.style.opacity = (0.5 + k * 0.42).toFixed(3);
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

    // Quotes has no headline layer / no shell-driven bg -- just the
    // section box and a dark wash that fades in as the CTA covers it.
    const applyRecede = (k: number) => {
      const el = quotesRef.current;
      if (el) {
        el.style.transform = `scale(${(1 - k * 0.12).toFixed(4)})`;
        el.style.borderRadius = `${(k * 26).toFixed(1)}px`;
      }
      if (quotesRecedeRef.current) {
        quotesRecedeRef.current.style.opacity = (k * 0.5).toFixed(3);
      }
    };

    const hero: PanelRefs = {
      el: heroRef.current,
      overlay: heroOverlayRef.current,
      content: heroContentRef.current,
      bg: heroBgRef.current,
    };

    let coverT = 0;
    let coverS = 0;
    let qT = 0;
    let qS = 0;
    let raf = 0;

    const measure = () => {
      const vh = window.innerHeight;
      const below = belowRef.current;
      if (below) {
        coverT = clamp((vh - below.getBoundingClientRect().top) / vh, 0, 1);
      }
      // Quotes recede tracks how far the CTA has risen over it -- only
      // while the desktop sticky pin is in effect.
      const cta = ctaRef.current;
      const pinned = window.matchMedia("(min-width: 901px)").matches;
      qT =
        pinned && cta
          ? clamp((vh - cta.getBoundingClientRect().top) / vh, 0, 1)
          : 0;
    };

    const frame = () => {
      raf = 0;
      coverS += (coverT - coverS) * 0.12;
      qS += (qT - qS) * 0.12;
      if (Math.abs(coverT - coverS) < 0.0005) coverS = coverT;
      if (Math.abs(qT - qS) < 0.0005) qS = qT;
      applyPanel(hero, coverS, -1);
      applyRecede(qS);
      if (
        Math.abs(coverT - coverS) > 0.0005 ||
        Math.abs(qT - qS) > 0.0005
      ) {
        raf = requestAnimationFrame(frame);
      }
    };

    const onScroll = () => {
      measure();
      if (!raf) raf = requestAnimationFrame(frame);
    };

    applyPanel(hero, 0, -1);
    applyRecede(0);
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

      {/* Quotes pins while the CTA below slides up over it. */}
      <div id="collective" className="opt2-quotes-pin">
        <section className="opt2-quotes" ref={quotesRef}>
          <div className="opt2-quotes__media">
            <ParallaxMedia strength={40}>
              <Image
                src="/assets/option2/quotes.jpg"
                alt="Daybed on a timber deck against a black wall"
                fill
                sizes="(max-width: 900px) 100vw, 52vw"
              />
            </ParallaxMedia>
          </div>
          <div className="opt2-quotes__body">
            <Reveal axis="x" className="opt2-quotes__drawing">
              {/* Plain <img>: decorative inline SVG, next/image would only
                  pass it through. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/option2/drawing.svg"
                alt="Line drawing of the residences stepping down the hillside"
                width={616}
                height={332}
              />
            </Reveal>
            <Reveal className="opt2-quotes__text-wrap" delay={120}>
              <p className="opt2-quotes__text">
                Inside, every space serves your wellbeing. Yoga deck open to the
                canopy. A training area that flows to the pool. Biohacking spa.
                Meditation gardens. Gathering spaces that hold the people you
                love. All of it woven seamlessly into the land — so the boundary
                between inside and outside dissolves entirely. It&rsquo;s the
                same core, in every CH home.&rdquo;
              </p>
            </Reveal>
          </div>
          <div className="opt2-quotes__recede" ref={quotesRecedeRef} aria-hidden="true" />
        </section>
      </div>

      <section id="inquiry" className="opt2-cta" ref={ctaRef}>
        <ParallaxMedia className="opt2-cta__bgwrap" strength={46}>
          <Image src="/assets/option2/hero-bg.jpg" alt="" fill sizes="100vw" />
        </ParallaxMedia>
        <div className="opt2-cta__overlay" />
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
      </section>
    </>
  );
}
