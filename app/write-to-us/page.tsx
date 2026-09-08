import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import WriteToUsSection from "@/components/write-to-us/WriteToUsSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Colvin Haven — Write to Us",
  description: "Get in touch with Colvin Haven.",
};

// Follows the Figma "Contact" frame (node 205:625): Navbar -> form ->
// Footer. No Cta section on this page -- the frame has none.
export default function WriteToUsPage() {
  return (
    <>
      <Navbar solid />
      <WriteToUsSection />
      <Footer />
    </>
  );
}
