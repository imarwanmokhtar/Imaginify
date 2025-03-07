export const metadata = {
  metadataBase: new URL('https://imaginifyy-one.vercel.app'),
  title: {
    default: 'Imaginify - AI Image Editor & Background Remover | Free Online Photo Editor',
    template: '%s | Imaginify - AI Image Editor'
  },
  description: 'Free AI image editor with background removal, object removal, and photo restoration. Transform your images with advanced AI tools. Generate, restore, recolor images instantly.',
  keywords: [
    // Primary Keywords
    'AI image editor',
    'AI background remover',
    'remove objects from images AI',
    'AI photo editor',
    
    // Secondary Keywords
    'generative fill AI free',
    'AI photo retouching online',
    'AI tool to restore old images',
    'free AI image enhancement',
    'online AI photo editor',
    
    // Long-tail Keywords
    'remove background from image AI free',
    'restore old photos with AI online',
    'AI image upscaling tool',
    'remove unwanted objects from photos AI',
    'AI photo colorization online',
    'free AI image generation tool',
    'professional photo editing AI',
    'AI image manipulation online',
    'automatic photo enhancement AI',
    'AI powered photo restoration'
  ],
  authors: [{ name: 'Imaginify' }],
  creator: 'Imaginify',
  publisher: 'Imaginify',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://imaginifyy-one.vercel.app',
    title: 'Imaginify - AI Image Editor & Background Remover | Free Online Photo Editor',
    description: 'Transform your photos with our free AI image editor. Remove backgrounds, restore old photos, and remove unwanted objects instantly using advanced AI technology.',
    siteName: 'Imaginify',
    images: [
      {
        url: '/social/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Imaginify - AI Image Editor and Background Remover'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Imaginify - AI Image Editor & Background Remover',
    description: 'Free AI tools to edit photos, remove backgrounds, restore old images, and remove objects. Transform your images with advanced AI technology.',
    images: [{
      url: '/social/twitter-image.png',
      width: 1200,
      height: 600,
      alt: 'Imaginify - AI Image Editor and Background Remover'
    }],
    creator: '@imaginify'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'VSHeaas9qmUD4xrlV2Reh3r2ASH5HagTAHkF4WKLdKA'
  },
  alternates: {
    canonical: 'https://imaginifyy-one.vercel.app',
    languages: {
      'en-US': '/en-US',
    },
  },
  other: {
    'google-site-verification': 'VSHeaas9qmUD4xrlV2Reh3r2ASH5HagTAHkF4WKLdKA',
    'msvalidate.01': 'your-bing-verification-code', // Add if you have Bing Webmaster Tools
  }
} 
