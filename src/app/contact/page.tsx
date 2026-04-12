'use client'

import { Phone, Mail, Clock, MapPin, RotateCcw, Plane, ShieldCheck, Star } from 'lucide-react'
import { COMPANY_INFO } from '@/utils/constants'
import SectionTitle from '@/components/shared/SectionTitle'
import ContactForm from '@/components/shared/ContactForm'
import { useLanguage } from '@/context/LanguageContext'

const TRUST_BADGES = [
  { icon: RotateCcw, en: 'Free cancellation up to 24h before pickup', fr: 'Annulation gratuite jusqu\'à 24h avant le départ' },
  { icon: Plane,     en: 'Real-time flight tracking',                  fr: 'Suivi de vol en temps réel' },
  { icon: ShieldCheck, en: 'Chauffeur guaranteed on time',             fr: 'Chauffeur garanti à l\'heure' },
  { icon: Star,      en: 'Premium vehicles',                           fr: 'Véhicules premium' },
]

export default function ContactPage() {
  const { t, lang } = useLanguage()
  const cp = t.contactPage

  const contactInfo = [
    { icon: Phone, label: cp.labels.phone, value: COMPANY_INFO.phone, href: `tel:${COMPANY_INFO.phone}` },
    { icon: Mail, label: cp.labels.email, value: COMPANY_INFO.email, href: `mailto:${COMPANY_INFO.email}` },
    { icon: Clock, label: cp.labels.hours, value: COMPANY_INFO.hours, href: null },
    { icon: MapPin, label: cp.labels.basedIn, value: COMPANY_INFO.address, href: null },
  ]

  return (
    <>
      <section className="bg-primary pt-32 pb-20 relative" aria-label="Contact page hero">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-secondary text-sm font-semibold tracking-[0.2em] uppercase mb-4">{cp.eyebrow}</p>
          <h1 className="text-5xl sm:text-6xl font-serif font-bold text-white mb-6">{cp.hero}</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">{cp.heroSub}</p>
        </div>
      </section>

      <section className="py-24 bg-white" aria-labelledby="contact-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <SectionTitle eyebrow={cp.infoEyebrow} title={cp.infoTitle} id="contact-title" />
              <div className="mt-8 space-y-6">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs text-textLight font-medium uppercase tracking-wider mb-1">{label}</p>
                      {href ? (
                        <a href={href} className="text-text font-medium hover:text-secondary transition-colors duration-200">{value}</a>
                      ) : (
                        <p className="text-text font-medium">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12">
                <h3 className="text-sm font-semibold text-text uppercase tracking-wider mb-4 border-b border-gray-100 pb-3">{cp.areasTitle}</h3>
                <ul className="space-y-2">
                  {t.footer.serviceAreasList.map((area) => (
                    <li key={area} className="flex items-center gap-2 text-sm text-textLight">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="mb-8">
                <SectionTitle eyebrow={cp.formEyebrow} title={cp.formTitle} subtitle={cp.formSub} />
              </div>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {TRUST_BADGES.map(({ icon: Icon, en, fr }) => (
                  <div key={en} className="flex items-center gap-3 p-3 bg-primary border border-secondary/20 rounded-sm">
                    <div className="w-8 h-8 flex items-center justify-center bg-secondary/10 rounded-sm flex-shrink-0">
                      <Icon size={16} className="text-secondary" />
                    </div>
                    <p className="text-white text-xs font-medium leading-snug">{lang === 'fr' ? fr : en}</p>
                  </div>
                ))}
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
