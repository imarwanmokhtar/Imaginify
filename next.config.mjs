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
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['cloudinary', 'graphql-request']
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
