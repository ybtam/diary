'use client'

import { ReactNode } from 'react'

import { useDotEnv } from '../dot-env'
import { trpcClient } from '../trpc'
import { TanstackProvider } from './tanstack-provider.tsx'
import { TRPCProvider } from './trpc-provider.ts'

export const SdkProvider = ({
  accessToken,
  children,
}: {
  accessToken?: string
  children: ReactNode
}) => {
  const env = useDotEnv()

  return (
    <TanstackProvider>
      {queryClient => (
        <TRPCProvider
          queryClient={queryClient}
          trpcClient={trpcClient({ accessToken, url: env.API_URL! })}
        >
          {children}
        </TRPCProvider>
      )}
    </TanstackProvider>
  )
}
