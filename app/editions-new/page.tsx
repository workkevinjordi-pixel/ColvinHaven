import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import EditionsNewIntro from "@/components/editions-new/EditionsNewIntro";
import CollectionsCard from "@/components/homepage-new/CollectionsCard";
import EditionDetailHeader from "@/components/editions/EditionDetailHeader";
import EditionSpotlight from "@/components/editions/EditionSpotlight";
import Footer from "@/components/Footer";
import { getEditions } from "@/lib/sanity/editions";

export const metadata: Metadata = {
  title: "Colvin Haven — Editions (New)",
  description:
    "A design exploration of the Colvin Haven Editions page: the full story for every edition on one continuous page.",
};

// Figma "Editions" frame (node 303:15060) -- a design-exploration
// variant of the Editions page, published at its own /editions-new
// route rather than replacing "/editions". Where the live /editions
// page shows a short summary card per edition and links out to each
// one's own /editions/[slug] detail page, this frame puts every
// edition's FULL detail-page content directly on one continuous page:
// intro filmstrip -> CH Collections card -> Umah Tsuki's complete
// story -> Umah Sora's complete story -> Footer.
//
// The two full stories are EditionDetailHeader + EditionSpotlight --
// the exact same components the real /editions/[slug] pages already
// use, not a duplicate -- reused directly against the same
// editions-data.ts content. That's possible because every fixed pixel
// width in .edition-spotlight/.edition-story__* comes from either
// `flex: 1 1 0%` (fully fluid) or CSS `aspect-ratio` (also fluid) --
// nothing in that layout is hardcoded to the standalone page's own
// 1216px column. This page's own content column is 1200px, not 1216px
// (confirmed via get_design_context on this exact frame: 120px side
// insets here vs. the site's usual 112px "--gutter"), so .edn-page
// simply overrides that one CSS variable and every one of those
// existing rules resolves 16px narrower automatically -- see
// globals.css's own comment on this for the exact math.
//
// CollectionsCard is reused directly from homepage-new/ rather than
// duplicated -- its own classes aren't scoped under `.hpn-page`, so
// nothing about it depends on which page renders it.
//
// No sticky banner, no "Next Editions" band, and no closing Cta --
// none of those appear anywhere in this Figma frame's own structure.
//
// `editions` now comes from Sanity (getEditions()) rather than a
// static import -- the two documents' canonical content is the exact
// same data that used to live in editions-data.ts, now editable via
// the CMS at https://colvin-haven.sanity.studio. See
// lib/sanity/editions.ts's own comment for the fetch/mapping details.
export default async function EditionsNewPage() {
  const editions = await getEditions();
  return (
    <div className="edn-page">
      <Navbar solid />
      <EditionsNewIntro />
      <CollectionsCard />
      {editions.map((edition) => (
        <div className="edn-edition" key={edition.slug}>
          <EditionDetailHeader data={edition} />
          <EditionSpotlight
            data={edition}
            finalGalleryId={`${edition.slug}-final-gallery`}
          />
        </div>
      ))}
      <Footer />
    </div>
  );
}
