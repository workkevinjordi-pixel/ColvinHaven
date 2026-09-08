import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CollectiveIntro from "@/components/collective/CollectiveIntro";
import Foundation from "@/components/collective/Foundation";
import Craft from "@/components/collective/Craft";
import PhotoBand from "@/components/collective/PhotoBand";
import Inspiration from "@/components/collective/Inspiration";
import Filmstrip, { type FilmstripImage } from "@/components/Filmstrip";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Colvin Haven — Collective",
  description:
    "The Colvin Haven collective: a practice devoted to the complete experience of home.",
};

// Reuses the same two photos as the Editions filmstrip -- both hashes in
// the Figma frame (node 205:377) are byte-identical to assets already
// downloaded for /editions, so this pulls from public/assets/editions/
// instead of duplicating the files under public/assets/collective/.
const REEL: FilmstripImage[] = [
  { src: "/assets/editions/tsuki-hero.png", alt: "", wide: false },
  { src: "/assets/editions/tsuki-edition-1.png", alt: "", wide: true },
  { src: "/assets/editions/tsuki-hero.png", alt: "", wide: false },
  { src: "/assets/editions/tsuki-edition-1.png", alt: "", wide: true },
  { src: "/assets/editions/tsuki-hero.png", alt: "", wide: false },
];

// Follows the Figma "Collective" frame (node 203:208) section order:
// Navbar -> intro statement -> Foundation -> Craft -> standalone photo
// band -> Inspiration -> filmstrip -> Inquiry CTA -> Footer. Cta and
// Footer are pixel-identical to the ones already built for the main
// site, so they're reused directly.
export default function CollectivePage() {
  return (
    <>
      <Navbar solid />
      <CollectiveIntro />
      <Foundation />
      <Craft />
      <div className="collective-band-section">
        <PhotoBand
          src="/assets/collective/kitchen-courtyard.png"
          alt="A wood-paneled kitchen and dining nook opening onto a stone-clad courtyard"
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
      <Cta />
      <Footer />
    </>
  );
}
