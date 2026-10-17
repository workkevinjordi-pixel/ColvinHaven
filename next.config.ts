import type { NextConfig } from "next";
import path from "path";

// Content-Security-Policy (production only: the dev server needs eval and
// websockets). Next.js and the JSON-LD block use inline scripts and React
// sets inline styles, so 'unsafe-inline' stays for script-src/style-src;
// everything else is locked to this site, Sanity's image CDN and (for the
// upcoming Google Analytics) Google's tag/collect hosts. No framing by other
// sites, no <base> or <object> tricks, forms only post back to this site.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  ...(process.env.NODE_ENV === "production"
    ? [{ key: "Content-Security-Policy", value: csp }]
    : []),
];

const nextConfig: NextConfig = {
  // Don't advertise the framework in an X-Powered-By header.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Lets a phone on the same Wi-Fi load the dev server's scripts (HMR and
  // hydration) when opening http://<laptop-ip>:3000 -- without it Next
  // answers 403 and the page renders as plain, non-interactive HTML.
  // Dev only; no effect on production builds.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*", "*.local"],
  // Pin the workspace root explicitly -- the parent directory has an
  // unrelated package-lock.json that would otherwise confuse Turbopack's
  // automatic root inference.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // Sanity-managed images (editions/publications content, served via
    // next/image through lib/sanity/image.ts's own urlFor()) now live
    // on Sanity's own asset CDN, not under public/assets/ like every
    // other image on the site.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
