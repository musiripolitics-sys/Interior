import LandingClient from './landing-client'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'InteriorDesignFirm',
  name: 'Interiors360',
  url: 'https://www.interiors360.in',
  image: 'https://www.interiors360.in/og.jpg',
  description:
    'Bespoke luxury interior designers offering turnkey residential and villa interiors across India. Specialists in ₹50L+ projects with Italian finishes and a 60-day handover guarantee.',
  priceRange: '₹₹₹₹',
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'City', name: 'Bengaluru' },
    { '@type': 'City', name: 'Mumbai' },
    { '@type': 'City', name: 'Hyderabad' },
    { '@type': 'City', name: 'Chennai' },
    { '@type': 'City', name: 'Pune' },
  ],
  serviceType: [
    'Luxury Residential Interior Design',
    'Villa Interior Design',
    'Penthouse Interior Design',
    'Modular Kitchen Design',
    'Turnkey Home Interiors',
    'Commercial Interior Design',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '187',
  },
  sameAs: ['https://www.interiors360.in'],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingClient />
    </>
  )
}
