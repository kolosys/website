import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@kolosys-sites/theme"],
  // cacheComponents disabled to allow data fetching in layouts
  // cacheComponents: true,

  // Performance optimizations
  experimental: {
    optimizePackageImports: ["react-markdown", "remark-gfm", "shiki"],
  },

  // Compress output
  compress: true,

  // Optimize images if used
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
