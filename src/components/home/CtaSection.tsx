'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useLanguage } from '@/context/LanguageContext'
import { COMPANY_INFO } from '@/utils/constants'

export default function CtaSection() {
  const { t } = useLanguage()

  return (
    <section className="relative py-28 bg-primary overflow-hidden" aria-labelledby="cta-title">

      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-secondary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
          {t.cta.eyebrow}
        </motion.p>
        <motion.h2 id="cta-title" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl font-serif font-bold text-white mb-6">
          {t.cta.title}
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-gray-300 text-lg mb-10">
          {t.cta.subtitle}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact"><Button variant="primary" size="lg">{t.cta.bookRide}</Button></Link>
          <a href={`tel:${COMPANY_INFO.phone}`}><Button variant="outline" size="lg">{t.cta.callUs}</Button></a>
        </motion.div>
      </div>
    </section>
  )
}
