'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Plane, Briefcase, Sparkles, Map, Clock, MapPin, LucideIcon } from 'lucide-react'
import { Service } from '@/types'
import Button from '@/components/ui/Button'
import { useLanguage } from '@/context/LanguageContext'

const iconMap: Record<string, LucideIcon> = { Plane, Briefcase, Sparkles, Map, Clock, MapPin }

interface ServiceCardProps {
  service: Service
  variant?: 'default' | 'detailed'
  index?: number
  /** When set, the card also links to a dedicated page for this service. */
  detailHref?: string
}

export default function ServiceCard({ service, variant = 'default', index = 0, detailHref }: ServiceCardProps) {
  const { t } = useLanguage()
  const Icon = iconMap[service.icon] ?? MapPin

  const serviceKey = service.id.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) as keyof typeof t.services
  const translated = t.services[serviceKey] ?? { title: service.title, description: service.description, benefits: service.benefits }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="bg-white border border-gray-100 p-8 group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-center w-14 h-14 bg-primary mb-6 group-hover:bg-secondary transition-colors duration-300">
        <Icon size={24} className="text-secondary group-hover:text-primary transition-colors duration-300" />
      </div>
      <h3 className="text-xl font-serif font-bold text-text mb-3">{translated.title}</h3>
      <p className="text-textLight text-sm leading-relaxed mb-4">{translated.description}</p>
      {variant === 'detailed' && (
        <ul className="space-y-2 mb-6">
          {translated.benefits.map((benefit: string) => (
            <li key={benefit} className="flex items-center gap-2 text-sm text-textLight">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
              {benefit}
            </li>
          ))}
        </ul>
      )}
      {detailHref ? (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link href={`/contact?service=${encodeURIComponent(service.id)}`}>
            <Button variant="outline" size="sm">{t.servicesPreview.bookNow}</Button>
          </Link>
          <Link
            href={detailHref}
            className="text-sm font-semibold text-secondary hover:text-gold transition-colors duration-200"
          >
            {t.servicesPreview.learnMore}
          </Link>
        </div>
      ) : (
        <Link href={`/contact?service=${encodeURIComponent(service.id)}`}>
          <Button variant="outline" size="sm">{t.servicesPreview.bookNow}</Button>
        </Link>
      )}
    </motion.div>
  )
}
