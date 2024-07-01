import GPAStats from './GPAStats.component'
import GradeStats from './GradeStats.component'

export default function Stats() {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <GPAStats />
      <GradeStats />
    </div>
  )
}
