/** @type {import('next').NextConfig} */

export default {
  reactStrictMode: true,
  transpilePackages: ["@kolosys-sites/ui", "@kolosys-sites/config"],
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};
