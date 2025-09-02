/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: {
      // force Turbopack to treat *this folder* as root
      root: __dirname,
    },
  },

  // make sure output file tracing uses the client folder, not repo root
  outputFileTracingRoot: __dirname,

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.cloudfront.net' }
    ]
  }
};

export default nextConfig;
