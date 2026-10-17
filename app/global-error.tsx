"use client";

/**
 * Last-resort error page: replaces the whole root layout, so it carries its
 * own <html>/<body> and styles (globals.css is not loaded here). Same look
 * as the other error pages, in Georgia/system type since the site fonts are
 * not available at this point.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100svh",
          background: "#f0ebe3",
          color: "#1d190f",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif",
          fontWeight: 300,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 clamp(28px, 8vw, 112px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <p
          style={{
            margin: "0 0 24px",
            fontSize: 12,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(29,25,15,0.6)",
          }}
        >
          Error 500
        </p>
        <h1
          style={{
            margin: "0 0 28px",
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 400,
            fontSize: "clamp(32px, 5vw, 72px)",
            letterSpacing: "0.06em",
            lineHeight: 1.1,
          }}
        >
          SOMETHING WENT WRONG
        </h1>
        <p
          style={{
            margin: "0 0 40px",
            maxWidth: 480,
            fontSize: 16,
            lineHeight: "28px",
            letterSpacing: "0.04em",
            color: "rgba(29,25,15,0.7)",
          }}
        >
          We couldn’t load this page. Please try again in a moment.
        </p>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={reset}
            style={{
              background: "none",
              border: 0,
              padding: 0,
              font: "italic 300 16px/1 inherit",
              fontFamily: "inherit",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            Try again →
          </button>
          {/* A plain <a>: the router may be what failed. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            style={{
              fontStyle: "italic",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Back to Discover →
          </a>
        </div>
        {error.digest && (
          <p
            style={{
              margin: "40px 0 0",
              fontSize: 12,
              color: "rgba(29,25,15,0.45)",
            }}
          >
            Reference: {error.digest}
          </p>
        )}
        <p
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "-0.02em",
            bottom: "-0.18em",
            margin: 0,
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 300,
            fontSize: "clamp(160px, 32vw, 460px)",
            lineHeight: 1,
            color: "rgba(199,169,95,0.18)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          500
        </p>
      </body>
    </html>
  );
}
