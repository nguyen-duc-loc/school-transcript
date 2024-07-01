import { ColumnDef, flexRender } from '@tanstack/react-table'

import { TableBody as Body, TableCell as Cell, TableRow as Row } from '../common/Table.component'
import { useGradeTable } from './Table'
import { gradeTableClassName } from '@/utils/table.utils'

interface TableBodyProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
}

export default function TableBody<TData, TValue>({ columns }: TableBodyProps<TData, TValue>) {
  const table = useGradeTable()

  return (
    <Body>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map(row => (
          <Row key={row.id}>
            {row.getVisibleCells().map(cell => (
              <Cell key={cell.id} className={gradeTableClassName(cell.column.id, 'grade')}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Cell>
            ))}
          </Row>
        ))
      ) : (
        <Row>
          <Cell colSpan={columns.length} className="h-24 text-center">
            No results.
          </Cell>
        </Row>
      )}
    </Body>
  )
}
