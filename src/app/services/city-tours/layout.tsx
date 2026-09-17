import type { Metadata } from 'next'
import en from '@/translations/en'
import { COMPANY_INFO } from '@/utils/constants'

const PAGE_PATH = '/services/city-tours/'
const SITE_URL = 'https://limotech.ca'
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`

const PAGE_TITLE = 'Montreal Sightseeing & City Tour Transportation'
const PAGE_DESCRIPTION =
  'Private chauffeur transportation for sightseeing in Montreal. You choose the stops and the pace, we handle the driving. Sedans, SUVs and vans. Available 24/7.'

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
        url: '/images/hero-bg2.jpg',
        alt: 'Montreal city skyline at night',
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

// The FAQ and use-case copy are read from the English translations so the
// structured data can never drift from the text rendered on the page.
const ct = en.cityToursPage

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: PAGE_TITLE,
      // LIMOTECH provides private chauffeured transportation, not guided
      // tours — the service type is named accordingly.
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
        name: 'Sightseeing Transportation',
        itemListElement: ct.useCases.items.map((item) => ({
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
        serviceUrl: `${SITE_URL}/contact/`,
        servicePhone: COMPANY_INFO.phone,
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: ct.faq.items.map((item) => ({
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
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services/` },
        { '@type': 'ListItem', position: 3, name: 'City Tours & Sightseeing', item: PAGE_URL },
      ],
    },
  ],
}

export default function CityToursLayout({
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
