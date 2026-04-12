'use client'

import { useLanguage } from '@/context/LanguageContext'
import SectionTitle from '@/components/shared/SectionTitle'
import FleetGrid from '@/components/fleet/FleetGrid'
import CtaSection from '@/components/home/CtaSection'

export default function FleetPage() {
  const { t } = useLanguage()

  return (
    <>
      <section className="bg-primary pt-32 pb-20 relative" aria-label="Fleet page hero">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-secondary text-sm font-semibold tracking-[0.2em] uppercase mb-4">{t.fleetPage.eyebrow}</p>
          <h1 className="text-5xl sm:text-6xl font-serif font-bold text-white mb-6">{t.fleetPage.hero}</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">{t.fleetPage.heroSub}</p>
        </div>
      </section>

      <section className="py-24 bg-white" aria-labelledby="fleet-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle eyebrow={t.fleetPage.sectionEyebrow} title={t.fleetPage.sectionTitle} subtitle={t.fleetPage.sectionSubtitle} centered id="fleet-title" />
          </div>
          <FleetGrid />
        </div>
      </section>

      <section className="py-16 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: t.fleetPage.amenities.wifi, value: t.fleetPage.amenities.allVehicles },
              { label: t.fleetPage.amenities.water, value: t.fleetPage.amenities.alwaysIncluded },
              { label: t.fleetPage.amenities.climate, value: t.fleetPage.amenities.fullControl },
              { label: t.fleetPage.amenities.charging, value: t.fleetPage.amenities.usbWireless },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-secondary font-semibold text-lg">{item.value}</p>
                <p className="text-textLight text-sm mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
