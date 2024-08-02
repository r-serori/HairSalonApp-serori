/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/:path*`, // バックエンドのAPIエンドポイント
      },
      {
        source: '/webReq/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/webReq/:path*`, // バックエンドのAPIエンドポイント
      },
      {
        source: '/storage/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/:path*`, // バックエンドのAPIエンドポイント
      },
    ];
  },
};

module.exports = nextConfig;
