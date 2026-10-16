import type { CollectivePage } from "@/lib/sanity/collective";
import type { Publication } from "@/lib/sanity/publications";

/**
 * Phone /collective as a flat list of sections ("Collective Mobile scroll"
 * design), built on the server from the same Sanity content the desktop
 * page renders so the two can't drift apart. Only this compact plan goes to
 * the client component.
 */
export type Img = { src: string; alt: string };

export type CollectiveSection =
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
  | {
      kind: "publication";
      /** "PUBLICATIONS" -- only on the first one. */
      heading?: string;
      cover?: Img;
      date: string;
      title: string;
      paragraphs: string[];
      href: string;
    };

// "Astrid leads the architecture." -> name + role. Anything that isn't one
// of those short lines is a plain paragraph.
const PERSON_LINE = /^(\S+) ((?:leads|is|master) .*)$/;

export function buildCollectivePlan(
  page: CollectivePage | undefined,
  publications: Publication[],
): CollectiveSection[] {
  const sections: CollectiveSection[] = [];
  if (!page) return sections;

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

  publications.forEach((p, i) => {
    sections.push({
      kind: "publication",
      heading: i === 0 ? "PUBLICATIONS" : undefined,
      cover: p.coverImage,
      date: p.date,
      title: p.title,
      paragraphs: p.paragraphs,
      href: p.readMoreHref,
    });
  });

  return sections;
}
