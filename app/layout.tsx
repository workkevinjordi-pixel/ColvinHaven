import type { Metadata } from "next";
import { Cormorant_Garamond, Fraunces, Plus_Jakarta_Sans } from "next/font/google";
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

// Used only by the /option3 layout variant (see the "Option 3" block in
// globals.css) as its editorial display face.
const fraunces = Fraunces({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

// Title and description follow the funnel strategy's AEO guidance
// directly: a single, plainly-stated, quotable category definition
// ("wellness home brand," not "architecture and design studio" -- the
// strategy is explicit that Colvin Haven is neither a studio nor a
// developer) that both search engines and answer engines (ChatGPT,
// Perplexity, Google AI Overviews) can lift cleanly as a citable fact.
export const metadata: Metadata = {
  title: "Colvin Haven — Wellness Home Brand",
  description:
    "Colvin Haven is the world's first wellness home brand — homes designed around restoration, not just residence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${cormorant.variable} ${fraunces.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
