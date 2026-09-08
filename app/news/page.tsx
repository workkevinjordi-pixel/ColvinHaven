import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import StatementSection from "@/components/StatementSection";
import NewsFilmstripBand from "@/components/news/NewsFilmstripBand";
import SoraProfile from "@/components/news/SoraProfile";
import PublicationsGrid from "@/components/news/PublicationsGrid";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Colvin Haven — News",
  description: "News and publications from Colvin Haven.",
};

const LOREM = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
];

// Follows the Figma "News" frame (node 205:468) section order: Navbar ->
// "News" statement -> filmstrip band -> Sora profile -> "Publications"
// statement -> publications grid -> Inquiry CTA -> Footer. Cta and
// Footer are reused as-is. Both statement sections' body copy is still
// Figma's own Lorem Ipsum placeholder -- swap in real copy when it's
// ready; only the tag/heading text is real.
export default function NewsPage() {
  return (
    <>
      <Navbar solid />
      <StatementSection
        heading="News"
        tag="WHAT’S NEW ON OUR SIDE"
        paragraphs={LOREM}
      />
      <NewsFilmstripBand />
      <SoraProfile />
      <StatementSection
        heading="Publications"
        tag="WHAT’S NEW ON OUR SIDE"
        paragraphs={LOREM}
      />
      <PublicationsGrid />
      <Cta />
      <Footer />
    </>
  );
}
