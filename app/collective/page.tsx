import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Foundation from "@/components/collective/Foundation";
import Craft from "@/components/collective/Craft";
import PhotoBand from "@/components/collective/PhotoBand";
import Inspiration from "@/components/collective/Inspiration";
import Publications from "@/components/collective/Publications";
import Filmstrip, { type FilmstripImage } from "@/components/Filmstrip";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Colvin Haven — Collective",
  description:
    "The Colvin Haven collective: a practice devoted to the complete experience of home.",
};

// Unchanged from the previous build (re-synced against node 250:10541):
// five genuinely distinct photos, kept exactly as they already were --
// the current Figma frame's own filmstrip (within node 334:39906) still
// shows these same five photos in the same order, just at slightly
// different individual pixel widths (four fixed ~280px images and one
// flexible narrow one, rather than this file's alternating 284/443 --
// close enough in spirit, and visually near-identical given the same
// photos in the same order, that it isn't worth a bespoke non-marquee
// component just to chase that one difference) -- see Filmstrip.tsx's
// own comment for why this reuses it rather than a page-specific layout.
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

// Rebuilt against the current "Collective" Figma frame (node 334:39855),
// replacing the previous build (node 203:208, extended by 222:4394 and
// 222:4432) entirely on explicit request, not incrementally patched.
// Confirmed via a dedicated get_metadata + get_screenshot + per-section
// get_design_context pass, not assumed from the earlier frame:
//
// Navbar -> Foundation -> Craft -> standalone photo band -> Inspiration
// -> filmstrip -> Publications -> Footer.
//
// Two whole sections the previous build had are GONE from this frame
// entirely, confirmed via its own screenshot (not just absent from the
// metadata dump by coincidence): the top-of-page intro statement
// (CollectiveIntro, now deleted -- its own CSS/asset went with it,
// nothing else referenced either) and the closing job-applications
// CTA (Cta, still used elsewhere -- just not imported here any more).
// The page now ends with Publications running straight into Footer,
// 120px apart per the site-wide rule every other page's Footer
// already follows (CollectivePublications' own last slide now carries
// that spacing instead of the 80px shared by its own first slide).
//
// Foundation, Craft, Inspiration, and Publications all turned out to
// already carry the right copy from the previous build (this frame
// still uses the exact same real text throughout, Lorem Ipsum
// placeholders included in spots where the live site already has its
// own real copy instead -- same keep-the-real-copy discipline applied
// everywhere else on this site) -- Foundation's own collage box needed
// a real fix though (637x584, not the stale 752x473 that was actually
// clipping its second photo), done directly in globals.css.
//
// The standalone band's own photo changes from the courtyard shot to a
// new mountain-at-dusk silhouette (node 334:40005, confirmed genuinely
// new via hash, downloaded and run through this project's own export
// pipeline) -- scoped via .collective-mountain-band so its own 588px
// height (this frame's own value, not the shared 649px default) stays
// off News' SocialAction, which reuses this same PhotoBand component
// at that original height.
export default function CollectivePage() {
  return (
    <>
      <Navbar solid />
      <Foundation />
      <Craft />
      <div className="collective-band-section collective-mountain-band">
        <PhotoBand
          src="/assets/collective/collective-mountain-dusk.jpg"
          alt="A mountain silhouette against an amber dusk sky"
        />
      </div>
      {/* Figma nests Inspiration and the filmstrip in one shared group
          with a tight 24px gap between them, rather than two
          independently-spaced sections -- .collective-inspiration
          scopes StatementSection's bottom padding down to match. */}
      <div className="collective-inspiration">
        <Inspiration />
        <Filmstrip images={REEL} />
      </div>
      <Publications />
      <Footer />
    </>
  );
}
