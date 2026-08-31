/** Chunky wordmark with a square mark between the words (the rectangular
 *  answer to a round dot). Inherits currentColor. */
export function Opt6Wordmark({ className }: { className?: string }) {
  return (
    <span className={`opt6-wordmark${className ? ` ${className}` : ""}`}>
      <span>Colvin</span>
      <span className="opt6-wordmark__mark" aria-hidden="true" />
      <span>Haven</span>
    </span>
  );
}

/** Small hard-edged rectangular label — used everywhere Titik Dua would
 *  reach for a round sticker/badge. */
export function Opt6Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`opt6-tag${className ? ` ${className}` : ""}`}>
      {children}
    </span>
  );
}

/** Pure-CSS horizontal ticker. Two identical tracks scroll left for a
 *  seamless loop; the animation is disabled under prefers-reduced-motion
 *  (see globals.css). */
export function Opt6Marquee({ text }: { text: string }) {
  const run = `${text} · ${text} · ${text} · ${text} · `;
  return (
    <div className="opt6-marquee" aria-hidden="true">
      <div className="opt6-marquee__track">
        <span>{run}</span>
        <span>{run}</span>
      </div>
    </div>
  );
}
