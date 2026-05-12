import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   typescript: {
    // Completely ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
  reactCompiler: true,
   images: {
    remotePatterns: [
        {
        protocol: 'https',
        hostname: '**', // allow all (dev only)
      },
    ],
  },
};

export default nextConfig;
