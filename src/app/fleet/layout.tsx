import type { Metadata } from 'next'

const PAGE_PATH = '/fleet/'
const SITE_URL = 'https://limotech.ca'

const PAGE_TITLE = 'Our Luxury Fleet in Montreal'
const PAGE_DESCRIPTION =
  'Explore the LIMOTECH fleet — executive sedans, premium SUVs, electric vehicles and a twelve-passenger van, with passenger and luggage capacity listed for each.'

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

export default function FleetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
