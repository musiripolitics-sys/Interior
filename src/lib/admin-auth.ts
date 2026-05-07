import { createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'i360_admin'

function secret() {
  return process.env.ADMIN_COOKIE_SECRET || 'fallback-please-set-ADMIN_COOKIE_SECRET'
}

function sign(payload: string) {
  return createHmac('sha256', secret()).update(payload).digest('hex')
}

export function makeToken(username: string) {
  const issued = Date.now().toString()
  const payload = `${username}.${issued}`
  return `${payload}.${sign(payload)}`
}

export function verifyToken(token: string | undefined): { username: string } | null {
  if (!token) return null
  const parts = token.split('.')
  if (parts.length !== 3) return null
  const [username, issued, sig] = parts
  const expected = sign(`${username}.${issued}`)
  const a = Buffer.from(sig, 'hex')
  const b = Buffer.from(expected, 'hex')
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null

  const ageMs = Date.now() - Number(issued)
  if (!Number.isFinite(ageMs) || ageMs < 0 || ageMs > 1000 * 60 * 60 * 24 * 7) return null

  return { username }
}

export async function getAdminFromCookie() {
  const store = await cookies()
  const c = store.get(COOKIE_NAME)?.value
  return verifyToken(c)
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME
