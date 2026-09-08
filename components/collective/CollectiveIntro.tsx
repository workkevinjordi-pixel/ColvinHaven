import Image from "next/image";
import ScrollFade from "../ScrollFade";

/**
 * Top-of-page statement (Figma node 203:273): a centered lede paragraph
 * over a full-width photo band. Uses the same 1320px / 60px-edge-gutter
 * column as the Navbar and Footer, not the standard 1216px content
 * column the rest of the page's sections sit in.
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
      <div className="collective-photo-band">
        <Image
          src="/assets/collective/palm-trees-2.png"
          alt="Silhouetted palm trees against a golden dusk sky"
          fill
          sizes="(min-width: 1320px) 1320px, 100vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
    </section>
  );
}
