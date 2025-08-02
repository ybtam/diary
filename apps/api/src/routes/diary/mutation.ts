import { db, diaryEntries } from '@apps/db'
import { insertDiaryEntrySchema, updateDiaryEntrySchema } from '@apps/db/zod'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

import { protectedProcedure } from '../../trpc'

const create = protectedProcedure.input(insertDiaryEntrySchema).mutation(async ({ ctx, input }) => {
  return db.insert(diaryEntries).values({
    ...input,
    userId: ctx.user.userId,
  })
})

const update = protectedProcedure.input(updateDiaryEntrySchema).mutation(async ({ ctx, input }) => {
  const { id, ...dataToUpdate } = input
  return db
    .update(diaryEntries)
    .set(dataToUpdate)
    .where(and(eq(diaryEntries.id, id), eq(diaryEntries.userId, ctx.user.userId)))
})

const remove = protectedProcedure
  .input(z.object({ id: z.number() }))
  .mutation(async ({ ctx, input }) => {
    return db
      .delete(diaryEntries)
      .where(and(eq(diaryEntries.id, input.id), eq(diaryEntries.userId, ctx.user.userId)))
  })

export default {
  create,
  delete: remove,
  update,
}
