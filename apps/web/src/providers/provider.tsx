'use client'

import { SdkProvider, SessionHandler } from '@repo/sdk'
import { PropsWithChildren } from 'react'

export const Provider = ({ children, ...props }: PropsWithChildren<{ accessToken?: string }>) => {
  return (
    <SdkProvider {...props}>
      <SessionHandler />
      {children}
    </SdkProvider>
  )
}
