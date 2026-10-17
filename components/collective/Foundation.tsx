import Image from "next/image";
import ScrollFade from "../ScrollFade";

type FoundationProps = {
  heading?: string;
  collageImageA?: { src: string; alt: string };
  collageImageB?: { src: string; alt: string };
  paragraphs?: string[];
};

// Matches the content migrated into Sanity's collectivePage.foundation
// (see lib/sanity/collective.ts and app/collective/page.tsx) -- kept
// as a fallback here in case the fetch ever comes back empty, not the
// source of truth. Re-synced twice against the same Figma frame (node
// 391:1394) as it kept evolving -- this is the second pass: the
// original dot-tag "BACKGROUND STORY"/"A cook who learned to build
// homes." row is gone entirely, replaced by a small eyebrow + a much
// larger heading sentence, the two collage photos moved from an
// overlapping layout to a plain side-by-side row, two short paragraphs
// ("The medium changed..."/"The kitchen grew...") dropped out of the
// body entirely, and a new standalone italic closing line appears
// below the body, in the same gold as the homepage's own Collective
// intro note. That closing line, and the small "FOUNDATION" eyebrow
// above the heading, are both gone from the current frame (node
// 391:1394) -- removed, along with their styles.
const DEFAULT_HEADING = "A chef who learned to design and build homes.";
const DEFAULT_COLLAGE_A = {
  src: "/assets/collective/foundation-stair-landing.webp",
  alt: "A dark timber house with a round window above a garden path and timber stair",
};
const DEFAULT_COLLAGE_B = {
  src: "/assets/collective/foundation-man-doorway.webp",
  alt: "A man standing in the doorway of a dark timber-clad building",
};
const DEFAULT_PARAGRAPHS = [
  "Andrew trained as a cook at the Culinary Institute of America and worked in Michelin-starred restaurants in New York and San Francisco. In 2006 he helped open the first Mixt in San Francisco's Financial District, his first restaurant business. Chef-driven, it brought farm-to-table seasonality, sustainability and health to everyday eating, part of the first wave of American restaurants to do it, with spaces built to LEED green-building guidelines.",
  "In time, designing restaurants became the part of the work he loved most. So he left, to chase it fully.",
  "He stepped away from Mixt for the thing he could no longer ignore: architecture and design. His first project was designing and building Umah Tsuki, a home on a sloping site in Bali. From it grew Colvin Haven, a quiet collective of designers, architects and craftspeople, its name a coinage of his middle name and his daughter's first, built on one belief: that a home, like a dish, should be felt before it's seen.",
  "Umah Tsuki became the proof, a sanctuary praised by Wallpaper* and Design Anthology for the quiet intentionality he once brought to a plate. Today it is both Colvin Haven's showroom and his family's home. Sora followed, built for the collective's first client, and two more homes are taking shape. Only a limited number will ever be built, never meant to scale.",
  "Today, with Colvin Haven, he creates limited-edition homes in Indonesia, built from local materials and made for wellness. He curates the whole experience, from architecture to table.",
];

/**
 * "FOUNDATION" section (Figma node 203:329, re-synced against 250:10541,
 * then against the current frame, 391:1394, twice): a two-photo collage
 * on the left (plain side-by-side row, not overlapping), the founder's
 * background story on the right -- eyebrow, a large serif heading
 * sentence, the body paragraphs, and a closing italic note. Content now
 * comes from Sanity's collectivePage.foundation.
 *
 * The collage is `position: sticky` (explicit follow-up request, not
 * from Figma) -- it rides along as the much taller text column scrolls
 * past, un-sticking once the column's bottom edge is reached. That only
 * works if nothing between the sticky element and the viewport has its
 * own `transform` (a CSS containing-block gotcha: a transformed
 * ancestor breaks sticky/fixed positioning for its descendants). A
 * single ScrollFade wrapping both the collage and the text -- the
 * previous shape here, and still .mori__sidebar's own shape on /news,
 * which turns out to have the identical bug, confirmed while building
 * this -- would do exactly that, since ScrollFade's own reveal
 * animation is itself a `transform`. Each column gets its own separate
 * ScrollFade instead, both plain siblings inside a plain (untransformed)
 * .foundation__body, so the collage's sticky containing block is the
 * real viewport, not an animated ancestor.
 */
export default function Foundation({
  heading = DEFAULT_HEADING,
  collageImageA = DEFAULT_COLLAGE_A,
  collageImageB = DEFAULT_COLLAGE_B,
  paragraphs = DEFAULT_PARAGRAPHS,
}: FoundationProps) {
  return (
    <section className="foundation">
      <div className="foundation__body">
        <ScrollFade className="foundation__collage">
          <div className="foundation__collage-img">
            <Image
              src={collageImageA.src}
              alt={collageImageA.alt}
              fill
              sizes="(min-width: 900px) 320px, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="foundation__collage-img">
            <Image
              src={collageImageB.src}
              alt={collageImageB.alt}
              fill
              sizes="(min-width: 900px) 320px, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </ScrollFade>

        <ScrollFade className="foundation__text">
          <h2 className="foundation__heading">{heading}</h2>
          <div className="foundation__copy">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </ScrollFade>
      </div>
    </section>
  );
}
