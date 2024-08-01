import { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_URL}/api/:path*`, // LaravelのAPIエンドポイント
      },
      {
        source: '/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*`, // Laravelのエンドポイント
      },
    ];
  },
};

export default nextConfig;
