import type {NextConfig} from 'next';

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
});

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    unoptimized: true,
    domains: ['http://localhost:3001'],
  },
};

module.exports = withPWA(nextConfig);
