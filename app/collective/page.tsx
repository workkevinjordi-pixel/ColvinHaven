import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Foundation from "@/components/collective/Foundation";
import Craft from "@/components/collective/Craft";
import PhotoBand from "@/components/collective/PhotoBand";
import Inspiration from "@/components/collective/Inspiration";
import Publications from "@/components/collective/Publications";
import Filmstrip, { type FilmstripImage } from "@/components/Filmstrip";
import Footer from "@/components/Footer";
import { getCollectivePage } from "@/lib/sanity/collective";

export const metadata: Metadata = {
  title: "Colvin Haven — Collective",
  description:
    "The Colvin Haven collective: a practice devoted to the complete experience of home.",
};

// Fallback only -- used when the Sanity fetch comes back empty. Same
// five photos as the live collectivePage.filmstrip document; see
// lib/sanity/collective.ts's own comment on why each page keeps its
// own independently-editable copy of this REEL rather than sharing one.
const DEFAULT_REEL: FilmstripImage[] = [
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
const DEFAULT_PHOTO_BAND = {
  src: "/assets/collective/collective-mountain-dusk.jpg",
  alt: "A mountain silhouette against an amber dusk sky",
};

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
//
// Foundation/Craft/Inspiration/the filmstrip's own content now comes
// from Sanity (getCollectivePage()), fetched once here and passed down
// as props -- same pattern as app/page.tsx. Publications stays its own
// self-fetching Server Component (it's shared with /news).
export default async function CollectivePage() {
  const page = await getCollectivePage();

  return (
    <>
      <Navbar solid />
      <Foundation
        heading={page?.foundation.heading}
        tag={page?.foundation.tag}
        collageImageA={page?.foundation.collageImageA}
        collageImageB={page?.foundation.collageImageB}
        paragraphs={page?.foundation.paragraphs}
      />
      <Craft heading={page?.craft.heading} tag={page?.craft.tag} row={page?.craft.row} />
      <div className="collective-band-section collective-mountain-band">
        <PhotoBand
          src={page?.photoBand?.src ?? DEFAULT_PHOTO_BAND.src}
          alt={page?.photoBand?.alt ?? DEFAULT_PHOTO_BAND.alt}
        />
      </div>
      {/* Figma nests Inspiration and the filmstrip in one shared group
          with a tight 24px gap between them, rather than two
          independently-spaced sections -- .collective-inspiration
          scopes StatementSection's bottom padding down to match. */}
      <div className="collective-inspiration">
        <Inspiration
          heading={page?.inspiration.heading}
          tag={page?.inspiration.tag}
          paragraphs={page?.inspiration.paragraphs}
        />
        <Filmstrip images={page?.filmstrip ?? DEFAULT_REEL} />
      </div>
      <Publications />
      <Footer />
    </>
  );
}
