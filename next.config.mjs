import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Ensure standalone mode for Vercel
  reactStrictMode: true,
  swcMinify: true,
  compress: true, // Enable gzip compression
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
      },
    ],
  },
  webpack: (config, { dev, isServer }) => {
    // Disable filesystem caching to prevent corrupt cache issues on Vercel
    config.cache = false;

    // Enable compression for smaller bundle size
    if (!dev && !isServer) {
      config.optimization.minimize = true;
    }

    return config;
  },
};

export default nextConfig;
