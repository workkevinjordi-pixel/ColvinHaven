import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SplashScreen from "@/components/SplashScreen";
import Drawing from "@/components/Drawing";
import GuidingValues from "@/components/homepage-new/GuidingValues";
import MasonryGallery from "@/components/homepage-new/MasonryGallery";
import FilmstripBand from "@/components/homepage-new/FilmstripBand";
import EditionsCards from "@/components/homepage-new/EditionsCards";
import CollectiveBanner from "@/components/homepage-new/CollectiveBanner";
import QuoteSplit from "@/components/homepage-new/QuoteSplit";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

// Section order and copy follow the current Figma "Homepage" frame
// (node 309:20272) exactly: Hero -> Drawing -> Guiding Values ->
// Masonry Gallery -> Filmstrip -> Editions -> Collective -> Quote ->
// Cta -> Footer. This replaces the previous frame this page was built
// from (173:113 -- Values/Option8Values -> Gallery/Option8Gallery ->
// Quote -> Cta, no filmstrip, no Editions cards, no Collective
// banner) -- Option8Values, Option8Gallery, and the old Quote
// component are all dropped from this page in favor of the sections
// below, none of which are Option8-specific despite the "homepage-new/"
// import path: every one of GuidingValues/MasonryGallery/
// FilmstripBand/EditionsCards/CollectiveBanner/QuoteSplit was already
// built, verified, and shipped at /homepage-new against this exact
// same Figma frame -- reused directly here rather than duplicated,
// same as /editions-new already reuses CollectionsCard from this same
// directory. /homepage-new itself is untouched and still live at its
// own route as a design-exploration page, now simply rendering the
// same content this page also renders.
//
// Cta keeps its own default props (the current, already-approved
// "seven Editions" copy) rather than the override /homepage-new
// passes -- that override exists there only because of an earlier,
// explicit "make sure the text exactly the same [as Figma]" request
// scoped to that page specifically; this page follows this session's
// usual default of keeping the site's own approved copy over Figma's
// older, superseded line.
//
// .hpn-page brings this frame's own gold (#c7a95f) navbar/footer
// accent and smaller Hero title (24px/14px, not the site's usual
// 32px/16px) -- both already verified correct at /homepage-new,
// applied here now that this is the frame the main homepage itself
// implements. Scoped via that same class, so no other page (still
// wrapped in their own containers, not .hpn-page) is affected.
//
// SplashScreen is homepage-only by construction (rendered here, not in
// the root layout) -- every other page starts directly on its own
// content, no loading overlay.
export default function Home() {
  return (
    <div className="hpn-page">
      {/* Without JS the timed dismiss never runs, so keep the overlay
          from permanently covering the page. */}
      <noscript>
        <style>{`.splash{display:none!important}`}</style>
      </noscript>
      <SplashScreen />
      <Navbar />
      <Hero />
      <Drawing />
      <GuidingValues />
      <MasonryGallery />
      <FilmstripBand />
      <EditionsCards />
      <CollectiveBanner />
      <QuoteSplit />
      <Cta />
      <Footer />
    </div>
  );
}
