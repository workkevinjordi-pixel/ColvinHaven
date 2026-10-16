import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
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
