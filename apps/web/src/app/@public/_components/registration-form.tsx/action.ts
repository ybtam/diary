'use server'

import { insertUserSchema } from '@apps/api/zod'
import { trpcClient } from '@repo/sdk'
import { z } from 'zod'

export const register = async (data: z.infer<typeof insertUserSchema>) => {
  console.log(data)

  return await trpcClient().auth.register.mutate(data)
}
