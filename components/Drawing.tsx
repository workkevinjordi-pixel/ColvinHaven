import fs from "fs";
import path from "path";
import AnimatedDrawing from "./AnimatedDrawing";

export default function Drawing() {
  const svgPath = path.join(
    process.cwd(),
    "public/assets/section-drawing.svg",
  );
  const svgMarkup = fs.readFileSync(svgPath, "utf-8");

  return (
    <section className="drawing">
      <div className="drawing__frame">
        <AnimatedDrawing svgMarkup={svgMarkup} />
      </div>
    </section>
  );
}
