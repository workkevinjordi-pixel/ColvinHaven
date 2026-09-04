import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Drawing from "@/components/Drawing";
import Option8Values from "@/components/option8/Option8Values";
import Option8Gallery from "@/components/option8/Option8Gallery";
import Quote from "@/components/Quote";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Colvin Haven — Option 8",
  description:
    "Literal implementation of the Figma \"Homepage\" frame (node 173:113).",
};

// Section order and copy follow the Figma "Homepage" frame (node 173:113)
// exactly: Hero -> Drawing -> Values -> Gallery -> Quote -> Cta -> Footer.
// That frame has no FeatureSplit ("Silence" / "Luxury") section, and its
// guiding-values / gallery blocks differ slightly from the main site's
// (single paragraph, no gallery intro heading) -- see Option8Values and
// Option8Gallery.
export default function Option8Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <Drawing />
      <Option8Values />
      <Option8Gallery />
      <Quote />
      <Cta />
      <Footer />
    </>
  );
}
