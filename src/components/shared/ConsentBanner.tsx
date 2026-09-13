'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

type ConsentChoice = 'granted' | 'denied'

const STORAGE_KEY = 'limotech-consent-v1'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || []

  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer.push(args)
    }
  }
}

function updateGoogleConsent(choice: ConsentChoice) {
  ensureGtag()

  const granted = choice === 'granted' ? 'granted' : 'denied'

  window.gtag?.('consent', 'update', {
    analytics_storage: granted,
    ad_storage: granted,
    ad_user_data: granted,
    ad_personalization: granted,
  })
}

export default function ConsentBanner() {
  const { lang } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const savedChoice = window.localStorage.getItem(STORAGE_KEY)

    if (savedChoice === 'granted' || savedChoice === 'denied') {
      updateGoogleConsent(savedChoice)
      return
    }

    setVisible(true)
  }, [])

  const saveChoice = (choice: ConsentChoice) => {
    window.localStorage.setItem(STORAGE_KEY, choice)
    updateGoogleConsent(choice)
    setVisible(false)
  }

  if (!visible) {
    return null
  }

  const copy =
    lang === 'fr'
      ? {
          title: 'Votre vie privée',
          text:
            'Nous utilisons des technologies de mesure et de publicité pour comprendre l’utilisation du site et améliorer nos services. Vous pouvez accepter ou refuser les technologies non essentielles.',
          accept: 'Accepter',
          reject: 'Refuser',
        }
      : {
          title: 'Your privacy',
          text:
            'We use measurement and advertising technologies to understand website usage and improve our services. You can accept or reject non-essential technologies.',
          accept: 'Accept',
          reject: 'Reject',
        }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={copy.title}
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-secondary/30 bg-primary shadow-2xl"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-3xl">
          <h2 className="mb-2 font-serif text-lg font-bold text-white">
            {copy.title}
          </h2>

          <p className="text-sm leading-relaxed text-gray-300">
            {copy.text}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-shrink-0">
          <button
            type="button"
            onClick={() => saveChoice('denied')}
            className="border border-secondary px-6 py-3 text-sm font-semibold text-secondary transition-colors hover:bg-secondary hover:text-primary"
          >
            {copy.reject}
          </button>

          <button
            type="button"
            onClick={() => saveChoice('granted')}
            className="bg-secondary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:opacity-90"
          >
            {copy.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
