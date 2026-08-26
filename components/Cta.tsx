import ParallaxImage from "./ParallaxImage";

export default function Cta() {
  return (
    <section className="cta">
      <ParallaxImage
        className="cta__bg"
        src="/assets/hero-bg.png"
        alt=""
        width={3018}
        height={1416}
        sizes="100vw"
        strength={50}
      />
      <div className="cta__overlay" />
      <div className="cta__content">
        <p className="cta__text">
          We work with a select number of clients each year. Those who find
          us, were meant to.
        </p>
        <a href="#inquiry" className="cta__button">
          Inquiry
        </a>
      </div>
    </section>
  );
}
