'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { VEHICLES } from '@/utils/constants'
import SectionTitle from '@/components/shared/SectionTitle'
import VehicleCard from '@/components/shared/VehicleCard'
import { useLanguage } from '@/context/LanguageContext'

export default function FleetPreview() {
  const { t } = useLanguage()
  const featuredVehicles = VEHICLES.slice(0, 3)

  return (
    <section className="py-24 bg-white" aria-labelledby="fleet-preview-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <SectionTitle eyebrow={t.fleetPreview.eyebrow} title={t.fleetPreview.title} subtitle={t.fleetPreview.subtitle} id="fleet-preview-title" />
          <Link href="/fleet" className="flex items-center gap-2 text-secondary font-semibold text-sm tracking-wider uppercase hover:gap-4 transition-all duration-200 whitespace-nowrap">
            {t.fleetPreview.viewAll}
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredVehicles.map((vehicle, index) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
