import type { Metadata } from 'next'
import en from '@/translations/en'
import { COMPANY_INFO } from '@/utils/constants'

const PAGE_PATH = '/montreal-chauffeur-service/'
const SITE_URL = 'https://limotech.ca'
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`

const PAGE_TITLE = 'Montreal Chauffeur Service & Private Driver'
const PAGE_DESCRIPTION =
  'Private chauffeur service in Montreal. A professional chauffeur and a premium vehicle reserved in advance for business travel, airport transfers and evenings out.'

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
        url: '/images/marketing/montreal-chauffeur-service-hero-1920.jpg',
        width: 1920,
        height: 1080,
        alt: 'Downtown Montreal at dusk',
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
const cp = en.chauffeurPage

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Montreal Chauffeur Service',
      serviceType: 'Chauffeur Service',
      // States plainly that the vehicle is supplied by LIMOTECH, so the
      // markup cannot be read as chauffeur-only hire.
      description:
        'Private chauffeur service in Montreal. LIMOTECH provides both the professional chauffeur and the vehicle, reserved in advance.',
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
        name: 'Chauffeured Transportation',
        itemListElement: cp.services.items.map((item) => ({
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
      mainEntity: cp.faq.items.map((item) => ({
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
        { '@type': 'ListItem', position: 2, name: 'Montreal Chauffeur Service', item: PAGE_URL },
      ],
    },
  ],
}

export default function MontrealChauffeurServiceLayout({
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
