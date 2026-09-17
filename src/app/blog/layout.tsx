import type { Metadata } from 'next'

const PAGE_PATH = '/blog/'
const SITE_URL = 'https://limotech.ca'

// The page is a single Montreal city guide — nightlife, restaurants,
// hotels and the airports serving the city. It carries no articles or
// posts, so the metadata describes a guide rather than an active blog.
const PAGE_TITLE = 'Montreal City Guide'
const PAGE_DESCRIPTION =
  'A guide to Montreal from the LIMOTECH chauffeur team — the city’s nightlife, restaurants, hotels and the airports that serve Greater Montreal.'

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

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
