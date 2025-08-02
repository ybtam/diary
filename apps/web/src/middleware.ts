import { auth } from '@repo/sdk'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = await auth()
  
  console.log('Middleware session:', session)
  console.log('Session error:', session?.error)

  if (session?.error === 'RefreshTokenError') {
    console.log('Detected RefreshTokenError, redirecting to /')
    const response = NextResponse.redirect(new URL('/', request.url))
    response.cookies.delete(process.env.SESSION_TOKEN_COOKIE_NAME || 'authjs.session-token')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}