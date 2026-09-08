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
          src="/assets/collective/palm-trees-1.png"
          alt="Palm fronds being unloaded from a delivery truck on site"
        />
      </div>
      <Inspiration />
      <div className="collective-band-section">
        <Filmstrip images={REEL} />
      </div>
      <Cta />
      <Footer />
    </>
  );
}
