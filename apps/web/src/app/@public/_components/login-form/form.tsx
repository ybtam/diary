'use client'

import { loginInputSchema } from '@apps/api/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTRPC } from '@repo/sdk'
import { Button, Form, FormControl, FormField, FormItem, FormLabel, Input } from '@repo/ui'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { login } from '@/app/@public/_components/login-form/action.ts'

export const LoginForm = () => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginInputSchema),
  })

  const trpc = useTRPC()

  const { isPending, mutate } = useMutation(
    trpc.auth.login.mutationOptions({
      onError: error => {
        console.log(error)
      },
      onSuccess: async data => {
        await login(data)
      },
    }),
  )

  return (
    <Form {...form}>
      <form className={'flex flex-col gap-2'} onSubmit={form.handleSubmit(value => mutate(value))}>
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
          Login
        </Button>
      </form>
    </Form>
  )
}
