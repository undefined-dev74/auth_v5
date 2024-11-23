/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/**"],
  output:"standalone"
};

module.exports = nextConfig
