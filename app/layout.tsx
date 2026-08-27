import type { Metadata } from "next";
import { Roboto, Roboto_Serif } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

const robotoSerif = Roboto_Serif({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-roboto-serif",
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
    <html lang="en" className={`${roboto.variable} ${robotoSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
