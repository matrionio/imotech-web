'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, MapPin } from 'lucide-react'
import { NAV_LINKS } from '@/utils/constants'
import Button from '@/components/ui/Button'
import { useLanguage } from '@/context/LanguageContext'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { lang, setLang, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const navLabels = [t.nav.home, t.nav.services, t.nav.fleet, t.nav.about, t.nav.contact, t.nav.blog]

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: isScrolled ? '#000000' : 'rgba(0,0,0,0.7)',
        boxShadow: isScrolled ? '0 2px 20px rgba(0,0,0,0.5)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>

          {/* Logo */}
          <Link href="/" aria-label="LIMOTECH Home">
            <Image
              src="/images/limotechtransparente.png"
              alt="LIMOTECH Logo"
              width={300}
              height={100}
              style={{ height: '160px', width: 'auto', display: 'block', filter: 'brightness(1.4) contrast(1.2) drop-shadow(0 0 8px rgba(201, 169, 97, 0.6))' }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: pathname === link.href ? '#C9A961' : '#ffffff',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                {navLabels[i]}
              </Link>
            ))}
          </nav>

          {/* Right side: Lang toggle + Contact info */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Language Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                onClick={() => setLang('en')}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em',
                  color: lang === 'en' ? '#C9A961' : '#9ca3af',
                  padding: '4px 6px', transition: 'color 0.2s',
                }}
                aria-label="Switch to English"
              >
                EN
              </button>
              <span style={{ color: '#4b5563', fontSize: '12px' }}>|</span>
              <button
                onClick={() => setLang('fr')}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em',
                  color: lang === 'fr' ? '#C9A961' : '#9ca3af',
                  padding: '4px 6px', transition: 'color 0.2s',
                }}
                aria-label="Passer au français"
              >
                FR
              </button>
            </div>

            {/* Contact Info */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <MapPin size={13} style={{ color: '#C9A961', flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontSize: '11px', color: '#9ca3af', lineHeight: '1.4' }}>
                975 Romeo Vachon Blvd N,<br />Dorval, Quebec H4Y 1H1
              </span>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            style={{ color: '#ffffff', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{ backgroundColor: '#000000', borderTop: '1px solid #1f1f1f' }}>
          <nav className="flex flex-col py-4 px-4 gap-2" aria-label="Mobile navigation">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '12px 16px',
                  fontSize: '16px',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid #1f1f1f',
                  color: pathname === link.href ? '#C9A961' : '#ffffff',
                  textDecoration: 'none',
                }}
              >
                {navLabels[i]}
              </Link>
            ))}

            {/* Mobile Language Toggle */}
            <div style={{ display: 'flex', gap: '8px', padding: '12px 16px', borderBottom: '1px solid #1f1f1f' }}>
              <button
                onClick={() => setLang('en')}
                style={{
                  background: lang === 'en' ? '#C9A961' : 'transparent',
                  border: '1px solid #C9A961',
                  color: lang === 'en' ? '#000000' : '#C9A961',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '4px 12px',
                }}
              >
                EN
              </button>
              <button
                onClick={() => setLang('fr')}
                style={{
                  background: lang === 'fr' ? '#C9A961' : 'transparent',
                  border: '1px solid #C9A961',
                  color: lang === 'fr' ? '#000000' : '#C9A961',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '4px 12px',
                }}
              >
                FR
              </button>
            </div>

            <div style={{ paddingTop: '16px' }}>
              <Button
                variant="primary"
                fullWidth
                onClick={() => (window.location.href = '/contact')}
              >
                {t.nav.bookRide}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
