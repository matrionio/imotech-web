import type { MetadataRoute } from 'next'

const SITE_URL = 'https://limotech.ca'

/**
 * Static sitemap for the public site.
 *
 * Paths carry a trailing slash to match `trailingSlash: true`, so the URLs
 * here are byte-identical to the canonicals each page declares.
 *
 * No `lastModified` and no `changeFrequency` are emitted: the build has no
 * trustworthy per-page modification data, and inventing either would be a
 * misleading signal. `priority` only expresses relative importance within
 * this site.
 *
 * `/404/` is intentionally excluded.
 */
const ROUTES: { path: string; priority: number }[] = [
  { path: '/', priority: 1.0 },
  { path: '/montreal-limo-service/', priority: 1.0 },
  { path: '/montreal-chauffeur-service/', priority: 1.0 },
  { path: '/services/', priority: 0.7 },
  { path: '/services/airport-transfers/', priority: 0.8 },
  { path: '/services/corporate-transportation/', priority: 0.8 },
  { path: '/services/special-events/', priority: 0.8 },
  { path: '/services/city-tours/', priority: 0.8 },
  { path: '/services/hourly-service/', priority: 0.8 },
  { path: '/services/point-to-point/', priority: 0.8 },
  { path: '/fleet/', priority: 0.7 },
  { path: '/about/', priority: 0.5 },
  { path: '/contact/', priority: 0.5 },
  { path: '/blog/', priority: 0.5 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    priority,
  }))
}
