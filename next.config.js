/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb'
    },
    serverComponentsExternalPackages: ['pdf-parse', 'mammoth']
  }
};

module.exports = nextConfig;

