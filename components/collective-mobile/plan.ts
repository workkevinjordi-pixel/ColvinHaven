import type { CollectivePage } from "@/lib/sanity/collective";
import {
  PUBLICATIONS,
  type PublicationItem,
} from "@/components/collective/publications-data";

/**
 * Phone /collective as a flat list of sections ("Collective Mobile scroll"
 * design), built on the server from the same Sanity content the desktop
 * page renders so the two can't drift apart. Only this compact plan goes to
 * the client component.
 */
export type Img = { src: string; alt: string };

export type CollectiveSection =
  | { kind: "sketch"; src: string; alt: string; title: string; text: string }
  | {
      kind: "founder";
      imageA?: Img;
      imageB?: Img;
      heading: string;
      paragraphs: string[];
    }
  | {
      kind: "team";
      heading: string;
      image?: Img;
      /** The "Name role." lines, split so the name can be set heavier. */
      people: { name: string; role: string }[];
      paragraphs: string[];
    }
  | { kind: "photo"; image: Img }
  | { kind: "inspirations"; heading: string; paragraphs: string[] }
  | { kind: "swiper"; label: string; slides: Img[] }
  | { kind: "news"; heading: string; items: PublicationItem[] };

// "Astrid leads the architecture." -> name + role. Anything that isn't one
// of those short lines is a plain paragraph.
const PERSON_LINE = /^(\S+) ((?:leads|is|master) .*)$/;

export function buildCollectivePlan(
  page: CollectivePage | undefined,
): CollectiveSection[] {
  const sections: CollectiveSection[] = [];
  if (!page) return sections;

  // The house sketch and its caption open the page (same as desktop).
  sections.push({
    kind: "sketch",
    src: "/assets/collective/sketch-static.svg",
    alt: "Sketch of the three Colvin Haven hillside villas on their slope",
    title: "TSUKI BEGIN AS A LINE ON PAPER",
    text: "Every CH home starts by hand, long before it starts on site.",
  });

  const { foundation, craft, photoBand, inspiration, inspirationGallery } =
    page;

  if (foundation.heading && foundation.paragraphs?.length) {
    sections.push({
      kind: "founder",
      imageA: foundation.collageImageA,
      imageB: foundation.collageImageB,
      heading: foundation.heading,
      paragraphs: foundation.paragraphs,
    });
  }

  const teamText = craft.row?.main?.text ?? [];
  if (craft.heading && teamText.length) {
    const people: { name: string; role: string }[] = [];
    const paragraphs: string[] = [];
    for (const line of teamText) {
      const m = PERSON_LINE.exec(line);
      if (m && paragraphs.length === 0) people.push({ name: m[1], role: m[2] });
      else paragraphs.push(line);
    }
    sections.push({
      kind: "team",
      heading: craft.heading,
      image: craft.row?.main?.image,
      people,
      paragraphs,
    });
  }

  if (craft.row?.side?.image)
    sections.push({ kind: "photo", image: craft.row.side.image });
  if (photoBand) sections.push({ kind: "photo", image: photoBand });

  if (inspiration.heading && inspiration.paragraphs?.length) {
    sections.push({
      kind: "inspirations",
      heading: inspiration.heading,
      paragraphs: inspiration.paragraphs,
    });
  }

  if (inspirationGallery?.length) {
    sections.push({
      kind: "swiper",
      label: "Inspirations",
      slides: inspirationGallery,
    });
  }

  // The press mentions: the same three items as the desktop list.
  sections.push({ kind: "news", heading: "In The Press", items: PUBLICATIONS });

  return sections;
}
