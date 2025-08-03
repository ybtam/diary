import pg from 'pg'
const { Client } = pg

const DB_NAME = process.env.DB_NAME

const client = new Client(process.env.DATABASE_URL)

const runCreateDb = async () => {
  await client.connect()

  const res = await client.query(
    `SELECT datname FROM pg_catalog.pg_database WHERE datname = '${DB_NAME}'`,
  )

  if (res.rowCount === 0) {
    console.log(`${DB_NAME} database not found, creating it.`)
    await client.query(`CREATE DATABASE "${DB_NAME}";`)
    console.log(`created database ${DB_NAME}`)
  } else {
    console.log(`${DB_NAME} database exists.`)
  }

  await client.end()
}

runCreateDb()
