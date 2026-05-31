import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Parent folder may have its own package-lock.json; Turbopack must treat this directory as the app root
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3010',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;