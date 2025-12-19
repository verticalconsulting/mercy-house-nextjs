'use client'

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'

interface VideoHeroButton {
  text: string
  link: string
  style?: 'default' | 'secondary' | 'outline-white'
  scrollToForm?: boolean
  trackDonation?: boolean
}

interface VideoHeroProps {
  heading: string
  subheading?: string
  videoUrl: string
  posterImage?: string
  overlayOpacity?: number
  buttons?: Array<VideoHeroButton>
  trustRow?: string[]
}

export function VideoHero({
  heading,
  subheading,
  videoUrl,
  posterImage,
  overlayOpacity = 50,
  buttons = [],
  trustRow = [],
}: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Ensure video plays on mount
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error('Video autoplay failed:', err)
      })
    }
  }, [])

  const handleButtonClick = (button: VideoHeroButton) => {
    // Track donation clicks
    if (button.trackDonation) {
      import('@/lib/gtag').then(({ trackEvent }) => {
        trackEvent('donate_click', {
          event_category: 'engagement',
          event_label: button.text,
          page_location: window.location.pathname,
        })
      })
    }

    // Handle scroll to form
    if (button.scrollToForm) {
      const element = document.querySelector(button.link)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else if (!button.link.startsWith('#')) {
      // External link
      window.location.href = button.link
    }
  }

  return (
    <div className="video-hero relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover video-hero__video--grayscale"
        autoPlay
        muted
        loop
        playsInline
        poster={posterImage}
      >
        <source src={videoUrl} type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black video-hero__overlay"
        style={{
          // Use CSS variable for overlay opacity, fallback to 0.5
          // This avoids inline style for opacity directly
          // eslint-disable-next-line react/no-danger, @typescript-eslint/no-explicit-any
          ['--video-hero-overlay-opacity' as any]: overlayOpacity / 100
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {heading}
          </h1>

          {subheading && (
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {subheading}
            </p>
          )}

          {/* CTA Buttons */}
          {buttons.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  onClick={() => handleButtonClick(button)}
                  size="lg"
                  variant={
                    button.style === 'outline-white'
                      ? 'outline'
                      : button.style || 'default'
                  }
                  className={
                    button.style === 'outline-white'
                      ? 'border-white text-white hover:bg-white hover:text-black'
                      : ''
                  }
                >
                  {button.text}
                </Button>
              ))}
            </div>
          )}

          {/* Trust Row */}
          {trustRow && trustRow.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 text-sm uppercase tracking-wider opacity-80">
              {trustRow.map((item, index) => (
                <span key={index} className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white opacity-70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  )
}