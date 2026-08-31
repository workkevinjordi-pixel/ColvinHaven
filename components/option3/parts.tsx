import Image from "next/image";

const DOT = "/assets/dot-nav.png";

/** Wordmark + dot, shared by the Option 3 nav and footer. `light` flips
 *  the type to white for the dark inquiry section. */
export function Opt3Brand({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <span
      className={`opt3-brand${light ? " opt3-brand--light" : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      <span className="opt3-brand__word">Colvin</span>
      <Image
        className="opt3-brand__dot"
        src={DOT}
        alt=""
        width={22}
        height={22}
      />
      <span className="opt3-brand__word">Haven</span>
    </span>
  );
}
