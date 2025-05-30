/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'http', hostname: 'annbrand-shop.vercel.app' },
      { protocol: 'https', hostname: 'annbrand-shop.vercel.app' },
    ],
  },
}

module.exports = nextConfig
