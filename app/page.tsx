import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SplashScreen from "@/components/SplashScreen";
import Drawing from "@/components/Drawing";
import StaticDrawing from "@/components/landing/StaticDrawing";
import TextIntro from "@/components/landing/TextIntro";
import EditionsGallery from "@/components/landing/EditionsGallery";
import WayOfLife from "@/components/landing/WayOfLife";
import EditionsFilmstrip, {
  type EditionsFilmstripImage,
} from "@/components/editions/EditionsFilmstrip";
import MobileFilmstrip from "@/components/landing/MobileFilmstrip";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

// Same five photos as the Editions page's own intro filmstrip (Figma
// node 250:9164) -- this frame's own filmstrip (node 319:38000/
// 321:39410 mobile) is a verbatim reuse for its desktop composition,
// confirmed via hash on every image.
const REEL: EditionsFilmstripImage[] = [
  {
    src: "/assets/editions/editions-filmstrip-shrine.jpg",
    alt: "Balinese ceremonial umbrellas atop a stone shrine, seen through palm fronds",
  },
  {
    src: "/assets/editions/editions-filmstrip-living-room.jpg",
    alt: "A corner living room opening onto a jungle canopy through floor-to-ceiling glass",
  },
  {
    src: "/assets/editions/editions-filmstrip-timber-wall.jpg",
    alt: "Dark timber cladding above an outdoor daybed, seen against the surrounding jungle",
  },
  {
    src: "/assets/editions/editions-filmstrip-lounge.jpg",
    alt: "A grey sofa with an orange throw pillow beside a window looking onto banana leaves",
  },
  {
    src: "/assets/editions/editions-filmstrip-koi-pond.jpg",
    alt: "A stone-edged koi pond beneath a dark timber deck",
  },
];

// Both text sections below (Figma nodes 319:37933 "Tsuki Editions" and
// 319:38007 "Collective") carry this exact same body copy -- confirmed
// via a dedicated get_design_context call on each, not assumed from
// one matching the other.
const SHARED_COPY = (
  <>
    <p>
      Every CH home is a singular commission one family, one landscape,
      one house that will never be built again.
    </p>
    <p>
      The language is constant. Restraint, learned in kitchens rather
      than classrooms. Materials chosen for how they feel, not how they
      photograph. A kitchen at the center of every home, because
      that&apos;s where a life is actually lived. What changes is the
      canvas the land, the light, the hands each place gives us to build
      with.
    </p>
    <p>
      Umah Tsuki and Sora are both written in Indonesia. They are the
      first two homes in a language built to travel one country, one
      canvas, at a time.
    </p>
  </>
);

// This page renders the "Homepage" Figma frame (node 319:36698 desktop
// / 321:38045 mobile), originally built at a separate route (/landing,
// now deleted) and folded in here on explicit request to replace this
// page's previous content: Hero -> Drawing -> Tsuki Editions intro ->
// captioned Editions gallery -> "A Way of Life" -> filmstrip ->
// Collective -> Cta -> Footer. The previous frame this page was built
// from (309:20272 -- Guiding Values/Masonry Gallery/FilmstripBand/
// EditionsCards/CollectiveBanner/QuoteSplit) is dropped entirely --
// those components are deleted along with /homepage-new (the
// design-exploration page they were originally built for, also
// deleted on the same request), not just unused.
//
// TextIntro/EditionsGallery/WayOfLife/MobileFilmstrip/StaticDrawing
// all still live under components/landing/ despite that directory
// name no longer matching a real route -- renaming the directory (or
// the .landing-* CSS classes these components and this page's own
// wrapper below use) is cosmetic-only churn with no behavior change,
// so it's left as-is rather than renamed just to match.
//
// Drawing (the shared, scroll-jacked parallax reveal every other page
// using this sketch -- /editions, /collective, etc. -- already uses)
// is back for desktop, on explicit request: an earlier pass had
// replaced it outright with StaticDrawing (a plain, non-animated
// rendering) after repeated follow-ups found the scroll-jacked
// runway's own dead space, on a phone-sized viewport specifically,
// too big even after shortening it -- that finding was about mobile,
// not the parallax effect itself, which was never the actual
// complaint. Desktop keeps the real animated Drawing; only mobile
// still gets StaticDrawing. Both render; CSS (.home-drawing--desktop/
// --mobile) picks one per breakpoint, same mechanism as the
// EditionsFilmstrip/MobileFilmstrip pair right below it.
//
// .landing-page brings this frame's own gold Footer mark + wider nav
// gap, smaller Hero title (24px/14px), and Cta's own link-style button
// + smaller line -- all already verified correct at the old /landing.
// (The Navbar's own gold mark isn't part of this scope -- that's a
// separate, later "every page" request, see .navbar__index's own
// sitewide rule -- but .landing-page's Footer/Hero/Cta overrides are.)
//
// SplashScreen is homepage-only by construction (rendered here, not in
// the root layout) -- every other page starts directly on its own
// content, no loading overlay.
export default function Home() {
  return (
    <div className="landing-page">
      {/* Without JS the timed dismiss never runs, so keep the overlay
          from permanently covering the page. */}
      <noscript>
        <style>{`.splash{display:none!important}`}</style>
      </noscript>
      <SplashScreen />
      <Navbar />
      <Hero />
      <div className="home-drawing home-drawing--desktop">
        <Drawing />
      </div>
      <div className="home-drawing home-drawing--mobile">
        <StaticDrawing />
      </div>
      <TextIntro heading="Tsuki Editions" linkLabel="Editions" linkHref="/editions">
        {SHARED_COPY}
      </TextIntro>
      <EditionsGallery />
      <WayOfLife />
      {/* Desktop keeps the standard Editions-page reel (EditionsFilmstrip);
          Figma's own dedicated mobile frame (321:39410) uses a different,
          genuinely mobile-specific image set instead (MobileFilmstrip's
          own comment) -- both render, CSS decides which one is visible
          at a given width. */}
      <div className="hpn-filmstrip-band landing-filmstrip--desktop">
        <EditionsFilmstrip images={REEL} />
      </div>
      <MobileFilmstrip />
      <TextIntro
        heading="Collective"
        linkLabel="Dive Deeper"
        linkHref="/collective"
        narrow
      >
        {SHARED_COPY}
      </TextIntro>
      <Cta text={<>Those who find us, were meant to.</>} />
      <Footer />
    </div>
  );
}
