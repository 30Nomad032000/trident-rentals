/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'creatorapp.zohopublic.in',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
