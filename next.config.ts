import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/trail_master',
  images: { unoptimized: true },
};

export default nextConfig;
