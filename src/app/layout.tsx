import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import { business } from '@/data/business'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'],
  display: 'swap',
})

const bebas = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-bebas',
  weight: '400',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(business.canonicalUrl),
  title: {
    default: `${business.name} | Online Personal Coaching`,
    template: `%s | ${business.name}`,
  },
  description: business.tagline,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${bebas.variable}`}>
      <body>{children}</body>
    </html>
  )
}
