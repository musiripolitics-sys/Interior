'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Loader2, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

export default function LoginClient() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Login failed')
      }
      toast.success('Welcome back')
      router.push('/admin')
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#FFFFFF]">
      <div className="w-full max-w-md">
        <img
          src="/logo-black.png"
          alt="Interiors360"
          width={2032}
          height={891}
          className="h-12 w-auto mb-10"
        />

        <h1 className="font-[family-name:var(--font-playfair)] text-4xl text-[#000000] tracking-tight">
          Admin <span className="italic text-[#FFB400]">access</span>
        </h1>
        <p className="mt-2 text-sm text-[#000000]/65">
          Restricted area. Authorised personnel only.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-8 bg-white rounded-2xl border border-[#000000]/10 p-7 shadow-xl shadow-[#000000]/5 space-y-5"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-[0.18em] text-[#000000]/60">
              Username
            </label>
            <input
              autoFocus
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-white border border-[#000000]/15 rounded-xl px-4 py-3 text-sm text-[#000000] focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/25 outline-none transition"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-[0.18em] text-[#000000]/60">
              Password
            </label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white border border-[#000000]/15 rounded-xl px-4 py-3 text-sm text-[#000000] focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/25 outline-none transition"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFB400] hover:bg-[#FFB400] disabled:opacity-60 text-white text-base font-semibold px-6 py-3.5 transition-colors"
          >
            {submitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Sign in
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
