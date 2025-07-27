import { db, diaryEntries } from '@apps/db'
import { insertDiaryEntrySchema, updateDiaryEntrySchema } from '@apps/db/zod'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { protectedProcedure } from '../../trpc'

const create = protectedProcedure.input(insertDiaryEntrySchema).mutation(async ({ ctx, input }) => {
  return db.insert(diaryEntries).values({
    ...input,
    userId: ctx.user.userId,
  })
})

const update = protectedProcedure.input(updateDiaryEntrySchema).mutation(async ({ input }) => {
  const { id, ...dataToUpdate } = input
  return db.update(diaryEntries).set(dataToUpdate).where(eq(diaryEntries.id, id))
})

const remove = protectedProcedure
  .input(z.object({ id: z.number() }))
  .mutation(async ({ input }) => {
    return db.delete(diaryEntries).where(eq(diaryEntries.id, input.id))
  })

export default {
  create,
  delete: remove,
  update,
}
