import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import WhatsCooking from "@/components/news/WhatsCooking";
import NewsFilmstripBand from "@/components/news/NewsFilmstripBand";
import SoraProfile from "@/components/news/SoraProfile";
import PublicationsSection from "@/components/news/PublicationsSection";
import EnvironmentalActions from "@/components/news/EnvironmentalActions";
import SocialAction from "@/components/news/SocialAction";
import PullQuote from "@/components/news/PullQuote";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Colvin Haven — What’s Cooking",
  description: "News and publications from Colvin Haven.",
};

// Follows the updated Figma "News" frame (node 205:468) section order:
// Navbar -> "What's Cooking" (now a 4-item checklist, not a tag +
// paragraph) -> filmstrip band -> Sora profile -> Publications (now one
// article card, not two) -> Environmental Actions (new) -> Social
// Action + photo band (new) -> pull quote (new) -> Footer. The Inquiry
// Cta banner that used to close the page is gone from this design --
// Social Action's photo band and the pull quote take its place.
export default function NewsPage() {
  return (
    <>
      <Navbar solid />
      {/* .statement-section's shared 80px top padding is right for every
          other usage (always follows another section), but this is the
          page's first section -- needs the same fixed-navbar clearance
          .editions-intro/.collective-intro/.write-to-us use. */}
      <div className="news-first-section">
        <WhatsCooking />
      </div>
      <NewsFilmstripBand />
      <SoraProfile />
      <PublicationsSection />
      <EnvironmentalActions />
      <SocialAction />
      <PullQuote />
      <Footer />
    </>
  );
}
