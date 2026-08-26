import Image from "next/image";
import ParallaxImage from "./ParallaxImage";

export default function Hero() {
  return (
    <header className="hero">
      <ParallaxImage
        className="hero__bg"
        src="/assets/hero-bg.png"
        alt=""
        width={3018}
        height={1416}
        priority
        sizes="100vw"
        strength={50}
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
