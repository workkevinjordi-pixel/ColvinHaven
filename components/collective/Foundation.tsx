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
// source of truth.
const DEFAULT_COLLAGE_A = {
  src: "/assets/collective/foundation-river-stones.jpg",
  alt: "River stones and a large boulder against a black timber base",
};
const DEFAULT_COLLAGE_B = {
  src: "/assets/collective/foundation-portrait.jpg",
  alt: "A black-and-white portrait of a man descending timber stairs beside a Colvin Haven home",
};
const DEFAULT_PARAGRAPHS = [
  "Twenty years in kitchens, not classrooms Gramercy Tavern, Gary Danko, and co-founding Mixt before the first Colvin Haven home was ever built. No architecture degree, no design training. What came instead was real: building out Mixt's restaurants, then designing Umah Tsuki from nothing. The discipline every good kitchen teaches carried straight through the best result is never the largest, it's the most precisely composed.",
  "That instinct is the entire practice. Every material chosen for what it does, not what it announces. Every room built around how a body actually wants to move through a day. Nothing added that isn't earning its place the same rule that once applied to a plate, now applied to a home.",
  "The philosophy hasn't changed. Only the medium.",
  "Where Andrew once asked how food could nourish a person's body, mind, community. He now asks the same of the spaces they inhabit. A Colvin Haven home is, at its heart, an act of nourishment. Conceived entirely for one family. Completed entirely by hand.",
];

/**
 * "FOUNDATION" section (Figma node 203:329, re-synced against node
 * 250:10541): a two-photo collage on the left, the founder's
 * background story on the right. The collage is two absolutely-
 * positioned, overlapping photos inside a fixed box -- a new pattern
 * on this site, so it gets its own scoped classes rather than reusing
 * gallery/edition-spotlight's single-image layouts. Content now comes
 * from Sanity's collectivePage.foundation. The second paragraph's own
 * extra top spacing (.foundation__copy-spaced) is a fixed layout
 * decision tied to that position, not content -- stays here in code,
 * zipped onto index 1 regardless of how many paragraphs come back.
 */
export default function Foundation({
  heading = "Foundation",
  tag = "BACKGROUND STORY",
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
              <p key={i} className={i === 1 ? "foundation__copy-spaced" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </ScrollFade>
    </section>
  );
}
