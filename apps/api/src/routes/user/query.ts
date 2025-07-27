import { db } from '@apps/db'

import { publicProcedure } from '../../trpc.ts'

const list = publicProcedure.query(async () => {
  return db.query.users.findMany({
    columns: {
      password: false,
    },
    with: {
      diaries: true,
    },
  })
})

export default {
  list,
}
