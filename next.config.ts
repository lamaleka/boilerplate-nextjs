import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  allowedDevOrigins: ["localhost"],
  async rewrites() {
    return [
      {
        source: `/api/:path*`,
        destination: `${process.env.API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
