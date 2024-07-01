import { useQuery } from '@tanstack/react-query'

import { getGrades } from '@/api/grades.api'

export function useGrades() {
  const {
    isLoading,
    data: grades,
    error
  } = useQuery({
    queryKey: ['grades'],
    queryFn: getGrades
  })

  return { isLoading, grades, error }
}
