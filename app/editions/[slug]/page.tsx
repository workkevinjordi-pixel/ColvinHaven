import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import EditionDetailHeader from "@/components/editions/EditionDetailHeader";
import EditionSpotlight from "@/components/editions/EditionSpotlight";
import NextEditionBand from "@/components/editions/NextEditionBand";
import Cta from "@/components/Cta";
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
    description: edition.craftText[0],
  };
}

// Per-edition detail page (Figma node 232:4674, "Editions Details",
// updated) -- reached by clicking "Explore Umah Tsuki" (or Sora) on the
// /editions page's summary list. Navbar -> centered header (roman
// numeral, name, meta row) -> the full story (hero, title, spec/craft
// row, image rows, galleries, a pull-quote banner) -> a "Next Editions"
// band linking to the other edition -> the same inquiry banner the
// homepage closes with (Cta, no overrides -- pixel-identical in the
// source frame) -> Footer.
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
      <NextEditionBand next={edition.nextEdition} />
      <Cta />
      <Footer />
    </>
  );
}
