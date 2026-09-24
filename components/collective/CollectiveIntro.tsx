import Image from "next/image";
import ScrollFade from "../ScrollFade";

/**
 * Top-of-page statement (Figma node 203:273, re-synced against node
 * 250:10541): a centered lede paragraph over a full-bleed photo band --
 * the band now spans the full 1440px page width edge-to-edge (no 60px
 * gutter), unlike the standalone band between Craft and Inspiration,
 * which keeps that gutter.
 *
 * The lede paragraph is intentionally NOT reverted to match this
 * Figma frame's own text -- that frame still carries the older, pre-
 * "wellness home brand" wording from before the site-wide copywriting
 * pass, while this stays the already-approved, more recent copy.
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
          src="/assets/collective/collective-intro-deck.jpg"
          alt="A cantilevered timber roofline and deck railing among palms, seen against a bright sky"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
    </section>
  );
}
