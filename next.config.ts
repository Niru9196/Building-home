import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  distDir: process.env.NEXT_DIST_DIR || ".next",
  experimental: {
    // ~10 KB of CSS: inlining it removes the render-blocking stylesheet
    // request that Lighthouse flags on mobile.
    inlineCss: true,
  },
};

export default nextConfig;
