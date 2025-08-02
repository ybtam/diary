import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [ '@repo/ui', '@repo/sdk'],
  output: 'standalone',
};

export default nextConfig;
