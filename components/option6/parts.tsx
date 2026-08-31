/** Plain small-caps text wordmark — no ornament, in the flat grotesque
 *  register of an architectural furniture catalogue. */
export function Opt6Wordmark({ className }: { className?: string }) {
  return (
    <span className={`opt6-wordmark${className ? ` ${className}` : ""}`}>
      Colvin Haven
    </span>
  );
}

/** Numbered section label: "01 — Editions". */
export function Opt6Label({
  num,
  children,
}: {
  num: string;
  children: React.ReactNode;
}) {
  return (
    <p className="opt6-label">
      <span className="opt6-label__num">{num}</span>
      <span>{children}</span>
    </p>
  );
}
