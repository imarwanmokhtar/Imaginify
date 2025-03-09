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
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'google-site-verification',
            value: 'nlXoUekknA8avDb5j2o9THmz1XR-CZxz5LN4EysJa6s',
          },
        ],
      },
    ]
  }
};

export default nextConfig;
