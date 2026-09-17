import type { Metadata } from 'next'
import en from '@/translations/en'
import { COMPANY_INFO } from '@/utils/constants'

const PAGE_PATH = '/montreal-limo-service/'
const SITE_URL = 'https://limotech.ca'
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`

const PAGE_TITLE = 'Montreal Limo Service & Private Chauffeur'
const PAGE_DESCRIPTION =
  'Premium limo and private chauffeur service in Montreal. Luxury sedans, SUVs and vans with professional chauffeurs. Reserved in advance, available 24/7.'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: PAGE_URL,
    siteName: 'LIMOTECH',
    title: `${PAGE_TITLE} | LIMOTECH`,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: '/images/marketing/montreal-limo-service-hero-1920.jpg',
        width: 1920,
        height: 1080,
        alt: 'Downtown Montreal skyline at golden hour',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PAGE_TITLE} | LIMOTECH`,
    description: PAGE_DESCRIPTION,
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

// Copy is read from the English translations so the structured data can
// never drift from the text rendered on the page.
const lp = en.limoPage

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Montreal Limo Service',
      // Describes what is actually offered: chauffeured transportation in
      // the verified fleet. No stretch-limousine vehicle type is implied.
      serviceType: 'Private Chauffeur Transportation',
      description: PAGE_DESCRIPTION,
      url: PAGE_URL,
      provider: {
        '@type': 'LocalBusiness',
        name: COMPANY_INFO.name,
        legalName: COMPANY_INFO.legalName,
        url: SITE_URL,
        telephone: COMPANY_INFO.phone,
        email: COMPANY_INFO.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: '975 Roméo-Vachon Blvd N',
          addressLocality: 'Dorval',
          addressRegion: 'QC',
          postalCode: 'H4Y 1H1',
          addressCountry: 'CA',
        },
        openingHours: 'Mo-Su 00:00-23:59',
        priceRange: '$$$$',
      },
      areaServed: en.footer.serviceAreasList.map((area) => ({
        '@type': 'Place',
        name: area,
      })),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Montreal Chauffeured Transportation',
        itemListElement: lp.needs.items.map((item) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: item.title,
            description: item.description,
          },
        })),
      },
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: PAGE_URL,
        servicePhone: COMPANY_INFO.phone,
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: lp.faq.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Montreal Limo Service', item: PAGE_URL },
      ],
    },
  ],
}

export default function MontrealLimoServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(structuredData) }}
      />
      {children}
    </>
  )
}
