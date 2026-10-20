import type { Invite } from "@/components/ui/InviteBand";
import type { EditionData } from "../editions/editions-data";

/**
 * The phone layout of /editions, as a flat list of full-screen sections
 * ("Editions Mobile scroll" design). Built on the server from exactly the
 * same edition data the desktop page renders -- same photos, same copy,
 * same per-page overrides -- so the two can't drift apart, and only this
 * compact, serialisable plan is sent to the client component.
 */
export type Img = { src: string; alt: string };
export type Slide = {
  image: Img;
  caption?: string;
  /** CSS object-position for the photo (default centre) -- lets a portrait
   * picture be framed on the part that matters in the full-screen slide. */
  position?: string;
};

export type MobileSection =
  | { kind: "invite"; cta?: Invite }
  | { kind: "photo"; image: Img; priority?: boolean }
  | { kind: "title"; image: Img; index: string; title: string }
  | {
      kind: "details";
      portrait: Img;
      specs: { label: string; value: string }[];
      heading: string;
      paragraphs: string[];
    }
  | { kind: "swiper"; label: string; slides: Slide[] }
  | {
      kind: "story";
      image: Img;
      /** Photo height in px (the design uses a taller one for the two
       * kitchen stories and a shorter one for Sora's morning story). */
      imageHeight: number;
      paragraphs: string[];
      /** Ink-coloured copy (Tsuki's provenance story) instead of the
       * softer 70% ink used everywhere else. */
      ink?: boolean;
      cta?: { note: string; label: string; href: string };
    }
  | { kind: "quote"; image: Img; text: string }
  | { kind: "collection" };

/**
 * Spelling fixes for the phone layout only; the shared edition copy (also
 * shown on desktop) is left untouched. They match the corrected copy in
 * the design reference.
 */
const COPY_FIXES: [RegExp, string][] = [
  [/pass the trees/g, "past the trees"],
  [/move though the paddies/g, "move through the paddies"],
  [/design number of them/g, "design a number of them"],
  [/gets quitter/g, "gets quieter"],
];

function fix(text: string): string {
  return COPY_FIXES.reduce(
    (out, [pattern, replacement]) => out.replace(pattern, replacement),
    text,
  );
}

const TSUKI_LIVING_ROOM_PORTRAIT: Img = {
  src: "/assets/editions/tsuki-living-room-portrait.webp",
  alt: "Tsuki's terrace living room under a teak ceiling: a low timber table and grey sofa facing the jungle, a paper lamp by the glass",
};

const fixAll = (items: string[]) => items.map(fix);

/** A caption block can arrive as several paragraphs or one string with
 * line breaks -- the swiper shows it as one caption. */
const caption = (text: string | string[] | undefined): string | undefined => {
  const joined = Array.isArray(text) ? text.join(" ") : text;
  const out = joined?.replace(/\s*\n\s*/g, " ").trim();
  return out ? fix(out) : undefined;
};

export function buildEditionsPlan(
  editions: EditionData[],
  openingPhoto?: Img,
  cta?: Invite,
): MobileSection[] {
  const sections: MobileSection[] = [];

  if (openingPhoto)
    sections.push({ kind: "photo", image: openingPhoto, priority: true });

  for (const e of editions) {
    const isSora = e.slug === "umah-sora";

    const hero = e.editionsHeroImage ?? e.detailHeroImage ?? e.heroImage;
    const banner = e.editionsBanner1 ?? e.banner1;
    const storyImage = e.editionsStoryAImage ?? e.storyA.image;
    const closing = e.editionsClosingBanner ?? e.closingBanner;
    const craft = e.editionsCraftText ?? e.craftText;
    const storyA = e.editionsStoryAParagraphs ?? e.storyA.paragraphs;

    sections.push({
      kind: "title",
      image: hero,
      index: e.index,
      title: e.name.toUpperCase(),
    });
    sections.push({
      kind: "details",
      portrait: e.editionsPortraitImage ?? e.portraitImage,
      specs: e.specs,
      heading: e.title,
      paragraphs: fixAll(craft),
    });

    if (!isSora) {
      // Tsuki: two captioned photos -> pool banner -> provenance/kitchen
      // -> pool + quote -> three photos and the closing pool.
      const side = {
        ...e.row4.side,
        image: e.editionsRow4SideImage ?? e.row4.side.image,
      };
      sections.push({
        kind: "swiper",
        label: "Umah Tsuki photos",
        slides: [
          {
            // Phone only (this plan feeds the phone layout): a portrait
            // version of the living-room photo, framed for the tall slide,
            // instead of the Sanity landscape one.
            image: TSUKI_LIVING_ROOM_PORTRAIT,
            caption: caption(e.editionsRow4MainText),
            position: "45% 50%",
          },
          { image: side.image, caption: caption(e.editionsRow4SideText) },
        ],
      });
      sections.push({ kind: "photo", image: banner });
      sections.push({
        kind: "story",
        image: storyImage,
        imageHeight: 300,
        paragraphs: fixAll(storyA),
        ink: true,
      });
      sections.push({
        kind: "quote",
        image: e.quoteBanner.image,
        text: e.editionsQuoteHeading ?? e.quoteBanner.heading,
      });
      const gallery = e.galleryRow2 ?? e.galleryRow;
      sections.push({
        kind: "swiper",
        label: "Umah Tsuki gallery",
        slides: [
          ...gallery.map((image) => ({ image })),
          ...(closing ? [{ image: closing }] : []),
        ],
      });
    } else {
      // Sora: two captioned photos -> pool banner -> story + invitation
      // -> three photos -> kitchen -> two captioned photos and the pool.
      const main = e.row1.main;
      const side = {
        ...e.row1.side,
        image: e.editionsRow1SideImage ?? e.row1.side.image,
      };
      sections.push({
        kind: "swiper",
        label: "Umah Sora photos",
        slides: [
          {
            image: main.image,
            caption: caption(e.editionsRow1MainText ?? main.text),
          },
          {
            image: side.image,
            caption: caption(e.editionsRow1SideText ?? side.text),
          },
        ],
      });
      sections.push({ kind: "photo", image: banner });
      sections.push({
        kind: "story",
        image: storyImage,
        imageHeight: 230,
        paragraphs: fixAll(storyA),
        cta: e.editionsStoryACta,
      });
      sections.push({
        kind: "swiper",
        label: "Umah Sora gallery",
        slides: e.galleryRow.map((image) => ({ image })),
      });
      sections.push({
        kind: "story",
        image: e.editionsStoryBImage ?? e.storyB.image,
        imageHeight: 300,
        paragraphs: fixAll(e.editionsStoryBParagraphs ?? e.storyB.paragraphs),
      });
      const r4main = e.row4.main;
      const r4side = {
        ...e.row4.side,
        image: e.editionsRow4SideImage ?? e.row4.side.image,
      };
      sections.push({
        kind: "swiper",
        label: "Umah Sora living spaces",
        slides: [
          {
            image: r4main.image,
            caption: caption(e.editionsRow4MainText ?? r4main.text),
          },
          {
            image: r4side.image,
            caption: caption(e.editionsRow4SideText ?? r4side.text),
          },
          ...(closing ? [{ image: closing }] : []),
        ],
      });
    }
  }

  sections.push({ kind: "collection" });
  sections.push({ kind: "invite", cta });
  return sections;
}
