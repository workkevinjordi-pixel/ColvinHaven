import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SplashScreen from "@/components/SplashScreen";
import Drawing from "@/components/Drawing";
import Option8Values from "@/components/option8/Option8Values";
import Option8Gallery from "@/components/option8/Option8Gallery";
import Quote from "@/components/Quote";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

// Section order and copy follow the Figma "Homepage" frame (node 173:113)
// exactly: Hero -> Drawing -> Values -> Gallery -> Quote -> Cta -> Footer.
// That frame has no FeatureSplit ("Silence" / "Luxury") section, and its
// guiding-values / gallery blocks differ slightly from the prior main site's
// (single paragraph, no gallery intro heading) -- see Option8Values and
// Option8Gallery.
//
// SplashScreen is homepage-only by construction (rendered here, not in
// the root layout) -- every other page starts directly on its own
// content, no loading overlay.
export default function Home() {
  return (
    <>
      {/* Without JS the timed dismiss never runs, so keep the overlay
          from permanently covering the page. */}
      <noscript>
        <style>{`.splash{display:none!important}`}</style>
      </noscript>
      <SplashScreen />
      <Navbar />
      <Hero />
      <Drawing />
      <Option8Values />
      <Option8Gallery />
      <Quote />
      <Cta />
      <Footer />
    </>
  );
}
