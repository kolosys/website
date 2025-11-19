/** @type {import('next').NextConfig} */

export default {
  reactStrictMode: true,
  transpilePackages: ["@kolosys-sites/theme"],
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};
