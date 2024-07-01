import { LoaderCircle } from 'lucide-react'

import { cn } from '@/utils/tailwind.utils'

export default function Loading({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center justify-center gap-2 text-muted-foreground', className)}>
      <LoaderCircle className="h-4 w-4 animate-spin" />
      Loading...
    </div>
  )
}
