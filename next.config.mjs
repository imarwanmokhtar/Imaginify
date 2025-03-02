/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
    ],
  },
  webpack: (config, { dev, isServer }) => {
    config.cache = false; // Disable Webpack cache
    if (!dev && !isServer) {
      config.optimization.minimize = true;
    }
    return config;
  },
};

export default nextConfig;
