import StatementSection from "../StatementSection";
import PhotoBand from "../collective/PhotoBand";

type SocialActionProps = {
  statement?: { heading?: string; tag?: string; paragraphs?: string[] };
  bandImage?: { src: string; alt: string };
};

// Matches the content migrated into Sanity's newsPage.socialAction
// (see lib/sanity/newsPage.ts and app/news/page.tsx) -- kept as a
// fallback here in case the fetch ever comes back empty, not the
// source of truth.
const DEFAULT_HEADING = "Social Action";
const DEFAULT_TAG = "INSIDE COLVIN HAVEN FOUNDATION";
const DEFAULT_PARAGRAPHS = [
  "The Colvin Haven Foundation grew out of the same instinct that shaped the homes themselves — that building well in a place means investing in it, not just building on it.",
  "It supports cultural and community initiatives in and around Tumbak Bayuh village, in the same quiet, unpublicized way the homes themselves get made — craftsman by craftsman, one commitment at a time.",
];
const DEFAULT_BAND_IMAGE = {
  src: "/assets/collective/palm-trees-2.jpg",
  alt: "Silhouetted palm trees against a golden dusk sky",
};

/**
 * "Social Action" (Figma node 216:4707, new section): a plain
 * StatementSection (heading/divider/tag/paragraphs -- reused as-is,
 * same shape as CH Collections/Inspiration) grouped tightly with a
 * full-width photo band right after it, mirroring Collective's
 * Inspiration+Filmstrip pairing (.news-social-action zeroes the
 * section's own bottom padding so the band sits close, per that same
 * pattern) -- reuses PhotoBand from components/collective since it's
 * generic (just src/alt props, no Collective-specific coupling).
 * Content now comes from Sanity's newsPage.socialAction.
 */
export default function SocialAction({
  statement,
  bandImage = DEFAULT_BAND_IMAGE,
}: SocialActionProps) {
  return (
    <div className="news-social-action">
      <StatementSection
        heading={statement?.heading ?? DEFAULT_HEADING}
        tag={statement?.tag ?? DEFAULT_TAG}
        paragraphs={statement?.paragraphs ?? DEFAULT_PARAGRAPHS}
      />
      <PhotoBand src={bandImage.src} alt={bandImage.alt} />
    </div>
  );
}
