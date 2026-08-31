/** Plain sans wordmark. */
export function Opt6Wordmark({ className }: { className?: string }) {
  return (
    <span className={`opt6-wordmark${className ? ` ${className}` : ""}`}>
      Colvin Haven
    </span>
  );
}

/** Small uppercase section kicker. */
export function Opt6Kicker({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`opt6-kicker${className ? ` ${className}` : ""}`}>{children}</p>
  );
}

/** Bullet-prefixed text link — the recurring "• Label" motif. */
export function Opt6Bullet({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={`opt6-bullet${className ? ` ${className}` : ""}`}>
      {children}
    </a>
  );
}
