import fs from "fs";
import path from "path";
import AnimatedDrawing from "../AnimatedDrawing";

/**
 * Server component: reads the traced line drawing at build time and hands
 * it to the shared AnimatedDrawing client piece — same approach as the
 * main site's Drawing section, so the staggered draw-in and its
 * reduced-motion handling come along for free.
 */
export default function Opt6Plan() {
  const svgMarkup = fs.readFileSync(
    path.join(process.cwd(), "public/assets/section-drawing.svg"),
    "utf-8",
  );

  return (
    <div className="opt6-plan">
      <AnimatedDrawing svgMarkup={svgMarkup} />
    </div>
  );
}
