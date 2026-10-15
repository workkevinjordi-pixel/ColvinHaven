import type { Metadata } from "next";
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
// instead of a blank paragraph block. Both TextIntro instances used to
// share one SHARED_COPY constant before this content moved into
// Sanity's homepage.editionsIntro/collectiveIntro -- each got its own
// fallback once its variant was independently redesigned (Editions at
// node 385:1275, Collective at node 385:1370), so neither shares a
// constant with the other any more.
const COLLECTIVE_FALLBACK_BODY = [
  "Behind both, a small collective of designers and architects, brought together by a cook who learned to build.",
  "Our own Indonesian craftspeople finish every detail by hand.",
];
const EDITIONS_FALLBACK_BODY = [
  "Entirely turnkey. Tell us where you'd like to wake, and how many bedrooms. The rest is ours: architecture, interiors, landscape, and the build itself, managed start to finish.",
];

// Full re-sync against the current "Homepage" Figma frame (node
// 298:11984, replacing 319:36698/321:38045 entirely on explicit
// "implement this design from Figma" request) -- fetched metadata +
// screenshot + per-section design context for the whole frame rather
// than patching the previous build's own mapping.
//
// New section order: Hero -> Drawing -> "CRAFTING SPACES, LIVING
// SLOWLY." statement (new) -> three-photo quote row (new) -> "Editions"
// intro, centered with no divider -> five-photo "Approach" gallery
// (new, replaces the previous frame's own scattered-position
// EditionsGallery) -> "Collective" intro, also centered with no
// divider -> Cta -> Footer.
//
// "Editions" intro redesigned at node 385:1275 (explicit "implement
// this design from Figma" follow-up, scoped to just this one section):
// adds an "EDITIONS" eyebrow, a new heading ("TSUKI, THE MOON. SORA,
// THE SKY") with a subtitle under it, and replaces the old three-
// paragraph SHARED_COPY body with one italic lead sentence + one body
// paragraph. The link reads "Dive deeper" and goes to /editions
// (direct instruction). It briefly read "Request access" ->
// /request-the-collections -- a guess, since Figma's own node data
// specifies no href at all (just text + an icon) -- and then "Deep
// Diver", before the label was settled. Figma's own subtitle copy reads "Cut form the
// same cloth" (likely a "from" typo in their source) -- kept verbatim
// per this project's usual practice of porting Figma's own copy
// faithfully rather than silently correcting it.
//
// "Collective" intro redesigned the same way at node 385:1370 (same
// follow-up pattern, one section at a time): switches from its
// original `narrow`, right-aligned, divided layout to `centered`
// (TextIntro.tsx's own `narrow` prop is no longer used by any live
// page after this, but stays as a documented option, not deleted).
// Adds a "COLLECTIVE" eyebrow, a new two-line heading ("UMAH TSUKI IS
// WHERE OUR FOUNDER LIVES,\nSORA WAS BUILT FOR OUR FIRST CLIENT." --
// TextIntro.tsx's `heading` now splits on "\n" into a hard line break,
// added specifically for this), a new two-paragraph body (replacing
// the old three-paragraph SHARED_COPY) in a narrower 686px column
// (`compact`). A standalone gold "Visits to Umah Tsuki are by
// invitation" note the first pass added is gone from the current
// frame, so it was removed. The
// link changes from "Dive Deeper" to "Meet the collective", still ->
// /collective (Figma gives no href here either; this target already
// matched the link's own intent, so it carries over unchanged).
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
// The layout's "./" canonical resolves to "/index" on the root route, so
// the homepage pins its own.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

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
      <Navbar heroBrand />
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
        eyebrow={homepage?.editionsIntro.eyebrow ?? "EDITIONS"}
        heading={homepage?.editionsIntro.heading ?? "TSUKI, THE MOON. SORA, THE SKY"}
        subtitle={homepage?.editionsIntro.subtitle ?? "Cut form the same cloth, different in size"}
        lead={homepage?.editionsIntro.lead ?? "Stillness and wellness, built into every room."}
        linkLabel={homepage?.editionsIntro.linkLabel ?? "Dive deeper"}
        linkHref={homepage?.editionsIntro.linkHref ?? "/editions"}
        centered
      >
        {(homepage?.editionsIntro.paragraphs ?? EDITIONS_FALLBACK_BODY).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </TextIntro>
      <ApproachGallery items={homepage?.approachGallery} />
      <TextIntro
        eyebrow={homepage?.collectiveIntro.eyebrow ?? "COLLECTIVE"}
        heading={
          homepage?.collectiveIntro.heading ??
          "UMAH TSUKI IS WHERE OUR FOUNDER LIVES,\nSORA WAS BUILT FOR OUR FIRST CLIENT."
        }
        linkLabel={homepage?.collectiveIntro.linkLabel ?? "Meet the collective"}
        linkHref={homepage?.collectiveIntro.linkHref ?? "/collective"}
        centered
        compact
      >
        {(homepage?.collectiveIntro.paragraphs ?? COLLECTIVE_FALLBACK_BODY).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </TextIntro>
      <Cta
        variant="link"
        text={homepage?.cta.text}
        buttonLabel={homepage?.cta.buttonLabel}
        buttonHref={homepage?.cta.buttonHref}
      />
      <Footer />
    </div>
  );
}
