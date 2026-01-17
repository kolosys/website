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
    // {
    //   source: "/docs",
    //   destination:
    //     process.env.NODE_ENV === "development"
    //       ? "http://localhost:3001"
    //       : "https://docs.kolosys.com",
    //   permanent: false,
    // },
    // {
    //   source: "/docs/:path*",
    //   destination:
    //     process.env.NODE_ENV === "development"
    //       ? "http://localhost:3001/:path*"
    //       : "https://docs.kolosys.com/:path*",
    //   permanent: false,
    // },
  ],
};

export default nextConfig;
