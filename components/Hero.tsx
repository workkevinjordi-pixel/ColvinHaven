import Image from "next/image";

export default function Hero() {
  return (
    <header className="hero">
      <Image
        className="hero__bg"
        src="/assets/hero-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
      />
      <div className="hero__overlay" />
      <div className="hero__content">
        <div className="brand">
          <span className="brand__word">Colvin</span>
          <Image
            className="brand__dot"
            src="/assets/dot-nav.png"
            alt=""
            width={40}
            height={40}
          />
          <span className="brand__word">Haven</span>
        </div>
        <p className="hero__tagline">Wellness Architecture &amp; Design</p>
      </div>
      <p className="hero__scroll">Scroll for more</p>
    </header>
  );
}
