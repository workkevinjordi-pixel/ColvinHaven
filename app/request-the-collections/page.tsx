import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import RequestCollectionsSection from "@/components/request-collections/RequestCollectionsSection";
import Footer from "@/components/Footer";
import { getRequestCollectionsPage } from "@/lib/sanity/requestCollections";

export const metadata: Metadata = {
  title: "Colvin Haven — Request the Collections",
  description:
    "A private look at all seven Colvin Haven Editions, and which are still able to be claimed.",
};

// Follows the Figma "Request the collections" frame (node 274:11373):
// Navbar -> photo + form -> Footer. Reached from CH Collections'
// "Access to CH Collections" CTA on the Editions page (node 274:11369).
//
// RequestCollectionsSection's own content now comes from Sanity
// (getRequestCollectionsPage()), fetched once here (a Server Component)
// and passed down as props -- RequestCollectionsSection itself stays a
// client component for its onSubmit handler, same pattern as
// WriteToUsSection.
export default async function RequestTheCollectionsPage() {
  const page = await getRequestCollectionsPage();
  return (
    <>
      <Navbar solid />
      <RequestCollectionsSection
        heading={page?.heading}
        image={page?.image}
        tag={page?.tag}
        intro={page?.intro}
        submitLabel={page?.submitLabel}
        privacyNote={page?.privacyNote}
      />
      <Footer />
    </>
  );
}
