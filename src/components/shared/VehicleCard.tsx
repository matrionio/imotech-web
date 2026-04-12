'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Users, Luggage, Wifi } from 'lucide-react'
import { Vehicle } from '@/types'
import Button from '@/components/ui/Button'
import { useLanguage } from '@/context/LanguageContext'

interface VehicleCardProps {
  vehicle: Vehicle
  index?: number
}

export default function VehicleCard({ vehicle, index = 0 }: VehicleCardProps) {
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white border border-gray-100 group overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-56 bg-gray-900 overflow-hidden">
        <Image src={vehicle.images[0]} alt={`${vehicle.name} - Luxury ${vehicle.category}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute top-4 right-4 bg-secondary text-primary text-xs font-bold px-3 py-1 tracking-wider uppercase">{vehicle.category}</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-serif font-bold text-text mb-1">{vehicle.name}</h3>
        <p className="text-textLight text-sm mb-4">{vehicle.model}</p>
        <div className="flex items-center gap-6 mb-4 py-4 border-y border-gray-100">
          <div className="flex items-center gap-2 text-sm text-textLight">
            <Users size={16} className="text-secondary" />
            <span>{vehicle.capacity} {t.fleetPage.passengers}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-textLight">
            <Luggage size={16} className="text-secondary" />
            <span>{vehicle.luggage} {t.fleetPage.luggage}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-textLight">
            <Wifi size={16} className="text-secondary" />
            <span>WiFi</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {vehicle.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="text-xs bg-accent text-textLight px-2 py-1">{amenity}</span>
          ))}
          {vehicle.amenities.length > 3 && (
            <span className="text-xs bg-accent text-textLight px-2 py-1">+{vehicle.amenities.length - 3} more</span>
          )}
        </div>
        <Link href={`/contact?vehicle=${encodeURIComponent(vehicle.name)}`}>
          <Button variant="primary" fullWidth>{t.fleetPage.bookVehicle}</Button>
        </Link>
      </div>
    </motion.div>
  )
}
