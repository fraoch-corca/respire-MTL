import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

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
  logging: { 
    fetches: {
      fullUrl: true, // shows if fetched from cached data or fresh API hit
    }
  }
};

const withNextIntl = createNextIntlPlugin();

// So like wrapping all the config wih the nextIntlPlugin - not sure 
// how this works but this how it's setup
export default withNextIntl(nextConfig);
