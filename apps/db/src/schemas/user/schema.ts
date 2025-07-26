import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  id: serial('id').primaryKey(),
  lastName: text('last_name'),
  password: text('password').notNull(),
})
