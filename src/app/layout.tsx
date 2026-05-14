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
  themeColor: '#FFFFFF',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${playfair.variable} ${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-white text-black"
        style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
        suppressHydrationWarning
      >
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var attrs=['bis_skin_checked','bis_register'];function strip(el){if(!el||!el.removeAttribute)return;for(var i=0;i<attrs.length;i++)el.removeAttribute(attrs[i]);}document.querySelectorAll('['+attrs.join('],[')+']').forEach(strip);new MutationObserver(function(muts){for(var i=0;i<muts.length;i++){var m=muts[i];if(m.type==='attributes'){m.target.removeAttribute(m.attributeName);}else if(m.addedNodes){m.addedNodes.forEach(function(n){if(n.nodeType===1){strip(n);if(n.querySelectorAll)n.querySelectorAll('['+attrs.join('],[')+']').forEach(strip);}});}}}).observe(document.documentElement,{attributes:true,subtree:true,childList:true,attributeFilter:attrs});})();",
          }}
        />
        {children}
        <Toaster theme="light" position="bottom-right" richColors />
      </body>
    </html>
  )
}
