/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'ramspeed-laravel-api.test',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ramspeed-laravel-api.test',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/backend-api/:path*',
        destination: 'http://ramspeed-laravel-api.test/:path*',
      },
    ];
  },
};

export default nextConfig;
