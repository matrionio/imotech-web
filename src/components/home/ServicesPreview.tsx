'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SERVICES } from '@/utils/constants'
import SectionTitle from '@/components/shared/SectionTitle'
import ServiceCard from '@/components/shared/ServiceCard'
import { useLanguage } from '@/context/LanguageContext'

export default function ServicesPreview() {
  const { t } = useLanguage()
  const previewServices = SERVICES.slice(0, 4)

  return (
    <section className="py-24 bg-accent" aria-labelledby="services-preview-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <SectionTitle eyebrow={t.servicesPreview.eyebrow} title={t.servicesPreview.title} subtitle={t.servicesPreview.subtitle} id="services-preview-title" />
          <Link href="/services" className="flex items-center gap-2 text-secondary font-semibold text-sm tracking-wider uppercase hover:gap-4 transition-all duration-200 whitespace-nowrap">
            {t.servicesPreview.viewAll}
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
