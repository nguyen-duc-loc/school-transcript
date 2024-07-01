import { sumBy } from 'lodash'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

import { useCountGrades } from '@/hooks/useCountGrades.hook'
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card.component'
import { gradeToRate } from '@/utils/grade.utils'
import Loading from '../common/Loading.component'
import ServerError from '../common/ServerError.component'

export default function GradeStats() {
  const { isLoading, error, gradesCount } = useCountGrades()

  if (isLoading) {
    return <Loading className="grow" />
  }

  if (error) {
    return <ServerError error={error} className="grow" />
  }

  const data = gradesCount?.data.map(g => {
    return { count: g.count, rate: gradeToRate(g['final_grade']) }
  })

  return (
    <Card className="basis-1/2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Grades</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          You have studied{' '}
          <span className="font-bold">{sumBy(gradesCount?.data, c => c.count)}</span> subjects
        </p>
        <div className="mt-4 h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="rate" hide />
              <Tooltip
                cursor={false}
                formatter={(value: number) => [<span className="font-bold">{value}</span>, 'Total']}
                labelClassName="text-center font-medium"
                wrapperClassName="rounded-lg text-sm text-black"
              />
              <Bar
                dataKey="count"
                fill="var(--primary)"
                className="fill-primary"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
