import Image from "next/image";
import ScrollFade from "../ScrollFade";

type Card = { src: string; alt: string; tall?: boolean };

// All five confirmed via hash (after matching this project's own
// PNG-export re-compression pipeline) to be existing site assets, not
// new photography -- Figma's own PNG exports change hash on every
// fetch regardless of content (established repeatedly elsewhere in
// this codebase), so byte-for-byte identity after the same
// jpeg/resample/recompress pipeline is the only reliable check.
const LEFT_COLUMN: Card[] = [
  { src: "/assets/gallery.png", alt: "Umah Tsuki courtyard" },
  {
    src: "/assets/editions/tsuki-pool-banner.png",
    alt: "Umah Tsuki's pool area opening onto the surrounding jungle",
  },
  {
    src: "/assets/tsuki-stair-landing.jpg",
    alt: "A round window beside a black timber stair landing at Umah Tsuki",
    tall: true,
  },
];

const RIGHT_COLUMN: Card[] = [
  {
    src: "/assets/editions/tsuki-hero.png",
    alt: "Umah Tsuki's black-clad cantilevered volume seen through the surrounding tree canopy",
    tall: true,
  },
  {
    src: "/assets/tsuki-woven-chair.jpg",
    alt: "A woven lounge chair on Umah Tsuki's deck among monstera leaves",
  },
];

function GalleryCard({ card }: { card: Card }) {
  return (
    <div
      className={`hpn-masonry__card${card.tall ? " hpn-masonry__card--tall" : ""}`}
    >
      <Image
        src={card.src}
        alt={card.alt}
        fill
        sizes="(min-width: 900px) 42vw, 100vw"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}

/**
 * Two-column masonry gallery (Figma node 309:21554): five photos, no
 * captions -- three square-ish cards top-aligned in the left column,
 * two (one tall, one square) offset 278px down in the right column.
 * Same square/tall aspect ratios as the live homepage's own
 * Option8Gallery masonry (1/1 and 600/866), and drawing from the same
 * pool of photos, but a different curated selection/arrangement and
 * its own wider gaps (284px left column, 401px right) -- so this is
 * its own component/scoped classes rather than a reuse of
 * .gallery__grid, per this file's convention of not cross-referencing
 * a distant pattern just because the proportions match.
 */
export default function MasonryGallery() {
  return (
    <section className="hpn-masonry">
      <div className="hpn-masonry__col">
        {LEFT_COLUMN.map((card) => (
          <ScrollFade key={card.src}>
            <GalleryCard card={card} />
          </ScrollFade>
        ))}
      </div>
      <div className="hpn-masonry__col hpn-masonry__col--right">
        {RIGHT_COLUMN.map((card) => (
          <ScrollFade key={card.src}>
            <GalleryCard card={card} />
          </ScrollFade>
        ))}
      </div>
    </section>
  );
}
