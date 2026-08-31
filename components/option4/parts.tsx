import Image from "next/image";

const DOT = "/assets/dot-nav.png";

/** Small-caps wordmark with the dot between the two words. `light` keeps
 *  it white for use over photography; the default inherits currentColor. */
export function Opt4Wordmark({
  className,
  light = false,
  dotSize = 22,
}: {
  className?: string;
  light?: boolean;
  dotSize?: number;
}) {
  return (
    <span
      className={`opt4-wordmark${light ? " opt4-wordmark--light" : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      <span className="opt4-wordmark__word">Colvin</span>
      <Image
        className="opt4-wordmark__dot"
        src={DOT}
        alt=""
        width={dotSize}
        height={dotSize}
      />
      <span className="opt4-wordmark__word">Haven</span>
    </span>
  );
}

export function Opt4Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="opt4-eyebrow">{children}</p>;
}
