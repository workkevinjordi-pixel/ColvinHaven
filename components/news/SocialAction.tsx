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
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        ]}
      />
      <PhotoBand
        src="/assets/collective/palm-trees-2.png"
        alt="Silhouetted palm trees against a golden dusk sky"
      />
    </div>
  );
}
