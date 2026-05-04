/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // RandomUser.me (realistic avatars)
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      // ThisPersonDoesNotExist (AI faces)
      {
        protocol: "https",
        hostname: "thispersondoesnotexist.com",
      },
      // Generated Photos (AI human faces)
      {
        protocol: "https",
        hostname: "faces.generated.photos",
      },
      {
        protocol: "https",
        hostname: "api.generated.photos",
      },
      // Unsplash (real portraits)
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Pexels (real humans via API)
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      // Pixabay
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
      // UI Avatars (text initials)
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      // RoboHash (fun robot avatars)
      {
        protocol: "https",
        hostname: "robohash.org",
      },
      // DiceBear (cartoon avatars)
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
      // Adorable Avatars (legacy)
      {
        protocol: "https",
        hostname: "api.adorable.io",
      },
      // Gravatar (email-based avatars)
      {
        protocol: "https",
        hostname: "www.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "*", // allow any hostname (all domains)
        // port: '',       // optional
        // pathname: '/**' // optional: allow any path
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

module.exports = nextConfig;
