import Image from "next/image";
import Link from "next/link";
import ScrollFade from "../ScrollFade";
import { editions } from "../editions/editions-data";

// Figma's own card photos (node 298:13290) -- both confirmed via hash
// against assets already on the site rather than downloaded as
// duplicates: Tsuki's is byte-identical to the homepage gallery's tall
// left-column card (gallery.png); Sora's is the same gate photo already
// used as its Editions-list thumbnail (sora-gate.jpg).
const CARD_IMAGES: Record<string, { src: string; alt: string }> = {
  "umah-tsuki": {
    src: "/assets/gallery.png",
    alt: "A round window beside a black timber stair landing at Umah Tsuki",
  },
  "umah-sora": {
    src: "/assets/editions/sora-gate.jpg",
    alt: "Umah Sora's dark timber gate with a circular wood inlay, framed by a stone wall",
  },
};

// Figma's own text (node 298:13290) is a stale placeholder blurb --
// verbatim identical under both "Umah Tsuki" and "Umah Sora" (Design-
// Anthology-flavored copy that pre-dates each edition's real, distinct
// press mention). The live site's own EditionsList already carries the
// real per-edition text; per explicit "make sure the text exactly the
// same" direction, this page instead mirrors Figma's literal text --
// including that it's identical under both cards -- rather than that
// correction.
const STALE_BLURB =
  "We are so pleased for our Tsuki Edition be featured in the September 2024 Edition of Design Anthology,  the premier English-language interiors, design, architecture and urban living magazine.";
const STALE_QUOTE = "“An Island Haven in Bali’s Tumbak Bayuh ";

/**
 * "Editions" (Figma node 298:13290): a big-photo teaser card per
 * edition. Image + index/name still come from the shared
 * editions-data.ts array (Figma's own images and roman-numeral/name
 * pairing already match it exactly); only the blurb paragraph is a
 * static, page-local constant -- see STALE_BLURB's own comment.
 */
export default function EditionsCards() {
  return (
    <section className="hpn-editions">
      <ScrollFade>
        <h2 className="hpn-heading hpn-heading--small">EDITIONS</h2>
      </ScrollFade>
      <div className="hpn-editions__row">
        {editions.map((edition) => {
          const image = CARD_IMAGES[edition.slug];
          return (
            <ScrollFade key={edition.slug} className="hpn-editions__card">
              <div className="hpn-editions__image">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 900px) 45vw, 100vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <p className="hpn-editions__index">{edition.index}</p>
                <p className="hpn-editions__name">{edition.name}</p>
                <p className="hpn-editions__summary">
                  {STALE_BLURB}
                  <br />
                  <br />
                  {STALE_QUOTE}
                </p>
              </div>
              <Link
                href={`/editions/${edition.slug}`}
                className="hpn-editions__explore"
              >
                {edition.exploreLabel}
              </Link>
            </ScrollFade>
          );
        })}
      </div>
    </section>
  );
}
