import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  experimental: {
    serverComponentsExternalPackages: [],
    serverActions: true
  },
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
    config.cache = false;
    
    if (!dev && !isServer) {
      config.optimization.minimize = true;
    }
    
    return config;
  },
  env: {
    NEXT_RUNTIME: "nodejs"
  }
};

export default nextConfig;