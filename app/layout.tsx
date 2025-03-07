import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { metadata as siteMetadata } from './metadata'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Metadata } from 'next'
import Script from 'next/script'
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        
        {/* Base Google Tag Manager */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>

        {/* Authentication & User Flow Tracking */}
        <Script id="auth-tracking" strategy="afterInteractive">
          {`
            window.trackAuth = {
              signUpStarted: () => {
                gtag('event', 'sign_up_started', {
                  'event_category': 'Authentication',
                  'event_label': 'Sign Up Initiated'
                });
              },
              signUpCompleted: (method) => {
                gtag('event', 'sign_up_completed', {
                  'event_category': 'Authentication',
                  'event_label': 'Sign Up Success',
                  'method': method
                });
              },
              loginAttempt: () => {
                gtag('event', 'login_attempt', {
                  'event_category': 'Authentication',
                  'event_label': 'Login Initiated'
                });
              },
              loginSuccess: (method) => {
                gtag('event', 'login_success', {
                  'event_category': 'Authentication',
                  'event_label': 'Login Success',
                  'method': method
                });
              },
              logout: () => {
                gtag('event', 'logout', {
                  'event_category': 'Authentication',
                  'event_label': 'User Logged Out'
                });
              }
            };
          `}
        </Script>

        {/* Image Upload & Editing Tracking */}
        <Script id="image-tracking" strategy="afterInteractive">
          {`
            window.trackImage = {
              uploaded: (imageSize, imageType) => {
                gtag('event', 'image_uploaded', {
                  'event_category': 'Image',
                  'event_label': 'Image Upload',
                  'image_size': imageSize,
                  'image_type': imageType
                });
              },
              editSelected: (editType) => {
                gtag('event', 'edit_selected', {
                  'event_category': 'Image',
                  'event_label': 'Edit Type Selected',
                  'edit_type': editType
                });
              },
              editApplied: (editType, processingTime) => {
                gtag('event', 'edit_applied', {
                  'event_category': 'Image',
                  'event_label': 'Edit Applied',
                  'edit_type': editType,
                  'processing_time': processingTime
                });
              },
              downloaded: (editType) => {
                gtag('event', 'image_downloaded', {
                  'event_category': 'Image',
                  'event_label': 'Image Download',
                  'edit_type': editType
                });
              }
            };
          `}
        </Script>

        {/* User Engagement Tracking */}
        <Script id="engagement-tracking" strategy="afterInteractive">
          {`
            let sessionStartTime = Date.now();
            let featuresUsed = new Set();

            window.trackEngagement = {
              timeSpent: () => {
                const timeSpent = Math.floor((Date.now() - sessionStartTime) / 1000);
                gtag('event', 'time_spent', {
                  'event_category': 'Engagement',
                  'event_label': 'Editor Time',
                  'time_seconds': timeSpent
                });
              },
              featureUsed: (featureName) => {
                featuresUsed.add(featureName);
                gtag('event', 'feature_used', {
                  'event_category': 'Engagement',
                  'event_label': 'Feature Usage',
                  'feature': featureName,
                  'features_count': featuresUsed.size
                });
              },
              multipleEdits: () => {
                gtag('event', 'multiple_edits', {
                  'event_category': 'Engagement',
                  'event_label': 'Multiple Edits',
                  'edit_count': featuresUsed.size
                });
              }
            };
          `}
        </Script>

        {/* Payment & Subscription Tracking */}
        <Script id="payment-tracking" strategy="afterInteractive">
          {`
            window.trackPayment = {
              pricingViewed: () => {
                gtag('event', 'pricing_viewed', {
                  'event_category': 'Payment',
                  'event_label': 'Pricing Page View'
                });
              },
              subscriptionAttempted: (plan) => {
                gtag('event', 'subscription_attempted', {
                  'event_category': 'Payment',
                  'event_label': 'Subscription Attempt',
                  'plan': plan
                });
              },
              subscriptionCompleted: (plan, amount) => {
                gtag('event', 'subscription_completed', {
                  'event_category': 'Payment',
                  'event_label': 'Subscription Success',
                  'plan': plan,
                  'amount': amount
                });
              },
              subscriptionCanceled: (plan, reason) => {
                gtag('event', 'subscription_canceled', {
                  'event_category': 'Payment',
                  'event_label': 'Subscription Canceled',
                  'plan': plan,
                  'reason': reason
                });
              }
            };
          `}
        </Script>

        {/* Retention & User Behavior Tracking */}
        <Script id="retention-tracking" strategy="afterInteractive">
          {`
            window.trackRetention = {
              returningUser: (daysSinceLastVisit) => {
                gtag('event', 'returning_user', {
                  'event_category': 'Retention',
                  'event_label': 'User Return',
                  'days_since_last': daysSinceLastVisit
                });
              },
              inactiveUser: (daysInactive) => {
                gtag('event', 'inactive_user', {
                  'event_category': 'Retention',
                  'event_label': 'Churn Risk',
                  'days_inactive': daysInactive
                });
              },
              referralShared: (referralMethod) => {
                gtag('event', 'referral_shared', {
                  'event_category': 'Retention',
                  'event_label': 'Referral',
                  'method': referralMethod
                });
              },
              feedbackSubmitted: (rating, type) => {
                gtag('event', 'feedback_submitted', {
                  'event_category': 'Retention',
                  'event_label': 'User Feedback',
                  'rating': rating,
                  'feedback_type': type
                });
              }
            };
          `}
        </Script>

        {/* Error Tracking */}
        <Script id="error-tracking" strategy="afterInteractive">
          {`
            window.trackError = {
              uploadFailed: (error, fileType) => {
                gtag('event', 'upload_failed', {
                  'event_category': 'Error',
                  'event_label': 'Upload Error',
                  'error_message': error,
                  'file_type': fileType
                });
              },
              editFailed: (error, editType) => {
                gtag('event', 'edit_failed', {
                  'event_category': 'Error',
                  'event_label': 'Edit Error',
                  'error_message': error,
                  'edit_type': editType
                });
              },
              paymentFailed: (error, plan) => {
                gtag('event', 'payment_failed', {
                  'event_category': 'Error',
                  'event_label': 'Payment Error',
                  'error_message': error,
                  'plan': plan
                });
              }
            };
          `}
        </Script>

        {/* Marketing & Growth Tracking */}
        <Script id="marketing-tracking" strategy="afterInteractive">
          {`
            window.trackMarketing = {
              ctaClicked: (ctaText, location) => {
                gtag('event', 'cta_clicked', {
                  'event_category': 'Marketing',
                  'event_label': 'CTA Click',
                  'cta_text': ctaText,
                  'location': location
                });
              },
              campaignSource: (source, medium, campaign) => {
                gtag('event', 'campaign_tracked', {
                  'event_category': 'Marketing',
                  'event_label': 'Campaign Source',
                  'source': source,
                  'medium': medium,
                  'campaign': campaign
                });
              }
            };
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ClerkProvider>
          {children}
        </ClerkProvider>
        <SpeedInsights />
        
        {/* Structured Data for Rich Results */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Imaginify",
              "applicationCategory": "Image Editor",
              "description": "AI-powered image editor for transforming and enhancing images with advanced features like background removal, restoration, and generation.",
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
            })
          }}
        />
      </body>
    </html>
  )
}
