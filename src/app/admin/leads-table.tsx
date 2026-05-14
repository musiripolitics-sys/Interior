'use client'

import { useMemo, useState } from 'react'
import { Search, Mail, Phone, MapPin, X } from 'lucide-react'
import type { Lead } from '@/lib/supabase'

function fmtDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  const [q, setQ] = useState('')
  const [active, setActive] = useState<Lead | null>(null)

  const filtered = useMemo(() => {
    if (!q.trim()) return leads
    const needle = q.trim().toLowerCase()
    return leads.filter((l) =>
      [l.name, l.email, l.phone, l.city, l.project_type, l.budget, l.timeline]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(needle),
    )
  }, [leads, q])

  if (leads.length === 0) {
    return (
      <div className="rounded-2xl border border-[#000000]/10 bg-white p-12 text-center">
        <p className="font-[family-name:var(--font-playfair)] text-2xl text-[#000000]">
          No leads yet.
        </p>
        <p className="mt-2 text-sm text-[#000000]/60">
          The form on your landing page will drop new enquiries here in real time.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="mb-5 relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#000000]/40" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, email, city, budget..."
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#000000]/12 text-sm text-[#000000] placeholder:text-[#000000]/35 focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/20 outline-none transition"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#000000]/10 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-[#FFFFFF] text-[#000000]/55 uppercase tracking-[0.12em] text-[10px]">
            <tr>
              <Th>Received</Th>
              <Th>Kind</Th>
              <Th>Name</Th>
              <Th>Contact</Th>
              <Th>City</Th>
              <Th>Project</Th>
              <Th>Budget</Th>
              <Th>Timeline</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr
                key={l.id}
                onClick={() => setActive(l)}
                className="border-t border-[#000000]/8 hover:bg-[#FFB400]/5 cursor-pointer transition-colors"
              >
                <Td className="text-[#000000]/65 whitespace-nowrap">{fmtDate(l.created_at)}</Td>
                <Td>
                  <KindPill kind={l.kind} />
                </Td>
                <Td className="font-medium text-[#000000]">{l.name}</Td>
                <Td>
                  <div className="flex flex-col gap-0.5">
                    <a
                      href={`mailto:${l.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-[#000000] hover:text-[#FFB400]"
                    >
                      {l.email}
                    </a>
                    <a
                      href={`tel:${l.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-[#000000]/65 hover:text-[#FFB400] text-xs"
                    >
                      {l.phone}
                    </a>
                  </div>
                </Td>
                <Td className="text-[#000000]/75">{l.city ?? '—'}</Td>
                <Td className="text-[#000000]/75">{l.project_type ?? '—'}</Td>
                <Td>
                  <span className="inline-flex items-center rounded-full bg-[#FFB400]/10 text-[#FFB400] px-2.5 py-0.5 text-xs font-medium">
                    {l.budget ?? '—'}
                  </span>
                </Td>
                <Td className="text-[#000000]/75 whitespace-nowrap">{l.timeline ?? '—'}</Td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="px-6 py-10 text-center text-sm text-[#000000]/55">
            No matches for &ldquo;{q}&rdquo;.
          </div>
        )}
      </div>

      {active && <LeadDrawer lead={active} onClose={() => setActive(null)} />}
    </>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left font-medium px-4 py-3">{children}</th>
}
function KindPill({ kind }: { kind: 'enquiry' | 'quotation' }) {
  const isEnquiry = kind === 'enquiry'
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-[0.12em] font-medium ${
        isEnquiry
          ? 'bg-[#FFB400]/20 text-[#000000]'
          : 'bg-[#FFB400]/15 text-[#000000]'
      }`}
    >
      {kind}
    </span>
  )
}
function Td({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3.5 align-top ${className}`}>{children}</td>
}

function LeadDrawer({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-[#000000]/40 backdrop-blur-sm flex justify-end"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md h-full overflow-y-auto p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="text-xs uppercase tracking-[0.18em] text-[#000000]/55">
                {fmtDate(lead.created_at)}
              </p>
              <KindPill kind={lead.kind} />
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-[#000000]">
              {lead.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-full hover:bg-[#000000]/5 text-[#000000]/55"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-sm mb-6">
          <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-[#000000] hover:text-[#FFB400]">
            <Mail className="w-4 h-4 text-[#FFB400]" /> {lead.email}
          </a>
          <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-[#000000] hover:text-[#FFB400]">
            <Phone className="w-4 h-4 text-[#FFB400]" /> {lead.phone}
          </a>
          {lead.city && (
            <div className="flex items-center gap-2 text-[#000000]/75">
              <MapPin className="w-4 h-4 text-[#FFB400]" /> {lead.city}
            </div>
          )}
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm border-t border-[#000000]/10 pt-6">
          <Detail label="Project type" value={lead.project_type} />
          <Detail label="Carpet area" value={lead.area} />
          <Detail label="Budget" value={lead.budget} highlight />
          <Detail label="Timeline" value={lead.timeline} />
        </dl>

        {lead.notes && (
          <div className="mt-6 pt-6 border-t border-[#000000]/10">
            <dt className="text-xs uppercase tracking-[0.18em] text-[#000000]/55 mb-2">Notes</dt>
            <dd className="text-sm text-[#000000] leading-relaxed whitespace-pre-wrap">
              {lead.notes}
            </dd>
          </div>
        )}
      </div>
    </div>
  )
}

function Detail({ label, value, highlight }: { label: string; value: string | null; highlight?: boolean }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.18em] text-[#000000]/55 mb-1">{label}</dt>
      <dd className={highlight ? 'text-[#FFB400] font-semibold' : 'text-[#000000]'}>
        {value ?? '—'}
      </dd>
    </div>
  )
}
