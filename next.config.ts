import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pce-consultants.b-cdn.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  cacheComponents:true,
};

export default nextConfig;
