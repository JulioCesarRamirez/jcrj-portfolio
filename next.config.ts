import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Overridable so the draft (dev) server can run beside a production build.
  distDir: process.env["NEXT_DIST_DIR"] ?? ".next",
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
