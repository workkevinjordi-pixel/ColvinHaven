import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the workspace root explicitly -- the parent directory has an
  // unrelated package-lock.json that would otherwise confuse Turbopack's
  // automatic root inference.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
