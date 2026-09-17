'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Plane, UserCheck, Timer, Clock, LucideIcon } from 'lucide-react'
import { COMPANY_INFO, VEHICLES, BLOG_IMAGES } from '@/utils/constants'
import SectionTitle from '@/components/shared/SectionTitle'
import VehicleCard from '@/components/shared/VehicleCard'
import ContactForm from '@/components/shared/ContactForm'
import CtaSection from '@/components/home/CtaSection'
import Button from '@/components/ui/Button'
import { useLanguage } from '@/context/LanguageContext'

const BENEFIT_ICONS: LucideIcon[] = [Plane, UserCheck, Timer, Clock]

// A curated subset of the existing fleet covering the vehicle classes most
// relevant to airport runs — sedan, SUV, van and electric.
const AIRPORT_VEHICLE_IDS = [
  'mercedes-s-class',
  'cadillac-xt6',
  'cadillac-escalade',
  'lincoln-navigator',
  'mercedes-sprinter',
  'cadillac-lyriq',
]

export default function AirportTransfersPage() {
  const { t } = useLanguage()
  const ap = t.airportPage

  const airportVehicles = AIRPORT_VEHICLE_IDS.map(
    (id) => VEHICLES.find((v) => v.id === id)
  ).filter((v): v is (typeof VEHICLES)[number] => Boolean(v))

  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-20 overflow-hidden" aria-label="Airport transfers hero">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: "url('/blog/YUL.jpg')" }}
          role="presentation"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-secondary text-sm font-semibold tracking-[0.2em] uppercase mb-4">{ap.hero.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
            {ap.hero.title}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">{ap.hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#book"><Button variant="primary" size="lg">{ap.hero.bookRide}</Button></a>
            <a href={`tel:${COMPANY_INFO.phone}`}><Button variant="outline" size="lg">{ap.hero.callUs}</Button></a>
          </div>
        </div>
      </section>

      {/* Airport service benefits */}
      <section className="py-24 bg-accent" aria-labelledby="airport-benefits-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={ap.benefits.eyebrow}
              title={ap.benefits.title}
              subtitle={ap.benefits.subtitle}
              centered
              id="airport-benefits-title"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ap.benefits.items.map((item, index) => {
              const Icon = BENEFIT_ICONS[index] ?? Plane
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white border border-gray-100 p-8 group shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-14 h-14 bg-primary mb-6 group-hover:bg-secondary transition-colors duration-300">
                    <Icon size={24} className="text-secondary group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-text mb-3">{item.title}</h3>
                  <p className="text-textLight text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white" aria-labelledby="how-it-works-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={ap.howItWorks.eyebrow}
              title={ap.howItWorks.title}
              subtitle={ap.howItWorks.subtitle}
              centered
              id="how-it-works-title"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ap.howItWorks.steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col"
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

      {/* Montréal–Trudeau (YUL) */}
      <section className="py-24 bg-accent" aria-labelledby="yul-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionTitle
              eyebrow={ap.yul.eyebrow}
              title={ap.yul.title}
              subtitle={ap.yul.subtitle}
              centered
              id="yul-title"
            />
          </div>
          <p className="mt-8 text-textLight leading-relaxed max-w-3xl mx-auto text-center">{ap.yul.intro}</p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {t.blogPage.airports.map((airport, i) => (
              <div
                key={airport.code}
                className="bg-white border border-gray-100 hover:border-secondary hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={`/blog/${BLOG_IMAGES.airports[i]}`}
                    alt={airport.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-primary/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-secondary text-primary text-xl font-bold px-6 py-2 tracking-widest">{airport.code}</span>
                  </div>
                </div>
                <div className="p-8 text-center">
                  <div className="w-12 h-12 bg-primary mx-auto mb-4 flex items-center justify-center">
                    <Plane size={20} className="text-secondary" />
                  </div>
                  <h3 className="text-primary font-serif font-bold text-lg mb-3">{airport.name}</h3>
                  <p className="text-textLight text-sm leading-relaxed mb-5">{airport.description}</p>
                  <div className="flex items-center justify-center gap-2 text-secondary text-sm font-semibold">
                    <Clock size={14} />
                    <span>{airport.distance}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="py-24 bg-white" aria-labelledby="airport-fleet-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={ap.fleet.eyebrow}
              title={ap.fleet.title}
              subtitle={ap.fleet.subtitle}
              centered
              id="airport-fleet-title"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {airportVehicles.map((vehicle, index) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/fleet"><Button variant="outline" size="lg">{ap.fleet.viewAll}</Button></Link>
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="py-24 bg-accent" aria-labelledby="airport-areas-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <SectionTitle
              eyebrow={ap.areas.eyebrow}
              title={ap.areas.title}
              subtitle={ap.areas.subtitle}
              centered
              id="airport-areas-title"
            />
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {t.footer.serviceAreasList.map((area) => (
              <li key={area} className="flex items-center gap-3 bg-white border border-gray-100 px-5 py-4 text-sm text-text">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                {area}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center text-textLight text-sm max-w-2xl mx-auto">{ap.areas.note}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white" aria-labelledby="airport-faq-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionTitle
              eyebrow={ap.faq.eyebrow}
              title={ap.faq.title}
              subtitle={ap.faq.subtitle}
              centered
              id="airport-faq-title"
            />
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {ap.faq.items.map((item, index) => (
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
      <section id="book" className="py-24 bg-accent scroll-mt-20" aria-labelledby="airport-book-title">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <SectionTitle
              eyebrow={ap.finalCta.eyebrow}
              title={ap.finalCta.title}
              subtitle={ap.finalCta.subtitle}
              centered
              id="airport-book-title"
            />
          </div>
          <div className="bg-white border border-gray-100 p-8 sm:p-10 shadow-sm">
            <ContactForm defaultService="airport-transfers" />
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
