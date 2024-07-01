function visibilityBreakPoint(id: string, table: string): 'sm' | 'md' | 'lg' {
  switch (table) {
    case 'grade':
      if (['semester', 'credits'].includes(id)) {
        return 'lg'
      } else if (['subject_code'].includes(id)) {
        return 'md'
      }
      return 'sm'
    default:
      return 'sm'
  }
}

export function gradeTableClassName(id: string, table: string): string | undefined {
  let className: string | undefined
  const breakpoint = visibilityBreakPoint(id, table)
  // Tailwind dynamic className error
  const notHidden = ['subject_name', 'final_grade', 'rate'].includes(id)
  if (breakpoint == 'sm') {
    className = 'text-center py-2 sm:table-cell'
  } else if (breakpoint === 'md') {
    className = 'text-center py-2 md:table-cell'
  } else if (breakpoint === 'lg') {
    className = 'text-center py-2 lg:table-cell'
  }
  if (!notHidden) className += ' hidden'
  return className
}
