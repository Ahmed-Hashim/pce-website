import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 75, 80],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pce-consultants.b-cdn.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
  cacheComponents: true,
};

export default nextConfig;
