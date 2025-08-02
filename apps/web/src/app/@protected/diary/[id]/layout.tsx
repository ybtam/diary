import { Button } from '@repo/ui'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

export default function DiaryLayout({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <Button
          aria-label="Go back"
          asChild
          className="text-gray-500 hover:text-gray-700"
          variant={'ghost'}
        >
          <Link href={'/'}>← Back</Link>
        </Button>
      </div>
      {children}

    </div>
  )
}
