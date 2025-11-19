import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@kolosys-sites/theme"],
  /* config options here */
  // cacheComponents disabled to allow data fetching in layouts
  // cacheComponents: true,
};

export default nextConfig;
