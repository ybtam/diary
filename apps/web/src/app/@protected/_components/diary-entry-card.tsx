import { RouterOutput } from '@apps/api'
import { Card, CardDescription, CardHeader, CardTitle } from '@repo/ui'
import { format } from 'date-fns'
import Link from 'next/link'

export const DiaryEntryCard = ({ createdAt, id, title }: RouterOutput['diary']['list'][number]) => {
  return (
    <Link className="block transition-transform hover:scale-[1.02]" href={`/diary/${id}`}>
      <Card className="w-full cursor-pointer hover:shadow-md">
        <CardHeader>
          <CardTitle className="line-clamp-1">{title || 'Untitled'}</CardTitle>
          <CardDescription>{format(new Date(createdAt), 'PPP')}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
