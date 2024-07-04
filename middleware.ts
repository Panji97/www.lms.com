import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const token = request.cookies.get('token')

  const staticFileRegex = /\.(css|js|jpg|jpeg|png|gif|ico|svg|ttf|woff|woff2)$/
  if (pathname.startsWith('/auth/login') || staticFileRegex.test(pathname)) {
    return NextResponse.next()
  }

  if (
    !token &&
    !pathname.startsWith('/auth/login') &&
    !pathname.startsWith('/auth/forgot-password') &&
    !pathname.startsWith('/auth/register')
  ) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*']
}
