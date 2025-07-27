import { RouterOutput } from '@apps/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui'

export const DiaryEntryCard = ({
  content,
  createdAt,
  title,
}: RouterOutput['diary']['list'][number]) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title || 'Untitled'}</CardTitle>
        <CardDescription>{createdAt}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3">{content}</p>
      </CardContent>
    </Card>
  )
}
