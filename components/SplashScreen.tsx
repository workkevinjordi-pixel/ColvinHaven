"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const SESSION_KEY = "ch-splash-seen";

// A deliberate hold on the solid color, then an opacity crossfade
// reveals the real Hero section (already rendering underneath the whole
// time) through it. Total ~4s -- smooth and unhurried, but no longer a
// multi-second wait.
const HOLD_MS = 400;
const EXIT_MS = 3600;

// Runs before paint on the client so a returning visit (splash already
// seen this session) never flashes the overlay; falls back to useEffect
// on the server to avoid the SSR warning.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Phase = "loading" | "leaving" | "done";

export default function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("loading");
  const indexRef = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Private mode / storage disabled -- just show it.
    }

    if (seen) {
      setPhase("done");
      return;
    }

    // The splash promises a fresh start at the hero -- don't let the
    // browser's own scroll-position restoration (back/forward nav, a
    // refresh) undercut that by leaving the page scrolled underneath it.
    try {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    } catch {
      /* no-op */
    }
    window.scrollTo(0, 0);
  }, []);

  // Scroll stays locked for as long as the splash is visible at all --
  // loading AND leaving, not just the initial hold -- otherwise the
  // fade-out itself would let the page scroll away from the hero before
  // it's finished revealing it.
  useEffect(() => {
    if (phase === "done") return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [phase]);

  // Both timers are scheduled together, once, on mount -- NOT in an
  // effect keyed on `phase`. They used to live in a `[phase]`-dependent
  // effect guarded by `if (phase !== "loading") return`, which is a real
  // bug: the moment the first timer fired and flipped phase to
  // "leaving", React reran this effect, and its OWN cleanup (from the
  // "loading" run) cleared BOTH timers -- silently cancelling the
  // second one before it could ever fire. The splash got stuck mounted
  // forever at opacity 0 (invisible, so easy to miss), permanently
  // holding documentElement's overflow: hidden lock. Scheduling once on
  // mount avoids that entirely.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* no-op */
    }
    if (seen) return;

    const markSeen = () => {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* no-op */
      }
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const hold = reduceMotion ? 0 : HOLD_MS;
    const exit = reduceMotion ? 0 : EXIT_MS;

    const leavingTimer = window.setTimeout(() => setPhase("leaving"), hold);
    const doneTimer = window.setTimeout(() => {
      markSeen();
      setPhase("done");
    }, hold + exit);

    return () => {
      clearTimeout(leavingTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  // The moment the fade-out starts, slide the mark from its centered
  // position to wherever the real navbar's own "II/VII" corner mark
  // sits (measured live, so it's exact at any viewport size) -- a FLIP:
  // by the time the solid field has fully dissolved away, this mark is
  // already resting exactly on top of the real one underneath, so the
  // loading mark reads as *becoming* the navbar mark rather than two
  // separate elements crossfading.
  useEffect(() => {
    if (phase !== "leaving") return;
    const el = indexRef.current;
    const target = document.querySelector<HTMLElement>(".navbar__index");
    if (!el || !target) return;

    const from = el.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    el.style.transform = `translate(${to.left - from.left}px, ${to.top - from.top}px)`;
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`splash${phase === "leaving" ? " splash--leaving" : ""}`}
      aria-hidden="true"
    >
      <span className="splash__index" ref={indexRef}>
        II/VII
      </span>
    </div>
  );
}
