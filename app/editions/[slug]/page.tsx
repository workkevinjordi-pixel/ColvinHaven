import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import EditionDetailHeader from "@/components/editions/EditionDetailHeader";
import EditionSpotlight from "@/components/editions/EditionSpotlight";
import Footer from "@/components/Footer";
import { editions } from "@/components/editions/editions-data";

type Params = { slug: string };

// Prerenders one static page per edition -- both entries known upfront
// from editions-data.ts, no runtime lookup needed.
export function generateStaticParams(): Params[] {
  return editions.map((edition) => ({ slug: edition.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const edition = editions.find((e) => e.slug === slug);
  if (!edition) return {};
  return {
    title: `Colvin Haven — ${edition.name}`,
    description: edition.detailIntro,
  };
}

// Per-edition detail page (Figma node 232:4674, "Editions Details") --
// reached by clicking "Explore Umah Tsuki" (or Sora) on the /editions
// page's summary list. Navbar -> centered header (roman numeral, name,
// intro) -> the full story (hero image, poetic title + lede, image
// row, closing banner) -> Footer.
export default async function EditionDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const edition = editions.find((e) => e.slug === slug);
  if (!edition) notFound();

  return (
    <>
      <Navbar solid />
      <EditionDetailHeader data={edition} />
      <EditionSpotlight data={edition} />
      <Footer />
    </>
  );
}
