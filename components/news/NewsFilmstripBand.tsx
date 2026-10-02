import ScrollFade from "../ScrollFade";
import Filmstrip, { type FilmstripImage } from "../Filmstrip";

// Same five photos as Collective's own filmstrip (node 334:39906's own
// image row) -- confirmed via identical layer names/widths/height
// (280/280/224/280/280, all 473px tall) between that frame and this
// one, not just a visual guess. Duplicated here rather than imported
// from collective/page.tsx, matching how every other page on this site
// defines its own REEL constant even when the underlying photos
// overlap with another page's own filmstrip.
const REEL: FilmstripImage[] = [
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
 * The lede text is updated to describe Mori (the now-featured edition,
 * matching What's Cooking's own checklist above) rather than reverted
 * to this frame's own literal Lorem Ipsum placeholder there -- same
 * practice as CollectiveIntro's own lede (kept the site's already-
 * approved copy over Figma's stale text), just carrying forward the
 * same sentence shape the previous Sora-themed lede had.
 *
 * The outline "Explore II/VII" CTA this band used to have is dropped --
 * Figma's own current frame explicitly marks that button `hidden`
 * (confirmed via metadata), unlike the lede text itself, which Figma
 * does render (just as stale placeholder copy) -- so this follows the
 * same hidden-means-not-rendered rule EditionsHero's own lede paragraph
 * established, scoped here to the interactive element specifically
 * since the lede text itself has its own already-approved replacement.
 */
export default function NewsFilmstripBand() {
  return (
    <div className="news-filmstrip-band">
      <ScrollFade className="centered-statement">
        <p className="centered-statement__eyebrow">III/VII</p>
        <p className="centered-statement__lead">
          Mori is the third express in the collection — not a smaller
          version of Tsuki, but its true essence distilled into an
          intimate, human scale. The same philosophy, carried forward one
          home at a time.
        </p>
      </ScrollFade>
      <Filmstrip images={REEL} />
    </div>
  );
}
