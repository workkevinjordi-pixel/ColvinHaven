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

/**
 * "Editions" (Figma node 298:13290): a big-photo teaser card per
 * edition. Driven by the shared editions-data.ts array rather than
 * hand-copied text -- this frame's own blurb is still Figma's stale
 * placeholder (the same Design-Anthology-flavored paragraph duplicated
 * under both edition names, pre-dating the real per-edition press
 * mentions), so this uses each edition's actual, already-approved
 * `listSummary[0]` instead of regressing to it.
 */
export default function EditionsCards() {
  return (
    <section className="hpn-editions">
      <ScrollFade>
        <h2 className="hpn-heading">Editions</h2>
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
                  {edition.listSummary[0]}
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
