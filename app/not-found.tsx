import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Colvin Haven — Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Navbar solid />
      <main className="not-found">
        <p className="not-found__eyebrow">404</p>
        <h1 className="not-found__heading">PAGE NOT FOUND</h1>
        <p className="not-found__text">
          The page you&rsquo;re looking for doesn&rsquo;t exist, or has moved.
        </p>
        <a href="/" className="not-found__link">
          Back to Discover <span aria-hidden="true">→</span>
        </a>
      </main>
      <Footer />
    </>
  );
}
