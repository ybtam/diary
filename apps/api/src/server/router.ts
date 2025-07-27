import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { authRouter } from '../routes/auth'
import { diaryRouter } from '../routes/diary'
import { router } from '../trpc.js'

export const appRouter = router({
  auth: authRouter,
  diary: diaryRouter,
})

// Export type router type signature, this is used by the client.
export type AppRouter = typeof appRouter

export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
