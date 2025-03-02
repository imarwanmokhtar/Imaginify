/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: ''
      }
    ]
  },
  webpack: (config, { dev, isServer }) => {
    // Enable filesystem caching
    config.cache = {
      type: 'filesystem',
      buildDependencies: {
        config: []
      },
      cacheDirectory: '.next/cache',
      maxAge: 31536000000 // 1 year in milliseconds
    }

    // Enable compression
    if (!dev && !isServer) {
      config.optimization.minimize = true
    }

    return config
  },
  // Enable gzip compression
  compress: true,
  // Increase build performance
  swcMinify: true,
  // Reduce bundle size
  reactStrictMode: true
};

export default nextConfig;
