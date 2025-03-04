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
    serverComponentsExternalPackages: ['cloudinary', 'graphql-request'],
    missingSuspenseWithCSRError: false
  },
  typescript: {
    ignoreBuildErrors: true
  },
  async redirects() {
    return [
      {
        source: '/transformations',
        destination: '/transformations/add/restore',
        permanent: false,
      },
      {
        source: '/profile',
        destination: '/profile/billing',
        permanent: false,
      }
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*/_rsc/:params*',
          destination: '/:path*/:params*'
        }
      ]
    };
  }
};

export default nextConfig;
