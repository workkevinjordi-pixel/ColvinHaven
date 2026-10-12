import Image from "next/image";
import ScrollFade from "../ScrollFade";

type FoundationProps = {
  heading?: string;
  tag?: string;
  collageImageA?: { src: string; alt: string };
  collageImageB?: { src: string; alt: string };
  paragraphs?: string[];
};

// Matches the content migrated into Sanity's collectivePage.foundation
// (see lib/sanity/collective.ts and app/collective/page.tsx) -- kept
// as a fallback here in case the fetch ever comes back empty, not the
// source of truth. Re-synced against the current Figma frame (node
// 391:1394): new tag, new collage photos, and a full rewrite of the
// bio copy -- see that node's own get_design_context dump for the
// verbatim source text this was transcribed from.
const DEFAULT_COLLAGE_A = {
  src: "/assets/collective/foundation-rope-chair-deck.jpg",
  alt: "A woven rope lounge chair on a dark timber deck, backed by lush ferns",
};
const DEFAULT_COLLAGE_B = {
  src: "/assets/collective/foundation-man-stairs-garden.jpg",
  alt: "A man descending timber stairs beside a stone-edged pond, palms overhead",
};
const DEFAULT_PARAGRAPHS = [
  "Andrew trained as a cook at the Culinary Institute of America and worked in Michelin-starred restaurants in New York and San Francisco. In 2006 he helped open the first Mixt in San Francisco's Financial District, his first restaurant business. Chef-driven, it brought farm-to-table seasonality, sustainability and health to everyday eating, part of the first wave of American restaurants to do it, with spaces built to LEED green-building guidelines.",
  "In time, designing restaurants became the part of the work he loved most. So he left, to chase it fully.",
  "He stepped away from Mixt for the thing he could no longer ignore: architecture and design. His first project was designing and building Umah Tsuki, a home on a sloping site in Bali. From it grew Colvin Haven, a quiet collective of designers, architects and craftspeople, its name a coinage of his middle name and his daughter's first, built on one belief: that a home, like a dish, should be felt before it's seen.",
  "Umah Tsuki became the proof, a sanctuary praised by Wallpaper* and Design Anthology for the quiet intentionality he once brought to a plate. Today it is both Colvin Haven's showroom and his family's home. Sora followed, built for the collective's first client, and two more homes are taking shape. Only a limited number will ever be built, never meant to scale.",
  "The medium changed. The instinct never did.",
  "The kitchen grew into a home.",
  "Today, with Colvin Haven, he creates limited-edition homes in Indonesia, built from local materials and made for wellness. He curates the whole experience, from architecture to table.",
  "He once fed people. Now he gives them somewhere to be still.",
];

/**
 * "FOUNDATION" section (Figma node 203:329, re-synced against 250:10541,
 * then again against the current frame, 391:1394): a two-photo collage
 * on the left, the founder's background story on the right. The
 * collage is two absolutely-positioned, overlapping photos inside a
 * fixed box. Content now comes from Sanity's collectivePage.foundation.
 * The earlier "second paragraph gets extra top spacing" treatment
 * (.foundation__copy-spaced) was tied to the previous, much shorter
 * copy's own specific paragraph break -- the current frame's own much
 * longer bio has no equivalent single break worth special-casing (its
 * own blank-line spacing between every paragraph pair reads close
 * enough to this shell's uniform 24px paragraph gap), so that per-index
 * class is dropped here, not carried forward.
 */
export default function Foundation({
  heading = "Foundation",
  tag = "A cook who learned to build homes.",
  collageImageA = DEFAULT_COLLAGE_A,
  collageImageB = DEFAULT_COLLAGE_B,
  paragraphs = DEFAULT_PARAGRAPHS,
}: FoundationProps) {
  return (
    <section className="foundation">
      <ScrollFade className="foundation__body">
        <div className="foundation__collage">
          <div className="foundation__collage-img foundation__collage-img--a">
            <Image
              src={collageImageA.src}
              alt={collageImageA.alt}
              fill
              sizes="305px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="foundation__collage-img foundation__collage-img--b">
            <Image
              src={collageImageB.src}
              alt={collageImageB.alt}
              fill
              sizes="305px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <div className="foundation__text">
          <h2 className="section-heading">{heading}</h2>
          <hr className="values__divider" />
          <div className="foundation__copy">
            <div className="values__tag">
              <span className="values__dot" />
              <span>{tag}</span>
            </div>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </ScrollFade>
    </section>
  );
}
