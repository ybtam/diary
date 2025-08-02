import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'

import * as schema from './schemas/index.ts'
const { Client } = pg

// Use DATABASE_URL if available, otherwise fall back to individual variables
const connectionString = process.env.DATABASE_URL

export const client = connectionString 
  ? new Client({
      connectionString,
    })
  : new Client({
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: 5432,
      user: process.env.DB_USERNAME,
    })

export const db = drizzle(client, {
  schema,
})

export * from './schemas/index.ts'
