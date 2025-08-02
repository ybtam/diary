import { RouterOutput } from '@apps/api'
import { Card, CardDescription, CardHeader, CardTitle } from '@repo/ui'

export const DiaryEntryCard = ({
  createdAt,
  title,
}: RouterOutput['diary']['list'][number]) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardDescription>{title || 'Untitled'}</CardDescription>
        <CardTitle>{createdAt}</CardTitle>
      </CardHeader>
    </Card>
  )
}
