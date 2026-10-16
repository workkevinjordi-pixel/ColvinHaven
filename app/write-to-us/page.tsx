import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import WriteToUsSection from "@/components/write-to-us/WriteToUsSection";
import Footer from "@/components/Footer";
import { getContactPage } from "@/lib/sanity/contact";

export const metadata: Metadata = {
  title: "Colvin Haven — Write to Us",
  description:
    "Write to Colvin Haven about Umah Tsuki, Umah Sora and the homes still waiting for their land. Visits are by invitation.",
};

// Follows the Figma "Contact" frame (node 205:625): Navbar -> form ->
// Footer. No Cta section on this page -- the frame has none.
//
// WriteToUsSection's own content now comes from Sanity (getContactPage()),
// fetched once here (a Server Component) and passed down as props --
// WriteToUsSection itself stays a client component for its onSubmit
// handler, so it can't fetch its own data, same pattern as Hero/Cta on
// the homepage.
export default async function WriteToUsPage() {
  const page = await getContactPage();
  return (
    <>
      <Navbar solid />
      <WriteToUsSection
        heading={page?.heading}
        image={page?.image}
        tag={page?.tag}
        intro={page?.intro}
        submitLabel={page?.submitLabel}
      />
      <Footer />
    </>
  );
}
