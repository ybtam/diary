'use client'

import { useTRPC } from '@repo/sdk'
import { Button } from '@repo/ui/components'
import { useSuspenseQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Suspense } from 'react'

import { DiaryEntryList } from './_components/diary-entry-list.tsx'

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Diary Entries</h1>
        <Link href="/create">
          <Button>Create New Entry</Button>
        </Link>
      </div>
      <Suspense fallback={<div>Loading diary entries...</div>}>
        <Loader />
      </Suspense>
    </div>
  )
}

const Loader = () => {
  const trpc = useTRPC()

  const { data } = useSuspenseQuery(trpc.diary.list.queryOptions())

  return <>{data && <DiaryEntryList entries={data} />}</>
}
