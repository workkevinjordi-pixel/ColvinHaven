import Image from "next/image";
import ScrollFade from "../ScrollFade";

type CraftProps = {
  heading?: string;
  tag?: string;
  row?: {
    main?: { image?: { src: string; alt: string }; text?: string[] };
    side?: { image?: { src: string; alt: string } };
  };
};

// Matches the content migrated into Sanity's collectivePage.craft (see
// lib/sanity/collective.ts and app/collective/page.tsx) -- kept as a
// fallback here in case the fetch ever comes back empty, not the
// source of truth.
const DEFAULT_ROW: Required<CraftProps>["row"] = {
  main: {
    image: {
      src: "/assets/collective/craft-detail.png",
      alt: "A timber A-frame hoist unloading materials from a delivery truck on site",
    },
    text: [
      "Every Colvin Haven home is built by Indonesian master craftsmen and artisans whose knowledge of local timber, stone, and joinery has passed through generations.",
      "It's the core of how these homes get made. Colvin Haven doesn't design a home and then have it built. The two happen together, craftsman and founder, on site, for as long as each home takes. We offer a limited turnkey home to our clients.",
      "Materials are chosen the same way ingredients once were — for provenance, not convenience. Paras stone quarried in Bali. Ulin hardwood, reclaimed rather than freshly felled. Teak, hand-cut and laid by local woodworkers who've done this for generations. Nothing shipped in that the island couldn't already give.",
    ],
  },
  side: {
    image: {
      src: "/assets/collective/craft-tall.png",
      alt: "An Indonesian craftsman assembling a wooden lattice panel in a workshop",
    },
  },
};

/**
 * "CRAFT" section (Figma node 205:335): heading/divider/tag, then a
 * two-column row -- a captioned photo + copy on the left, a single tall
 * uncaptioned photo on the right. Structurally close to
 * EditionSpotlight's row, but the side photo here is taller (773px, not
 * 473px) and carries no caption, so it gets its own scoped classes
 * rather than reusing edition-spotlight__row directly. Content now
 * comes from Sanity's collectivePage.craft. The middle paragraph's own
 * extra top spacing (.craft__row-text-spaced) is a fixed layout
 * decision tied to that position, not content -- stays here in code,
 * zipped onto index 1 regardless of how many paragraphs come back.
 */
export default function Craft({
  heading = "Craft",
  tag = "THE CORE",
  row = DEFAULT_ROW,
}: CraftProps) {
  const mainImage = row.main?.image ?? DEFAULT_ROW.main!.image!;
  const mainText = row.main?.text ?? DEFAULT_ROW.main!.text!;
  const sideImage = row.side?.image ?? DEFAULT_ROW.side!.image!;

  return (
    <section className="craft">
      <ScrollFade>
        <h2 className="section-heading">{heading}</h2>
        <hr className="values__divider" />
        <div className="values__tag craft__tag">
          <span className="values__dot" />
          <span>{tag}</span>
        </div>

        <div className="craft__row">
          <div className="craft__row-main">
            <div className="craft__row-image">
              <Image
                src={mainImage.src}
                alt={mainImage.alt}
                fill
                sizes="(min-width: 900px) 790px, 100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="craft__row-text">
              {mainText.map((p, i) => (
                <p key={i} className={i === 1 ? "craft__row-text-spaced" : undefined}>
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div className="craft__row-side">
            <Image
              src={sideImage.src}
              alt={sideImage.alt}
              fill
              sizes="(min-width: 900px) 403px, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </ScrollFade>
    </section>
  );
}
