'use client'

import { signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'

export const SessionHandler = () => {
  const { data: session } = useSession()

  useEffect(() => {
    console.log(session)

    if (session?.error === 'RefreshTokenError') {
      signOut()
    }
  }, [session])

  return null
}
