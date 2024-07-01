import { Column } from '@tanstack/react-table'
import React from 'react'

import { cn } from '@/utils/tailwind.utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../common/DropdownMenu.component'
import { Button } from '../common/Button.component'
import { ArrowDown, ArrowDownUp, ArrowUp } from 'lucide-react'

interface GradeTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
  sort?: boolean
}

export default function TableColumnHeader<TData, TValue>({
  column,
  title,
  sort = true,
  className
}: GradeTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort() || !sort) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn('flex items-center justify-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 data-[state=open]:bg-accent gap-2">
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDown className="h-4 w-4" />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDownUp className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)} className="gap-2">
            <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)} className="gap-2">
            <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
