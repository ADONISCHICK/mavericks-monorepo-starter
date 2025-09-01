// client/next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: { root: __dirname },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
