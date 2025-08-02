'use client'

import { insertDiaryEntrySchema } from '@apps/api/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTRPC } from '@repo/sdk'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Spinner,
  Tiptap,
} from '@repo/ui'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const CreateEntryPage = () => {
  const router = useRouter()
  const trpc = useTRPC()

  const form = useForm<z.infer<typeof insertDiaryEntrySchema>>({
    defaultValues: {
      content: '',
      title: '',
    },
    resolver: zodResolver(insertDiaryEntrySchema),
  })

  const { isPending, mutate } = useMutation(
    trpc.diary.create.mutationOptions({
      onSuccess: () => {
        router.push('/')
      },
    }),
  )

  const onSubmit = (values: z.infer<typeof insertDiaryEntrySchema>) => {
    mutate(values)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Create New Diary Entry</h1>
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="My amazing day" {...field} disabled />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Tiptap
                    content={field.value}
                    onChange={field.onChange}
                    onTitleChange={title => form.setValue('title', title, { shouldDirty: true })}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit">
            Create Entry {isPending && <Spinner />}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateEntryPage
