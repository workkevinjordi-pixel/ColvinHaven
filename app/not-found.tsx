import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ErrorPage from "@/components/ErrorPage";

export const metadata: Metadata = {
  title: "Colvin Haven — Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Navbar solid />
      <ErrorPage
        code="404"
        title="PAGE NOT FOUND"
        text="The page you’re looking for doesn’t exist, or has moved."
      >
        <Link href="/" className="error-page__link">
          Back to Discover <span aria-hidden="true">→</span>
        </Link>
        <Link href="/editions" className="error-page__link">
          See the editions <span aria-hidden="true">→</span>
        </Link>
      </ErrorPage>
    </>
  );
}
