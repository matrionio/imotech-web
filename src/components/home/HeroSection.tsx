'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useLanguage } from '@/context/LanguageContext'

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-primary overflow-hidden" aria-label="Hero section">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }} role="presentation" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {t.hero.eyebrow && (
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-secondary text-sm font-semibold tracking-[0.3em] uppercase mb-6">
            {t.hero.eyebrow}
          </motion.p>
        )}

        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-4">
          {t.hero.title.split(' ').slice(0, 2).join(' ')}{' '}
          <span className="text-gradient">{t.hero.title.split(' ').slice(2, 4).join(' ')}</span>
          <br />
          {t.hero.title.split(' ').slice(4).join(' ')}
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="text-xl sm:text-2xl text-gray-300 font-light tracking-wider mb-10">
          {t.hero.subtitle}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact"><Button variant="primary" size="lg">{t.hero.bookRide}</Button></Link>
          <Link href="/fleet"><Button variant="outline" size="lg">{t.hero.viewFleet}</Button></Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }} className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: '10+', label: t.hero.years },
            { value: '5K+', label: t.hero.clients },
            { value: '24/7', label: t.hero.availability },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-serif font-bold text-secondary">{stat.value}</p>
              <p className="text-gray-400 text-xs tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }} className="absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">
        <div className="flex flex-col items-center gap-2">
          <span className="text-gray-500 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-secondary to-transparent" />
        </div>
      </motion.div>
    </section>
  )
}
