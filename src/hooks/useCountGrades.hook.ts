import { useQuery } from '@tanstack/react-query'

import { getGradesCount } from '@/api/grades.api'

export function useCountGrades() {
  const {
    isLoading,
    data: gradesCount,
    error
  } = useQuery({
    queryKey: ['count_grades'],
    queryFn: getGradesCount
  })

  return { isLoading, gradesCount, error }
}
