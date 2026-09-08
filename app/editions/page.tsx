import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import EditionsIntro from "@/components/editions/EditionsIntro";
import ChCollections from "@/components/editions/ChCollections";
import EditionSpotlight from "@/components/editions/EditionSpotlight";
import { editions } from "@/components/editions/editions-data";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Colvin Haven — Editions",
  description:
    "The Colvin Haven editions: singular architectural commissions, one landscape at a time.",
};

// Follows the Figma "Editions" frame (node 173:1455) section order:
// Navbar -> intro filmstrip -> CH Collections statement -> one spotlight
// block per edition -> Inquiry CTA -> Footer. The Cta and Footer sections
// in that frame are pixel-identical to the ones already built for the
// main site, so they're reused directly rather than rebuilt.
export default function EditionsPage() {
  return (
    <>
      <Navbar solid />
      <EditionsIntro />
      <ChCollections />
      {editions.map((edition, i) => (
        <EditionSpotlight key={i} data={edition} />
      ))}
      <Cta />
      <Footer />
    </>
  );
}
