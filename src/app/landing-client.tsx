'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  AnimatePresence,
} from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  Clock,
  Compass,
  Hammer,
  Home,
  Layers,
  Loader2,
  Phone,
  Play,
  Sofa,
  Sparkles,
  Star,
  UtensilsCrossed,
} from 'lucide-react'
import { toast } from 'sonner'

const HERO_IMAGE = '/6066561307999144792%20(1).jpg'
const HERO_IMAGE_ALT = '/6269543545467244420.jpg'

const PROJECTS = [
  {
    title: 'Living Room',
    image: '/3%20(2).png',
  },
  {
    title: 'Modular Kitchen',
    image: '/02.png',
  },
  {
    title: 'Master Bedroom',
    image: '/10%20(1).png',
  },
  {
    title: 'Dining Area',
    image: '/18.png',
  },
]

const SERVICES = [
  { icon: Home, title: 'Villa & Bungalow Interiors' },
  { icon: Layers, title: 'Penthouse & High-rise' },
  { icon: UtensilsCrossed, title: 'Modular Kitchens' },
  { icon: Sofa, title: 'Bespoke Furniture' },
  { icon: Sparkles, title: 'Lighting & Décor' },
  { icon: Compass, title: 'Vastu-aligned Design' },
]

const PROCESS_STEPS = [
  { n: '01', title: 'Discover' },
  { n: '02', title: 'Design' },
  { n: '03', title: 'Build' },
  { n: '04', title: 'Handover' },
]

const STATS = [
  { value: 380, suffix: '+', label: 'Projects Delivered' },
  { value: 22, suffix: '', label: 'Cities Across India' },
  { value: 17, suffix: ' yrs', label: 'In Practice' },
  { value: 60, suffix: ' days', label: 'Avg. Handover' },
]

const TESTIMONIALS = [
  {
    quote:
      'Great experience with interios starting from planning, continuous follow up, great expertise of interior designers accommodate according to our expectations specially designer Hamid worked out very well. All the work done by designer were exceptional. Thanks to interios team for great job and made our work easy with passion and friendliness. Very special thanks to designer Roshan, site supervisor Mr. Senthil, prabu and I can say everyone from interiios were friendly and passionate. Big thanks to all.',
    name: 'Thenmozhi Ashok',
    role: 'Verified Google review · A year ago',
  },
  {
    quote:
      'Had an amazing experience with MK Design in our interior journey. They have an amazing team (Aumirtha, Senthil, Jayaprabhu, Aravindan) right from design to completion, they are very professional, helping and reachable whenever we need to clear our doubts and to provide solutions for the problems. Quality of products used for plywood, hinges are top-notch where they never compromise in quality and handover time is as expected without any delay which is very useful for our planning. I highly recommend them to make your home dream come true.',
    name: 'Balaji Karunanidhi',
    role: 'Verified Google review · A year ago',
  },
  {
    quote:
      "Excellent work by MK Designs! They have done interiors to my villa and my office as well. I'm totally a satisfied and happy customer from day 1 till finishing. Such an extra ordinary team of members Roshind, aravind, sastha and senthil sir. Whenever we look for alternatives, they are always open to our ideas and even they are ready to change the designs during work as per the customer choices which was not even possible in many firms. Such a hardworking and creative team!! I strongly recommend them for interiors. All the best for your future projects and wishing you all and prashanth sir to reach great heights!!",
    name: 'Kiruthika C.',
    role: 'Local Guide · A year ago',
  },
  {
    quote:
      'Much appreciated for the patience and persistence to ensure the outcome is as close as possible to the rendered model. The entire team from designer, engineer, supervisor were co-operative and met our demands flawlessly. Highly recommend them for the various workmanship and a peaceful outcome for interior designing.',
    name: 'SundaraPandyan SA',
    role: 'Local Guide · 2 years ago',
  },
]

const ROTATING_WORDS = ['Villas.', 'Penthouses.', 'Bungalows.', 'Heritage Homes.']

function LogoMark({ small = false }: { small?: boolean }) {
  return (
    <img
      src="/logo-black.png"
      alt="Interiors360"
      width={2032}
      height={891}
      className={small ? 'h-9 w-auto' : 'h-12 lg:h-14 w-auto'}
    />
  )
}

function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(target * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, target, duration])

  return { value, ref }
}

function StatCounter({
  value,
  suffix,
  label,
  accent = false,
}: {
  value: number
  suffix: string
  label: string
  accent?: boolean
}) {
  const { value: n, ref } = useCountUp(value)
  return (
    <div className="border-l border-[#000000]/15 pl-6 py-2">
      <div className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-medium tabular-nums tracking-tight text-[#000000]">
        <span ref={ref}>{n}</span>
        <span className={accent ? 'text-[#FFB400]' : 'text-[#FFB400]'}>
          {suffix}
        </span>
      </div>
      <div className="mt-2 text-xs uppercase tracking-[0.2em] text-[#000000]/55">
        {label}
      </div>
    </div>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FFB400] via-[#FFB400] to-[#FFB400] z-50 shadow-[0_0_12px_rgba(255,180,0,0.5)]"
    />
  )
}

function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03] mix-blend-multiply"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>\")",
      }}
    />
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#FFFFFF]/85 backdrop-blur-xl border-b border-[#000000]/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" aria-label="Interiors360 home">
          <LogoMark />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-[#000000]/75">
          <a href="#services" className="hover:text-[#FFB400] transition">
            Services
          </a>
          <a href="#process" className="hover:text-[#FFB400] transition">
            Process
          </a>
          <a href="#projects" className="hover:text-[#FFB400] transition">
            Projects
          </a>
          <a href="#testimonials" className="hover:text-[#FFB400] transition">
            Voices
          </a>
        </nav>
        <a
          href="#consult"
          className="group relative inline-flex items-center gap-2 rounded-full bg-[#FFB400] hover:bg-[#FFB400] text-white text-sm font-semibold px-5 py-2.5 transition-all duration-300 shadow-[0_0_0_0_rgba(255,180,0,0)] hover:shadow-[0_0_25px_0_rgba(255,180,0,0.5)]"
        >
          Get a quotation
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </header>
  )
}

function MeshBackground() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-40 -left-20 w-[700px] h-[700px] rounded-full blur-[140px]"
        style={{ background: 'radial-gradient(circle, rgba(255,180,0,0.22) 0%, transparent 70%)' }}
        animate={{ x: [0, 60, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-20 w-[600px] h-[600px] rounded-full blur-[140px]"
        style={{ background: 'radial-gradient(circle, rgba(255,180,0,0.28) 0%, transparent 70%)' }}
        animate={{ x: [0, -40, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full blur-[140px]"
        style={{ background: 'radial-gradient(circle, rgba(255,180,0,0.14) 0%, transparent 70%)' }}
        animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
    </div>
  )
}

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 160])
  const yText = useTransform(scrollYProgress, [0, 1], [0, -60])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const [wordIdx, setWordIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(
      () => setWordIdx((i) => (i + 1) % ROTATING_WORDS.length),
      2400,
    )
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-32 pb-20 px-6 overflow-hidden"
    >
      <MeshBackground />

      <motion.div
        style={{ y: yText, opacity }}
        className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10"
      >
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#FFB400]/30 bg-[#FFB400]/8 backdrop-blur-sm px-3.5 py-1.5 text-xs font-medium tracking-[0.18em] uppercase text-[#FFB400]"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-[#FFB400] animate-ping opacity-60" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-[#FFB400]" />
            </span>
            Now booking — Q3 / Q4 2026 projects
          </motion.div>

          <h1 className="mt-7 font-[family-name:var(--font-playfair)] text-[44px] leading-[1.08] sm:text-6xl lg:text-[68px] tracking-tight text-[#000000]">
            <AnimatedHeadline />
            <span className="block mt-3">
              <span className="text-[#000000]/40 text-[0.7em] mr-3 align-middle">for</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIdx}
                  initial={{ opacity: 0, y: 20, rotateX: -45 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -20, rotateX: 45 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block italic font-[family-name:var(--font-playfair)] text-[#FFB400]"
                >
                  {ROTATING_WORDS[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#consult"
              className="group relative inline-flex items-center gap-3 rounded-full bg-[#FFB400] hover:bg-[#FFB400] text-white text-base font-semibold px-7 py-4 transition-all shadow-[0_8px_30px_-6px_rgba(255,180,0,0.45)] hover:shadow-[0_12px_40px_-4px_rgba(255,180,0,0.6)] hover:-translate-y-0.5"
            >
              Get a quotation
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white text-[#FFB400]">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 text-base font-medium text-[#000000]/80 hover:text-[#FFB400] transition"
            >
              View signature projects
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

        </div>

        <motion.div
          style={{ y: yImg }}
          className="lg:col-span-5 relative h-[520px] lg:h-[640px]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 rounded-[28px] overflow-hidden shadow-2xl shadow-[#000000]/20 ring-1 ring-[#000000]/5"
          >
            <img
              src={HERO_IMAGE}
              alt="Modern luxury living room with curved sofa, brass accents and warm natural light"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/25 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, y: 30 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-8 -left-8 w-44 h-56 rounded-2xl overflow-hidden shadow-xl shadow-[#000000]/30 border-4 border-[#FFFFFF]"
          >
            <img
              src={HERO_IMAGE_ALT}
              alt="Detail of bespoke marble dining table and pendant lighting"
              className="w-full h-full object-cover"
            />
          </motion.div>

        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#000000]/40"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-[#FFB400] to-transparent"
        />
      </motion.div>
    </section>
  )
}

function AnimatedHeadline() {
  const lines = [
    ['Interiors', 'crafted'],
    ['for the homes', 'you', 'will'],
    ['live', 'in', 'forever.'],
  ]
  let wordIdx = 0
  return (
    <span className="block">
      {lines.slice(0, 2).map((line, li) => (
        <span key={li} className="block overflow-hidden">
          <span className="inline-block">
            {line.map((word) => {
              const i = wordIdx++
              const isAccent = word === 'crafted'
              return (
                <motion.span
                  key={`${li}-${i}`}
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.15 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`inline-block mr-3 ${
                    isAccent
                      ? 'italic text-[#FFB400]'
                      : ''
                  }`}
                >
                  {word}
                </motion.span>
              )
            })}
          </span>
        </span>
      ))}
    </span>
  )
}

function Marquee() {
  const items = [
    'Architectural Digest',
    'ELLE Decor',
    'Good Homes',
    'AD100 — 2024',
    'Featured in Vogue Living',
    'IIID Excellence Award',
    'Houzz Best of Design',
  ]
  return (
    <section className="relative border-y border-[#000000]/10 bg-white py-6 overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      <div className="relative flex">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          className="flex gap-14 whitespace-nowrap shrink-0"
        >
          {[...items, ...items, ...items].map((it, i) => (
            <span
              key={i}
              className="font-[family-name:var(--font-playfair)] italic text-lg text-[#000000]/55"
            >
              {it} <span className="ml-14 text-[#FFB400]">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FFB400]"
    >
      <span className="block w-8 h-px bg-[#FFB400]" />
      {children}
    </motion.div>
  )
}

function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <SectionLabel>Services</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="mt-4 font-[family-name:var(--font-playfair)] text-4xl md:text-5xl tracking-tight text-[#000000] max-w-3xl"
          >
            One studio.{' '}
            <span className="italic text-[#FFB400]">Every</span> discipline
            under one roof.
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#000000]/10 rounded-3xl overflow-hidden border border-[#000000]/10">
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group relative bg-white hover:bg-[#FFB400] p-8 lg:p-10 transition-colors duration-500 cursor-default"
              >
                <Icon className="w-9 h-9 text-[#FFB400] group-hover:text-white transition-colors" />
                <h3 className="mt-6 font-[family-name:var(--font-playfair)] text-2xl text-[#000000] group-hover:text-white transition-colors">
                  {s.title}
                </h3>
                <ArrowUpRight className="absolute top-8 right-8 w-5 h-5 text-[#000000]/30 group-hover:text-white group-hover:rotate-12 transition-all duration-500" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section
      id="process"
      className="py-24 lg:py-32 px-6 bg-[#FFB400] text-[#000000] relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #000000 1px, transparent 1px), linear-gradient(to bottom, #000000 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-12 gap-10 mb-20">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#000000]/70">
              <span className="block w-8 h-px bg-[#000000]" />
              The Signature Process
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
              className="mt-4 font-[family-name:var(--font-playfair)] text-4xl md:text-5xl tracking-tight"
            >
              Four phases.{' '}
              <span className="italic">Sixty</span> days. Zero
              ambiguity.
            </motion.h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative">
          <div className="hidden lg:block absolute top-12 left-12 right-12 h-px bg-[#000000]/30" />
          {PROCESS_STEPS.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="relative"
            >
              <div className="relative z-10 w-24 h-24 rounded-full border-2 border-[#000000] bg-[#FFB400] flex items-center justify-center mb-6">
                <span className="font-[family-name:var(--font-playfair)] italic text-3xl text-[#000000]">
                  {p.n}
                </span>
                <motion.span
                  className="absolute inset-0 rounded-full border-2 border-[#000000]/40"
                  animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                />
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl">
                {p.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const [hovered, setHovered] = useState<number | null>(null)
  return (
    <section id="projects" className="py-24 lg:py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <SectionLabel>Signature Projects</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="mt-4 font-[family-name:var(--font-playfair)] text-4xl md:text-5xl tracking-tight text-[#000000] max-w-3xl"
          >
            Quietly{' '}
            <span className="italic text-[#FFB400]">remarkable</span> homes
            for remarkable lives.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:auto-rows-[440px] lg:auto-rows-[520px]">
          {PROJECTS.map((p, i) => {
            const span =
              i === 0 || i === 3 ? 'md:col-span-7' : 'md:col-span-5'
            return (
            <motion.a
              key={p.title}
              href="#consult"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.15 }}
              className={`group relative block rounded-3xl overflow-hidden bg-white ring-1 ring-[#000000]/8 aspect-[5/4] md:aspect-auto md:h-full ${span}`}
            >
              <motion.img
                src={p.image}
                alt={`${p.title} — luxury interior`}
                className="absolute inset-0 w-full h-full object-cover"
                animate={{ scale: hovered === i ? 1.06 : 1 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/85 via-[#000000]/15 to-transparent" />
              <motion.div
                initial={false}
                animate={{ opacity: hovered === i ? 1 : 0 }}
                className="absolute inset-0 bg-[#FFB400]/20 mix-blend-overlay"
              />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                <h3 className="font-[family-name:var(--font-playfair)] text-3xl">
                  {p.title}
                </h3>
                <motion.div
                  initial={false}
                  animate={{
                    y: hovered === i ? 0 : 8,
                    opacity: hovered === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#FFB400]"
                >
                  Discover the project
                  <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Numbers() {
  return (
    <section className="relative py-20 lg:py-24 px-6 border-y border-[#000000]/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <StatCounter
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              accent={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = setInterval(
      () => setActive((a) => (a + 1) % TESTIMONIALS.length),
      6500,
    )
    return () => clearInterval(id)
  }, [])

  return (
    <section id="testimonials" className="py-24 lg:py-32 px-6 relative">
      <div className="max-w-5xl mx-auto text-center">
        <SectionLabel>Voices</SectionLabel>
        <div className="relative mt-12 min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-[#FFB400] text-7xl font-[family-name:var(--font-playfair)] leading-none mb-4 select-none">
                &ldquo;
              </div>
              <div className="flex items-center justify-center gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-[#FFB400] fill-[#FFB400]"
                  />
                ))}
              </div>
              <p className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl text-[#000000] leading-relaxed max-w-3xl mx-auto">
                {TESTIMONIALS[active].quote}
              </p>
              <div className="mt-8 text-sm text-[#000000]/70">
                <span className="font-medium text-[#FFB400]">
                  {TESTIMONIALS[active].name}
                </span>
                <span className="block text-xs uppercase tracking-[0.18em] mt-1 text-[#000000]/50">
                  {TESTIMONIALS[active].role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-2 mt-10">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              aria-label={`View testimonial ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1 rounded-full transition-all ${
                i === active ? 'w-10 bg-[#FFB400]' : 'w-5 bg-[#000000]/15'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ConsultForm() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, kind: 'quotation' }),
      })
      if (!res.ok) throw new Error('Submission failed')
      toast.success('Thank you. A senior designer will reach out within 24 hours.')
      setSubmitted(true)
      form.reset()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="consult"
      className="relative py-24 lg:py-32 px-6 text-[#000000] overflow-hidden border-t border-[#000000]/10"
    >
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#FFB400]/10 blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#FFB400]/12 blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto relative grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FFB400]">
            <span className="block w-8 h-px bg-[#FFB400]" />
            Detailed Quotation
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="mt-4 font-[family-name:var(--font-playfair)] text-4xl md:text-5xl tracking-tight"
          >
            Build your{' '}
            <span className="italic text-[#FFB400]">brief</span> and we&rsquo;ll quote.
          </motion.h2>

          <div className="mt-12 pt-8 border-t border-[#000000]/10 grid grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#000000]/55 mb-2">
                <Phone className="w-3 h-3" />
                Talk to us
              </div>
              <a
                href="tel:+910000000000"
                className="font-[family-name:var(--font-playfair)] text-lg text-[#000000] hover:text-[#FFB400] transition"
              >
                +91 00000 00000
              </a>
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#000000]/55 mb-2">
                <Clock className="w-3 h-3" />
                Studio hours
              </div>
              <div className="font-[family-name:var(--font-playfair)] text-lg">
                Mon–Sat · 10–7
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            onSubmit={onSubmit}
            className="rounded-3xl bg-white border border-[#000000]/10 text-[#000000] p-8 md:p-10 shadow-2xl shadow-[#000000]/10"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <div className="mx-auto w-16 h-16 rounded-full bg-[#FFB400]/15 flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-7 h-7 text-[#FFB400]" />
                  </div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-3xl mb-3">
                    Thank you.
                  </h3>
                  <p className="text-[#000000]/70 max-w-sm mx-auto">
                    Your enquiry is in. A senior designer will be in touch
                    within 24 hours to schedule your consultation.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-sm text-[#FFB400] hover:underline"
                  >
                    Submit another enquiry
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                  <Field label="Your name" name="name" required />
                  <Field label="Phone (with country code)" name="phone" type="tel" required />
                  <Field label="Email" name="email" type="email" required className="md:col-span-2" />
                  <Field label="City" name="city" required />
                  <SelectField
                    label="Project type"
                    name="projectType"
                    options={[
                      'Villa / Bungalow',
                      'Penthouse',
                      'Apartment (3BHK+)',
                      'Modular Kitchen only',
                      'Commercial / Office',
                      'Other',
                    ]}
                    required
                  />
                  <SelectField
                    label="Indicative budget"
                    name="budget"
                    options={[
                      '₹15L – ₹20L',
                      '₹20L – ₹25L',
                      '₹25L+',
                      'Prefer to discuss',
                    ]}
                    required
                    className="md:col-span-2"
                  />
                  <SelectField
                    label="Timeline"
                    name="timeline"
                    options={[
                      'Immediate (next 30 days)',
                      'Within 3 months',
                      '3–6 months',
                      'Just exploring',
                    ]}
                    required
                    className="md:col-span-2"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="md:col-span-2 group relative inline-flex items-center justify-center gap-3 rounded-xl bg-[#FFB400] hover:bg-[#FFB400] disabled:opacity-60 text-white text-base font-semibold px-6 py-4 transition-all shadow-[0_8px_30px_-6px_rgba(255,180,0,0.4)] hover:shadow-[0_12px_40px_-4px_rgba(255,180,0,0.6)]"
                  >
                    {submitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Request my private consultation
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white text-[#FFB400] transition-transform group-hover:translate-x-1">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </>
                    )}
                  </button>
                  <p className="md:col-span-2 text-[11px] text-[#000000]/55 text-center">
                    By submitting, you agree to be contacted by Interiors360.
                    We never share your details.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
  className = '',
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs uppercase tracking-[0.18em] text-[#000000]/60">
        {label} {required && <span className="text-[#FFB400]">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full bg-white border border-[#000000]/15 rounded-xl px-4 py-3 text-sm text-[#000000] placeholder:text-[#000000]/35 focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/25 outline-none transition"
      />
    </div>
  )
}

function SelectField({
  label,
  name,
  options,
  required,
  className = '',
}: {
  label: string
  name: string
  options: string[]
  required?: boolean
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs uppercase tracking-[0.18em] text-[#000000]/60">
        {label} {required && <span className="text-[#FFB400]">*</span>}
      </label>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full bg-white border border-[#000000]/15 rounded-xl px-4 py-3 text-sm text-[#000000] focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/25 outline-none transition appearance-none cursor-pointer"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}

function Footer() {
  return (
    <footer className="relative border-t border-[#000000]/10 py-14 lg:py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <LogoMark small />
        </div>
        <div className="flex items-center gap-6 text-xs text-[#000000]/60">
          <span className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#FFB400]" />
            AD100 — 2024 Honoree
          </span>
          <span className="flex items-center gap-2">
            <Hammer className="w-4 h-4 text-[#FFB400]" />
            Established 2008
          </span>
        </div>
        <div className="text-xs text-[#000000]/45">
          © {new Date().getFullYear()} Interiors360. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

const WALKTHROUGH_VIDEO = {
  src: '/videos/walkthrough.mp4',
  poster: '/videos/walkthrough-thumb.jpg',
}

const CLIENT_VIDEOS = [
  {
    src: '/videos/testimonial-1.mp4',
    poster: '/videos/testimonial-1-thumb.jpg',
    name: 'Mrs. Raja Gopal',
    role: '3 BHK flat',
    location: 'R.A. Puram',
  },
  {
    src: '/videos/testimonial-2.mp4',
    poster: '/videos/testimonial-2-thumb.jpg',
    name: 'Mrs. Meena Jayaram',
    role: '3 BHK flat',
    location: 'Adambakkam',
  },
]

function VideoFrame({
  src,
  poster,
  title,
}: {
  src: string
  poster: string
  title: string
}) {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  function startPlay() {
    setPlaying(true)
    const v = videoRef.current
    if (!v) return
    v.play().catch(() => {
      v.muted = true
      v.play().catch(() => {})
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-video w-full rounded-3xl overflow-hidden ring-1 ring-[#000000]/10 bg-[#000000] shadow-2xl shadow-[#000000]/15"
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        controls={playing}
        controlsList="nodownload noremoteplayback noplaybackrate"
        disablePictureInPicture
        onContextMenu={(e) => e.preventDefault()}
        aria-label={title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {!playing && (
        <button
          type="button"
          onClick={startPlay}
          aria-label={`Play ${title}`}
          className="group absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/45 via-[#000000]/15 to-transparent" />
          <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FFB400] text-white shadow-[0_15px_45px_-10px_rgba(255,180,0,0.7)] transition-transform duration-500 group-hover:scale-110">
            <span aria-hidden className="absolute inset-0 rounded-full bg-[#FFB400] animate-ping opacity-40" />
            <Play className="relative w-8 h-8 sm:w-9 sm:h-9 fill-white ml-1" />
          </div>
        </button>
      )}
    </motion.div>
  )
}

function WalkthroughVideo() {
  return (
    <section className="relative py-20 lg:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <SectionLabel>Walkthrough</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="mt-4 font-[family-name:var(--font-playfair)] text-4xl md:text-5xl tracking-tight text-[#000000] max-w-3xl"
          >
            A finished{' '}
            <span className="italic text-[#FFB400]">home tour</span>, in
            ninety seconds.
          </motion.h2>
        </div>
        <VideoFrame
          src={WALKTHROUGH_VIDEO.src}
          poster={WALKTHROUGH_VIDEO.poster}
          title="Interiors360 — Signature project walkthrough"
        />
      </div>
    </section>
  )
}

function SecondaryVideo() {
  return (
    <section className="relative py-20 lg:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <SectionLabel>Hear from our clients</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="mt-4 font-[family-name:var(--font-playfair)] text-4xl md:text-5xl tracking-tight text-[#000000] max-w-3xl"
          >
            In their{' '}
            <span className="italic text-[#FFB400]">own words</span>.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {CLIENT_VIDEOS.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col"
            >
              <VideoFrame
                src={c.src}
                poster={c.poster}
                title={`${c.name} — Interiors360 client testimonial`}
              />
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[#000000] leading-tight">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#000000]/55">
                    {c.role} · {c.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function QuickEnquiry() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, kind: 'enquiry' }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Submission failed')
      }
      toast.success('Thank you. A senior designer will call you within 24 hours.')
      setSubmitted(true)
      form.reset()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="enquiry" className="relative py-20 lg:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[28px] bg-white border border-[#000000]/10 shadow-2xl shadow-[#000000]/8 overflow-hidden"
        >
          <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-[#FFB400]/8 blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-[360px] h-[360px] rounded-full bg-[#FFB400]/12 blur-[120px] pointer-events-none" />

          <div className="relative grid lg:grid-cols-12 gap-10 lg:gap-14 p-8 md:p-12">
            <div className="lg:col-span-5">
              <SectionLabel>Quick enquiry</SectionLabel>
              <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl md:text-5xl tracking-tight text-[#000000] leading-[1.05]">
                Just a few{' '}
                <span className="italic text-[#FFB400]">details</span>, and
                we&rsquo;ll call.
              </h2>
            </div>

            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="thanks-quick"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center py-10"
                  >
                    <div className="mx-auto w-14 h-14 rounded-full bg-[#FFB400]/15 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-6 h-6 text-[#FFB400]" />
                    </div>
                    <h3 className="font-[family-name:var(--font-playfair)] text-2xl mb-2 text-[#000000]">
                      We&rsquo;ll be in touch.
                    </h3>
                    <p className="text-sm text-[#000000]/65 max-w-xs">
                      A senior designer will call you within the next working day.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-sm text-[#FFB400] hover:underline"
                    >
                      Submit another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form-quick"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={onSubmit}
                    className="space-y-4"
                  >
                    <Field label="Your name" name="name" required />
                    <Field label="Email" name="email" type="email" required />
                    <Field label="Phone (with country code)" name="phone" type="tel" required />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full group inline-flex items-center justify-center gap-3 rounded-xl bg-[#FFB400] hover:bg-[#FFB400] disabled:opacity-60 text-white text-base font-semibold px-6 py-4 transition-all shadow-[0_8px_30px_-6px_rgba(255,180,0,0.4)] hover:shadow-[0_12px_40px_-4px_rgba(255,180,0,0.6)]"
                    >
                      {submitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          Request a call back
                          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white text-[#FFB400] transition-transform group-hover:translate-x-1">
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-[#000000]/50 text-center">
                      Need a detailed quotation instead?{' '}
                      <a href="#consult" className="text-[#FFB400] hover:underline">
                        Use the full form ↓
                      </a>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function LandingClient() {
  return (
    <main className="relative">
      <ScrollProgress />
      <GrainOverlay />
      <Nav />
      <Hero />
      <Marquee />
      <WalkthroughVideo />
      <Services />
      <Process />
      <QuickEnquiry />
      <Projects />
      <Numbers />
      <SecondaryVideo />
      <Testimonials />
      <ConsultForm />
      <Footer />
    </main>
  )
}
