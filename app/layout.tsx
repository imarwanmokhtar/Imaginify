import './globals.css'
import { metadata as siteMetadata } from './metadata'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import Script from 'next/script'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { WebVitals } from '@/components/analytics/WebVitals'
import AuthProvider from '@/components/auth/AuthProvider'

// Optimize font loading
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
})

export const metadata: Metadata = {
  ...siteMetadata,
  title: 'Imaginifyy - AI Image Editor',
  description: 'Transform your photos effortlessly with AI-driven tools',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  manifest: '/manifest.json',
  verification: {
    google: 'nlXoUekknA8avDb5j2o9THmz1XR-CZxz5LN4EysJa6s',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://imaginifyy-one.vercel.app/#website",
        "name": "Imaginify",
        "description": "AI-powered image editor for transforming and enhancing images with advanced features like background removal, restoration, and generation.",
        "applicationCategory": "Image Editor",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "AI Image Generation",
          "Background Removal",
          "Image Restoration",
          "Image Recoloring",
          "Object Removal"
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://imaginifyy-one.vercel.app/#organization",
        "name": "Imaginify",
        "url": "https://imaginifyy-one.vercel.app",
        "logo": {
          "@type": "ImageObject",
          "url": "https://imaginifyy-one.vercel.app/assets/images/logo.png"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://imaginifyy-one.vercel.app/#website",
        "url": "https://imaginifyy-one.vercel.app",
        "name": "Imaginify - AI Image Editor",
        "publisher": {
          "@id": "https://imaginifyy-one.vercel.app/#organization"
        }
      }
    ]
  }

  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script-new"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PJVHRGGF');`
          }}
        />
        {/* End Google Tag Manager */}

        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/assets/images/logo.png"
          as="image"
          type="image/png"
        />
        
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="google-site-verification" content="nlXoUekknA8avDb5j2o9THmz1XR-CZxz5LN4EysJa6s" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        
        {/* Cache control headers */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PJVHRGGF"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <AuthProvider>
          {children}
          <SpeedInsights />
          <Analytics mode="auto" />
          <WebVitals />
        </AuthProvider>
        
        {/* Enhanced Schema Markup */}
        <Script
          id="schema-markup"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </body>
    </html>
  )
}
