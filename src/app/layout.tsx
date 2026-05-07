import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const SITE_URL = 'https://www.interiors360.in'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Interiors360 | Bespoke Luxury Interior Designers in India',
    template: '%s | Interiors360',
  },
  description:
    'Award-winning luxury interior designers crafting bespoke residential & villa interiors. Turnkey design-build for ₹50L+ projects across India. Personal designer, Italian finishes, 60-day handover.',
  keywords: [
    'luxury interior designers',
    'villa interior designers India',
    'penthouse interiors',
    'bespoke home interiors',
    'turnkey interior design',
    'high end interior designers',
    'modular kitchen designers',
    'residential interior design',
    'Interiors360',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'Interiors360',
    title: 'Interiors360 — Bespoke Luxury Interiors. Delivered Turnkey.',
    description:
      'Personal designer. Italian finishes. 60-day handover. Crafting signature villa & penthouse interiors across India.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interiors360 — Bespoke Luxury Interiors',
    description:
      'Award-winning interior designers for ₹50L+ residential projects. Turnkey, end-to-end, signature design.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  category: 'Interior Design',
}

export const viewport: Viewport = {
  themeColor: '#FAF7F0',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${playfair.variable} ${inter.variable} antialiased`}
    >
      <body
        className="min-h-screen bg-[#FAF7F0] text-[#1A1815]"
        style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
      >
        {children}
        <Toaster theme="light" position="bottom-right" richColors />
      </body>
    </html>
  )
}
