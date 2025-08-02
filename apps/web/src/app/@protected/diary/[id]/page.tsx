'use client'

import { useTRPC } from '@repo/sdk'
import { Spinner, Tiptap } from '@repo/ui'
import { useDebouncedCallback } from '@tanstack/react-pacer'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { Suspense, use } from 'react'

interface Props {
  params: Promise<{ id: string }>
}

export default function DiaryEntryPage(props: Props) {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <Loader {...props} />
    </Suspense>
  )
}

const Loader = (props: Props) => {
  const { id } = use(props.params)

  const trpc = useTRPC()

  const { data } = useSuspenseQuery(trpc.diary.getById.queryOptions({ id: Number(id) }))

  const { isPending: isSaving, mutate } = useMutation(trpc.diary.update.mutationOptions({}))

  const debouncer = useDebouncedCallback(mutate, {
    wait: 500,
  })

  if (!data?.content) throw new Error('No content found')

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        {isSaving && (
          <span className="flex items-center gap-2 text-sm text-gray-500">
            <Spinner className="h-3 w-3" />
            Saving...
          </span>
        )}
      </div>

      <div className="notion-editor">
        <Tiptap
          className="prose prose-lg min-h-[calc(100vh-12rem)] max-w-none focus:outline-none"
          content={data.content}
          onChange={value => {
            debouncer({
              content: value,
              id: Number(id),
            })
          }}
        />
      </div>
    </>
  )
}
