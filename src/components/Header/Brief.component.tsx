import { useBrief } from '@/hooks/useBrief.hook'
import { Skeleton } from '../common/Skeleton.component'
import ServerError from '../common/ServerError.component'

export default function Brief() {
  const { isLoading, error, brief } = useBrief()

  if (isLoading) {
    return <Skeleton className="h-5 w-[350px] mt-4" />
  }

  if (error) {
    return <ServerError error={error} className="mt-4" />
  }

  return (
    <div className="flex items-center gap-2">
      <p>
        Total number of credits: <span className="font-medium">{brief?.totalCredits}</span>, CPA:{' '}
        <span className="font-medium">{brief?.cpa}</span>.
      </p>
    </div>
  )
}
