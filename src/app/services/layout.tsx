import type { Metadata } from 'next'

const PAGE_PATH = '/services/'
const SITE_URL = 'https://limotech.ca'

const PAGE_TITLE = 'Montreal Transportation Services'
const PAGE_DESCRIPTION =
  'Private chauffeur transportation in Greater Montreal — airport transfers, corporate travel, special events, city tours, hourly service and direct transfers.'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: `${SITE_URL}${PAGE_PATH}`,
    siteName: 'LIMOTECH',
    title: `${PAGE_TITLE} | LIMOTECH`,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Downtown Montreal skyline',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PAGE_TITLE} | LIMOTECH`,
    description: PAGE_DESCRIPTION,
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
