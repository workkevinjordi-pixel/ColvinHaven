/** Text-only wordmark with a small CSS dot between the words — monochrome,
 *  inherits currentColor so it works under the nav's blend mode. */
export function Opt5Wordmark({ className }: { className?: string }) {
  return (
    <span className={`opt5-wordmark${className ? ` ${className}` : ""}`}>
      <span>Colvin</span>
      <span className="opt5-wordmark__dot" aria-hidden="true" />
      <span>Haven</span>
    </span>
  );
}

export function Opt5Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="opt5-eyebrow">{children}</p>;
}
