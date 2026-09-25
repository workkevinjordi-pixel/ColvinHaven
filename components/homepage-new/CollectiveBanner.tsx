import Image from "next/image";
import ScrollFade from "../ScrollFade";

/**
 * Full-bleed "COLLECTIVE" banner (Figma node 298:13451): a genuinely
 * new daytime pavilion/deck photo (confirmed via hash -- not
 * palm-trees-2.png, despite Figma's own layer keeping that file's old
 * "PALM-TREES-FOR-UMAH-TSUKI-WEBSITE" name), heading, a short intro
 * paragraph, and a CTA into the full Collective page. The paragraph is
 * genuine copy in this Figma frame (not Lorem Ipsum), so it's ported
 * as-is rather than swapped for CollectiveIntro's own longer lede --
 * the two pages can carry slightly different framings of the same
 * practice without one needing to "win".
 */
export default function CollectiveBanner() {
  return (
    <section className="hpn-collective">
      <div className="hpn-collective__banner">
        <Image
          src="/assets/homepage-new/homepage-new-pavilion-banner.jpg"
          alt="A dark timber pavilion roofline framed by palms and tropical foliage"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <ScrollFade className="hpn-collective__body">
        <h2 className="hpn-heading">Collective</h2>
        <p className="hpn-collective__text">
          A practice devoted to the complete experience of home. A
          collective of designers, architects and craftspeople.
          Discretion and understatement characterise the Colvin Haven
          approach, in its architecture and in its interactions.
        </p>
        <a href="/collective" className="statement-section__cta">
          Deep dive to the Collective
        </a>
      </ScrollFade>
    </section>
  );
}
