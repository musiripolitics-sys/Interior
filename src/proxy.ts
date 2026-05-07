import { NextResponse, type NextRequest } from 'next/server'

const ADMIN_COOKIE_NAME = 'i360_admin'

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (!pathname.startsWith('/admin')) return NextResponse.next()
  if (pathname === '/admin/login') return NextResponse.next()

  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value
  if (!token || token.split('.').length !== 3) {
    const url = req.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
