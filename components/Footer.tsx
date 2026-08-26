import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="brand brand--footer">
        <Image
          className="brand__dot"
          src="/assets/dot-nav.png"
          alt=""
          width={32}
          height={32}
        />
        <span className="brand__word">Colvin</span>
        <span className="brand__word">Haven</span>
      </div>
      <nav className="footer__nav">
        <a href="#editions">Editions</a>
        <a href="#collective">Collective</a>
      </nav>
    </footer>
  );
}
