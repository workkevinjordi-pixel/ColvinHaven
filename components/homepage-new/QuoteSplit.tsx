import Image from "next/image";
import ScrollFade from "../ScrollFade";

/**
 * Photo + quote split (Figma node 298:13537): the same pool-deck photo
 * and the same wellbeing quote as the live homepage's own Quote
 * component, in a new side-by-side layout (photo flush with the true
 * left edge, uppercase text on the right) instead of Quote's centered
 * blockquote-with-pop-in-scale treatment. Kept as its own component
 * rather than a variant of Quote, since neither the layout nor the
 * pop-in animation carries over.
 */
export default function QuoteSplit() {
  return (
    <section className="hpn-quote">
      <ScrollFade className="hpn-quote__image">
        <Image
          src="/assets/editions/detail/pool-banner-2.png"
          alt="A dark, cylindrical stone plunge pool on a timber deck beside dense jungle foliage"
          fill
          sizes="(min-width: 900px) 648px, 100vw"
          style={{ objectFit: "cover" }}
        />
      </ScrollFade>
      <ScrollFade className="hpn-quote__text">
        <p>
          &ldquo; Inside, every space serves your wellbeing. Yoga deck
          open to the canopy. A training area that flows to the pool.
          Biohacking spa. Meditation gardens. Gathering spaces that hold
          the people you love. All of it woven seamlessly into the land
          — so the boundary between inside and outside dissolves
          entirely. It&apos;s the same core, in every CH home.&rdquo;
        </p>
      </ScrollFade>
    </section>
  );
}
