'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface StickyMobileCTAProps {
  text: string
  link: string
  className?: string
}

export function StickyMobileCTA({ text, link, className }: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling 200px
      setIsVisible(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    if (link.startsWith('#')) {
      const element = document.querySelector(link)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      window.location.href = link
    }

    // Track CTA click
    import('@/lib/gtag').then(({ trackEvent }) => {
      trackEvent('sticky_cta_click', {
        event_category: 'engagement',
        event_label: text,
        page_location: window.location.pathname,
      })
    })
  }

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t shadow-lg transition-transform duration-300 md:hidden',
        isVisible ? 'translate-y-0' : 'translate-y-full',
        className
      )}
    >
      <button
        onClick={handleClick}
        className="w-full py-3 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition"
      >
        {text}
      </button>
    </div>
  )
}