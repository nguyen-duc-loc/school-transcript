import { ColumnDef } from '@tanstack/react-table'

import { Grade } from '@/types/database.types'
import { gradeToRate, gradeToVarient } from '@/utils/grade.utils'
import { Badge } from '../common/Badge.component'
import TableColumnHeader from './TableColumnHeader.component'

export const columns: ColumnDef<Grade>[] = [
  {
    accessorKey: 'subject_code',
    header: ({ column }) => <TableColumnHeader column={column} title="Subject code" />,
    enableSorting: false
  },
  {
    accessorKey: 'subject_name',
    enableSorting: false,
    size: 300,
    header: ({ column }) => <TableColumnHeader column={column} title="Subject name" />
  },
  {
    accessorKey: 'semester',
    header: ({ column }) => <TableColumnHeader column={column} title="Semester" sort={false} />
  },
  {
    accessorKey: 'school_year',
    header: ({ column }) => <TableColumnHeader column={column} title="School year" />,
    filterFn: (row, id, values) => values.includes(row.getValue(id))
  },
  {
    accessorKey: 'credits',
    header: ({ column }) => <TableColumnHeader column={column} title="Number of credits" />
  },
  {
    accessorKey: 'final_grade',
    header: ({ column }) => <TableColumnHeader column={column} title="Grade" />,
    filterFn: (row, id, values) => values.includes(row.getValue(id))
  },
  {
    accessorKey: 'rate',
    header: ({ column }) => <TableColumnHeader column={column} title="Rate" />,
    cell: ({ row }) => {
      const final_grade = row.original['final_grade']
      return <Badge variant={gradeToVarient(final_grade)}>{gradeToRate(final_grade)}</Badge>
    },
    enableSorting: false
  }
]
