import type { EditionData } from "./editions-data";

/**
 * Centered header at the top of an edition's detail page (Figma node
 * 232:4732, updated): faded roman-numeral eyebrow, the plain name, and
 * an optional meta row (type / location / year, each pair split by a
 * vertical divider) -- replaces the plain intro paragraph this used to
 * show.
 */
export default function EditionDetailHeader({
  data,
  displayName,
  hideMeta = false,
}: {
  data: EditionData;
  /** Optional override for the name line specifically -- falls back to
   * `data.name`. /editions and /editions1 pass this for Tsuki
   * ("UMAH TSUKI", all caps, on explicit request) without touching the
   * shared `name` field itself, which /editions/[slug], /editions-new,
   * EditionsList, EditionStickyBanner, and NextEditionBand all also
   * read for their own purposes. */
  displayName?: string;
  /** Drops the meta row (type / location / year). /editions and
   * /editions/[slug] pass this on explicit request; /editions-new still
   * shows it. */
  hideMeta?: boolean;
}) {
  const { type, location, year } = data.meta;
  return (
    <header className="edition-detail-header">
      <p className="edition-detail-header__eyebrow">{data.index}</p>
      <p className="edition-detail-header__name">{displayName ?? data.name}</p>
      {!hideMeta && (
        <div className="edition-detail-header__meta">
          <span>{type}</span>
          <span className="edition-detail-header__meta-divider" aria-hidden="true" />
          <span>{location}</span>
          <span className="edition-detail-header__meta-divider" aria-hidden="true" />
          <span>{year}</span>
        </div>
      )}
    </header>
  );
}
