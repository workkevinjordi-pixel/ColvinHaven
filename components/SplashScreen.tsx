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

// Each glyph rises out of its own clipped box, staggered left-to-right.
function Word({ text, from }: { text: string; from: number }) {
  return (
    <span className="brand__word splash__word">
      {text.split("").map((ch, i) => (
        <span className="splash__letter" key={i}>
          <span
            className="splash__letter-inner"
            style={{ animationDelay: `${from + i * 0.045}s` }}
          >
            {ch}
          </span>
        </span>
      ))}
    </span>
  );
}

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

    // Hold the finished wordmark, then lift the curtain. Much shorter,
    // and a plain fade, when the visitor prefers reduced motion.
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hold = reduceMotion ? 900 : 2600;
    const exit = reduceMotion ? 300 : 900;

    document.documentElement.style.overflow = "hidden";

    const leave = setTimeout(() => setPhase("leaving"), hold);
    const finish = setTimeout(() => {
      setPhase("done");
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* no-op */
      }
    }, hold + exit);

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
          <Word text="Colvin" from={0.12} />
          <Image
            className="brand__dot splash__dot"
            src="/assets/dot-nav.png"
            alt=""
            width={40}
            height={40}
          />
          <Word text="Haven" from={0.42} />
        </div>
        <span className="splash__rule" />
        <p className="splash__tagline">Wellness Architecture &amp; Design</p>
      </div>
    </div>
  );
}
