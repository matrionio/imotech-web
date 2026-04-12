'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { TESTIMONIALS } from '@/utils/constants'
import SectionTitle from '@/components/shared/SectionTitle'
import { useLanguage } from '@/context/LanguageContext'

export default function TestimonialsSection() {
  const { t } = useLanguage()

  return (
    <section className="py-24 bg-accent" aria-labelledby="testimonials-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <SectionTitle eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} subtitle={t.testimonials.subtitle} centered id="testimonials-title" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div key={testimonial.id} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 relative">
              <Quote size={32} className="text-secondary/20 absolute top-6 right-6" aria-hidden="true" />
              <div className="flex gap-1 mb-4" aria-label={`Rating: ${testimonial.rating} out of 5`}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-secondary fill-secondary" aria-hidden="true" />
                ))}
              </div>
              <p className="text-textLight text-sm leading-relaxed mb-6 italic">&ldquo;{testimonial.content}&rdquo;</p>
              <div>
                <p className="font-semibold text-text text-sm">{testimonial.name}</p>
                <p className="text-textLight text-xs mt-1">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
