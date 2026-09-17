import type { Metadata } from 'next'

const PAGE_PATH = '/contact/'
const SITE_URL = 'https://limotech.ca'

const PAGE_TITLE = 'Contact & Booking Requests'
const PAGE_DESCRIPTION =
  'Contact LIMOTECH for private chauffeur transportation in Greater Montreal. Send a booking request, call us or reach us by email — available 24/7.'

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

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
