import pg from 'pg'
const { Client } = pg

const DB_NAME = process.env.DB_NAME

const client = new Client({
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: 5432,
  user: process.env.DB_USERNAME,
})

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
