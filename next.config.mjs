/** @type {import('next').NextConfig} */
const nextConfig = {
  // We'll use standalone mode but with our custom postbuild script to fix issues
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
    // Add more stability for the build process
    serverActions: {
      bodySizeLimit: '2mb',
    }
  },
  // Set unoptimized to false for images since you need dynamic image optimization
  images: {
    unoptimized: false,
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
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  }
};

export default nextConfig;
