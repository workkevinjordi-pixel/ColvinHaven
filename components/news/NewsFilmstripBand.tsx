import ScrollFade from "../ScrollFade";
import Filmstrip, { type FilmstripImage } from "../Filmstrip";

type NewsFilmstripBandProps = {
  eyebrow?: string;
  lead?: string;
  images?: FilmstripImage[];
};

// Matches the content migrated into Sanity's newsPage.filmstripBand
// (see lib/sanity/newsPage.ts and app/news/page.tsx) -- kept as a
// fallback here in case the fetch ever comes back empty, not the
// source of truth. Same five photos as Collective's own filmstrip
// (node 334:39906's own image row).
const DEFAULT_IMAGES: FilmstripImage[] = [
  {
    src: "/assets/collective/filmstrip-lounge-chair.jpg",
    alt: "A dark timber lounge chair on a deck backed by bamboo",
    wide: false,
  },
  {
    src: "/assets/collective/filmstrip-bonsai-wall.jpg",
    alt: "A cloud-pruned pine beside a stone wall and dark timber house",
    wide: true,
  },
  {
    src: "/assets/collective/filmstrip-timber-edge.jpg",
    alt: "A pale timber batten set into a dark board-and-batten wall",
    wide: false,
  },
  {
    src: "/assets/collective/filmstrip-shrine-umbrellas.jpg",
    alt: "Balinese ceremonial umbrellas atop a stone shrine, seen through palms",
    wide: true,
  },
  {
    src: "/assets/collective/filmstrip-bench-pond.jpg",
    alt: "A timber bench on a deck overlooking a stone-edged pond",
    wide: false,
  },
];

/**
 * Mid-page eyebrow + lede + filmstrip band (Figma node 368:40029,
 * replacing 205:540/250:11130) -- same .centered-statement pattern as
 * before, in its own .news-filmstrip-band wrapper.
 *
 * The outline "Explore II/VII" CTA this band used to have is dropped --
 * Figma's own current frame explicitly marks that button `hidden`
 * (confirmed via metadata), unlike the lede text itself, which Figma
 * does render -- so this follows the same hidden-means-not-rendered
 * rule EditionsHero's own lede paragraph established. Content now
 * comes from Sanity's newsPage.filmstripBand.
 */
export default function NewsFilmstripBand({
  eyebrow = "III/VII",
  lead = "Mori is the third express in the collection — not a smaller version of Tsuki, but its true essence distilled into an intimate, human scale. The same philosophy, carried forward one home at a time.",
  images = DEFAULT_IMAGES,
}: NewsFilmstripBandProps) {
  return (
    <div className="news-filmstrip-band">
      <ScrollFade className="centered-statement">
        <p className="centered-statement__eyebrow">{eyebrow}</p>
        <p className="centered-statement__lead">{lead}</p>
      </ScrollFade>
      <Filmstrip images={images} />
    </div>
  );
}
