import { createContext, useContext, useState } from 'react'
import {
  ColumnFiltersState,
  SortingState,
  Table as T,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { Table } from '@/components/common/Table.component'
import { useGrades } from '@/hooks/useGrades.hook'
import { Grade } from '@/types/database.types'
import { columns } from './Columns.component'
import TableBody from './TableBody.component'
import TableHeader from './TableHeader.component'
import TablePagination from './TablePagination.component'
import Loading from '../common/Loading.component'
import ServerError from '../common/ServerError.component'
import GradeTableToolBar from './TableToolBar.component'

type TableProviderState = {
  table: T<Grade>
}

const initialState: TableProviderState = {
  table: {} as T<Grade>
}

const TableProviderContext = createContext<TableProviderState>(initialState)

export default function GradeTable() {
  const { isLoading, error, grades } = useGrades()

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: grades?.data || ([] as Grade[]),
    columns,
    initialState: {
      sorting: [
        { id: 'school_year', desc: true },
        { id: 'semester', desc: true }
      ]
    },
    state: {
      sorting,
      columnFilters
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  })

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <ServerError error={error} />
  }

  return (
    <TableProviderContext.Provider value={{ table }}>
      <div className="space-y-6">
        <GradeTableToolBar />
        <Table>
          <TableHeader />
          <TableBody columns={columns} />
        </Table>
        <TablePagination />
      </div>
    </TableProviderContext.Provider>
  )
}

export function useGradeTable() {
  const { table } = useContext(TableProviderContext)

  if (!table) throw new Error('useGradeTable must be used within a TableProvider')

  return table
}
