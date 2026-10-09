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
import { getHomepage } from "@/lib/sanity/homepage";

// Fallback only -- used when the Sanity fetch comes back empty (or a
// field within it does), so the page still renders real content
// instead of a blank paragraph block. Matches app/page.tsx's own
// original SHARED_COPY, which both TextIntro instances used to share
// before this content moved into Sanity's homepage.editionsIntro/
// collectiveIntro (independently editable there even though they
// still start out identical).
const FALLBACK_COPY = [
  "Every CH home is a singular commission one family, one landscape, one house that will never be built again.",
  "The language is constant. Restraint, learned in kitchens rather than classrooms. Materials chosen for how they feel, not how they photograph. A kitchen at the center of every home, because that's where a life is actually lived. What changes is the canvas the land, the light, the hands each place gives us to build with.",
  "Umah Tsuki and Sora are both written in Indonesia. They are the first two homes in a language built to travel one country, one canvas, at a time.",
];

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
// one per breakpoint. Not CMS-managed -- a signature piece of custom
// SVG illustration, not a swappable content photo (see
// lib/sanity/homepage.ts's own schema comment).
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
//
// Every section's own content (Hero, crafting statement, quote row,
// both TextIntro blurbs, Approach gallery, Cta's own text) now comes
// from Sanity (getHomepage()), fetched once here and passed down as
// props -- Hero/Cta stay client components for their own parallax
// scroll effect, so they can't fetch their own data the way the
// self-fetching Server Components elsewhere on the site do (Editions/
// Publications). Each component's own hardcoded defaults (still
// matching this exact content) are the fallback if the fetch ever
// comes back empty, not the source of truth.
export default async function Home() {
  const homepage = await getHomepage();

  return (
    <div className="landing-page">
      {/* Without JS the timed dismiss never runs, so keep the overlay
          from permanently covering the page. */}
      <noscript>
        <style>{`.splash{display:none!important}`}</style>
      </noscript>
      <SplashScreen />
      <Navbar />
      <Hero
        title={homepage?.hero.title}
        tagline={homepage?.hero.tagline}
        backgroundImage={homepage?.hero.backgroundImage}
      />
      <div className="home-drawing home-drawing--desktop">
        <Drawing />
      </div>
      <div className="home-drawing home-drawing--mobile">
        <StaticDrawing />
      </div>
      <CraftingStatement
        heading={homepage?.craftingStatement.heading}
        body={homepage?.craftingStatement.body}
      />
      <HomeQuoteRow items={homepage?.quoteRow} />
      <TextIntro
        heading={homepage?.editionsIntro.heading ?? "Editions"}
        linkLabel={homepage?.editionsIntro.linkLabel ?? "Editions"}
        linkHref={homepage?.editionsIntro.linkHref ?? "/editions"}
        centered
      >
        {(homepage?.editionsIntro.paragraphs ?? FALLBACK_COPY).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </TextIntro>
      <ApproachGallery items={homepage?.approachGallery} />
      <TextIntro
        heading={homepage?.collectiveIntro.heading ?? "Collective"}
        linkLabel={homepage?.collectiveIntro.linkLabel ?? "Dive Deeper"}
        linkHref={homepage?.collectiveIntro.linkHref ?? "/collective"}
        narrow
      >
        {(homepage?.collectiveIntro.paragraphs ?? FALLBACK_COPY).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </TextIntro>
      <Cta
        text={homepage?.cta.text}
        buttonLabel={homepage?.cta.buttonLabel}
        buttonHref={homepage?.cta.buttonHref}
      />
      <Footer />
    </div>
  );
}
