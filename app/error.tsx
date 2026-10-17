"use client";

import Link from "next/link";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import ErrorPage from "@/components/ErrorPage";

/**
 * Shown when a page throws while rendering (a 500). Sits inside the root
 * layout, so the navbar stays; `reset` re-renders the segment.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Navbar solid />
      <ErrorPage
        code="500"
        title="SOMETHING WENT WRONG"
        text="We couldn’t load this page. Please try again in a moment."
        reference={error.digest}
      >
        <button type="button" className="error-page__link" onClick={reset}>
          Try again <span aria-hidden="true">→</span>
        </button>
        <Link href="/" className="error-page__link">
          Back to Discover <span aria-hidden="true">→</span>
        </Link>
      </ErrorPage>
    </>
  );
}
