"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const SESSION_KEY = "ch-splash-seen";

// Three beats, ~7s total: hold on the solid color, then the "II/VII"
// mark travels to the navbar's corner while the field is STILL fully
// opaque, then the field dissolves to reveal the Hero underneath (the
// mark, already home, just sits there through this last beat).
//
// This used to be two beats instead of three: the mark's move and the
// field's fade ran *simultaneously*, both starting the instant "leaving"
// began. That looked broken -- a ghosted double "II/VII" -- because
// opacity on the outer .splash div affects everything inside it,
// including the moving mark: as the field thinned, the real navbar mark
// underneath became visible through it at the same time the splash's
// own copy, now semi-transparent too, was still partway through
// travelling to a *different* position. Two faint, unaligned copies of
// the same mark, visible together, is exactly a "failed transition"
// look. Sequencing them removes the overlap entirely: while the mark is
// moving, the field hasn't started fading yet, so the real mark
// underneath is never visible until the splash's own copy has already
// arrived exactly on top of it -- at that point they're pixel-identical
// and co-located, so the field can dissolve around them with nothing to
// double.
const HOLD_MS = 500;
const MOVE_MS = 2200;
const FADE_MS = 4300;

// Runs before paint on the client so a returning visit (splash already
// seen this session) never flashes the overlay; falls back to useEffect
// on the server to avoid the SSR warning.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Phase = "loading" | "moving" | "revealing" | "done";

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
  // every phase except "done" -- otherwise the reveal itself would let
  // the page scroll away from the hero before it's finished.
  useEffect(() => {
    if (phase === "done") return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [phase]);

  // All three timers are scheduled together, once, on mount -- NOT in an
  // effect keyed on `phase`. A `[phase]`-dependent effect reruns (and
  // its cleanup fires) every time phase changes, which would cancel
  // whichever of these timers hadn't fired yet -- the exact bug that
  // once left the splash stuck mounted forever at opacity 0.
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
    const move = reduceMotion ? 0 : MOVE_MS;
    const fade = reduceMotion ? 0 : FADE_MS;

    const movingTimer = window.setTimeout(() => setPhase("moving"), hold);
    const revealingTimer = window.setTimeout(
      () => setPhase("revealing"),
      hold + move,
    );
    const doneTimer = window.setTimeout(() => {
      markSeen();
      setPhase("done");
    }, hold + move + fade);

    return () => {
      clearTimeout(movingTimer);
      clearTimeout(revealingTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  // The moment the hold ends, slide the mark from its centered position
  // to wherever the real navbar's own "II/VII" corner mark sits
  // (measured live, so it's exact at any viewport size) -- a FLIP. The
  // solid field is still fully opaque through this whole beat (opacity
  // only starts changing in the "revealing" phase below), so nothing
  // underneath is visible yet; there's nothing for the moving mark to
  // double up with.
  useEffect(() => {
    if (phase !== "moving") return;
    const el = indexRef.current;
    const target = document.querySelector<HTMLElement>(".navbar__index");
    if (!el || !target) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.style.transitionDuration = `${reduceMotion ? 0 : MOVE_MS}ms`;

    const from = el.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    el.style.transform = `translate(${to.left - from.left}px, ${to.top - from.top}px)`;
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`splash${phase === "revealing" ? " splash--revealing" : ""}`}
      // Computed from FADE_MS rather than left as a hardcoded CSS
      // duration -- a hardcoded one is exactly what silently drifted out
      // of sync once before, when only the JS constant got updated.
      style={{ transitionDuration: `${FADE_MS}ms` }}
      aria-hidden="true"
    >
      <span className="splash__index" ref={indexRef}>
        II/VII
      </span>
    </div>
  );
}
