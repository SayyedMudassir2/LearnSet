import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/.inngest/:path*",
        destination: "http://localhost:8288/:path*",
      },
    ];
  },
};

export default nextConfig;
