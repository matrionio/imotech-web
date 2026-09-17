import type { MetadataRoute } from 'next'

const SITE_URL = 'https://limotech.ca'

/**
 * robots.txt for the public site.
 *
 * Crawling is open. Only `/_next/static/chunks/` build internals would ever
 * be worth hiding, and blocking anything under `/_next/` risks stopping
 * crawlers fetching the CSS and JS they need to render the page, so nothing
 * is disallowed here.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
