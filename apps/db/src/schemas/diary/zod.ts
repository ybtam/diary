import { createInsertSchema, createUpdateSchema } from 'drizzle-zod'
import { z } from 'zod'

import { diaryEntries } from './schema'

export const insertDiaryEntrySchema = createInsertSchema(diaryEntries, {
  content: z.string().min(1),
  title: z.string().optional(),
  userId: z.number().optional(),
})

export const updateDiaryEntrySchema = createUpdateSchema(diaryEntries, {
  content: z.string().min(1).optional(),
  id: z.number(),
  title: z.string().min(1).optional(),
})
