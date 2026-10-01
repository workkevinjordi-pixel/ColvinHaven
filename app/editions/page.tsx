import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import EditionsHero from "@/components/editions/EditionsHero";
import CollectionsCard from "@/components/homepage-new/CollectionsCard";
import EditionDetailHeader from "@/components/editions/EditionDetailHeader";
import EditionSpotlight from "@/components/editions/EditionSpotlight";
import Footer from "@/components/Footer";
import { editions } from "@/components/editions/editions-data";

export const metadata: Metadata = {
  title: "Colvin Haven — Editions",
  description:
    "The Colvin Haven editions: singular architectural commissions, one landscape at a time.",
};

// Follows the current Figma "Editions" frame (node 325:39444) section
// order: Navbar -> single full-bleed hero photo (EditionsHero) -> CH
// Collections poster card -> each edition's own complete story ->
// Footer.
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
// The two full stories are EditionDetailHeader + EditionSpotlight --
// the exact same components /editions/[slug] and /editions-new already
// use, not a duplicate -- reused directly against the same
// editions-data.ts content, each given its own finalGalleryId since
// two EditionSpotlights render on one page here (see that prop's own
// comment on EditionSpotlight -- two elements sharing one id would
// otherwise be invalid HTML).
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
export default function EditionsPage() {
  return (
    <>
      <Navbar solid />
      <EditionsHero />
      <CollectionsCard />
      {editions.map((edition) => (
        <div key={edition.slug}>
          <EditionDetailHeader data={edition} />
          <EditionSpotlight
            data={edition}
            finalGalleryId={`${edition.slug}-final-gallery`}
          />
        </div>
      ))}
      <Footer />
    </>
  );
}
