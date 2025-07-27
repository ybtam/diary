'use client'

import { useTRPC } from '@repo/sdk'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'

import { DiaryEntryList } from './_components/diary-entry-list'

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">My Diary Entries</h1>
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
