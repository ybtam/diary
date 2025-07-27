import { relations } from 'drizzle-orm'
import { jsonb, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

import { diaryEntries } from '../diary/schema'

export const users = pgTable('users', {
  createdAt: timestamp('created_at').defaultNow().notNull(),
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  id: serial('id').primaryKey(),
  lastName: text('last_name'),
  password: text('password').notNull(),
  settings: jsonb('settings'),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})

export const userRelations = relations(users, ({ many }) => ({
  diaries: many(diaryEntries),
}))
