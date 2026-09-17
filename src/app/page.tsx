import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import ServicesPreview from '@/components/home/ServicesPreview'
import FleetPreview from '@/components/home/FleetPreview'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import CtaSection from '@/components/home/CtaSection'

export const metadata: Metadata = {
  title: 'LIMOTECH | Luxury Transportation Services Montreal',
  description:
    'Premium luxury limousine and transportation services in Montreal. Airport transfers, corporate travel, special events, and more. Available 24/7.',
  // Declared on the page rather than the root layout: a canonical set in
  // the root layout is inherited by any route that does not override it,
  // which would silently point future pages at "/".
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <FleetPreview />
      <WhyChooseUs />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}
