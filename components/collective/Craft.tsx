import Image from "next/image";
import ScrollFade from "../ScrollFade";

type CraftProps = {
  heading?: string;
  row?: {
    main?: { image?: { src: string; alt: string }; text?: string[] };
    side?: { image?: { src: string; alt: string } };
  };
};

// Matches the content migrated into Sanity's collectivePage.craft (see
// lib/sanity/collective.ts and app/collective/page.tsx) -- kept as a
// fallback here in case the fetch ever comes back empty, not the
// source of truth. Re-synced twice against the same Figma frame (node
// 391:1394) as it kept evolving -- this second pass drops the dot-tag
// "THE CORE" row entirely (same shell Foundation's own second pass
// dropped) in favor of a small eyebrow + a longer heading sentence,
// and promotes the body's own old opening line ("Behind every home is
// the same team.") into that new heading, reworded slightly ("...same
// LOCAL team") -- it's no longer one of the body paragraphs.
const DEFAULT_HEADING = "Behind every home is the same local team";
const DEFAULT_ROW: Required<CraftProps>["row"] = {
  main: {
    image: {
      src: "/assets/collective/craft-detail.webp",
      alt: "A timber A-frame hoist unloading materials from a delivery truck on site",
    },
    text: [
      "Astrid leads the architecture.",
      "Nyoman leads the craftsman.",
      "Runta master of the gardens.",
      "Around them, Indonesian designers and engineers, joiners and stonemasons, all local to the land they build on, working on site beside the founder for as long as each home takes.",
      "We plant the trees before we build. We carry into every home the same sustainable design approaches the founder first practiced at Mixt: responsible materials, light on the land. The most sustainable home is the one that is never torn down, so we build slowly, to last.",
    ],
  },
  side: {
    image: {
      src: "/assets/collective/craft-tall.webp",
      alt: "An Indonesian craftsman assembling a wooden lattice panel in a workshop",
    },
  },
};

/**
 * Heading/eyebrow group, then a two-column row -- a captioned photo +
 * copy on the left, a single tall uncaptioned photo on the right.
 * Structurally close to EditionSpotlight's row, but the side photo
 * here is taller (773px, not 473px) and carries no caption, so it
 * gets its own scoped classes rather than reusing edition-spotlight__
 * row directly. Content now comes from Sanity's collectivePage.craft.
 *
 * Still named/scoped "Craft" internally (.craft, CraftProps, this
 * file's own name) even though the current Figma frame's own eyebrow
 * for this section reads "COLLECTIVE" -- renaming the component/CSS
 * for a copy-only change is unrelated churn, same reasoning
 * EditionsHero's own doc comment already applies elsewhere on this
 * site.
 */
export default function Craft({
  heading = DEFAULT_HEADING,
  row = DEFAULT_ROW,
}: CraftProps) {
  const mainImage = row.main?.image ?? DEFAULT_ROW.main!.image!;
  const mainText = row.main?.text ?? DEFAULT_ROW.main!.text!;
  const sideImage = row.side?.image ?? DEFAULT_ROW.side!.image!;

  return (
    <section className="craft">
      <ScrollFade className="craft__body" once>
        <h2 className="craft__heading">{heading}</h2>

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
              {mainText.map((p, i) => {
                // The three short "<Name> leads/is …" lines open with
                // the person's name in Medium weight, then the role in
                // Light Italic (node 391:1435).
                const m = /^(\S+) ((?:leads|is|master) .*)$/.exec(p);
                return (
                  <p key={i}>
                    {m ? (
                      <>
                        <strong>{m[1]}</strong> <em>{m[2]}</em>
                      </>
                    ) : (
                      p
                    )}
                  </p>
                );
              })}
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
