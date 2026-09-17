'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  UserCheck,
  Car,
  ShieldCheck,
  Clock,
  Briefcase,
  Plane,
  Building2,
  CalendarDays,
  Users,
  Timer,
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

const BENEFIT_ICONS: LucideIcon[] = [UserCheck, Car, ShieldCheck, Clock]
const USE_CASE_ICONS: LucideIcon[] = [Briefcase, Plane, Building2, CalendarDays, Users, Timer]

// The index of the airport use case, which cross-links to the dedicated
// airport transfers page.
const AIRPORT_USE_CASE_INDEX = 1

// Vehicles from the existing fleet best suited to executive and business
// travel — sedans for one or two passengers through to a van for a group.
const CORPORATE_VEHICLE_IDS = [
  'mercedes-s-class',
  'lincoln-aviator',
  'lincoln-nautilus',
  'cadillac-xt6',
  'cadillac-escalade',
  'mercedes-sprinter',
]

export default function CorporateTransportationPage() {
  const { t } = useLanguage()
  const cp = t.corporatePage

  const corporateVehicles = CORPORATE_VEHICLE_IDS.map(
    (id) => VEHICLES.find((v) => v.id === id)
  ).filter((v): v is (typeof VEHICLES)[number] => Boolean(v))

  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-20 overflow-hidden" aria-label="Corporate transportation hero">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('/images/hero-bg2.jpg')" }}
          role="presentation"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/85" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-secondary text-sm font-semibold tracking-[0.2em] uppercase mb-4">{cp.hero.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
            {cp.hero.title}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">{cp.hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#book"><Button variant="primary" size="lg">{cp.hero.bookRide}</Button></a>
            <a href={`tel:${COMPANY_INFO.phone}`}><Button variant="outline" size="lg">{cp.hero.callUs}</Button></a>
          </div>
        </div>
      </section>

      {/* Benefits — icon-left rows */}
      <section className="py-24 bg-white" aria-labelledby="corporate-benefits-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={cp.benefits.eyebrow}
              title={cp.benefits.title}
              subtitle={cp.benefits.subtitle}
              centered
              id="corporate-benefits-title"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {cp.benefits.items.map((item, index) => {
              const Icon = BENEFIT_ICONS[index] ?? UserCheck
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-5 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-secondary/40 group-hover:border-secondary group-hover:bg-secondary/10 transition-all duration-300">
                    <Icon size={20} className="text-secondary" />
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

      {/* Business travel use cases — dark band, image + list */}
      <section className="py-24 bg-primary relative" aria-labelledby="corporate-use-cases-title">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionTitle
                eyebrow={cp.useCases.eyebrow}
                title={cp.useCases.title}
                subtitle={cp.useCases.subtitle}
                light
                id="corporate-use-cases-title"
              />
              <p className="mt-8 text-gray-400 leading-relaxed">{cp.useCases.intro}</p>
              <div className="relative mt-10 h-64 w-full overflow-hidden">
                <Image
                  src="/images/fleet/Mercedes.jpg"
                  alt={cp.useCases.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover opacity-90"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>

            <ul className="divide-y divide-gray-800 border-t border-gray-800">
              {cp.useCases.items.map((item, index) => {
                const Icon = USE_CASE_ICONS[index] ?? Briefcase
                return (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="flex gap-5 py-6 group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 flex items-center justify-center group-hover:bg-secondary transition-colors duration-300">
                      <Icon size={18} className="text-secondary group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                      {index === AIRPORT_USE_CASE_INDEX && (
                        <Link
                          href="/services/airport-transfers/"
                          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-gold transition-colors duration-200"
                        >
                          {cp.useCases.airportLinkLabel}
                          <ArrowRight size={14} />
                        </Link>
                      )}
                    </div>
                  </motion.li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-accent" aria-labelledby="corporate-how-it-works-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={cp.howItWorks.eyebrow}
              title={cp.howItWorks.title}
              subtitle={cp.howItWorks.subtitle}
              centered
              id="corporate-how-it-works-title"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {cp.howItWorks.steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-100 p-8"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-primary mb-6">
                  <span className="text-secondary font-serif font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-text mb-3">{step.title}</h3>
                <p className="text-textLight text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate fleet */}
      <section className="py-24 bg-white" aria-labelledby="corporate-fleet-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={cp.fleet.eyebrow}
              title={cp.fleet.title}
              subtitle={cp.fleet.subtitle}
              centered
              id="corporate-fleet-title"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {corporateVehicles.map((vehicle, index) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/fleet"><Button variant="outline" size="lg">{cp.fleet.viewAll}</Button></Link>
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="py-24 bg-accent" aria-labelledby="corporate-areas-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <SectionTitle
              eyebrow={cp.areas.eyebrow}
              title={cp.areas.title}
              subtitle={cp.areas.subtitle}
              centered
              id="corporate-areas-title"
            />
          </div>
          <ul className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {t.footer.serviceAreasList.map((area) => (
              <li
                key={area}
                className="border border-gray-200 bg-white px-5 py-2.5 text-sm text-text hover:border-secondary transition-colors duration-200"
              >
                {area}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center text-textLight text-sm max-w-2xl mx-auto">{cp.areas.note}</p>
        </div>
      </section>

      {/* FAQ — two columns */}
      <section className="py-24 bg-white" aria-labelledby="corporate-faq-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={cp.faq.eyebrow}
              title={cp.faq.title}
              subtitle={cp.faq.subtitle}
              centered
              id="corporate-faq-title"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cp.faq.items.map((item, index) => (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 24 }}
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

      {/* Final CTA — booking form */}
      <section id="book" className="py-24 bg-accent scroll-mt-20" aria-labelledby="corporate-book-title">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <SectionTitle
              eyebrow={cp.finalCta.eyebrow}
              title={cp.finalCta.title}
              subtitle={cp.finalCta.subtitle}
              centered
              id="corporate-book-title"
            />
          </div>
          <div className="bg-white border border-gray-100 p-8 sm:p-10 shadow-sm">
            <ContactForm defaultService="corporate-transportation" />
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
