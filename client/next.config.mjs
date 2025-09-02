// client/next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow external product/hero images
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "**.onrender.com" },   // if your API ever serves images
      { protocol: "https", hostname: "**.vercel.app" },     // if you host images on the app
      { protocol: "https", hostname: "**.cloudfront.net" }, // optional CDN
    ],
  },
  experimental: {
    turbopack: { root: __dirname },
  },
};
export default nextConfig;
