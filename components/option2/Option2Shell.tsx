"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { Brand, MiniNav } from "./parts";

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

/**
 * Owns the /option2 hero and everything below it so one scroll loop can
 * drive both:
 *
 *  - a homepage-style parallax on the hero -- the background photo drifts
 *    down and slowly "breathes" a zoom while the headline layer drifts
 *    up, the rate differential reading as depth;
 *  - a Sobha-Privy-Collection-style handoff into Philosophy -- the hero
 *    is fixed to the viewport and the content below rises up and covers
 *    it while the hero eases back (scale down, corners round, overlay
 *    darkens), so the next section feels like a panel drawn over it.
 *
 * `prefers-reduced-motion` drops the eased transforms; the hero stays
 * fixed and the section below simply scrolls up over it.
 */
export default function Option2Shell({ children }: { children: ReactNode }) {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const belowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reduced motion: skip the scale/round/parallax easing. The hero
    // stays fixed and the section below still scrolls up over it -- that
    // covering is the user's own scroll, not animation, so it's fine to
    // keep.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let target = 0;
    let shown = 0;
    let raf = 0;

    // 0 while the hero owns the viewport; 1 once the section below has
    // scrolled all the way up over it (its top edge from one viewport
    // down to the top).
    const computeCover = () => {
      const below = belowRef.current;
      if (!below) return 0;
      const vh = window.innerHeight;
      return clamp((vh - below.getBoundingClientRect().top) / vh, 0, 1);
    };

    const apply = (c: number) => {
      const hero = heroRef.current;
      if (hero) {
        hero.style.transform = `scale(${(1 - c * 0.12).toFixed(4)})`;
        hero.style.borderRadius = `${(c * 26).toFixed(1)}px`;
        hero.style.visibility = c >= 0.999 ? "hidden" : "visible";
      }
      if (overlayRef.current) {
        overlayRef.current.style.opacity = (0.5 + c * 0.42).toFixed(3);
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(0, ${(c * -7).toFixed(
          2,
        )}vh, 0)`;
        contentRef.current.style.opacity = clamp(1 - c * 1.7, 0, 1).toFixed(3);
      }
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${(c * 6).toFixed(
          2,
        )}%, 0) scale(${(1.03 + c * 0.06).toFixed(4)})`;
      }
    };

    const frame = () => {
      raf = 0;
      shown += (target - shown) * 0.12;
      if (Math.abs(target - shown) < 0.0005) shown = target;
      apply(shown);
      if (Math.abs(target - shown) > 0.0005) raf = requestAnimationFrame(frame);
    };

    const onScroll = () => {
      target = computeCover();
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

  return (
    <>
      <header className="opt2-hero" ref={heroRef}>
        <Image
          ref={bgRef}
          className="opt2-hero__bg"
          src="/assets/option2/hero-bg.jpg"
          alt=""
          width={3018}
          height={1416}
          priority
          sizes="100vw"
        />
        <div className="opt2-hero__overlay" ref={overlayRef} />
        <div className="opt2-hero__content" ref={contentRef}>
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
    </>
  );
}
