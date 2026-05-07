import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

type LeadPayload = {
  kind?: 'enquiry' | 'quotation'
  name?: string
  phone?: string
  email?: string
  city?: string
  projectType?: string
  area?: string
  budget?: string
  timeline?: string
  notes?: string
}

export async function POST(req: Request) {
  let body: LeadPayload
  try {
    body = (await req.json()) as LeadPayload
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const kind: 'enquiry' | 'quotation' =
    body.kind === 'enquiry' ? 'enquiry' : 'quotation'

  const requiredAlways: Array<keyof LeadPayload> = ['name', 'phone', 'email']
  const requiredQuotation: Array<keyof LeadPayload> = [
    'city',
    'projectType',
    'area',
    'budget',
    'timeline',
  ]
  const required = kind === 'quotation' ? [...requiredAlways, ...requiredQuotation] : requiredAlways
  const missing = required.filter((k) => !body[k] || String(body[k]).trim() === '')
  if (missing.length) {
    return NextResponse.json(
      { error: `Missing fields: ${missing.join(', ')}` },
      { status: 400 },
    )
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email!)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  try {
    const supabase = getSupabaseAdmin()
    const { error } = await supabase.from('interior360_leads').insert({
      kind,
      name: body.name!.trim(),
      phone: body.phone!.trim(),
      email: body.email!.trim().toLowerCase(),
      city: body.city?.trim() || null,
      project_type: body.projectType?.trim() || null,
      area: body.area?.trim() || null,
      budget: body.budget?.trim() || null,
      timeline: body.timeline?.trim() || null,
      notes: body.notes?.trim() || null,
    })

    if (error) {
      console.error('[interior360 lead insert error]', error)
      return NextResponse.json(
        { error: 'Could not save your enquiry. Please call us directly.' },
        { status: 500 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[interior360 lead exception]', err)
    return NextResponse.json(
      { error: 'Server is misconfigured. Please call us directly.' },
      { status: 500 },
    )
  }
}
