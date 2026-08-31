/** Letter-spaced serif wordmark with a small brass diamond between the
 *  words. Inherits currentColor so it reads on light or dark. */
export function Opt6Wordmark({ className }: { className?: string }) {
  return (
    <span className={`opt6-wordmark${className ? ` ${className}` : ""}`}>
      <span>Colvin</span>
      <span className="opt6-wordmark__mark" aria-hidden="true" />
      <span>Haven</span>
    </span>
  );
}

export function Opt6Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`opt6-eyebrow${className ? ` ${className}` : ""}`}>{children}</p>
  );
}
