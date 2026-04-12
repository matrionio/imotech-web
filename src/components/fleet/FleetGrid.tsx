'use client'

import { useState } from 'react'
import { VEHICLES } from '@/utils/constants'
import VehicleCard from '@/components/shared/VehicleCard'
import { useLanguage } from '@/context/LanguageContext'

export default function FleetGrid() {
  const [active, setActive] = useState('all')
  const { t } = useLanguage()

  const categories = [
    { key: 'all', label: t.fleetPage.filterAll },
    { key: 'Sedan', label: 'Sedan' },
    { key: 'SUV', label: 'SUV' },
    { key: 'Van', label: 'Van' },
    { key: 'Electric', label: t.fleetPage.filterElectric },
  ]

  const filtered = active === 'all' ? VEHICLES : VEHICLES.filter((v) => v.category === active)

  return (
    <>
      <div className="flex flex-wrap gap-3 justify-center mb-12" role="group" aria-label="Filter by vehicle category">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActive(cat.key)}
            aria-pressed={active === cat.key}
            className={`px-6 py-2 text-sm font-medium border transition-all duration-200 ${
              active === cat.key
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-textLight border-gray-200 hover:border-secondary hover:text-secondary'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((vehicle, index) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
        ))}
      </div>
    </>
  )
}
