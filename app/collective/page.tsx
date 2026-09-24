import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CollectiveIntro from "@/components/collective/CollectiveIntro";
import Foundation from "@/components/collective/Foundation";
import Craft from "@/components/collective/Craft";
import PhotoBand from "@/components/collective/PhotoBand";
import Inspiration from "@/components/collective/Inspiration";
import Publications from "@/components/collective/Publications";
import Filmstrip, { type FilmstripImage } from "@/components/Filmstrip";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Colvin Haven — Collective",
  description:
    "The Colvin Haven collective: a practice devoted to the complete experience of home.",
};

// Re-synced against node 250:10541 (frame 287:11841): five genuinely
// distinct photos now, not the Editions filmstrip's two reused ones --
// confirmed via hash, none of these match any asset already on the
// site. Kept the same narrow/wide/narrow/wide/narrow alternation
// Filmstrip.tsx already establishes everywhere else it's used (the
// Figma frame's own pixel widths are close enough to uniform that they
// don't read as a deliberate re-spec of that pattern).
const REEL: FilmstripImage[] = [
  {
    src: "/assets/collective/filmstrip-lounge-chair.jpg",
    alt: "A dark timber lounge chair on a deck backed by bamboo",
    wide: false,
  },
  {
    src: "/assets/collective/filmstrip-bonsai-wall.jpg",
    alt: "A cloud-pruned pine beside a stone wall and dark timber house",
    wide: true,
  },
  {
    src: "/assets/collective/filmstrip-timber-edge.jpg",
    alt: "A pale timber batten set into a dark board-and-batten wall",
    wide: false,
  },
  {
    src: "/assets/collective/filmstrip-shrine-umbrellas.jpg",
    alt: "Balinese ceremonial umbrellas atop a stone shrine, seen through palms",
    wide: true,
  },
  {
    src: "/assets/collective/filmstrip-bench-pond.jpg",
    alt: "A timber bench on a deck overlooking a stone-edged pond",
    wide: false,
  },
];

// Follows the Figma "Collective" frame (node 203:208, extended by nodes
// 222:4394 and 222:4432) section order: Navbar -> intro statement ->
// Foundation -> Craft -> standalone photo band -> Inspiration ->
// filmstrip -> Publications -> quote/CTA -> Footer. Footer is
// pixel-identical to the one already built for the main site, so it's
// reused directly.
//
// The closing quote/CTA (222:4432) reuses the shared Cta shell with its
// own background photo and copy instead of the generic inquiry line --
// same reasoning as News (which dropped Cta for its own PullQuote) and
// Editions (which dropped it outright): once a page's closing section
// has bespoke content of its own, keeping the *generic* Cta immediately
// above it would just stack two near-identical full-bleed banners back
// to back, right before the Footer.
export default function CollectivePage() {
  return (
    <>
      <Navbar solid />
      <CollectiveIntro />
      <Foundation />
      <Craft />
      <div className="collective-band-section">
        <PhotoBand
          src="/assets/collective/standalone-courtyard.jpg"
          alt="A timber deck and stair bridge over a stone-edged pond, between two roof pavilions"
        />
      </div>
      {/* Figma now nests Inspiration and the filmstrip in one shared
          w-1834 group with a tight 24px gap between them, rather than
          two independently-spaced sections -- .collective-inspiration
          scopes StatementSection's bottom padding down to match. */}
      <div className="collective-inspiration">
        <Inspiration />
        <Filmstrip images={REEL} />
      </div>
      <Publications />
      {/* Figma's closing CTA background (node 250:10633) turns out to be
          the exact same source photo as the site's own hero-bg.png
          (byte-identical asset export, just a different crop/overlay) --
          so this reuses it via Cta's default bgSrc rather than
          duplicating the file under public/assets/collective/. Content
          updated from the earlier pull-quote treatment to a job-
          applications CTA, per the current Figma frame -- "send us your
          CV and Portfolio send it to through the application form
          below" cleaned up in transit (a duplicated "send" construction,
          not a deliberate phrasing). No dedicated careers/application
          page exists yet, so the button still points at /write-to-us
          until one does. */}
      <Cta
        id="collective-apply"
        text={
          <>
            For job applications, send us your CV and portfolio through
            the application form below.
          </>
        }
        buttonLabel="Apply to Colvin Haven"
      />
      <Footer />
    </>
  );
}
