import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
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

export const metadata: Metadata = {
  title: "Colvin Haven — Landing",
  description:
    "Umah Tsuki and Sora, a way of life, and the Colvin Haven collective.",
};

// Same five photos as the Editions page's own intro filmstrip (Figma
// node 250:9164) -- this frame's own filmstrip (node 319:38000) is a
// verbatim reuse, confirmed via hash on every image, same as
// FilmstripBand's identical copy of this same array for /homepage-new.
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

// Figma "Homepage" frame, node 319:36698 desktop / 321:38045 mobile --
// despite the layer name (Figma's own artboard is still called
// "Homepage"), this is a distinct new page at /landing, not a
// replacement for the real homepage: section order is Hero ->
// StaticDrawing -> Tsuki Editions intro -> captioned Editions gallery
// -> "A Way of Life" -> filmstrip -> Collective -> Cta -> Footer, and
// several sections that ARE shared with other pages differ just
// enough in this frame that they're not reused as-is (see TextIntro/
// EditionsGallery/WayOfLife/MobileFilmstrip's own comments for what's
// genuinely new here vs. copied).
//
// StaticDrawing, not the shared Drawing/ScrollDrawing every other page
// using this sketch (the real homepage included) still uses -- two
// follow-up requests found the scroll-jacked reveal's own pinned
// runway left too big a gap before Tsuki Editions even after
// shortening it once already, so this page drops that scroll-scrubbed
// animation entirely in favor of a plain static image with its own
// (much smaller) section padding. See StaticDrawing.tsx's own comment.
//
// The mobile frame isn't a linear scale-down of the desktop one --
// EditionsGallery's own mixed canvas has its own real mobile numbers,
// WayOfLife is left-aligned there instead of centered, and the
// filmstrip uses a different image set entirely (MobileFilmstrip) --
// each confirmed via its own dedicated get_design_context call on that
// specific mobile node, not assumed to mirror desktop. Hero, Navbar,
// Footer and Cta's own mobile treatment already matched what's
// implemented before this pass (also confirmed, not assumed) --
// nothing further to change there.
//
// Hero title/tagline are the same smaller size .hpn-page already
// established for /homepage-new (24px/14px, confirmed via a dedicated
// get_design_context call on this frame's own "Frame 99", not assumed
// carried over) -- but this frame's navbar mark used to be plain
// white, not gold, before a later "gold on every page" request made
// every page's navbar match (see .navbar__index's own sitewide rule).
// Only the Footer gets its own gold "CH" mark + 40px nav gap scoped
// here specifically.
//
// Cta keeps its default background/button but swaps in this frame's
// own shorter line ("Those who find us, were meant to.") in place of
// the live homepage's "seven Editions" copy -- genuine, deliberate
// copy in this frame, not a placeholder to override away from.
export default function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />
      <Hero />
      <StaticDrawing />
      <TextIntro heading="Tsuki Editions" linkLabel="Editions" linkHref="/editions">
        {SHARED_COPY}
      </TextIntro>
      <EditionsGallery />
      <WayOfLife />
      {/* Desktop keeps the standard Editions-page reel (EditionsFilmstrip);
          Figma's own dedicated mobile frame (321:39410) uses a different,
          genuinely mobile-specific image set instead (MobileFilmstrip's
          own comment) -- both render, CSS decides which one is visible
          at a given width (globals.css), matching how this page's own
          .landing-gallery already keeps one canvas per breakpoint rather
          than a single element reflowing between two different designs. */}
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
