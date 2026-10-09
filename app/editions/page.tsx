import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import EditionsHero from "@/components/editions/EditionsHero";
import CollectionsCard from "@/components/homepage-new/CollectionsCard";
import EditionDetailHeader from "@/components/editions/EditionDetailHeader";
import EditionStorySummary from "@/components/editions/EditionStorySummary";
import Footer from "@/components/Footer";
import { getEditions } from "@/lib/sanity/editions";

export const metadata: Metadata = {
  title: "Colvin Haven — Editions",
  description:
    "The Colvin Haven editions: singular architectural commissions, one landscape at a time.",
};

// Follows the current Figma "Editions" frame (node 325:39444) section
// order, EXCEPT for CollectionsCard's own position: Figma places it
// right after EditionsHero, but it's moved to the very end of the page
// (after both editions' full stories, right before Footer) on an
// explicit follow-up request -- a deliberate deviation from the Figma
// frame's own order, not a fidelity miss.
//
// Navbar -> single full-bleed hero photo (EditionsHero) -> each
// edition's own complete story -> CH Collections poster card -> Footer.
//
// This replaces the previous frame this page was built from (173:1455
// -> later updated to a short-summary-row version): that one showed a
// centered statement + filmstrip intro (EditionsIntro) and a one-line
// summary per edition (EditionsList), each linking out to its own
// /editions/[slug] detail page for the full story. This frame instead
// puts every edition's FULL detail-page content directly on this page
// -- the same information-architecture reversal /editions-new already
// explored at its own route. Neither EditionsIntro nor EditionsList is
// deleted (both predate this change and aren't part of it) -- just no
// longer what this page renders.
//
// The two full stories are EditionDetailHeader + EditionStorySummary.
// EditionStorySummary (not EditionSpotlight) specifically, because this
// frame's own Umah Tsuki/Sora story blocks turned out, on a dedicated
// get_design_context re-check of each edition's own sub-nodes (325:39482
// for Tsuki, 325:39567 for Sora), to each have their own distinct
// section order -- neither matches EditionSpotlight's fixed sequence
// (the one /editions/[slug] and /editions-new both use), and the two
// editions don't even match each other. See EditionStorySummary's own
// comment for the full per-layout mapping; `layout` here selects which
// one each edition renders as. Each instance gets its own
// finalGalleryId since two render on one page here (two elements
// sharing one id would otherwise be invalid HTML).
//
// CollectionsCard is reused directly from homepage-new/ rather than
// duplicated, same as /editions-new already does -- its own classes
// aren't scoped to either page, so nothing about it depends on which
// route renders it. Its own copy matches this frame's "CH Collections"
// text verbatim except the CTA note, which keeps this site's own
// already-correct "each edition stands" (singular) over this frame's
// own "each editionS stands" (Figma's own grammar slip, not a
// deliberate choice worth reproducing, per this codebase's usual
// default of keeping its own approved copy over Figma's stale text
// absent an explicit "match it exactly" instruction).
//
// No sticky banner, no "Next Editions" band, and no closing Cta --
// none of those appear anywhere in this Figma frame's own structure
// (same as /editions-new).
//
// `editions` now comes from Sanity (getEditions()) -- see
// /editions-new's own comment above for the same note.
export default async function EditionsPage() {
  const editions = await getEditions();
  return (
    <>
      <Navbar solid />
      <EditionsHero />
      {editions.map((edition) => (
        <div key={edition.slug}>
          <EditionDetailHeader
            data={edition}
            displayName={edition.name.toUpperCase()}
          />
          <EditionStorySummary
            data={edition}
            layout={edition.slug === "umah-sora" ? "sora" : "tsuki"}
            finalGalleryId={`${edition.slug}-final-gallery`}
          />
        </div>
      ))}
      <CollectionsCard />
      <Footer />
    </>
  );
}
