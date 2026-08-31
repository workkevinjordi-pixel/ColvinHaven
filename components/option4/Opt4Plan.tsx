import fs from "fs";
import path from "path";
import AnimatedDrawing from "../AnimatedDrawing";

/**
 * Server component: reads the traced line drawing at build time and hands
 * the markup to the shared AnimatedDrawing client piece (same approach as
 * the main site's Drawing section, so the staggered draw-in animation and
 * its reduced-motion handling are reused verbatim).
 */
export default function Opt4Plan() {
  const svgMarkup = fs.readFileSync(
    path.join(process.cwd(), "public/assets/section-drawing.svg"),
    "utf-8",
  );

  return (
    <div className="opt4-plan">
      <AnimatedDrawing svgMarkup={svgMarkup} />
    </div>
  );
}
