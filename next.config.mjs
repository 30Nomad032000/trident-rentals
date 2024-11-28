/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'creatorapp.zohopublic.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
