/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.pixabay.com' },
    ],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920, 2560, 3840],
  },
};
module.exports = nextConfig;
