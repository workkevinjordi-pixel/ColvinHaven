import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import EditionDetailHeader from "@/components/editions/EditionDetailHeader";
import EditionStickyBanner from "@/components/editions/EditionStickyBanner";
import EditionStorySummary from "@/components/editions/EditionStorySummary";
import NextEditionBand from "@/components/editions/NextEditionBand";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import { getEditions } from "@/lib/sanity/editions";
import { getHomepage } from "@/lib/sanity/homepage";

type Params = { slug: string };

// Prerenders one static page per edition -- both entries now come from
// Sanity (getEditions()) rather than a static import, but the fetch
// itself still only needs to happen once per build/revalidation.
export async function generateStaticParams(): Promise<Params[]> {
  const editions = await getEditions();
  return editions.map((edition) => ({ slug: edition.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const editions = await getEditions();
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
// numeral, name, meta row) -> a sticky info strip (node 248:5222, sits
// in normal flow right after the header so it scrolls until it reaches
// the navbar's own bottom edge, then stays pinned flush against it for
// the rest of the page) -> the full story (hero, title, spec/craft
// row, image rows, galleries, a pull-quote banner) -> a "Next
// Editions" band linking to
// the other edition -> the same inquiry banner the homepage closes
// with (Cta, no overrides -- pixel-identical in the source frame) ->
// Footer.
//
// `editions` comes from Sanity (getEditions()) -- see
// lib/sanity/editions.ts's own comment for the fetch/mapping details.
export default async function EditionDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const [editions, homepage] = await Promise.all([getEditions(), getHomepage()]);
  const edition = editions.find((e) => e.slug === slug);
  if (!edition) notFound();

  // Sora's story is specced by its own frame (node 325:39567) rather
  // than the generic detail-page one, and that frame is the very same
  // one the /editions page's Sora section renders -- so this page now
  // shares EditionStorySummary's "sora" layout with it instead of
  // EditionSpotlight's fixed default order, per direct instruction that
  // the two should match. Tsuki now does the same (its own frame, node
  // 325:39482, is what /editions renders), also on explicit request --
  // EditionSpotlight is only used by /editions-new now.
  const isSora = edition.slug === "umah-sora";

  return (
    <>
      <Navbar solid />
      <EditionDetailHeader
        data={edition}
        displayName={isSora ? edition.name.toUpperCase() : undefined}
        hideMeta
      />
      <EditionStickyBanner data={edition} />
      <EditionStorySummary data={edition} layout={isSora ? "sora" : "tsuki"} />
      <NextEditionBand next={edition.nextEdition} />
      {/* Same inquiry banner as the home page (copy comes from the same
          Sanity homepage.cta, link-style button). */}
      <Cta
        variant="link"
        text={homepage?.cta.text}
        buttonLabel={homepage?.cta.buttonLabel}
        buttonHref={homepage?.cta.buttonHref}
      />
      <Footer />
    </>
  );
}
