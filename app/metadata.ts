export const metadata = {
  metadataBase: new URL('https://imaginifyy-one.vercel.app'),
  title: {
    default: 'Imaginify - AI-Powered Image Editor & Generator',
    template: '%s | Imaginify'
  },
  description: 'Transform your images with AI-powered editing tools. Generate, restore, recolor, and remove backgrounds instantly with our advanced AI image editor.',
  keywords: [
    'AI image editor',
    'image generation',
    'background removal',
    'image restoration',
    'AI photo editing',
    'image transformation',
    'AI art generator',
    'photo enhancement',
    'image manipulation',
    'AI imaging tools'
  ],
  authors: [{ name: 'Imaginify' }],
  creator: 'Imaginify',
  publisher: 'Imaginify',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://imaginifyy-one.vercel.app',
    title: 'Imaginify - AI-Powered Image Editor & Generator',
    description: 'Transform your images with AI-powered editing tools. Generate, restore, recolor, and remove backgrounds instantly.',
    siteName: 'Imaginify',
    images: [
      {
        url: '/social/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Imaginify - AI Image Editor'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Imaginify - AI-Powered Image Editor & Generator',
    description: 'Transform your images with AI-powered editing tools. Generate, restore, recolor, and remove backgrounds instantly.',
    images: [{
      url: '/social/twitter-image.png',
      width: 1200,
      height: 600,
      alt: 'Imaginify - AI Image Editor'
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
  }
} 