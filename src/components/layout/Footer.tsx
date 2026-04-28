'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Clock } from 'lucide-react'
import { NAV_LINKS, COMPANY_INFO } from '@/utils/constants'
import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  const navLabels = [t.nav.home, t.nav.services, t.nav.fleet, t.nav.about, t.nav.contact]

  return (
    <footer className="bg-primary text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="LIMOTECH Home">
              <Image src="/images/limotechtransparente.png" alt="LIMOTECH Logo" width={220} height={70} style={{ height: '60px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
            </Link>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">{t.footer.tagline}</p>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              {t.footer.description} {COMPANY_INFO.established}. {t.footer.serving}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-6 border-b border-gray-800 pb-3">{t.footer.quickLinks}</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {NAV_LINKS.map((link, i) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-400 hover:text-secondary text-sm transition-colors duration-200">{navLabels[i]}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-6 border-b border-gray-800 pb-3">{t.footer.contact}</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-secondary flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-gray-400 hover:text-secondary text-sm transition-colors duration-200">{COMPANY_INFO.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} className="text-secondary flex-shrink-0" />
                <span className="text-gray-400 text-sm">{COMPANY_INFO.hours}</span>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-6 border-b border-gray-800 pb-3">{t.footer.serviceAreas}</h3>
            <ul className="space-y-2">
              {t.footer.serviceAreasList.slice(0, 6).map((area) => (
                <li key={area} className="text-gray-400 text-sm">{area}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} {COMPANY_INFO.name}. {t.footer.rights}</p>
          </div>
          <p className="text-gray-600 text-xs">{t.footer.location}</p>
        </div>
      </div>
    </footer>
  )
}
