import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import RequestCollectionsSection from "@/components/request-collections/RequestCollectionsSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Colvin Haven — Request the Collections",
  description:
    "A private look at all seven Colvin Haven Editions, and which are still able to be claimed.",
};

// Follows the Figma "Request the collections" frame (node 274:11373):
// Navbar -> photo + form -> Footer. Reached from CH Collections'
// "Access to CH Collections" CTA on the Editions page (node 274:11369).
export default function RequestTheCollectionsPage() {
  return (
    <>
      <Navbar solid />
      <RequestCollectionsSection />
      <Footer />
    </>
  );
}
