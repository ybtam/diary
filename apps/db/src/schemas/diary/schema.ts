import { relations } from 'drizzle-orm'
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

import { users } from '../user/schema'

export const diaryEntries = pgTable('diary_entries', {
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  id: serial('id').primaryKey(),
  title: text('title'),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
})

export const diaryRelations = relations(diaryEntries, ({ one }) => ({
  user: one(users, {
    fields: [diaryEntries.userId],
    references: [users.id],
  }),
}))
