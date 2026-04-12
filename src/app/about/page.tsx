'use client'

import { CheckCircle, Award, MapPin } from 'lucide-react'
import { COMPANY_INFO } from '@/utils/constants'
import SectionTitle from '@/components/shared/SectionTitle'
import CtaSection from '@/components/home/CtaSection'
import { useLanguage } from '@/context/LanguageContext'

export default function AboutPage() {
  const { t } = useLanguage()
  const ab = t.aboutPage

  const values = [ab.values.excellence, ab.values.integrity, ab.values.discretion, ab.values.punctuality]

  return (
    <>
      <section className="bg-primary pt-32 pb-20 relative" aria-label="About page hero">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-6">{ab.hero}</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">{ab.heroSub}</p>
        </div>
      </section>

      <section className="py-24 bg-white" aria-labelledby="history-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle eyebrow={`Est. ${COMPANY_INFO.established}`} title={ab.historyTitle} id="history-title" />
              <div className="mt-8 space-y-4 text-textLight leading-relaxed">
                <p>{ab.p1}</p>
                <p>{ab.p2}</p>
                <p>{ab.p3}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: `${new Date().getFullYear() - COMPANY_INFO.established}+`, label: ab.statsYears },
                { value: '5,000+', label: ab.statsClients },
                { value: '15+', label: ab.statsVehicles },
                { value: '100%', label: ab.statsOnTime },
              ].map((stat) => (
                <div key={stat.label} className="bg-accent p-8 text-center border-b-2 border-secondary">
                  <p className="text-4xl font-serif font-bold text-secondary">{stat.value}</p>
                  <p className="text-textLight text-sm mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary" aria-labelledby="values-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionTitle eyebrow={ab.valuesEyebrow} title={ab.valuesTitle} subtitle={ab.valuesSub} centered light id="values-title" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="border border-gray-700 p-8 hover:border-secondary transition-colors duration-300">
                <h3 className="text-secondary font-serif font-bold text-lg mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white" aria-labelledby="chauffeurs-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle eyebrow={ab.chauffeursEyebrow} title={ab.chauffeursTitle} id="chauffeurs-title" />
              <p className="mt-6 text-textLight leading-relaxed">{ab.chauffeursText}</p>
              <ul className="mt-8 space-y-3">
                {ab.chauffeursItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-textLight">
                    <CheckCircle size={16} className="text-secondary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-accent p-10">
              <div className="flex items-center gap-4 mb-6">
                <Award size={32} className="text-secondary" />
                <h3 className="text-xl font-serif font-bold text-text">{ab.certTitle}</h3>
              </div>
              <ul className="space-y-4">
                {ab.certItems.map((cert) => (
                  <li key={cert} className="flex items-center gap-3 text-sm text-textLight border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                    <CheckCircle size={14} className="text-secondary flex-shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-accent" aria-labelledby="areas-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionTitle eyebrow={ab.areasEyebrow} title={ab.areasTitle} subtitle={ab.areasSub} centered id="areas-title" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {t.footer.serviceAreasList.map((area) => (
              <div key={area} className="flex items-center gap-2 bg-white p-4 shadow-sm">
                <MapPin size={14} className="text-secondary flex-shrink-0" />
                <span className="text-sm text-textLight">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
