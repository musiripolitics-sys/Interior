import { redirect } from 'next/navigation'
import { getAdminFromCookie } from '@/lib/admin-auth'
import { getSupabaseAdmin, type Lead } from '@/lib/supabase'
import LeadsTable from './leads-table'

export const metadata = {
  title: 'Leads — Admin',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

async function loadLeads(): Promise<{ leads: Lead[]; error?: string }> {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('interior360_leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500)
    if (error) return { leads: [], error: error.message }
    return { leads: (data ?? []) as Lead[] }
  } catch (err) {
    return { leads: [], error: err instanceof Error ? err.message : 'Unknown error' }
  }
}

export default async function AdminLeadsPage() {
  const admin = await getAdminFromCookie()
  if (!admin) redirect('/admin/login')

  const { leads, error } = await loadLeads()

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      <header className="bg-[#1A1815] text-[#FAF7F0] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="/logo-white.avif"
            alt="Interiors360"
            width={224}
            height={98}
            className="h-7 w-auto"
          />
          <span className="text-xs uppercase tracking-[0.2em] text-[#FAF7F0]/50 hidden sm:inline">
            Admin · Leads
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="text-[#FAF7F0]/55">
            Signed in as <span className="text-[#FFC844] font-medium">{admin.username}</span>
          </span>
          <LogoutButton />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl text-[#1A1815] tracking-tight">
              Enquiries{' '}
              <span className="italic text-[#FF7A1A]">received</span>
            </h1>
            <p className="mt-2 text-sm text-[#1A1815]/65">
              {leads.length} {leads.length === 1 ? 'lead' : 'leads'} · Most recent first
            </p>
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">
            <strong className="block mb-1">Could not load leads</strong>
            {error}
            <p className="mt-2 text-red-700/80">
              Make sure the <code className="px-1 bg-white rounded">interior360_leads</code> table exists in Supabase. See README for the SQL.
            </p>
          </div>
        ) : (
          <LeadsTable leads={leads} />
        )}
      </main>
    </div>
  )
}

function LogoutButton() {
  return (
    <form action="/api/admin/logout" method="post">
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 rounded-full border border-[#FAF7F0]/20 hover:border-[#FF7A1A] hover:text-[#FF7A1A] text-[#FAF7F0]/80 px-3 py-1.5 transition-colors"
      >
        Sign out
      </button>
    </form>
  )
}
