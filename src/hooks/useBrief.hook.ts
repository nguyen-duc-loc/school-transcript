import { useQuery } from '@tanstack/react-query'

import { getBrief } from '@/api/grades.api'

export function useBrief() {
  const {
    isLoading,
    data: brief,
    error
  } = useQuery({
    queryKey: ['brief'],
    queryFn: getBrief
  })

  return { isLoading, brief, error }
}
