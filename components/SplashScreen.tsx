"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";

const SESSION_KEY = "ch-splash-seen";

// Runs before paint on the client so a returning visit (splash already
// seen this session) never flashes the overlay; falls back to useEffect
// on the server to avoid the SSR warning.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Phase = "intro" | "leaving" | "done";

export default function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("intro");

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
    if (phase === "done") return;

    // Hold the finished wordmark, then dismiss. Shorter when the visitor
    // prefers reduced motion, since the entrance is skipped via CSS.
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hold = reduceMotion ? 900 : 2000;
    const fade = reduceMotion ? 300 : 650;

    document.documentElement.style.overflow = "hidden";

    const leave = setTimeout(() => setPhase("leaving"), hold);
    const finish = setTimeout(() => {
      setPhase("done");
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* no-op */
      }
    }, hold + fade);

    return () => {
      clearTimeout(leave);
      clearTimeout(finish);
      document.documentElement.style.overflow = "";
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`splash${phase === "leaving" ? " splash--leaving" : ""}`}
      aria-hidden="true"
    >
      <div className="splash__inner">
        <div className="brand splash__brand">
          <span className="brand__word splash__word">Colvin</span>
          <Image
            className="brand__dot splash__dot"
            src="/assets/dot-nav.png"
            alt=""
            width={40}
            height={40}
          />
          <span className="brand__word splash__word">Haven</span>
        </div>
        <span className="splash__rule" />
        <p className="splash__tagline">Wellness Architecture &amp; Design</p>
      </div>
    </div>
  );
}
