'use client'

import { useLanguage } from '@/context/LanguageContext'
import { SERVICES } from '@/utils/constants'
import SectionTitle from '@/components/shared/SectionTitle'
import ServiceCard from '@/components/shared/ServiceCard'
import CtaSection from '@/components/home/CtaSection'

// Services that have a dedicated landing page of their own.
const SERVICE_DETAIL_PAGES: Record<string, string> = {
  'airport-transfers': '/services/airport-transfers/',
  'corporate-transportation': '/services/corporate-transportation/',
  'special-events': '/services/special-events/',
  'city-tours': '/services/city-tours/',
  'hourly-service': '/services/hourly-service/',
  'point-to-point': '/services/point-to-point/',
}

export default function ServicesPage() {
  const { t } = useLanguage()

  return (
    <>
      <section className="bg-primary pt-32 pb-20 relative" aria-label="Services page hero">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-secondary text-sm font-semibold tracking-[0.2em] uppercase mb-4">{t.servicesPage.eyebrow}</p>
          <h1 className="text-5xl sm:text-6xl font-serif font-bold text-white mb-6">{t.servicesPage.hero}</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">{t.servicesPage.heroSub}</p>
        </div>
      </section>

      <section className="py-24 bg-accent" aria-labelledby="services-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle eyebrow={t.servicesPage.sectionEyebrow} title={t.servicesPage.sectionTitle} subtitle={t.servicesPage.sectionSubtitle} centered id="services-title" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                variant="detailed"
                index={index}
                detailHref={SERVICE_DETAIL_PAGES[service.id]}
              />
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
