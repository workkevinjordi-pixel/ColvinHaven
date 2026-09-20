import StatementSection from "../StatementSection";
import PhotoBand from "../collective/PhotoBand";

/**
 * "Social Action" (Figma node 216:4707, new section): a plain
 * StatementSection (heading/divider/tag/paragraphs -- reused as-is,
 * same shape as CH Collections/Inspiration) grouped tightly with a
 * full-width photo band right after it, mirroring Collective's
 * Inspiration+Filmstrip pairing (.news-social-action zeroes the
 * section's own bottom padding so the band sits close, per that same
 * pattern) -- reuses PhotoBand from components/collective since it's
 * generic (just src/alt props, no Collective-specific coupling).
 */
export default function SocialAction() {
  return (
    <div className="news-social-action">
      <StatementSection
        heading="Social Action"
        tag="INSIDE COLVIN HAVEN FOUNDATION"
        paragraphs={[
          "The Colvin Haven Foundation grew out of the same instinct that shaped the homes themselves — that building well in a place means investing in it, not just building on it.",
          "It supports cultural and community initiatives in and around Tumbak Bayuh village, in the same quiet, unpublicized way the homes themselves get made — craftsman by craftsman, one commitment at a time.",
        ]}
      />
      <PhotoBand
        src="/assets/collective/palm-trees-2.png"
        alt="Silhouetted palm trees against a golden dusk sky"
      />
    </div>
  );
}
