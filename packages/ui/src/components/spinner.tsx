import { cn } from '@repo/ui/lib'
import { LoaderCircle } from 'lucide-react'

export const Spinner = ({ className }: { className?: string }) => {
  return <LoaderCircle className={cn('animate-spin', className)} />
}
