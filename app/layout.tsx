import type { Metadata } from "next";
import { Roboto, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SplashScreen from "@/components/SplashScreen";

const roboto = Roboto({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-roboto",
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

export const metadata: Metadata = {
  title: "Colvin Haven — Wellness Architecture & Design",
  description: "Wellness architecture and design studio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${cormorant.variable}`}>
      <body>
        {/* Without JS the timed dismiss never runs, so keep the overlay
            from permanently covering the site. */}
        <noscript>
          <style>{`.splash{display:none!important}`}</style>
        </noscript>
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
