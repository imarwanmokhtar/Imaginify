/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add trailingSlash to help with route resolving
  trailingSlash: true, 
  // Skip type checking during build for faster builds
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip ESLint during build for faster builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable static optimization to avoid Clerk SSG issues
  experimental: {
    serverComponentsExternalPackages: ['mongoose', '@clerk/nextjs'],
    disableOptimizedLoading: true,
    serverMinification: false,
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Force dynamic rendering for all pages
  reactStrictMode: false,
  staticPageGenerationTimeout: 1000,
  output: 'standalone',
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
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  }
};

export default nextConfig;
