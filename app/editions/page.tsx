import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import EditionsIntro from "@/components/editions/EditionsIntro";
import ChCollections from "@/components/editions/ChCollections";
import EditionsList from "@/components/editions/EditionsList";
import { editions } from "@/components/editions/editions-data";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Colvin Haven — Editions",
  description:
    "The Colvin Haven editions: singular architectural commissions, one landscape at a time.",
};

// Follows the Figma "Editions" frame (node 173:1455) section order:
// Navbar -> intro filmstrip -> CH Collections statement -> Editions
// list -> Footer. Footer is pixel-identical to the one already built
// for the main site, so it's reused directly.
//
// The Editions section used to render each edition's full story inline
// (EditionSpotlight, with its hero/lede/row/banner) -- the updated
// Figma frame replaces that with a short summary row per edition
// instead (EditionsList), each linking out to its own detail page
// (app/editions/[slug]/page.tsx) for the full story.
export default function EditionsPage() {
  return (
    <>
      <Navbar solid />
      <EditionsIntro />
      <ChCollections />
      <EditionsList editions={editions} />
      <Footer />
    </>
  );
}
