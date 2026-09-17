'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  UserCheck,
  Car,
  Clock,
  CalendarCheck,
  ShieldCheck,
  BadgeCheck,
  GraduationCap,
  EyeOff,
  Briefcase,
  Plane,
  Moon,
  Users,
  Sparkles,
  MapPin,
  Timer,
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
const INCLUDES_ICONS: LucideIcon[] = [UserCheck, Car, CalendarCheck]
const STANDARD_ICONS: LucideIcon[] = [ShieldCheck, BadgeCheck, GraduationCap, EyeOff]
const USE_CASE_ICONS: LucideIcon[] = [Briefcase, Plane, Moon, Users, Sparkles, MapPin]
const SERVICE_ICONS: LucideIcon[] = [Briefcase, Timer, MapPin, Plane]

// The occasion-led use case, where intent naturally shifts toward the
// limo landing.
const OCCASION_USE_CASE_INDEX = 4

const SERVICE_LINKS = [
  '/services/corporate-transportation/',
  '/services/hourly-service/',
  '/services/point-to-point/',
  '/services/airport-transfers/',
]

// A focused selection — the fleet is supporting proof on this page, not
// the primary story.
const CHAUFFEUR_VEHICLE_IDS = [
  'mercedes-s-class',
  'cadillac-xt6',
  'cadillac-escalade',
  'mercedes-sprinter',
]

export default function MontrealChauffeurServicePage() {
  const { t } = useLanguage()
  const cp = t.chauffeurPage

  const chauffeurVehicles = CHAUFFEUR_VEHICLE_IDS.map(
    (id) => VEHICLES.find((v) => v.id === id)
  ).filter((v): v is (typeof VEHICLES)[number] => Boolean(v))

  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-20 overflow-hidden" aria-label="Montreal chauffeur service hero">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="/images/marketing/montreal-chauffeur-service-hero-900.jpg"
          />
          <img
            src="/images/marketing/montreal-chauffeur-service-hero-1920.jpg"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-black/15 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-secondary text-sm font-semibold tracking-[0.2em] uppercase mb-4">{cp.hero.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
            {cp.hero.title}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">{cp.hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#book"><Button variant="primary" size="lg">{cp.hero.bookRide}</Button></a>
            <a href={`tel:${COMPANY_INFO.phone}`}><Button variant="outline" size="lg">{cp.hero.callNow}</Button></a>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-accent border-b border-gray-200" aria-label="Service highlights">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 py-8">
            {cp.trust.items.map((item, index) => {
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

      {/* What a chauffeur service includes */}
      <section className="py-24 bg-white" aria-labelledby="chauffeur-includes-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <SectionTitle
              eyebrow={cp.includes.eyebrow}
              title={cp.includes.title}
              subtitle={cp.includes.subtitle}
              centered
              id="chauffeur-includes-title"
            />
            <p className="mt-8 text-textLight leading-relaxed">{cp.includes.body}</p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {cp.includes.items.map((item, index) => {
              const Icon = INCLUDES_ICONS[index] ?? UserCheck
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

      {/* The chauffeur standard — the page's proof block */}
      <section className="py-24 bg-primary relative" aria-labelledby="chauffeur-standard-title">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={cp.standard.eyebrow}
              title={cp.standard.title}
              subtitle={cp.standard.subtitle}
              centered
              light
              id="chauffeur-standard-title"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {cp.standard.items.map((item, index) => {
              const Icon = STANDARD_ICONS[index] ?? ShieldCheck
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.09 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-5 rounded-full border border-secondary/40 flex items-center justify-center">
                    <Icon size={20} className="text-secondary" aria-hidden="true" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* When people book a private driver */}
      <section className="py-24 bg-accent" aria-labelledby="chauffeur-use-cases-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={cp.useCases.eyebrow}
              title={cp.useCases.title}
              subtitle={cp.useCases.subtitle}
              centered
              id="chauffeur-use-cases-title"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {cp.useCases.items.map((item, index) => {
              const Icon = USE_CASE_ICONS[index] ?? MapPin
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  className="flex gap-5"
                >
                  <div className="flex-shrink-0 w-11 h-11 bg-white border border-secondary/30 flex items-center justify-center">
                    <Icon size={18} className="text-secondary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-text font-serif font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-textLight text-sm leading-relaxed">{item.description}</p>
                    {index === OCCASION_USE_CASE_INDEX && (
                      <Link
                        href="/montreal-limo-service/"
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-gold transition-colors duration-200"
                      >
                        {cp.useCases.limoLinkLabel}
                        <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mid-page conversion band */}
      <section className="py-20 bg-primary relative" aria-labelledby="chauffeur-mid-cta-title">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="chauffeur-mid-cta-title" className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
            {cp.midCta.title}
          </h2>
          <p className="text-gray-300 mb-8">{cp.midCta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#book"><Button variant="primary" size="lg">{cp.midCta.bookRide}</Button></a>
            <a href={`tel:${COMPANY_INFO.phone}`}><Button variant="outline" size="lg">{cp.midCta.callNow}</Button></a>
          </div>
        </div>
      </section>

      {/* The vehicle your chauffeur drives */}
      <section className="py-24 bg-white" aria-labelledby="chauffeur-fleet-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={cp.fleet.eyebrow}
              title={cp.fleet.title}
              subtitle={cp.fleet.subtitle}
              centered
              id="chauffeur-fleet-title"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {chauffeurVehicles.map((vehicle, index) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/fleet"><Button variant="outline" size="lg">{cp.fleet.viewAll}</Button></Link>
          </div>
        </div>
      </section>

      {/* How booking works */}
      <section className="py-24 bg-accent" aria-labelledby="chauffeur-how-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={cp.howItWorks.eyebrow}
              title={cp.howItWorks.title}
              subtitle={cp.howItWorks.subtitle}
              centered
              id="chauffeur-how-title"
            />
          </div>
          <div className="max-w-3xl mx-auto divide-y divide-gray-200 border-t border-b border-gray-200">
            {cp.howItWorks.steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex gap-6 py-8"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary flex items-center justify-center">
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

      {/* Related services */}
      <section className="py-24 bg-white" aria-labelledby="chauffeur-services-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={cp.services.eyebrow}
              title={cp.services.title}
              subtitle={cp.services.subtitle}
              centered
              id="chauffeur-services-title"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cp.services.items.map((item, index) => {
              const Icon = SERVICE_ICONS[index] ?? Briefcase
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  className="border border-gray-100 p-7 shadow-sm hover:shadow-xl hover:border-secondary transition-all duration-300"
                >
                  <Icon size={20} className="text-secondary mb-4" aria-hidden="true" />
                  <h3 className="text-text font-serif font-bold text-base mb-2">{item.title}</h3>
                  <p className="text-textLight text-sm leading-relaxed mb-4">{item.description}</p>
                  <Link
                    href={SERVICE_LINKS[index]}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-gold transition-colors duration-200"
                  >
                    {cp.services.linkLabel}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="py-24 bg-accent" aria-labelledby="chauffeur-areas-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <SectionTitle
              eyebrow={cp.areas.eyebrow}
              title={cp.areas.title}
              subtitle={cp.areas.subtitle}
              centered
              id="chauffeur-areas-title"
            />
          </div>
          <ul className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {t.footer.serviceAreasList.map((area) => (
              <li key={area} className="bg-white border border-gray-200 px-5 py-2.5 text-sm text-text">
                {area}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center text-textLight text-sm max-w-2xl mx-auto">{cp.areas.note}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white" aria-labelledby="chauffeur-faq-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={cp.faq.eyebrow}
              title={cp.faq.title}
              subtitle={cp.faq.subtitle}
              centered
              id="chauffeur-faq-title"
            />
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {cp.faq.items.map((item, index) => (
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
      <section id="book" className="py-24 bg-primary scroll-mt-20 relative" aria-labelledby="chauffeur-book-title">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <SectionTitle
              eyebrow={cp.finalCta.eyebrow}
              title={cp.finalCta.title}
              subtitle={cp.finalCta.subtitle}
              centered
              light
              id="chauffeur-book-title"
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
