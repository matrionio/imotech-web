'use client'

import { motion } from 'framer-motion'
import { UserCheck, Car, Clock, DollarSign, Shield, Star, LucideIcon } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'
import { useLanguage } from '@/context/LanguageContext'

const iconMap: Record<string, LucideIcon> = { UserCheck, Car, Clock, DollarSign, Shield, Star }
const iconKeys = ['UserCheck', 'Car', 'Clock', 'DollarSign', 'Shield', 'Star']

export default function WhyChooseUs() {
  const { t } = useLanguage()

  const items = [
    t.whyUs.items.chauffeurs,
    t.whyUs.items.fleet,
    t.whyUs.items.availability,
    t.whyUs.items.rates,
    t.whyUs.items.insured,
    t.whyUs.items.experience,
  ]

  return (
    <section className="py-24 bg-primary" aria-labelledby="why-choose-us-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <SectionTitle eyebrow={t.whyUs.eyebrow} title={t.whyUs.title} subtitle={t.whyUs.subtitle} centered light id="why-choose-us-title" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => {
            const Icon = iconMap[iconKeys[index]] ?? Star
            return (
              <motion.div key={item.title} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: index * 0.1 }} className="flex gap-5 group">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-secondary/40 group-hover:border-secondary group-hover:bg-secondary/10 transition-all duration-300">
                  <Icon size={20} className="text-secondary" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
