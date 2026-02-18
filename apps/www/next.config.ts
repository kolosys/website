import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@kolosys-sites/theme"],
  typedRoutes: false,
  experimental: {
    webpackMemoryOptimizations: true,
    turbopackFileSystemCacheForDev: true,
    optimizePackageImports: [
      'next-mdx-remote-client',
      'shiki',
      '@kolosys-sites/hub-client',
      '@kolosys-sites/theme',
    ],
  },
  redirects: async () => [
    {
      source: "/join-discord",
      destination: "https://discord.gg/ZcvJJjtNfx",
      permanent: true,
    },
  ],
};

export default nextConfig;
