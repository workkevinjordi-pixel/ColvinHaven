import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Drawing from "@/components/Drawing";
import GuidingValues from "@/components/homepage-new/GuidingValues";
import MasonryGallery from "@/components/homepage-new/MasonryGallery";
import FilmstripBand from "@/components/homepage-new/FilmstripBand";
import EditionsCards from "@/components/homepage-new/EditionsCards";
import CollectiveBanner from "@/components/homepage-new/CollectiveBanner";
import QuoteSplit from "@/components/homepage-new/QuoteSplit";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Colvin Haven — Homepage (New)",
  description:
    "A design exploration of the Colvin Haven homepage: guiding values, a masonry gallery, the Editions filmstrip, and the Collective.",
};

// Figma "Homepage" frame -- originally node 298:11984, re-synced
// against a newer revision, node 309:20272. Reuses Hero, Drawing, Cta
// and Footer (same background assets); everything between Drawing and
// Cta is new to this page: Guiding Values restyled as a centered
// serif statement, a two-column masonry gallery, the Editions page's
// own filmstrip, two Edition teaser cards, a full-bleed Collective
// banner, and a photo+quote split.
//
// This re-sync changed the section order and dropped two sections
// entirely, both confirmed via the updated frame's own metadata (not
// assumed): the filmstrip band now comes AFTER a new masonry gallery
// (previously it was the very next section after Guiding Values), and
// neither the "CH Collections" poster-card section nor the "MORI"
// coming-soon teaser exist anywhere in this Figma file any more --
// text-searching its raw metadata for "COLLECTION"/"MORI"/"Kawa"/
// "COMING SOON" turned up nothing. Both are removed here to match,
// rather than kept alongside the new gallery.
//
// The masonry gallery's own five photos are, one for one, existing
// site assets (confirmed via hash after matching Figma's own export
// pipeline) -- not new photography -- drawn from the same pool the
// live homepage's own Option8Gallery masonry already uses, just a
// different curated selection/arrangement with no captions and its
// own wider stagger gaps. See MasonryGallery.tsx's own comment.
//
// Per this page's earlier "make sure exactly the same" direction,
// every piece of copy elsewhere on the page -- Cta's own included --
// still mirrors Figma's own text character-for-character, even where
// that's Figma's own stale/placeholder wording, unaffected by this
// pass (the Quote section's own text uses a genuinely broken mixed-
// case treatment in this same updated frame -- most of the paragraph
// force-lowercased by what reads as an accidental partial edit, not a
// deliberate design choice -- left as the already-correct uppercase
// treatment rather than reproducing that slip).
//
// .hpn-page scopes this page's own gold navbar/footer accent and its
// own smaller Hero title sizing (see globals.css) without touching
// those shared components' default styling on every other page.
export default function HomepageNewPage() {
  return (
    <div className="hpn-page">
      <Navbar />
      <Hero />
      <Drawing />
      <GuidingValues />
      <MasonryGallery />
      <FilmstripBand />
      <EditionsCards />
      <CollectiveBanner />
      <QuoteSplit />
      <Cta
        text={
          <>
            We work with a select number of clients each year. Those who
            find us, were meant to.
          </>
        }
        buttonLabel="Write to Us"
      />
      <Footer />
    </div>
  );
}
