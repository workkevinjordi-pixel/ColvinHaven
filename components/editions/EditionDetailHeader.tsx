import type { EditionData } from "./editions-data";

/**
 * Centered header at the top of an edition's detail page (Figma node
 * 232:4732, updated): faded roman-numeral eyebrow, the plain name, and
 * a meta row (type / location / year, each pair split by a vertical
 * divider) -- replaces the plain intro paragraph this used to show.
 */
export default function EditionDetailHeader({ data }: { data: EditionData }) {
  const { type, location, year } = data.meta;
  return (
    <header className="edition-detail-header">
      <p className="edition-detail-header__eyebrow">{data.index}</p>
      <p className="edition-detail-header__name">{data.name}</p>
      <div className="edition-detail-header__meta">
        <span>{type}</span>
        <span className="edition-detail-header__meta-divider" aria-hidden="true" />
        <span>{location}</span>
        <span className="edition-detail-header__meta-divider" aria-hidden="true" />
        <span>{year}</span>
      </div>
    </header>
  );
}
