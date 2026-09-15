import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import EditionsIntro from "@/components/editions/EditionsIntro";
import ChCollections from "@/components/editions/ChCollections";
import EditionSpotlight from "@/components/editions/EditionSpotlight";
import { editions } from "@/components/editions/editions-data";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Colvin Haven — Editions",
  description:
    "The Colvin Haven editions: singular architectural commissions, one landscape at a time.",
};

// Follows the Figma "Editions" frame (node 173:1455) section order:
// Navbar -> intro filmstrip -> CH Collections statement -> one spotlight
// block per edition -> Footer. Footer is pixel-identical to the one
// already built for the main site, so it's reused directly. The
// Inquiry Cta banner this page used to close with is removed per
// explicit request -- Editions now ends straight into the Footer.
export default function EditionsPage() {
  return (
    <>
      <Navbar solid />
      <EditionsIntro />
      <ChCollections />
      {editions.map((edition, i) => (
        <EditionSpotlight key={i} data={edition} />
      ))}
      <Footer />
    </>
  );
}
