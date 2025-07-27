'use client'

import { insertUserSchema } from '@apps/api/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTRPC } from '@repo/sdk'
import { Button, Form, FormControl, FormField, FormItem, FormLabel, Input } from '@repo/ui'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { login } from '@/app/@public/_components/login-form/action.ts'

export const RegistrationForm = () => {
  const form = useForm({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },
    resolver: zodResolver(insertUserSchema),
  })

  const trpc = useTRPC()

  const { error, isPending, mutate } = useMutation(
    trpc.auth.register.mutationOptions({
      onSuccess: async data => {
        await login(data)
      },
      onError: error => {
        console.log(error)
      }
    }),
  )

  return (
    <Form {...form}>
      <form className={'flex flex-col gap-2'} onSubmit={form.handleSubmit(value => mutate(value))}>
        <FormField
          name={'firstName'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="First name" type="text" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name={'lastName'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Last name" type="text" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name={'email'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Email" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name={'password'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Password" type="password" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button isPending={isPending} type="submit">
          Register
        </Button>
        {error && <p className="text-red-500">{error.message}</p>}
      </form>
    </Form>
  )
}
