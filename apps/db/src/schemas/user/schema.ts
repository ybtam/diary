import { jsonb, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

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
