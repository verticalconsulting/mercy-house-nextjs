import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Mercy House Adult & Teen Challenge - Recovery and Rehabilitation',
  description: 'Faith-based recovery program in Mississippi offering hope and healing for those struggling with addiction. Residential treatment for men, women, and teens.',
  keywords: 'addiction recovery, faith-based treatment, Mississippi rehabilitation, teen challenge, adult recovery program',
  openGraph: {
    title: 'Mercy House Adult & Teen Challenge',
    description: 'Faith-based recovery and rehabilitation programs in Mississippi',
    url: 'https://mercyhouseatc.com',
    siteName: 'Mercy House ATC',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mercy House Adult & Teen Challenge',
    description: 'Faith-based recovery and rehabilitation programs in Mississippi',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}