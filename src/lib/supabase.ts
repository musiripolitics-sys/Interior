import { createClient } from '@supabase/supabase-js'

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    throw new Error('Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export type Lead = {
  id: string
  created_at: string
  kind: 'enquiry' | 'quotation'
  name: string
  phone: string
  email: string
  city: string | null
  project_type: string | null
  area: string | null
  budget: string | null
  timeline: string | null
  notes: string | null
}
