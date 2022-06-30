/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/public-api/:path*",
        destination: `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
