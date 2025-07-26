import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [ '@repo/ui', '@repo/sdk'],
};

export default nextConfig;
