'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Music, UtensilsCrossed, Building2, Plane, Star, MapPin, Clock } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import SectionTitle from '@/components/shared/SectionTitle'
import Button from '@/components/ui/Button'
import CtaSection from '@/components/home/CtaSection'
import { BLOG_IMAGES } from '@/utils/constants'

export default function BlogPage() {
  const { t } = useLanguage()
  const b = t.blogPage

  return (
    <>
      {/* Hero */}
      <section className="bg-primary pt-32 pb-20 relative" aria-label="Blog page hero">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-secondary text-sm font-semibold tracking-[0.2em] uppercase mb-4">{b.eyebrow}</p>
          <h1 className="text-5xl sm:text-6xl font-serif font-bold text-white mb-6">{b.hero}</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">{b.heroSub}</p>
        </div>
      </section>

      {/* Nightlife */}
      <section className="py-24 bg-primary" aria-labelledby="nightlife-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow={b.nightlifeEyebrow} title={b.nightlifeTitle} subtitle={b.nightlifeSub} centered light id="nightlife-title" />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {b.nightlife.map((spot, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-gray-800 hover:border-secondary transition-colors duration-300 overflow-hidden">
                <div className="relative h-52 w-full">
                  <Image
                    src={`/blog/${BLOG_IMAGES.nightlife[i]}`}
                    alt={spot.name}
                    fill
                    className="object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-secondary/10 flex items-center justify-center">
                      <Music size={18} className="text-secondary" />
                    </div>
                    <span className="text-secondary text-xs font-semibold tracking-[0.15em] uppercase">{spot.category}</span>
                  </div>
                  <h3 className="text-white font-serif font-bold text-xl mb-3">{spot.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{spot.description}</p>
                  <div className="flex items-start gap-2 mb-3">
                    <MapPin size={13} className="text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-500 text-xs">{spot.address}</span>
                  </div>
                  <div className="border-t border-gray-800 pt-4 mt-4">
                    <p className="text-secondary text-xs italic">{spot.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants */}
      <section className="py-24 bg-white" aria-labelledby="restaurants-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow={b.restaurantsEyebrow} title={b.restaurantsTitle} subtitle={b.restaurantsSub} centered id="restaurants-title" />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {b.restaurants.map((rest, i) => (
              <div key={i} className="border border-gray-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="relative h-52 w-full">
                  <Image
                    src={`/blog/${BLOG_IMAGES.restaurants[i]}`}
                    alt={rest.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <UtensilsCrossed size={16} className="text-secondary" />
                      <span className="text-secondary text-xs font-semibold tracking-[0.15em] uppercase">{rest.category}</span>
                    </div>
                    <span className="text-textLight text-sm font-medium">{rest.price}</span>
                  </div>
                  <h3 className="text-primary font-serif font-bold text-xl mb-3">{rest.name}</h3>
                  <p className="text-textLight text-sm leading-relaxed mb-4">{rest.description}</p>
                  <div className="flex items-start gap-2">
                    <MapPin size={13} className="text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-400 text-xs">{rest.address}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hotels */}
      <section className="py-24 bg-accent" aria-labelledby="hotels-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow={b.hotelsEyebrow} title={b.hotelsTitle} subtitle={b.hotelsSub} centered id="hotels-title" />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {b.hotels.map((hotel, i) => (
              <div key={i} className="bg-white border-b-2 border-secondary shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="relative h-52 w-full">
                  <Image
                    src={`/blog/${BLOG_IMAGES.hotels[i]}`}
                    alt={hotel.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: hotel.stars }).map((_, s) => (
                      <Star key={s} size={12} className="text-secondary fill-secondary" />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 size={16} className="text-secondary" />
                    <span className="text-secondary text-xs font-semibold tracking-[0.15em] uppercase">{b.hotelsLabel}</span>
                  </div>
                  <h3 className="text-primary font-serif font-bold text-xl mb-3">{hotel.name}</h3>
                  <p className="text-textLight text-sm leading-relaxed mb-4">{hotel.description}</p>
                  <div className="flex items-start gap-2 mb-4">
                    <MapPin size={13} className="text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-400 text-xs">{hotel.address}</span>
                  </div>
                  <div className="bg-secondary/10 px-3 py-2">
                    <p className="text-secondary text-xs font-medium">{hotel.highlight}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Airports */}
      <section className="py-24 bg-white" aria-labelledby="airports-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow={b.airportsEyebrow} title={b.airportsTitle} subtitle={b.airportsSub} centered id="airports-title" />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {b.airports.map((airport, i) => (
              <div key={i} className="border border-gray-100 hover:border-secondary hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={`/blog/${BLOG_IMAGES.airports[i]}`}
                    alt={airport.name}
                    fill
                    className="object-cover"
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

      {/* Limotech banner */}
      <section className="py-20 bg-primary relative" aria-label="Book a ride">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-secondary text-sm font-semibold tracking-[0.2em] uppercase mb-4">{b.limoNote}</p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">{b.limoTitle}</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">{b.limoText}</p>
          <Link href="/contact">
            <Button variant="primary" size="lg">{t.cta.bookRide}</Button>
          </Link>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
