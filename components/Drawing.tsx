import fs from "fs";
import path from "path";
import ScrollDrawing from "./ScrollDrawing";

export default function Drawing() {
  const svgPath = path.join(
    process.cwd(),
    "public/assets/section-drawing.svg",
  );
  const svgMarkup = fs.readFileSync(svgPath, "utf-8");

  return <ScrollDrawing svgMarkup={svgMarkup} />;
}
