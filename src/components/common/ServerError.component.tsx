import { HTMLAttributes } from 'react'
import { ServerCrash } from 'lucide-react'

import { cn } from '@/utils/tailwind.utils'

interface ErrorProps extends HTMLAttributes<HTMLDivElement> {
  error: Error
}

export default function ServerError({ error, className }: ErrorProps) {
  return (
    <div className={cn('flex items-center gap-2 text-red-500', className)}>
      <ServerCrash className="h-4 w-4" />
      {error.message}
    </div>
  )
}
