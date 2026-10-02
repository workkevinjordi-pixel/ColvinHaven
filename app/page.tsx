import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SplashScreen from "@/components/SplashScreen";
import Drawing from "@/components/Drawing";
import StaticDrawing from "@/components/landing/StaticDrawing";
import CraftingStatement from "@/components/landing/CraftingStatement";
import HomeQuoteRow from "@/components/landing/HomeQuoteRow";
import TextIntro from "@/components/landing/TextIntro";
import ApproachGallery from "@/components/landing/ApproachGallery";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

// Both text sections below (Figma nodes 371:40218 "Editions" and
// 371:40234 "Collective") carry this exact same body copy -- confirmed
// via a dedicated get_design_context call on each, not assumed from
// one matching the other. Unchanged from the previous build of this
// page, which already established this exact text for the same
// SHARED_COPY role.
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

// Full re-sync against the current "Homepage" Figma frame (node
// 298:11984, replacing 319:36698/321:38045 entirely on explicit
// "implement this design from Figma" request) -- fetched metadata +
// screenshot + per-section design context for the whole frame rather
// than patching the previous build's own mapping.
//
// New section order: Hero -> Drawing -> "CRAFTING SPACES, LIVING
// SLOWLY." statement (new) -> three-photo quote row (new) -> "Editions"
// intro, now centered with no divider (SHARED_COPY, same text as
// before) -> five-photo "Approach" gallery (new, replaces the previous
// frame's own scattered-position EditionsGallery) -> "Collective" intro
// (unchanged, same narrow left-aligned layout + SHARED_COPY) -> Cta ->
// Footer.
//
// Three whole sections the previous build had are GONE from this frame
// entirely, confirmed via its own screenshot: "A Way of Life"
// (WayOfLife.tsx, deleted), the old scattered-position EditionsGallery
// (components/landing/EditionsGallery.tsx, deleted -- replaced by
// ApproachGallery, a different layout entirely, not a copy-edit of it),
// and the EditionsFilmstrip/MobileFilmstrip marquee pair (MobileFilmstrip.tsx
// deleted; EditionsFilmstrip itself stays -- still used by /editions-new
// and /editions' own intro, just no longer imported here).
//
// TextIntro/StaticDrawing still live under components/landing/ despite
// that directory name no longer matching a real route -- renaming it
// (or the .landing-* CSS classes these components and this page's own
// wrapper below use) is cosmetic-only churn with no behavior change,
// so it's left as-is.
//
// Drawing (desktop) / StaticDrawing (mobile) is unchanged from the
// previous build -- CSS (.home-drawing--desktop/--mobile) still picks
// one per breakpoint.
//
// .landing-page still brings this frame's own gold Footer mark + wider
// nav gap, smaller Hero title, and Cta's own link-style button + smaller
// line -- all unchanged from the previous build, still correct against
// this current frame. Cta's own height is now explicitly one-third of
// the viewport height on this page specifically (explicit follow-up
// request, not from Figma, which specs a fixed 444px here) -- scoped
// via .landing-page .cta, every other page keeps Cta's own 554px
// min-height default.
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
      <CraftingStatement />
      <HomeQuoteRow />
      <TextIntro heading="Editions" linkLabel="Editions" linkHref="/editions" centered>
        {SHARED_COPY}
      </TextIntro>
      <ApproachGallery />
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
