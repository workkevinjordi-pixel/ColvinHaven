import Image from "next/image";

export default function Cta() {
  return (
    <section className="cta">
      <Image
        className="cta__bg"
        src="/assets/hero-bg.png"
        alt=""
        fill
        sizes="100vw"
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
