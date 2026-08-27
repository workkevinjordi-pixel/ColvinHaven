import Image from "next/image";

const DOT = "/assets/dot-nav.png";

export function Brand({ className }: { className?: string }) {
  return (
    <div className={`opt2-brand${className ? ` ${className}` : ""}`}>
      <span className="opt2-brand__word">Colvin</span>
      <Image
        className="opt2-brand__dot"
        src={DOT}
        alt=""
        width={40}
        height={40}
      />
      <span className="opt2-brand__word">Haven</span>
    </div>
  );
}

export function MiniNav({ className }: { className?: string }) {
  return (
    <nav className={`opt2-mininav${className ? ` ${className}` : ""}`}>
      <a href="#editions">Editions</a>
      <span className="opt2-mininav__dot" aria-hidden="true" />
      <a href="#collective">Collective</a>
    </nav>
  );
}
