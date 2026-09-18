import type { EditionData } from "./editions-data";

/**
 * Sticky info strip (Figma node 248:5222) -- floats 16px below the
 * fixed navbar as the visitor scrolls through an edition's detail
 * page, keeping which project they're on (and its basic facts) always
 * in view. Same index/name/meta fields EditionDetailHeader already
 * shows up top; this is just a persistent, compact echo of it.
 */
export default function EditionStickyBanner({ data }: { data: EditionData }) {
  const { type, location, year } = data.meta;
  return (
    <div className="edition-sticky-banner">
      <div className="edition-sticky-banner__title">
        <span className="edition-sticky-banner__index">{data.index}</span>
        <span className="edition-sticky-banner__name">{data.name}</span>
      </div>
      <div className="edition-sticky-banner__meta">
        <span>{type}</span>
        <span className="edition-sticky-banner__meta-divider" aria-hidden="true" />
        <span>{location}</span>
        <span className="edition-sticky-banner__meta-divider" aria-hidden="true" />
        <span>{year}</span>
      </div>
    </div>
  );
}
