'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  MapPin,
  UserCheck,
  Flag,
  Home,
  Hotel,
  Building2,
  Briefcase,
  Utensils,
  Sparkles,
  ArrowRight,
  ChevronRight,
  LucideIcon,
} from 'lucide-react'
import { COMPANY_INFO, VEHICLES } from '@/utils/constants'
import SectionTitle from '@/components/shared/SectionTitle'
import VehicleCard from '@/components/shared/VehicleCard'
import ContactForm from '@/components/shared/ContactForm'
import CtaSection from '@/components/home/CtaSection'
import Button from '@/components/ui/Button'
import { useLanguage } from '@/context/LanguageContext'

const CONCEPT_ICONS: LucideIcon[] = [MapPin, UserCheck, Flag]
const USE_CASE_ICONS: LucideIcon[] = [Home, Hotel, Building2, Briefcase, Utensils, Sparkles]

// The other two booking shapes a visitor might actually need, in the same
// order as the comparison copy. `null` marks this page.
const COMPARISON_LINKS: (string | null)[] = [
  null,
  '/services/hourly-service/',
  '/services/airport-transfers/',
]

// A balanced spread: sedans for private travel, SUVs for a family, and a
// van for a larger party.
const P2P_VEHICLE_IDS = [
  'mercedes-s-class',
  'cadillac-vistiq',
  'lincoln-nautilus',
  'cadillac-escalade',
  'lincoln-navigator',
  'mercedes-sprinter',
]

export default function PointToPointPage() {
  const { t } = useLanguage()
  const pp = t.pointToPointPage

  const p2pVehicles = P2P_VEHICLE_IDS.map(
    (id) => VEHICLES.find((v) => v.id === id)
  ).filter((v): v is (typeof VEHICLES)[number] => Boolean(v))

  return (
    <>
      {/* Hero — typographic, with an origin/destination motif */}
      <section className="bg-primary pt-32 pb-20 relative" aria-label="Point-to-point hero">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-secondary text-sm font-semibold tracking-[0.2em] uppercase mb-4">{pp.hero.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
            {pp.hero.title}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">{pp.hero.subtitle}</p>

          {/* Pickup ——— Destination */}
          <div className="flex items-center justify-center gap-4 mb-10 text-xs font-semibold tracking-[0.15em] uppercase">
            <span className="flex items-center gap-2 text-white">
              <span aria-hidden="true" className="w-2 h-2 rounded-full bg-secondary" />
              {pp.hero.routeFrom}
            </span>
            <span aria-hidden="true" className="w-12 sm:w-24 h-px bg-secondary/50" />
            <span className="flex items-center gap-2 text-white">
              <span aria-hidden="true" className="w-2 h-2 rotate-45 bg-secondary" />
              {pp.hero.routeTo}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#book"><Button variant="primary" size="lg">{pp.hero.bookRide}</Button></a>
            <a href={`tel:${COMPANY_INFO.phone}`}><Button variant="outline" size="lg">{pp.hero.callUs}</Button></a>
          </div>
        </div>
      </section>

      {/* The service — three steps with chevrons */}
      <section className="py-24 bg-white" aria-labelledby="p2p-concept-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <SectionTitle
              eyebrow={pp.concept.eyebrow}
              title={pp.concept.title}
              subtitle={pp.concept.subtitle}
              centered
              id="p2p-concept-title"
            />
          </div>
          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 lg:gap-0">
            {pp.concept.items.map((item, index) => {
              const Icon = CONCEPT_ICONS[index] ?? MapPin
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="flex items-center gap-6 lg:gap-0 flex-1"
                >
                  <div className="flex-1 text-center lg:px-8">
                    <div className="w-16 h-16 mx-auto mb-5 rounded-full border border-secondary/40 flex items-center justify-center">
                      <Icon size={22} className="text-secondary" />
                    </div>
                    <h3 className="text-text font-serif font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-textLight text-sm leading-relaxed">{item.description}</p>
                  </div>
                  {index < pp.concept.items.length - 1 && (
                    <ChevronRight
                      aria-hidden="true"
                      size={22}
                      className="hidden lg:block text-secondary/50 flex-shrink-0 self-start mt-5"
                    />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Use cases — round-icon cards */}
      <section className="py-24 bg-accent" aria-labelledby="p2p-use-cases-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={pp.useCases.eyebrow}
              title={pp.useCases.title}
              subtitle={pp.useCases.subtitle}
              centered
              id="p2p-use-cases-title"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pp.useCases.items.map((item, index) => {
              const Icon = USE_CASE_ICONS[index] ?? MapPin
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  className="bg-white border border-gray-100 p-7 flex items-start gap-5 hover:border-secondary transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-full bg-primary flex items-center justify-center">
                    <Icon size={18} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-text font-serif font-bold text-base mb-2">{item.title}</h3>
                    <p className="text-textLight text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Which option fits — dark comparison */}
      <section className="py-24 bg-primary relative" aria-labelledby="p2p-comparison-title">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={pp.comparison.eyebrow}
              title={pp.comparison.title}
              subtitle={pp.comparison.subtitle}
              centered
              light
              id="p2p-comparison-title"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pp.comparison.items.map((item, index) => {
              const href = COMPARISON_LINKS[index]
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`p-8 border transition-all duration-300 ${
                    href === null
                      ? 'border-secondary bg-secondary/[0.07]'
                      : 'border-secondary/20 hover:border-secondary'
                  }`}
                >
                  <h3 className="text-white font-serif font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">{item.description}</p>
                  {href === null ? (
                    <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-secondary">
                      {pp.comparison.currentLabel}
                    </span>
                  ) : (
                    <Link
                      href={href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-gold transition-colors duration-200"
                    >
                      {pp.comparison.linkLabel}
                      <ArrowRight size={14} />
                    </Link>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How to book — ghosted numerals */}
      <section className="py-24 bg-white" aria-labelledby="p2p-how-it-works-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={pp.howItWorks.eyebrow}
              title={pp.howItWorks.title}
              subtitle={pp.howItWorks.subtitle}
              centered
              id="p2p-how-it-works-title"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {pp.howItWorks.steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span aria-hidden="true" className="block font-serif font-bold text-5xl text-secondary/25 leading-none mb-3">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-serif font-bold text-text mb-2">{step.title}</h3>
                <p className="text-textLight text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="py-24 bg-accent" aria-labelledby="p2p-fleet-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={pp.fleet.eyebrow}
              title={pp.fleet.title}
              subtitle={pp.fleet.subtitle}
              centered
              id="p2p-fleet-title"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {p2pVehicles.map((vehicle, index) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/fleet"><Button variant="outline" size="lg">{pp.fleet.viewAll}</Button></Link>
          </div>
        </div>
      </section>

      {/* Service areas — left-ruled columns */}
      <section className="py-24 bg-white" aria-labelledby="p2p-areas-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <SectionTitle
              eyebrow={pp.areas.eyebrow}
              title={pp.areas.title}
              subtitle={pp.areas.subtitle}
              centered
              id="p2p-areas-title"
            />
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-5 gap-x-6 max-w-5xl mx-auto">
            {t.footer.serviceAreasList.map((area) => (
              <li key={area} className="border-l border-gray-200 pl-4 text-sm text-text">
                {area}
              </li>
            ))}
          </ul>
          <p className="mt-12 text-center text-textLight text-sm max-w-2xl mx-auto">{pp.areas.note}</p>
        </div>
      </section>

      {/* FAQ — gold-underlined cards */}
      <section className="py-24 bg-accent" aria-labelledby="p2p-faq-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={pp.faq.eyebrow}
              title={pp.faq.title}
              subtitle={pp.faq.subtitle}
              centered
              id="p2p-faq-title"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pp.faq.items.map((item, index) => (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white border-b-2 border-secondary/40 p-7"
              >
                <h3 className="font-serif font-bold text-text text-lg mb-2">{item.question}</h3>
                <p className="text-textLight text-sm leading-relaxed">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — booking form */}
      <section id="book" className="py-24 bg-white scroll-mt-20" aria-labelledby="p2p-book-title">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <SectionTitle
              eyebrow={pp.finalCta.eyebrow}
              title={pp.finalCta.title}
              subtitle={pp.finalCta.subtitle}
              centered
              id="p2p-book-title"
            />
          </div>
          <div className="bg-accent border border-gray-100 p-8 sm:p-10">
            <ContactForm defaultService="point-to-point" />
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
