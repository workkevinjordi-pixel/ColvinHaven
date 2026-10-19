import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Foundation from "@/components/collective/Foundation";
import Craft from "@/components/collective/Craft";
import PhotoBand from "@/components/collective/PhotoBand";
import Inspiration from "@/components/collective/Inspiration";
import Publications from "@/components/collective/Publications";
import ScrollDrawing from "@/components/ScrollDrawing";
import Footer from "@/components/Footer";
import CollectiveMobile from "@/components/collective-mobile/CollectiveMobile";
import { buildCollectivePlan } from "@/components/collective-mobile/plan";
import { getPublications } from "@/lib/sanity/publications";
import { getCollectivePage } from "@/lib/sanity/collective";

export const metadata: Metadata = {
  title: "Colvin Haven — Collective",
  description:
    "The Colvin Haven collective: a practice devoted to the complete experience of home.",
};

const DEFAULT_PHOTO_BAND = {
  src: "/assets/collective/collective-sunset-palms.webp",
  alt: "Silhouetted coconut palms along a ridge, the sun glowing hazy orange behind them at dusk",
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
// Re-synced against node 391:1394 twice as that frame itself kept
// evolving (both explicit "implement this design from Figma" follow-
// ups, not incrementally patched from assumptions):
//
// First pass: Foundation's own tag + bio copy fully rewritten (new,
// much longer founder biography) with two new collage photos; Craft's
// own heading changed to "COLLECTIVE" with an entirely new team-bio
// copy, same images/layout otherwise; Inspiration dropped its label
// tag and switched to a side-by-side heading/paragraph layout with new
// copy, gaining its own five-photo gallery row directly (new photos,
// static not marquee) -- the separate <Filmstrip> call and its own
// .collective-inspiration wrapper were removed, folded into
// Inspiration itself.
//
// Second pass: Foundation and Craft both moved from a plain-heading +
// divider + dot-tag shell to a shared "small eyebrow + large serif
// heading sentence" pattern instead (Foundation: "FOUNDATION" / "A
// chef who learned to design and build homes."; Craft: "COLLECTIVE" /
// "Behind every home is the same local team", promoting that line out
// of the body paragraphs). Foundation's own collage switched from two
// overlapping photos to a plain side-by-side row, and gained a
// standalone italic closing note. Inspiration's own heading switched
// from the shared 32px .section-heading class to the same 24px
// Cormorant treatment Foundation/Craft's new headings use. Publications'
// own slide padding corrected to symmetric 120px (was asymmetric
// 120px/80px). The standalone photo band is unchanged throughout both
// passes.
//
// Foundation/Craft/Inspiration/its own gallery content all come from
// Sanity (getCollectivePage()), fetched once here and passed down as
// props -- same pattern as app/page.tsx. Publications stays its own
// self-fetching Server Component (it's shared with /news).
export default async function CollectivePage() {
  const [page, publications] = await Promise.all([
    getCollectivePage(),
    getPublications(),
  ]);

  return (
    <>
      <Navbar solid />
      <main className="page-main">
        <h1 className="hm-sr">Collective</h1>
        {/* Phone layout: full-screen sections with pinned photos (<=560px). */}
        <CollectiveMobile sections={buildCollectivePlan(page, publications)} />
        <div className="collective-desktop">
          {/* The house sketch (Figma 391:1394, node 492:2591), back at the
              top of the page, shown finished -- no scroll effect. The SVG
              is fetched from the static file after load rather than
              inlined, so it adds nothing to the page's HTML. */}
          <ScrollDrawing
            className="collective-sketch"
            src="/assets/section-drawing.svg"
            scroll={false}
            heading={
              <h2 className="collective-sketch__heading">THE COLLECTIVE</h2>
            }
          />
          <Foundation
            heading={page?.foundation.heading}
            collageImageA={page?.foundation.collageImageA}
            collageImageB={page?.foundation.collageImageB}
            paragraphs={page?.foundation.paragraphs}
          />
          <Craft heading={page?.craft.heading} row={page?.craft.row} />
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
        </div>
      </main>
    </>
  );
}
