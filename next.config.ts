import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Increase the image size limit for large PNGs
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Disable optimization for local images to avoid 413 errors
    unoptimized: false,
  },
  // Increase the body size limit for API routes
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
