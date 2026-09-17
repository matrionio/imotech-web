'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Car,
  MapPin,
  CalendarClock,
  Timer,
  Briefcase,
  ListChecks,
  ShoppingBag,
  Utensils,
  Sparkles,
  Moon,
  Clock,
  LucideIcon,
} from 'lucide-react'
import { COMPANY_INFO, VEHICLES } from '@/utils/constants'
import SectionTitle from '@/components/shared/SectionTitle'
import VehicleCard from '@/components/shared/VehicleCard'
import ContactForm from '@/components/shared/ContactForm'
import CtaSection from '@/components/home/CtaSection'
import Button from '@/components/ui/Button'
import { useLanguage } from '@/context/LanguageContext'

const FLEX_ICONS: LucideIcon[] = [Car, MapPin, CalendarClock, Timer]
const USE_CASE_ICONS: LucideIcon[] = [Briefcase, ListChecks, ShoppingBag, Utensils, Sparkles, Moon]

// A mix across the existing fleet: executive sedans, an electric SUV, a
// full-size SUV and a van for larger groups.
const HOURLY_VEHICLE_IDS = [
  'mercedes-s-class',
  'lincoln-aviator',
  'cadillac-xt6',
  'cadillac-escalade-iq',
  'lincoln-navigator',
  'mercedes-sprinter',
]

export default function HourlyServicePage() {
  const { t } = useLanguage()
  const hp = t.hourlyPage

  const hourlyVehicles = HOURLY_VEHICLE_IDS.map(
    (id) => VEHICLES.find((v) => v.id === id)
  ).filter((v): v is (typeof VEHICLES)[number] => Boolean(v))

  return (
    <>
      {/* Hero — the site's established plain sub-page treatment */}
      <section className="bg-primary pt-32 pb-20 relative" aria-label="Hourly service hero">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-secondary text-sm font-semibold tracking-[0.2em] uppercase mb-4">{hp.hero.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
            {hp.hero.title}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-6">{hp.hero.subtitle}</p>
          <p className="inline-flex items-center gap-2 text-secondary text-sm font-semibold border border-secondary/40 px-5 py-2.5 mb-10">
            <Clock size={15} />
            {hp.hero.minimumNote}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#book"><Button variant="primary" size="lg">{hp.hero.bookRide}</Button></a>
            <a href={`tel:${COMPANY_INFO.phone}`}><Button variant="outline" size="lg">{hp.hero.callUs}</Button></a>
          </div>
        </div>
      </section>

      {/* Flexibility — connected timeline */}
      <section className="py-24 bg-white" aria-labelledby="hourly-flex-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <SectionTitle
              eyebrow={hp.flexibility.eyebrow}
              title={hp.flexibility.title}
              subtitle={hp.flexibility.subtitle}
              centered
              id="hourly-flex-title"
            />
          </div>
          <div className="relative">
            {/* The continuous rule the markers sit on (large screens only) */}
            <div aria-hidden="true" className="hidden lg:block absolute left-0 right-0 top-[11px] h-px bg-secondary/25" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
              {hp.flexibility.items.map((item, index) => {
                const Icon = FLEX_ICONS[index] ?? Car
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative lg:pr-6"
                  >
                    <div className="relative z-10 w-6 h-6 rotate-45 bg-white border-2 border-secondary mb-6" />
                    <Icon size={20} className="text-secondary mb-3" />
                    <h3 className="text-text font-serif font-bold text-base mb-2">{item.title}</h3>
                    <p className="text-textLight text-sm leading-relaxed">{item.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Use cases — dark bordered grid */}
      <section className="py-24 bg-primary relative" aria-labelledby="hourly-use-cases-title">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={hp.useCases.eyebrow}
              title={hp.useCases.title}
              subtitle={hp.useCases.subtitle}
              centered
              light
              id="hourly-use-cases-title"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hp.useCases.items.map((item, index) => {
              const Icon = USE_CASE_ICONS[index] ?? Briefcase
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  className="border border-secondary/20 p-7 hover:border-secondary hover:bg-white/[0.03] transition-all duration-300"
                >
                  <Icon size={20} className="text-secondary mb-4" />
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works — vertical stepped list */}
      <section className="py-24 bg-white" aria-labelledby="hourly-how-it-works-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={hp.howItWorks.eyebrow}
              title={hp.howItWorks.title}
              subtitle={hp.howItWorks.subtitle}
              centered
              id="hourly-how-it-works-title"
            />
          </div>
          <div className="max-w-3xl mx-auto divide-y divide-gray-100 border-t border-b border-gray-100">
            {hp.howItWorks.steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex gap-6 py-8"
              >
                <div className="flex-shrink-0 w-12 h-12 border border-secondary/40 flex items-center justify-center">
                  <span className="text-secondary font-serif font-bold text-lg">{index + 1}</span>
                </div>
                <div className="pt-1">
                  <h3 className="text-lg font-serif font-bold text-text mb-2">{step.title}</h3>
                  <p className="text-textLight text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="py-24 bg-accent" aria-labelledby="hourly-fleet-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={hp.fleet.eyebrow}
              title={hp.fleet.title}
              subtitle={hp.fleet.subtitle}
              centered
              id="hourly-fleet-title"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hourlyVehicles.map((vehicle, index) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/fleet"><Button variant="outline" size="lg">{hp.fleet.viewAll}</Button></Link>
          </div>
        </div>
      </section>

      {/* Service areas — top-ruled tiles */}
      <section className="py-24 bg-white" aria-labelledby="hourly-areas-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <SectionTitle
              eyebrow={hp.areas.eyebrow}
              title={hp.areas.title}
              subtitle={hp.areas.subtitle}
              centered
              id="hourly-areas-title"
            />
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {t.footer.serviceAreasList.map((area) => (
              <li key={area} className="border-t-2 border-secondary/40 pt-4 text-sm text-text">
                {area}
              </li>
            ))}
          </ul>
          <p className="mt-12 text-center text-textLight text-sm max-w-2xl mx-auto">{hp.areas.note}</p>
        </div>
      </section>

      {/* FAQ — two-column editorial */}
      <section className="py-24 bg-accent" aria-labelledby="hourly-faq-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={hp.faq.eyebrow}
              title={hp.faq.title}
              subtitle={hp.faq.subtitle}
              centered
              id="hourly-faq-title"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-10">
            {hp.faq.items.map((item, index) => (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="border-t border-gray-200 pt-6"
              >
                <h3 className="font-serif font-bold text-text text-lg mb-2">{item.question}</h3>
                <p className="text-textLight text-sm leading-relaxed">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — booking form */}
      <section id="book" className="py-24 bg-white scroll-mt-20" aria-labelledby="hourly-book-title">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <SectionTitle
              eyebrow={hp.finalCta.eyebrow}
              title={hp.finalCta.title}
              subtitle={hp.finalCta.subtitle}
              centered
              id="hourly-book-title"
            />
          </div>
          <div className="bg-accent border border-gray-100 p-8 sm:p-10">
            <ContactForm defaultService="hourly-service" />
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
