import type { Metadata } from 'next'

const PAGE_PATH = '/about/'
const SITE_URL = 'https://limotech.ca'

const PAGE_TITLE = 'About Our Montreal Transportation Company'
// Deliberately limited to what the page substantiates: history, values,
// chauffeurs and coverage. No memberships, licensing, bonding, statistics
// or testimonial claims are repeated here.
const PAGE_DESCRIPTION =
  'LIMOTECH provides premium private transportation across Greater Montreal. Learn about our history, our values and the professional chauffeurs behind every ride.'

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

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
