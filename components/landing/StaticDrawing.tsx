import fs from "fs";
import path from "path";

/**
 * Static (non-scroll-jacked) version of the shared Drawing component,
 * for /landing only -- shows the finished sketch immediately, no
 * scroll-scrubbed reveal, no tall pinned runway (the sitewide
 * ScrollDrawing this replaces here is a 120vh+ section the user has to
 * scroll through before the next section arrives; two follow-up
 * requests found that gap still too big even after shortening the
 * runway, so this drops the scroll-jack animation entirely instead of
 * tuning it further). Reuses the exact same source SVG asset as
 * Drawing.tsx -- just rendered as a plain static image in normal
 * document flow, with its own (much smaller) section padding instead
 * of a tall runway. No JS at all: every path's final state (fully
 * outlined + filled) is set directly in CSS, not by ScrollDrawing's
 * own scroll-position logic.
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
