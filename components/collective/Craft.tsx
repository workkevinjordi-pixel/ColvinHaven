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
// source of truth. Re-synced against the current Figma frame (node
// 391:1394): same tag/images as before, but the heading is now
// "COLLECTIVE" (not "Craft") and the body copy is a full rewrite --
// the team's own bios, not the old craftsmanship-materials copy.
const DEFAULT_ROW: Required<CraftProps>["row"] = {
  main: {
    image: {
      src: "/assets/collective/craft-detail.png",
      alt: "A timber A-frame hoist unloading materials from a delivery truck on site",
    },
    text: [
      "Behind every home is the same team.",
      "Astrid leads the architecture.",
      "Nyoman leads the build.",
      "Runta is the master of the gardens.",
      "Around them, Indonesian designers and engineers, joiners and stonemasons, all local to the land they build on, working on site beside the founder for as long as each home takes.",
      "We plant the trees before we build. We carry into every home the same sustainable design approaches the founder first practiced at Mixt: responsible materials, light on the land. The most sustainable home is the one that is never torn down, so we build slowly, to last.",
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
 * Heading/divider/tag, then a two-column row -- a captioned photo +
 * copy on the left, a single tall uncaptioned photo on the right.
 * Structurally close to EditionSpotlight's row, but the side photo
 * here is taller (773px, not 473px) and carries no caption, so it
 * gets its own scoped classes rather than reusing edition-spotlight__
 * row directly. Content now comes from Sanity's collectivePage.craft.
 *
 * Still named/scoped "Craft" internally (.craft, CraftProps, this
 * file's own name) even though the current Figma frame's own heading
 * for this section reads "COLLECTIVE" -- renaming the component/CSS
 * for a copy-only change is unrelated churn, same reasoning
 * EditionsHero's own doc comment already applies elsewhere on this
 * site. The earlier "middle paragraph gets extra top spacing" per-index
 * class doesn't carry forward -- the new team-bio copy has no
 * equivalent break worth special-casing, every paragraph here reads
 * fine with this shell's uniform 24px gap.
 */
export default function Craft({
  heading = "COLLECTIVE",
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
                <p key={i}>{p}</p>
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
