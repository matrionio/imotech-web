'use client'

import { motion } from 'framer-motion'

interface SectionTitleProps {
  eyebrow?: string
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
  id?: string
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  centered = false,
  light = false,
  id,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={centered ? 'text-center' : ''}
    >
      {eyebrow && (
        <p className="text-secondary text-sm font-semibold tracking-[0.2em] uppercase mb-3">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`text-3xl sm:text-4xl font-serif font-bold leading-tight ${
          light ? 'text-white' : 'text-text'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed max-w-2xl ${
            centered ? 'mx-auto' : ''
          } ${light ? 'text-gray-300' : 'text-textLight'}`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-5 h-0.5 w-16 bg-secondary ${
          centered ? 'mx-auto' : ''
        }`}
      />
    </motion.div>
  )
}
