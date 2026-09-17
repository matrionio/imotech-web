'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Car,
  UserCheck,
  MapPin,
  Clock,
  Users,
  Landmark,
  Building2,
  Camera,
  Utensils,
  ShoppingBag,
  Route,
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

const CONCEPT_ICONS: LucideIcon[] = [Car, UserCheck, MapPin, Clock, Users]
const USE_CASE_ICONS: LucideIcon[] = [Landmark, Building2, Camera, Utensils, ShoppingBag, Route]

// The index of the dining & entertainment use case, which links through to
// the existing Montreal city guide on the blog.
const DINING_USE_CASE_INDEX = 3

// Vehicles suited to exploring the city: sedans for a couple or a small
// group, SUVs for a family, and a van that keeps a larger group together.
const CITY_TOUR_VEHICLE_IDS = [
  'mercedes-s-class',
  'tesla-model-s',
  'lincoln-nautilus',
  'cadillac-escalade',
  'lincoln-navigator',
  'mercedes-sprinter',
]

export default function CityToursPage() {
  const { t } = useLanguage()
  const ct = t.cityToursPage

  const cityTourVehicles = CITY_TOUR_VEHICLE_IDS.map(
    (id) => VEHICLES.find((v) => v.id === id)
  ).filter((v): v is (typeof VEHICLES)[number] => Boolean(v))

  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-20 overflow-hidden" aria-label="City tours and sightseeing hero">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
          style={{ backgroundImage: "url('/images/hero-bg2.jpg')" }}
          role="presentation"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/75" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-secondary text-sm font-semibold tracking-[0.2em] uppercase mb-4">{ct.hero.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
            {ct.hero.title}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">{ct.hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#book"><Button variant="primary" size="lg">{ct.hero.bookRide}</Button></a>
            <a href={`tel:${COMPANY_INFO.phone}`}><Button variant="outline" size="lg">{ct.hero.callUs}</Button></a>
          </div>
        </div>
      </section>

      {/* Explore Montreal your way — divided strip */}
      <section className="py-24 bg-white" aria-labelledby="city-concept-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={ct.concept.eyebrow}
              title={ct.concept.title}
              subtitle={ct.concept.subtitle}
              centered
              id="city-concept-title"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 lg:divide-x divide-gray-100">
            {ct.concept.items.map((item, index) => {
              const Icon = CONCEPT_ICONS[index] ?? Car
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="px-0 py-6 lg:px-6 lg:py-0"
                >
                  <Icon size={22} className="text-secondary mb-4" />
                  <h3 className="text-text font-serif font-bold text-base mb-2">{item.title}</h3>
                  <p className="text-textLight text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Use cases — indexed list */}
      <section className="py-24 bg-accent" aria-labelledby="city-use-cases-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={ct.useCases.eyebrow}
              title={ct.useCases.title}
              subtitle={ct.useCases.subtitle}
              centered
              id="city-use-cases-title"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {ct.useCases.items.map((item, index) => {
              const Icon = USE_CASE_ICONS[index] ?? MapPin
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="border-l-2 border-secondary/30 pl-6 hover:border-secondary transition-colors duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-secondary font-serif font-bold text-sm tracking-widest">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <Icon size={16} className="text-secondary/70" />
                  </div>
                  <h3 className="text-text font-serif font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-textLight text-sm leading-relaxed">{item.description}</p>
                  {index === DINING_USE_CASE_INDEX && (
                    <Link
                      href="/blog"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-gold transition-colors duration-200"
                    >
                      {ct.useCases.blogLinkLabel}
                      <ArrowRight size={14} />
                    </Link>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How to book — gold-filled numerals */}
      <section className="py-24 bg-white" aria-labelledby="city-how-it-works-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={ct.howItWorks.eyebrow}
              title={ct.howItWorks.title}
              subtitle={ct.howItWorks.subtitle}
              centered
              id="city-how-it-works-title"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {ct.howItWorks.steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-secondary flex items-center justify-center mb-5">
                  <span className="text-primary font-serif font-bold text-lg">{index + 1}</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-text mb-3">{step.title}</h3>
                <p className="text-textLight text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="py-24 bg-accent" aria-labelledby="city-fleet-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={ct.fleet.eyebrow}
              title={ct.fleet.title}
              subtitle={ct.fleet.subtitle}
              centered
              id="city-fleet-title"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cityTourVehicles.map((vehicle, index) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/fleet"><Button variant="outline" size="lg">{ct.fleet.viewAll}</Button></Link>
          </div>
        </div>
      </section>

      {/* Service areas — ruled columns */}
      <section className="py-24 bg-white" aria-labelledby="city-areas-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <SectionTitle
              eyebrow={ct.areas.eyebrow}
              title={ct.areas.title}
              subtitle={ct.areas.subtitle}
              centered
              id="city-areas-title"
            />
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 max-w-4xl mx-auto">
            {t.footer.serviceAreasList.map((area) => (
              <li key={area} className="flex items-center gap-3 border-b border-gray-100 py-4 text-sm text-text">
                <MapPin size={15} className="text-secondary flex-shrink-0" />
                {area}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center text-textLight text-sm max-w-2xl mx-auto">{ct.areas.note}</p>
        </div>
      </section>

      {/* FAQ — numbered */}
      <section className="py-24 bg-accent" aria-labelledby="city-faq-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={ct.faq.eyebrow}
              title={ct.faq.title}
              subtitle={ct.faq.subtitle}
              centered
              id="city-faq-title"
            />
          </div>
          <div className="max-w-3xl mx-auto space-y-5">
            {ct.faq.items.map((item, index) => (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white border border-gray-100 p-6 flex gap-5"
              >
                <span className="text-secondary font-serif font-bold text-sm tracking-widest flex-shrink-0 pt-0.5">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-serif font-bold text-text text-lg mb-2">{item.question}</h3>
                  <p className="text-textLight text-sm leading-relaxed">{item.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — booking form */}
      <section id="book" className="py-24 bg-white scroll-mt-20" aria-labelledby="city-book-title">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <SectionTitle
              eyebrow={ct.finalCta.eyebrow}
              title={ct.finalCta.title}
              subtitle={ct.finalCta.subtitle}
              centered
              id="city-book-title"
            />
          </div>
          <div className="bg-accent border border-gray-100 p-8 sm:p-10">
            <ContactForm defaultService="city-tours" />
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
