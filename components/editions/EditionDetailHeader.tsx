import type { EditionData } from "./editions-data";

/**
 * Centered header at the top of an edition's detail page (Figma node
 * 232:4756): faded roman-numeral eyebrow, the plain name, and an intro
 * paragraph (still Figma's own Lorem Ipsum placeholder -- swap in real
 * copy when it's ready). Visually close to the shared .centered-statement
 * pattern (EditionsIntro uses it too), but kept as its own scoped block
 * rather than reused directly -- this one has an extra name line between
 * the eyebrow and the paragraph that .centered-statement doesn't.
 */
export default function EditionDetailHeader({ data }: { data: EditionData }) {
  return (
    <header className="edition-detail-header">
      <p className="edition-detail-header__eyebrow">{data.index}</p>
      <p className="edition-detail-header__name">{data.name}</p>
      <p className="edition-detail-header__intro">{data.detailIntro}</p>
    </header>
  );
}
