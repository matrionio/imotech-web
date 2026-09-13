import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import ScrollToTop from '@/components/shared/ScrollToTop'
import { LanguageProvider } from '@/context/LanguageContext'

export const metadata: Metadata = {
  metadataBase: new URL('https://limotech.ca'),
  title: {
    default: 'LIMOTECH | Luxury Transportation Services',
    template: '%s | LIMOTECH',
  },
  description:
    'Premium luxury limousine and transportation services in Montreal. Airport transfers, corporate travel, special events, and more. Available 24/7.',
  keywords: [
    'limousine Montreal',
    'luxury transportation Montreal',
    'airport transfers Montreal',
    'corporate transportation Quebec',
    'limo service Montreal',
    'chauffeur service Montreal',
    'LIMOTECH',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://limotech.ca',
    siteName: 'LIMOTECH',
    title: 'LIMOTECH | Luxury Transportation Services',
    description:
      'Premium luxury limousine and transportation services in Montreal. Available 24/7.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LIMOTECH Luxury Transportation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LIMOTECH | Luxury Transportation Services',
    description: 'Premium luxury limousine and transportation services in Montreal.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

// Safely serializes JSON for embedding in <script> tags by escaping
// characters that could break out of the HTML script context.
function safeJsonLd(obj: object): string {
  return JSON.stringify(obj)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/'/g, '\\u0027')
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'LIMOTECH',
              description: 'Luxury Transportation Services — Montreal',
              legalName: '15820715 Canada Inc.',
              url: 'https://limotech.ca',
              email: 'info@limotech.ca',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Montreal',
                addressRegion: 'QC',
                addressCountry: 'CA',
              },
              openingHours: 'Mo-Su 00:00-23:59',
              priceRange: '$$$$',
            }),
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  )
}
