import { memo } from 'react'
import { X } from 'lucide-react'

import { Button } from '../common/Button.component'
import { useGradeTable } from './Table'
import { GradeTableFacetedFilter } from './TableFacetedFilter.component'
import { Input } from '../common/Input.component'

function GradeTableToolBar() {
  const table = useGradeTable()

  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex flex-1 flex-wrap items-center gap-4">
      <Input
        placeholder="Filter subject name..."
        value={(table.getColumn('subject_name')?.getFilterValue() as string) ?? ''}
        onChange={event => table.getColumn('subject_name')?.setFilterValue(event.target.value)}
        className="h-8 w-[150px] lg:w-[250px] py-2 px-4"
      />
      {table.getColumn('school_year') && (
        <GradeTableFacetedFilter title="School year" dataKey="school_year" />
      )}
      {table.getColumn('final_grade') && (
        <GradeTableFacetedFilter title="Grade" dataKey="final_grade" />
      )}
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <X className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

export default memo(GradeTableToolBar)
