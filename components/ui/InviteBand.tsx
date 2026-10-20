import Image from "next/image";
import Link from "next/link";

export type Invite = {
  text?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

/**
 * The phone closing band, same as the end of the phone homepage: the hero
 * photo with a shade, "Visit one of our projects by invitation" and a
 * "Write to Us ->" link. Copy comes from the homepage's Sanity cta. The
 * host page passes the section class (reveal state) and index.
 */
export default function InviteBand({
  className,
  index,
  cta,
}: {
  className: string;
  index: number;
  cta?: Invite;
}) {
  return (
    <section className={`${className} hm-invite`} data-hm-section={index}>
      <div className="hm-img">
        <Image
          src="/assets/hero-bg.webp"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="hm-invite__shade" />
      <div className="hm-invite__content">
        <h2 className="hm-invite__text hm-r hm-r--0">
          {cta?.text ?? "Visit one of our projects by invitation"}
        </h2>
        <Link
          href={cta?.buttonHref ?? "/write-to-us"}
          className="hm-invite__link hm-r hm-r--1"
        >
          {cta?.buttonLabel ?? "Write to Us"} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
