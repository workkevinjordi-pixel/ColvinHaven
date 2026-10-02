import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import WhatsCooking from "@/components/news/WhatsCooking";
import NewsFilmstripBand from "@/components/news/NewsFilmstripBand";
import MoriProfile from "@/components/news/MoriProfile";
import PublicationsSection from "@/components/news/PublicationsSection";
import SocialAction from "@/components/news/SocialAction";
import PullQuote from "@/components/news/PullQuote";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Colvin Haven — What’s Cooking",
  description: "News and publications from Colvin Haven.",
};

// Full rebuild against the current Figma "News" frame (node 368:40022,
// replacing 205:468/250:10858 entirely, on explicit "remove and
// rebuild" request rather than an incremental patch) -- fetched
// metadata + screenshot + per-section design context for the whole
// frame, not reused from the earlier build's own mapping.
//
// Section order: Navbar -> "What's Cooking" (3-item checklist, not the
// previous 4) -> filmstrip band (now previewing Mori, not Sora) -> Mori
// profile (the page's featured edition is now "MORI (森 - Jungle)", a
// new upcoming third edition -- replaces the previous SoraProfile
// entirely, not a copy-edit of it) -> Publications (unchanged) ->
// Social Action + photo band (unchanged) -> pull quote (same text, two
// new collage photos) -> Footer.
//
// Environmental Actions is GONE from this frame entirely, confirmed via
// both its own screenshot and metadata (What's Cooking's own checklist
// no longer previews it either) -- its component and now-orphaned
// photo assets are deleted, not just unused.
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
      <MoriProfile />
      <PublicationsSection />
      <SocialAction />
      <PullQuote />
      <Footer />
    </>
  );
}
