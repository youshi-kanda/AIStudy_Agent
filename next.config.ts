import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // Removed to allow dynamic API routes via next-on-pages
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
