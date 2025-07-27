'use client'

import { insertUserSchema } from '@apps/api/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Form, FormControl, FormField, FormItem, FormLabel, Input } from '@repo/ui'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { register } from './action'

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

  const { isPending, mutate } = useMutation({
    mutationFn: (data: z.output<typeof insertUserSchema>) => register(data),
  })

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
      </form>
    </Form>
  )
}
