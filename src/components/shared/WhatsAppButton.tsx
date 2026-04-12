'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { COMPANY_INFO } from '@/utils/constants'
import { useLanguage } from '@/context/LanguageContext'

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false)
  const { t } = useLanguage()

  return (
    <a
      href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white shadow-lg hover:bg-[#1ebe5d] hover:scale-110 transition-all duration-300 rounded-full"
      aria-label={t.whatsapp.tooltip}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
    >
      <MessageCircle size={28} />
      {showTooltip && (
        <span role="tooltip" className="absolute right-16 whitespace-nowrap bg-primary text-white text-xs px-3 py-2 shadow-md pointer-events-none">
          {t.whatsapp.tooltip}
        </span>
      )}
    </a>
  )
}
