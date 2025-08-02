import { auth } from '@repo/sdk'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = await auth()
  if (session?.error === 'RefreshTokenError') {
    const response = NextResponse.redirect(new URL('/', request.url))
    response.cookies.delete(process.env.SESSION_TOKEN_COOKIE_NAME || 'authjs.session-token')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
