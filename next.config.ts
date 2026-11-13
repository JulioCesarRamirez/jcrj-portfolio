import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Overridable so the draft (dev) server can run beside a production build.
  distDir: process.env["NEXT_DIST_DIR"] ?? ".next",
  // Without this, `next dev` returns 403 and a blank page when opened as 127.0.0.1 instead of localhost.
  allowedDevOrigins: ["127.0.0.1"],
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
