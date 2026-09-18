import Image from "next/image";
import Link from "next/link";
import type { EditionData } from "./editions-data";

/**
 * Closing "Next Editions" band (Figma node 246:5036) -- a plain-color
 * strip (lighter than the page's own --bg) linking to the other
 * edition's detail page.
 */
export default function NextEditionBand({
  next,
}: {
  next: EditionData["nextEdition"];
}) {
  return (
    <div className="next-edition-band">
      <p className="next-edition-band__label">Next Editions</p>
      <Link href={`/editions/${next.slug}`} className="next-edition-band__link">
        <span className="next-edition-band__index">{next.index}</span>
        <span className="next-edition-band__name">{next.name}</span>
        <Image
          className="next-edition-band__chevron"
          src="/assets/editions/detail/chevron-right.svg"
          alt=""
          width={24}
          height={24}
        />
      </Link>
    </div>
  );
}
