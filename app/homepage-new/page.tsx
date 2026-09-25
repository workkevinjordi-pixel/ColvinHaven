import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Drawing from "@/components/Drawing";
import GuidingValues from "@/components/homepage-new/GuidingValues";
import FilmstripBand from "@/components/homepage-new/FilmstripBand";
import CollectionsCard from "@/components/homepage-new/CollectionsCard";
import EditionsCards from "@/components/homepage-new/EditionsCards";
import CollectiveBanner from "@/components/homepage-new/CollectiveBanner";
import MoriTeaser from "@/components/homepage-new/MoriTeaser";
import QuoteSplit from "@/components/homepage-new/QuoteSplit";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Colvin Haven — Homepage (New)",
  description:
    "A design exploration of the Colvin Haven homepage: guiding values, the Editions filmstrip, CH Collections, and a first look at Mori.",
};

// Figma "Homepage" frame (node 298:11984) -- a design-exploration
// variant of the live homepage, published at its own /homepage-new
// route rather than replacing "/". Reuses Hero, Drawing, Cta and
// Footer (same background assets); everything between Drawing and Cta
// is new to this page: Guiding Values restyled as a centered serif
// statement, the Editions page's own filmstrip, a "CH Collections"
// card, two Edition teaser cards, a full-bleed Collective banner, a
// "MORI" coming-soon teaser, and a photo+quote split.
//
// Per explicit "make sure the image and text exactly the same"
// direction, every piece of copy on this page -- Cta's own included --
// is ported character-for-character from this Figma frame, even where
// that's Figma's own stale/placeholder text (Lorem Ipsum in the
// filmstrip band, a duplicated pre-real-copy blurb on both Edition
// cards, an uncorrected typo in CH Collections' CTA note): this page
// mirrors the Figma source exactly rather than the live site's own,
// separately-approved copy for the same sections. Cta's text/button
// are overridden here to Figma's own line for the same reason --
// they're the older, pre-"funnel strategy" copy the rest of the site
// replaced sitewide (git blame: 54bec2e), used here anyway since this
// page's brief is fidelity to this specific Figma frame, not sitewide
// copy consistency.
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
      <FilmstripBand />
      <CollectionsCard />
      <EditionsCards />
      <CollectiveBanner />
      <MoriTeaser />
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
