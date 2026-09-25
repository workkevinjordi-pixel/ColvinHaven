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
// Footer verbatim (same assets, same copy, confirmed via hash/text
// diff against the live homepage); everything between Drawing and Cta
// is new to this page: Guiding Values restyled as a centered serif
// statement, the Editions page's own filmstrip, a "CH Collections"
// card, two Edition teaser cards, a full-bleed Collective banner, a
// "MORI" coming-soon teaser, and a photo+quote split.
//
// Cta keeps its default (current, already-approved "seven Editions"
// copy) rather than this Figma frame's own text -- that's the older,
// pre-"funnel strategy" line the rest of the site replaced sitewide
// (git blame: 54bec2e), stale here too, not a deliberate difference for
// this page.
//
// .hpn-page scopes this page's own gold navbar/footer accent (see
// globals.css) without touching those shared components' default
// styling on every other page.
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
      <Cta />
      <Footer />
    </div>
  );
}
