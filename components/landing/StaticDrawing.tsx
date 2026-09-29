import fs from "fs";
import path from "path";

/**
 * Static (non-scroll-jacked) version of the shared Drawing component --
 * shows the finished sketch immediately, no scroll-scrubbed reveal, no
 * tall pinned runway. Used on the real homepage's own mobile layout
 * only (see app/page.tsx, .home-drawing--mobile) -- desktop kept the
 * animated Drawing/ScrollDrawing (its own scroll-jacked parallax
 * reveal is a deliberate, explicitly requested keeper there); several
 * follow-up requests during this page's original build (back when it
 * was a separate page, /landing, since folded into the homepage) found
 * that same scroll-jacked runway read as too much dead space on a
 * phone-sized viewport specifically, hence a static version for mobile
 * only. Reuses the exact same source SVG asset as Drawing.tsx -- just
 * rendered as a plain static image in normal document flow, with its
 * own (much smaller) section padding instead of a tall runway. No JS
 * at all: every path's final state (fully outlined + filled) is set
 * directly in CSS, not by ScrollDrawing's own scroll-position logic.
 */
export default function StaticDrawing() {
  const svgPath = path.join(
    process.cwd(),
    "public/assets/section-drawing.svg",
  );
  const svgMarkup = fs.readFileSync(svgPath, "utf-8");

  return (
    <div className="landing-drawing-static">
      <div
        className="landing-drawing-static__svg"
        // Static, build-time-read local SVG asset, not user input --
        // same file/trust boundary as Drawing.tsx's own usage.
        dangerouslySetInnerHTML={{ __html: svgMarkup }}
      />
    </div>
  );
}
