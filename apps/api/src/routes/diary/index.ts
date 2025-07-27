import { router } from '../../trpc'
import mutation from './mutation'
import query from './query'

export const diaryRouter = router({
  ...query,
  ...mutation,
})
