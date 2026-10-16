"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type SwiperProps = {
  children: ReactNode;
  /** Class on the outer wrapper (positioning, bleed). */
  className?: string;
  /** Class on the scrolling track -- carries the layout CSS. */
  trackClassName?: string;
  /** id for the track (some pages anchor to it). */
  id?: string;
  /** "light" = cream controls over a dark photo, "dark" = ink on cream. */
  tone?: "light" | "dark";
  /** Fires whenever the slide nearest the left edge changes. */
  onIndexChange?: (index: number) => void;
  /** Accessible name for the group, e.g. "Photos". */
  label?: string;
};

/**
 * Wraps a horizontally scrolling row of slides with previous/next
 * buttons and a position indicator. The track keeps whatever scroll-snap
 * CSS the caller gives it; this only adds the controls and keeps them
 * honest:
 *  - the indicator follows the real scroll position while dragging, not
 *    just after a swipe settles, and the last slide counts as current
 *    once the track hits its end even if it can't align to the left edge
 *  - previous/next scroll exactly one slide and disable at either end
 *  - the controls only appear while the track actually overflows, so the
 *    same markup is a plain row (no controls) wherever it doesn't scroll
 */
function readEdge(track: HTMLElement) {
  return {
    start: track.scrollLeft <= 1,
    end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 2,
  };
}

export default function Swiper({
  children,
  className = "",
  trackClassName,
  id,
  tone = "dark",
  onIndexChange,
  label = "Photos",
}: SwiperProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [edge, setEdge] = useState({ start: true, end: false });
  const [scrollable, setScrollable] = useState(false);
  const count = Children.count(children);
  const frame = useRef<number | null>(null);

  const currentIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const items = Array.from(track.children) as HTMLElement[];
    if (items.length === 0) return 0;
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) {
      return items.length - 1;
    }
    const edge = track.getBoundingClientRect().left;
    let best = 0;
    let bestDistance = Infinity;
    items.forEach((el, i) => {
      const distance = Math.abs(el.getBoundingClientRect().left - edge);
      if (distance < bestDistance) {
        best = i;
        bestDistance = distance;
      }
    });
    return best;
  }, []);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setScrollable(track.scrollWidth > track.clientWidth + 1);
    setIndex(currentIndex());
    setEdge(readEdge(track));
  }, [currentIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(track);
    return () => observer.disconnect();
  }, [sync, count]);

  useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  const onScroll = () => {
    if (frame.current !== null) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      setIndex(currentIndex());
      const track = trackRef.current;
      if (track) setEdge(readEdge(track));
    });
  };

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children) as HTMLElement[];
    const target = items[Math.max(0, Math.min(items.length - 1, i))];
    if (!target) return;
    const left =
      target.getBoundingClientRect().left -
      track.getBoundingClientRect().left +
      track.scrollLeft;
    track.scrollTo({ left, behavior: "smooth" });
  };
  // Previous/next move by what is actually scrollable: the nearest slide
  // whose left edge is before/after the current scroll position. (Moving
  // by slide number gets stuck near the end, where the track cannot
  // scroll far enough to put the second-to-last slide at the left edge.)
  const step = (dir: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children) as HTMLElement[];
    const base = track.getBoundingClientRect().left;
    const lefts = items.map(
      (el) => el.getBoundingClientRect().left - base + track.scrollLeft,
    );
    const here = track.scrollLeft;
    const target =
      dir > 0
        ? lefts.find((l) => l > here + 2)
        : [...lefts].reverse().find((l) => l < here - 2);
    track.scrollTo({
      left: target ?? (dir > 0 ? track.scrollWidth : 0),
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`swp swp--${tone}${scrollable ? " swp--scrollable" : ""} ${className}`.trim()}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div
        ref={trackRef}
        id={id}
        className={trackClassName}
        onScroll={onScroll}
      >
        {children}
      </div>
      <div className="swp__controls">
        <button
          type="button"
          className="swp__arrow"
          aria-label="Previous photo"
          disabled={edge.start}
          onClick={() => step(-1)}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <div className="swp__pips">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to photo ${i + 1} of ${count}`}
              aria-current={index === i ? "true" : undefined}
              onClick={() => goTo(i)}
            >
              <span className={index === i ? "is-on" : ""} />
            </button>
          ))}
        </div>
        <button
          type="button"
          className="swp__arrow"
          aria-label="Next photo"
          disabled={edge.end}
          onClick={() => step(1)}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
