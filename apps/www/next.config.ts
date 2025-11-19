import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  transpilePackages: ["@kolosys-sites/theme"],
  redirects: async () => [
    {
      source: '/join-discord',
      destination: 'https://discord.gg/ZcvJJjtNfx',
      permanent: true,
    },
    {
      source: '/docs',
      destination: process.env.NODE_ENV === 'development'
        ? 'http://localhost:3001'
        : 'https://docs.kolosys.com',
      permanent: false,
    },
    {
      source: '/docs/:path*',
      destination: process.env.NODE_ENV === 'development'
        ? 'http://localhost:3001/:path*'
        : 'https://docs.kolosys.com/:path*',
      permanent: false,
    },
  ],
  rewrites: async () => [
    {
      source: '/:pkg',
      destination: '/_go/:pkg',
      has: [
        {
          type: 'query',
          key: 'go-get',
          value: '1',
        },
      ],
    },
  ],
};

export default nextConfig;

