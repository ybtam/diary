import type { Config } from 'drizzle-kit'

export default {
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  dialect: 'postgresql',
  out: './src/migrations',
  schema: ['./src/**/*/schema.ts'],
  strict: true,
  verbose: true,
} satisfies Config
