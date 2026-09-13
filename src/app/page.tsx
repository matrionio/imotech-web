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
