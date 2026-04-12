'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-5 z-50 flex items-center justify-center w-11 h-11 bg-primary text-white border border-gray-700 hover:bg-secondary hover:text-primary transition-all duration-300 shadow-lg"
      aria-label="Scroll to top"
    >
      <ArrowUp size={18} />
    </button>
  )
}
