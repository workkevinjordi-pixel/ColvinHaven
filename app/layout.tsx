import type { Metadata, Viewport } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// The site's one sans-serif face -- used everywhere `var(--font-plus-
// jakarta-sans)` appears in globals.css, which is every sans-serif
// declaration on the main site (body's own default included) plus the
// /option3/4/6 layout variants' own sans stacks. Roboto used to fill
// this role; it's gone now, replaced 1:1 (same sizes/weights) rather
// than left loaded alongside an unused font.
const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

// Used only by the /option2 layout variant (see the "Option 2" block in
// globals.css); the main site keeps Times New Roman for its serif.
const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

// Title and description follow the funnel strategy's AEO guidance
// directly: a single, plainly-stated, quotable category definition
// ("wellness home brand," not "architecture and design studio" -- the
// strategy is explicit that Colvin Haven is neither a studio nor a
// developer) that both search engines and answer engines (ChatGPT,
// Perplexity, Google AI Overviews) can lift cleanly as a citable fact.
export const metadata: Metadata = {
  // Resolves every relative metadata URL (canonical, Open Graph and
  // Twitter images from app/opengraph-image.jpg / twitter-image.jpg)
  // against the production domain.
  metadataBase: new URL(SITE_URL),
  title: "Colvin Haven — Wellness Home Brand",
  description:
    "Colvin Haven is the world's first wellness home brand — homes designed around restoration, not just residence.",
  // "./" is each route's own path, so every page canonicalises to
  // itself on the production domain (the .vercel.app alias included).
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

// Matches --bg -- tints the mobile browser's own address-bar/status-bar
// chrome to the same cream every page opens on, instead of Chrome/
// Safari's default white flashing against it for a moment before the
// page paints.
export const viewport: Viewport = {
  themeColor: "#f0ebe3",
};

// Site-wide structured data: who the brand is and what the site is. Only
// facts already on the site (name, domain, the category line from the
// description above) -- nothing invented.
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      description:
        "Colvin Haven is the world's first wellness home brand — homes designed around restoration, not just residence.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // globals.css sets `scroll-behavior: smooth` on html (for in-page
      // anchor jumps). As of Next.js 16 the router no longer overrides
      // that during route transitions on its own (a v15 behavior
      // change) -- without this attribute, navigating to a new page
      // visibly animates the scroll position down to 0 instead of
      // starting there instantly, which reads as "page changes, THEN
      // scrolls up" rather than a clean reset. This attribute is
      // Next's own opt-in to restore the old instant-scroll-on-navigate
      // behavior, confirmed against its own source
      // (disable-smooth-scroll.ts) and 16 upgrade docs, not guessed.
      data-scroll-behavior="smooth"
      className={`${plusJakartaSans.variable} ${cormorant.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
