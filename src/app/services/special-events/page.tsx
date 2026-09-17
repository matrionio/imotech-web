'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  UserCheck,
  Car,
  Users,
  Clock,
  Heart,
  Sparkles,
  Music,
  Utensils,
  Briefcase,
  ArrowRight,
  LucideIcon,
} from 'lucide-react'
import { COMPANY_INFO, VEHICLES } from '@/utils/constants'
import SectionTitle from '@/components/shared/SectionTitle'
import VehicleCard from '@/components/shared/VehicleCard'
import ContactForm from '@/components/shared/ContactForm'
import CtaSection from '@/components/home/CtaSection'
import Button from '@/components/ui/Button'
import { useLanguage } from '@/context/LanguageContext'

const BENEFIT_ICONS: LucideIcon[] = [UserCheck, Car, Users, Clock]
const OCCASION_ICONS: LucideIcon[] = [Heart, Sparkles, Music, Utensils, Briefcase, Users]

// The index of the corporate events occasion, which cross-links to the
// dedicated corporate transportation page.
const CORPORATE_OCCASION_INDEX = 4

// A spread across the existing fleet: an intimate arrival for two or three,
// premium SUVs, and a van that keeps a larger party together.
const EVENT_VEHICLE_IDS = [
  'mercedes-s-class',
  'cadillac-lyriq',
  'cadillac-vistiq',
  'cadillac-escalade',
  'lincoln-navigator',
  'mercedes-sprinter',
]

export default function SpecialEventsPage() {
  const { t } = useLanguage()
  const ep = t.eventsPage

  const eventVehicles = EVENT_VEHICLE_IDS.map(
    (id) => VEHICLES.find((v) => v.id === id)
  ).filter((v): v is (typeof VEHICLES)[number] => Boolean(v))

  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-20 overflow-hidden" aria-label="Special events hero">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
          style={{ backgroundImage: "url('/images/fleet/Cadillac.png')" }}
          role="presentation"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/85" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-secondary text-sm font-semibold tracking-[0.2em] uppercase mb-4">{ep.hero.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
            {ep.hero.title}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">{ep.hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#book"><Button variant="primary" size="lg">{ep.hero.bookRide}</Button></a>
            <a href={`tel:${COMPANY_INFO.phone}`}><Button variant="outline" size="lg">{ep.hero.callUs}</Button></a>
          </div>
        </div>
      </section>

      {/* Why LIMOTECH for events — centered cards */}
      <section className="py-24 bg-accent" aria-labelledby="events-benefits-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={ep.benefits.eyebrow}
              title={ep.benefits.title}
              subtitle={ep.benefits.subtitle}
              centered
              id="events-benefits-title"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ep.benefits.items.map((item, index) => {
              const Icon = BENEFIT_ICONS[index] ?? UserCheck
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white border border-gray-100 p-8 text-center hover:border-secondary transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary mx-auto mb-5 flex items-center justify-center">
                    <Icon size={20} className="text-secondary" />
                  </div>
                  <h3 className="text-text font-serif font-bold text-lg mb-3">{item.title}</h3>
                  <p className="text-textLight text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Occasions — gold-topped cards */}
      <section className="py-24 bg-white" aria-labelledby="events-occasions-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={ep.occasions.eyebrow}
              title={ep.occasions.title}
              subtitle={ep.occasions.subtitle}
              centered
              id="events-occasions-title"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ep.occasions.items.map((item, index) => {
              const Icon = OCCASION_ICONS[index] ?? Sparkles
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="bg-accent border-t-2 border-secondary p-8 group shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Icon size={22} className="text-secondary flex-shrink-0" />
                    <h3 className="text-text font-serif font-bold text-lg">{item.title}</h3>
                  </div>
                  <p className="text-textLight text-sm leading-relaxed">{item.description}</p>
                  {index === CORPORATE_OCCASION_INDEX && (
                    <Link
                      href="/services/corporate-transportation/"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-gold transition-colors duration-200"
                    >
                      {ep.occasions.corporateLinkLabel}
                      <ArrowRight size={14} />
                    </Link>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works — dark band */}
      <section className="py-24 bg-primary relative" aria-labelledby="events-how-it-works-title">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={ep.howItWorks.eyebrow}
              title={ep.howItWorks.title}
              subtitle={ep.howItWorks.subtitle}
              centered
              light
              id="events-how-it-works-title"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ep.howItWorks.steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center border border-secondary/40">
                  <span className="text-secondary font-serif font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="text-white font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="py-24 bg-white" aria-labelledby="events-fleet-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={ep.fleet.eyebrow}
              title={ep.fleet.title}
              subtitle={ep.fleet.subtitle}
              centered
              id="events-fleet-title"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventVehicles.map((vehicle, index) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/fleet"><Button variant="outline" size="lg">{ep.fleet.viewAll}</Button></Link>
          </div>
        </div>
      </section>

      {/* Service areas — inline flow with gold separators */}
      <section className="py-24 bg-accent" aria-labelledby="events-areas-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <SectionTitle
              eyebrow={ep.areas.eyebrow}
              title={ep.areas.title}
              subtitle={ep.areas.subtitle}
              centered
              id="events-areas-title"
            />
          </div>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 max-w-3xl mx-auto">
            {t.footer.serviceAreasList.map((area, index) => (
              <li key={area} className="flex items-center gap-5 text-text">
                {index > 0 && <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-secondary flex-shrink-0" />}
                <span>{area}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center text-textLight text-sm max-w-2xl mx-auto">{ep.areas.note}</p>
        </div>
      </section>

      {/* FAQ — divided list */}
      <section className="py-24 bg-white" aria-labelledby="events-faq-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={ep.faq.eyebrow}
              title={ep.faq.title}
              subtitle={ep.faq.subtitle}
              centered
              id="events-faq-title"
            />
          </div>
          <div className="max-w-3xl mx-auto border-t border-gray-100">
            {ep.faq.items.map((item, index) => (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="border-b border-gray-100 py-7"
              >
                <h3 className="font-serif font-bold text-text text-lg mb-2 flex items-start gap-3">
                  <span aria-hidden="true" className="mt-2.5 w-1.5 h-1.5 rotate-45 bg-secondary flex-shrink-0" />
                  {item.question}
                </h3>
                <p className="text-textLight text-sm leading-relaxed pl-[18px]">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — booking form */}
      <section id="book" className="py-24 bg-accent scroll-mt-20" aria-labelledby="events-book-title">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <SectionTitle
              eyebrow={ep.finalCta.eyebrow}
              title={ep.finalCta.title}
              subtitle={ep.finalCta.subtitle}
              centered
              id="events-book-title"
            />
          </div>
          <div className="bg-white border border-gray-100 p-8 sm:p-10 shadow-sm">
            <ContactForm defaultService="special-events" />
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
