/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'creatorapp.zoho.in',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
