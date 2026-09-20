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
          Colvin Haven is a wellness home brand — the first of its kind,
          built on the belief that a home should restore the person living
          in it, not just shelter them. A collective of designers,
          architects and craftspeople, working in the same discretion and
          understatement that define every Colvin Haven home.
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
