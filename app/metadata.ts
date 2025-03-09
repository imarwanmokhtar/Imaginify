export const metadata = {
  metadataBase: new URL('https://imaginifyy-one.vercel.app'),
  title: {
    default: 'Imaginify - AI Image Editor | Remove, Restore & Recolor Photos',
    template: '%s | Imaginify - AI Photo Editor'
  },
  description: 'Use Imaginify, the best AI image editor, to remove objects, restore old photos, and change backgrounds effortlessly. Try our free AI tools today!',
  keywords: [
    'AI image editor',
    'remove objects from photos AI',
    'restore old photos AI',
    'free AI background remover',
    'how to remove objects from images using AI',
    'AI photo restoration',
    'AI object removal tool',
    'background removal AI',
    'photo enhancement AI',
    'AI photo editing online',
    'best AI image editor',
    'free AI photo editor'
  ],
  authors: [{ name: 'Imaginify' }],
  creator: 'Imaginify',
  publisher: 'Imaginify',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://imaginifyy-one.vercel.app',
    title: 'Imaginify - AI Image Editor | Remove, Restore & Recolor Photos',
    description: 'Use Imaginify, the best AI image editor, to remove objects, restore old photos, and change backgrounds effortlessly. Try our free AI tools today!',
    siteName: 'Imaginify',
    images: [
      {
        url: '/social/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Imaginify - AI Image Editor for Object Removal and Photo Restoration'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Imaginify - AI Image Editor | Remove, Restore & Recolor Photos',
    description: 'Use Imaginify, the best AI image editor, to remove objects, restore old photos, and change backgrounds effortlessly. Try our free AI tools today!',
    images: [{
      url: '/social/twitter-image.png',
      width: 1200,
      height: 600,
      alt: 'Imaginify - AI Image Editor for Object Removal and Photo Restoration'
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