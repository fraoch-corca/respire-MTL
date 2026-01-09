import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Must match the protocol exactly
        hostname: 'images.pexels.com', // Must match the hostname exactly
        port: '', // Leave empty if no specific port is used
        pathname: '/photos/**', // Use glob pattern if paths vary, or a specific path
      },
    ],
  },
};

export default nextConfig;
