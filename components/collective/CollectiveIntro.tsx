import Image from "next/image";
import ScrollFade from "../ScrollFade";

/**
 * Top-of-page statement (Figma node 203:273, updated): a centered lede
 * paragraph over a full-bleed photo band -- the band now spans the full
 * 1440px page width edge-to-edge (no 60px gutter), unlike the standalone
 * band between Craft and Inspiration, which keeps that gutter.
 */
export default function CollectiveIntro() {
  return (
    <section className="collective-intro">
      <ScrollFade>
        <p className="collective-intro__lead">
          A practice devoted to the complete experience of home. A
          collective of designers, architects and craftspeople. Discretion
          and understatement characterise the Colvin Haven approach, in
          its architecture and in its interactions.
        </p>
      </ScrollFade>
      <div className="collective-photo-band collective-photo-band--bleed">
        <Image
          src="/assets/collective/palm-trees-2.png"
          alt="Silhouetted palm trees against a golden dusk sky"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
    </section>
  );
}
