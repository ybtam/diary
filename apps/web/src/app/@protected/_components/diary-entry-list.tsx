import { RouterOutput } from '@apps/api'

import { DiaryEntryCard } from './diary-entry-card.tsx'

interface DiaryEntryListProps {
  entries: RouterOutput['diary']['list']
}

export const DiaryEntryList = ({ entries }: DiaryEntryListProps) => {
  if (entries.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-md border border-dashed">
        <p className="text-gray-500">No diary entries yet. Start writing!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry, index) => (
        <DiaryEntryCard key={index} {...entry} />
      ))}
    </div>
  )
}
