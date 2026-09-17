'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  UserCheck,
  Car,
  Clock,
  CalendarCheck,
  Plane,
  Briefcase,
  Sparkles,
  Timer,
  MapPin,
  Map,
  ShieldCheck,
  FileText,
  ArrowRight,
  LucideIcon,
} from 'lucide-react'
import { COMPANY_INFO, VEHICLES } from '@/utils/constants'
import SectionTitle from '@/components/shared/SectionTitle'
import VehicleCard from '@/components/shared/VehicleCard'
import ContactForm from '@/components/shared/ContactForm'
import StickyCtaBar from '@/components/shared/StickyCtaBar'
import Button from '@/components/ui/Button'
import { useLanguage } from '@/context/LanguageContext'

const TRUST_ICONS: LucideIcon[] = [UserCheck, Car, Clock, CalendarCheck]
const MEANING_ICONS: LucideIcon[] = [UserCheck, Car, CalendarCheck]
const WHY_ICONS: LucideIcon[] = [UserCheck, ShieldCheck, Clock, FileText]
const NEEDS_ICONS: LucideIcon[] = [Plane, Briefcase, Sparkles, Timer, MapPin, Map]

// Self-selection paths, in the same order as the `needs` copy.
const NEEDS_LINKS = [
  '/services/airport-transfers/',
  '/services/corporate-transportation/',
  '/services/special-events/',
  '/services/hourly-service/',
  '/services/point-to-point/',
  '/services/city-tours/',
]

// Vehicles spanning the range a limo-service enquiry might need.
const LIMO_VEHICLE_IDS = [
  'mercedes-s-class',
  'cadillac-escalade',
  'lincoln-navigator',
  'mercedes-sprinter',
  'cadillac-lyriq',
  'cadillac-xt6',
]

export default function MontrealLimoServicePage() {
  const { t } = useLanguage()
  const lp = t.limoPage

  const limoVehicles = LIMO_VEHICLE_IDS.map(
    (id) => VEHICLES.find((v) => v.id === id)
  ).filter((v): v is (typeof VEHICLES)[number] => Boolean(v))

  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-20 overflow-hidden" aria-label="Montreal limo service hero">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="/images/marketing/montreal-limo-service-hero-900.jpg"
          />
          <img
            src="/images/marketing/montreal-limo-service-hero-1920.jpg"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </picture>
        {/* Vertical: anchors the header, headline and CTAs while letting the
            skyline band through the middle of the frame. */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-black/80" />
        {/* Horizontal: eases off toward the right so more of the city reads. */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/15 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-secondary text-sm font-semibold tracking-[0.2em] uppercase mb-4">{lp.hero.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
            {lp.hero.title}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">{lp.hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#book"><Button variant="primary" size="lg">{lp.hero.bookRide}</Button></a>
            <a href={`tel:${COMPANY_INFO.phone}`}><Button variant="outline" size="lg">{lp.hero.callNow}</Button></a>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-accent border-b border-gray-200" aria-label="Service highlights">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 py-8">
            {lp.trust.items.map((item, index) => {
              const Icon = TRUST_ICONS[index] ?? UserCheck
              return (
                <li key={item} className="flex items-center gap-3">
                  <Icon size={18} className="text-secondary flex-shrink-0" aria-hidden="true" />
                  <span className="text-text text-sm font-medium leading-snug">{item}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* What limo service means here */}
      <section className="py-24 bg-white" aria-labelledby="limo-meaning-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <SectionTitle
              eyebrow={lp.meaning.eyebrow}
              title={lp.meaning.title}
              subtitle={lp.meaning.subtitle}
              centered
              id="limo-meaning-title"
            />
            <p className="mt-8 text-textLight leading-relaxed">{lp.meaning.body}</p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {lp.meaning.items.map((item, index) => {
              const Icon = MEANING_ICONS[index] ?? UserCheck
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-accent p-8 border-t-2 border-secondary"
                >
                  <Icon size={22} className="text-secondary mb-4" aria-hidden="true" />
                  <h3 className="text-text font-serif font-bold text-lg mb-3">{item.title}</h3>
                  <p className="text-textLight text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="py-24 bg-accent" aria-labelledby="limo-fleet-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={lp.fleet.eyebrow}
              title={lp.fleet.title}
              subtitle={lp.fleet.subtitle}
              centered
              id="limo-fleet-title"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {limoVehicles.map((vehicle, index) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/fleet"><Button variant="outline" size="lg">{lp.fleet.viewAll}</Button></Link>
          </div>
        </div>
      </section>

      {/* Mid-page conversion band */}
      <section className="py-20 bg-primary relative" aria-labelledby="limo-mid-cta-title">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="limo-mid-cta-title" className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
            {lp.midCta.title}
          </h2>
          <p className="text-gray-300 mb-8">{lp.midCta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#book"><Button variant="primary" size="lg">{lp.midCta.bookRide}</Button></a>
            <a href={`tel:${COMPANY_INFO.phone}`}><Button variant="outline" size="lg">{lp.midCta.callNow}</Button></a>
          </div>
        </div>
      </section>

      {/* Self-selection: the six services */}
      <section className="py-24 bg-white" aria-labelledby="limo-needs-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={lp.needs.eyebrow}
              title={lp.needs.title}
              subtitle={lp.needs.subtitle}
              centered
              id="limo-needs-title"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lp.needs.items.map((item, index) => {
              const Icon = NEEDS_ICONS[index] ?? MapPin
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="border border-gray-100 p-7 shadow-sm hover:shadow-xl hover:border-secondary transition-all duration-300"
                >
                  <Icon size={20} className="text-secondary mb-4" aria-hidden="true" />
                  <h3 className="text-text font-serif font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-textLight text-sm leading-relaxed mb-4">{item.description}</p>
                  <Link
                    href={NEEDS_LINKS[index]}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-gold transition-colors duration-200"
                  >
                    {lp.needs.linkLabel}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why LIMOTECH */}
      <section className="py-24 bg-accent" aria-labelledby="limo-why-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={lp.why.eyebrow}
              title={lp.why.title}
              subtitle={lp.why.subtitle}
              centered
              id="limo-why-title"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {lp.why.items.map((item, index) => {
              const Icon = WHY_ICONS[index] ?? UserCheck
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flex gap-5"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-white border border-secondary/30 flex items-center justify-center">
                    <Icon size={20} className="text-secondary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-text font-serif font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-textLight text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How booking works */}
      <section className="py-24 bg-white" aria-labelledby="limo-how-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={lp.howItWorks.eyebrow}
              title={lp.howItWorks.title}
              subtitle={lp.howItWorks.subtitle}
              centered
              id="limo-how-title"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {lp.howItWorks.steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-primary flex items-center justify-center mb-5">
                  <span className="text-secondary font-serif font-bold text-lg">{index + 1}</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-text mb-2">{step.title}</h3>
                <p className="text-textLight text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="py-24 bg-accent" aria-labelledby="limo-areas-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <SectionTitle
              eyebrow={lp.areas.eyebrow}
              title={lp.areas.title}
              subtitle={lp.areas.subtitle}
              centered
              id="limo-areas-title"
            />
          </div>
          <ul className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {t.footer.serviceAreasList.map((area) => (
              <li
                key={area}
                className="bg-white border border-gray-200 px-5 py-2.5 text-sm text-text"
              >
                {area}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center text-textLight text-sm max-w-2xl mx-auto">{lp.areas.note}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white" aria-labelledby="limo-faq-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={lp.faq.eyebrow}
              title={lp.faq.title}
              subtitle={lp.faq.subtitle}
              centered
              id="limo-faq-title"
            />
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {lp.faq.items.map((item, index) => (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-accent border-l-4 border-secondary p-6"
              >
                <h3 className="font-serif font-bold text-text text-lg mb-2">{item.question}</h3>
                <p className="text-textLight text-sm leading-relaxed">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final conversion */}
      <section id="book" className="py-24 bg-primary scroll-mt-20 relative" aria-labelledby="limo-book-title">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <SectionTitle
              eyebrow={lp.finalCta.eyebrow}
              title={lp.finalCta.title}
              subtitle={lp.finalCta.subtitle}
              centered
              light
              id="limo-book-title"
            />
          </div>
          <div className="bg-white p-8 sm:p-10 shadow-2xl">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Clears the mobile sticky bar */}
      <div aria-hidden="true" className="h-20 lg:hidden" />

      <StickyCtaBar />
    </>
  )
}
