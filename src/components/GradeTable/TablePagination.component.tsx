import PageSelector from './PageSelector.component'
import { PageSizeSelector } from './PageSizeSelector.component'

export default function TablePagination() {
  return (
    <div className="flex flex-wrap gap-4 justify-end items-center">
      <PageSizeSelector />
      <PageSelector />
    </div>
  )
}
