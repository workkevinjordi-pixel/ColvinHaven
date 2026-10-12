import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Foundation from "@/components/collective/Foundation";
import Craft from "@/components/collective/Craft";
import PhotoBand from "@/components/collective/PhotoBand";
import Inspiration from "@/components/collective/Inspiration";
import Publications from "@/components/collective/Publications";
import Footer from "@/components/Footer";
import { getCollectivePage } from "@/lib/sanity/collective";

export const metadata: Metadata = {
  title: "Colvin Haven — Collective",
  description:
    "The Colvin Haven collective: a practice devoted to the complete experience of home.",
};

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
// already follows.
//
// Re-synced again against node 391:1394 (explicit "implement this
// design from Figma" follow-up): Foundation's own tag + bio copy fully
// rewritten (new, much longer founder biography) with two new collage
// photos; Craft's own heading now reads "COLLECTIVE" (component/CSS
// still named "craft" internally -- see Craft.tsx's own comment) with
// an entirely new team-bio copy, same images/layout otherwise;
// Inspiration drops its label tag and switches to a side-by-side
// heading/paragraph layout with new copy, and now owns its own
// five-photo gallery row directly (new photos throughout, static not
// marquee) -- the separate <Filmstrip> call and its own
// .collective-inspiration wrapper are gone, folded into Inspiration
// itself since Figma treats the text block and the gallery as one
// 24px-gapped section. The standalone photo band and Publications are
// unchanged from the previous sync.
//
// Foundation/Craft/Inspiration/its own gallery content all come from
// Sanity (getCollectivePage()), fetched once here and passed down as
// props -- same pattern as app/page.tsx. Publications stays its own
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
      <Inspiration
        heading={page?.inspiration.heading}
        paragraphs={page?.inspiration.paragraphs}
        images={page?.inspirationGallery}
      />
      <Publications />
      <Footer />
    </>
  );
}
