'use client'

import { CalendarCheck, Phone } from 'lucide-react'
import { COMPANY_INFO } from '@/utils/constants'
import { useLanguage } from '@/context/LanguageContext'

/**
 * Mobile-only conversion bar for acquisition landing pages.
 *
 * Not global — import it per page. It sits at z-40 so the ConsentBanner
 * (z-100) always stays above it. The [data-sticky-cta] attribute lifts the
 * floating WhatsApp and ScrollToTop buttons clear of the bar on small
 * screens (see --sticky-cta-offset in globals.css).
 */
export default function StickyCtaBar() {
  const { t } = useLanguage()
  const s = t.stickyCta

  return (
    <div
      data-sticky-cta
      role="region"
      aria-label={s.ariaLabel}
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 bg-primary border-t border-secondary/30 shadow-2xl"
    >
      <div className="flex items-stretch gap-3 px-4 py-3">
        <a
          href="#book"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-secondary text-primary font-semibold text-sm tracking-wide px-4 py-3 transition-colors duration-300 hover:bg-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          <CalendarCheck size={16} aria-hidden="true" />
          {s.book}
        </a>
        <a
          href={`tel:${COMPANY_INFO.phone}`}
          aria-label={`${s.call} — ${COMPANY_INFO.phone}`}
          className="flex-1 inline-flex items-center justify-center gap-2 border border-secondary text-secondary font-semibold text-sm tracking-wide px-4 py-3 transition-colors duration-300 hover:bg-secondary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          <Phone size={16} aria-hidden="true" />
          {s.call}
        </a>
      </div>
    </div>
  )
}
