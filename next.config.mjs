/** @type {import('next').NextConfig} */

// Safely get the backend API URL from the environment or use default
const apiUrl = process.env.API_URL || 'http://ramspeed-laravel-api.test';

let apiHostname = 'ramspeed-laravel-api.test';
let apiProtocol = 'http';
let apiPort = '';

try {
  const parsedUrl = new URL(apiUrl);
  apiHostname = parsedUrl.hostname;
  apiProtocol = parsedUrl.protocol.replace(':', '');
  apiPort = parsedUrl.port;
} catch (e) {
  console.warn('Invalid API_URL in .env, falling back to default');
}

const nextConfig = {
  images: {
    unoptimized: true, // Fixes image issues for local/live similar to step-frontend
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
      {
        protocol: apiProtocol,
        hostname: apiHostname,
        port: apiPort,
        pathname: '/**',
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/backend-api/:path*',
        destination: `${apiUrl.replace(/\/+$/, '')}/:path*`,
      },
    ];
  },
};

export default nextConfig;
