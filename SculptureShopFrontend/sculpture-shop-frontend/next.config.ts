import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Allow SVG images from placeholder services
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
  // Allow dev origins for network access
  allowedDevOrigins: ["http://192.168.2.134:3000"],
};

export default nextConfig;
