import { migrate } from 'drizzle-orm/node-postgres/migrator'

import { client, db } from '../index.js'

async function runMigration() {
  await client.connect()

  await migrate(db, { migrationsFolder: './src/migrations' })
  // Don't forget to close the connection, otherwise the script will hang
  await client.end()
}

runMigration()
