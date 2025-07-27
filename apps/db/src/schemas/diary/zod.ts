import { createInsertSchema, createUpdateSchema } from 'drizzle-zod'
import { z } from 'zod'

import { diaryEntries } from './schema'

export const insertDiaryEntrySchema = createInsertSchema(diaryEntries, {
  content: z.string().min(1),
  title: z.string().min(1),
  userId: z.number(),
})

export const updateDiaryEntrySchema = createUpdateSchema(diaryEntries, {
  content: z.string().min(1).optional(),
  id: z.number(),
  title: z.string().min(1).optional(),
})
