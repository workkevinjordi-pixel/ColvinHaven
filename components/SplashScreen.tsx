"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";

const SESSION_KEY = "ch-splash-seen";

// The brush dot fills over FILL_MS, holds briefly, then the curtain
// lifts over EXIT_MS. The three always sum to <= 5000ms, and a hard cap
// (see below) guarantees the splash is gone by 5s no matter what.
const FILL_MS = 4000;
const HOLD_MS = 250;
const EXIT_MS = 650;
const MAX_MS = 5000;

// Runs before paint on the client so a returning visit (splash already
// seen this session) never flashes the overlay; falls back to useEffect
// on the server to avoid the SSR warning.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Phase = "loading" | "leaving" | "done";

export default function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("loading");
  const clipRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

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

    const setProgress = (pct: number) => {
      const v = Math.max(0, Math.min(100, pct));
      if (clipRef.current) clipRef.current.style.height = `${v}%`;
      if (countRef.current) countRef.current.textContent = String(Math.round(v));
    };

    document.documentElement.style.overflow = "hidden";

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    const timers: number[] = [];

    if (reduceMotion) {
      // No counting / curtain -- show it filled, hold, fade.
      setProgress(100);
      timers.push(window.setTimeout(() => setPhase("leaving"), 900));
      timers.push(
        window.setTimeout(() => {
          markSeen();
          setPhase("done");
        }, 1200)
      );
    } else {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / FILL_MS);
        // easeOutQuad -- climbs briskly, eases into 100.
        setProgress((1 - (1 - t) * (1 - t)) * 100);
        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          timers.push(
            window.setTimeout(() => setPhase("leaving"), HOLD_MS)
          );
          timers.push(
            window.setTimeout(() => {
              markSeen();
              setPhase("done");
            }, HOLD_MS + EXIT_MS)
          );
        }
      };
      raf = requestAnimationFrame(tick);
    }

    // Hard cap: throttled tab, hung frame, anything -- the splash is
    // gone by 5 seconds.
    timers.push(
      window.setTimeout(() => {
        markSeen();
        setPhase("done");
      }, MAX_MS)
    );

    return () => {
      cancelAnimationFrame(raf);
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
      <div className="splash__inner">
        <div className="brand splash__brand">
          <span
            className="brand__word splash__word"
            style={{ animationDelay: "0.1s" }}
          >
            Colvin
          </span>

          {/* Faded full dot as the target outline; a bottom-anchored clip
              reveals the solid dot from 0% to 100% as it loads. */}
          <span className="splash__dot">
            <Image
              className="splash__dot-track"
              src="/assets/dot-nav.png"
              alt=""
              width={96}
              height={96}
              priority
            />
            <span className="splash__dot-clip" ref={clipRef}>
              <Image
                className="splash__dot-fill"
                src="/assets/dot-nav.png"
                alt=""
                width={96}
                height={96}
                priority
              />
            </span>
          </span>

          <span
            className="brand__word splash__word"
            style={{ animationDelay: "0.18s" }}
          >
            Haven
          </span>
        </div>

        <span className="splash__rule" />

        <p className="splash__count">
          <span className="splash__count-num" ref={countRef}>
            0
          </span>
          <span className="splash__count-sign">%</span>
        </p>
      </div>
    </div>
  );
}
