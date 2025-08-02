import type { Metadata } from 'next'

import { auth, SessionProvider } from '@repo/sdk'

import '@/style/globals.css'
import { Spinner } from '@repo/ui'
import { cn } from '@repo/ui/lib'
import { Geist, Geist_Mono } from 'next/font/google'
import { ReactNode, Suspense } from 'react'

import { Provider } from '@/providers/provider'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  description: 'Make your projects management easier',
  title: 'Manage your projects',
}

export default async function RootLayout(
  props: Readonly<{
    protected: ReactNode
    public: ReactNode
  }>,
) {
  return (
    <html lang="en">
      <body className={cn(geistSans.variable, geistMono.variable, 'antialiased')}>
        <Suspense
          fallback={
            <div className={'flex h-svh w-full items-center justify-center'}>
              <Spinner />
            </div>
          }
        >
          <Loader {...props} />
        </Suspense>
      </body>
    </html>
  )
}

const Loader = async ({
  protected: protectedApp,
  public: publicApp,
}: Readonly<{
  protected: ReactNode
  public: ReactNode
}>) => {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <Provider accessToken={session?.user?.access_token}>
        {!session ? publicApp : protectedApp}
      </Provider>
    </SessionProvider>
  )
}
