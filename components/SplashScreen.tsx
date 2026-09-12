"use client";

import { useEffect, useLayoutEffect, useState } from "react";

const SESSION_KEY = "ch-splash-seen";

// No asset-loading progress to track anymore -- just a deliberate hold
// on the solid color, then a slow opacity crossfade reveals the real
// Hero section (already rendering underneath the whole time) through
// it. Stretched out on purpose (a 6s dissolve, not a snappy 0.9s one) so
// the reveal reads as smooth and unhurried rather than a quick reveal.
const HOLD_MS = 600;
const EXIT_MS = 6000;

// Runs before paint on the client so a returning visit (splash already
// seen this session) never flashes the overlay; falls back to useEffect
// on the server to avoid the SSR warning.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Phase = "loading" | "leaving" | "done";

export default function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("loading");

  useIsomorphicLayoutEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Private mode / storage disabled -- just show it.
    }
    if (seen) setPhase("done");
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;

    const markSeen = () => {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* no-op */
      }
    };

    document.documentElement.style.overflow = "hidden";

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const hold = reduceMotion ? 0 : HOLD_MS;
    const exit = reduceMotion ? 0 : EXIT_MS;

    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhase("leaving"), hold));
    timers.push(
      window.setTimeout(() => {
        markSeen();
        setPhase("done");
      }, hold + exit),
    );

    return () => {
      timers.forEach(clearTimeout);
      document.documentElement.style.overflow = "";
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`splash${phase === "leaving" ? " splash--leaving" : ""}`}
      aria-hidden="true"
    >
      <span className="splash__index">II/VII</span>
    </div>
  );
}
