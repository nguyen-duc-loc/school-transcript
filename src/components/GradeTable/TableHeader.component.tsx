import { flexRender } from '@tanstack/react-table'

import {
  TableHead as Head,
  TableHeader as Header,
  TableRow as Row
} from '../common/Table.component'
import { useGradeTable } from './Table'
import { gradeTableClassName } from '@/utils/table.utils'

export default function TableHeader() {
  const table = useGradeTable()

  return (
    <Header>
      {table.getHeaderGroups().map(headerGroup => (
        <Row key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <Head
              key={header.id}
              colSpan={header.colSpan}
              className={gradeTableClassName(header.column.id, 'grade')}
            >
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
            </Head>
          ))}
        </Row>
      ))}
    </Header>
  )
}
