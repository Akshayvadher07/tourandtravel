import path from "path";
 import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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