import { db, diaryEntries } from '@apps/db'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

import { protectedProcedure } from '../../trpc'

const list = protectedProcedure.query(async ({ ctx }) => {
  return db.query.diaryEntries.findMany({
    columns: {
      content: false,
    },
    where: eq(diaryEntries.userId, ctx.user.userId),
  })
})

const getById = protectedProcedure
  .input(z.object({ id: z.number() }))
  .query(async ({ ctx, input }) => {
    return db.query.diaryEntries.findFirst({
      where: and(eq(diaryEntries.id, input.id), eq(diaryEntries.userId, ctx.user.userId)),
    })
  })

export default {
  getById,
  list,
}
