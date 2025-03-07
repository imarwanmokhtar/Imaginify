import './globals.css'
import { metadata as siteMetadata } from './metadata'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import Script from 'next/script'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { GTM_ID } from './lib/gtm'
import { WebVitals } from '@/components/analytics/WebVitals'
import dynamic from 'next/dynamic'

// Dynamic import of AuthProvider
const AuthProvider = dynamic(() => import('@/components/auth/AuthProvider').then(mod => mod.AuthProvider), {
  ssr: true,
  loading: () => <div className="min-h-screen bg-gray-50" />
})

// Optimize font loading
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
})

export const metadata: Metadata = {
  ...siteMetadata,
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  manifest: '/manifest.json',
  verification: {
    google: 'lHcCG87SVAV7ctEoeANEF9x_GMjS1Yxew6bL4UjcDWQ',
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
        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/assets/images/logo.png"
          as="image"
          type="image/png"
        />
        
        {/* Optimized Analytics Loading */}
        <Script
          id="gtm-script"
          strategy="worker"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              // Initialize GTM with minimal config
              (function(w,d,s,l,i){
                w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],j=d.createElement(s);
                j.async=true;j.defer=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');

              // Initialize GA4 with minimal config
              gtag('js', new Date());
              gtag('config', 'G-XHP7HNYM2R', {
                page_path: window.location.pathname,
                transport_type: 'beacon',
                send_page_view: true
              });
            `,
          }}
        />

        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="google-site-verification" content="lHcCG87SVAV7ctEoeANEF9x_GMjS1Yxew6bL4UjcDWQ" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        
        {/* Cache control headers */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
      </head>
      <body className={inter.className}>
        {/* GTM NoScript */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

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
