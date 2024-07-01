import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { round } from 'lodash'

import { Card, CardContent, CardHeader, CardTitle } from '../common/Card.component'
import { useGrades } from '@/hooks/useGrades.hook'
import { caculateSemesterGPAs } from '@/utils/grade.utils'
import Loading from '../common/Loading.component'
import ServerError from '../common/ServerError.component'

export default function GPAStats() {
  const { isLoading, error, grades } = useGrades()

  if (isLoading) {
    return <Loading className="grow" />
  }

  if (error) {
    return <ServerError error={error} className="grow" />
  }

  const data = caculateSemesterGPAs(grades?.data)
  const lastDiff = round(
    data[data.length - 1].gpa - (data.length > 1 ? data[data.length - 2].gpa : 0),
    2
  )

  return (
    <Card className="basis-1/2">
      <CardHeader className="pb-2">
        <CardTitle>GPA</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          <span className={`text-${lastDiff >= 0 ? 'green' : 'red'}-500`}>
            {lastDiff >= 0 ? '+' : '-'}
            {Math.abs(lastDiff)}
          </span>{' '}
          from last semester
        </p>
        <div>
          <ResponsiveContainer width="100%" height="100%" aspect={3}>
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0
              }}
            >
              <XAxis dataKey="semester" hide />
              <YAxis domain={[3, 4]} hide />
              <Tooltip
                cursor={{ radius: 6 }}
                wrapperClassName="rounded-lg text-sm m-auto text-black"
                formatter={(value: number) => [<span className="font-bold">{value}</span>, 'GPA']}
                labelFormatter={(value: string) => {
                  const [fromYear, _, toYear, semester] = value.split(' ')
                  return `${semester} semester ${fromYear}-${toYear}`
                }}
              />
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="gpa"
                activeDot={{
                  r: 6,
                  className: 'fill-primary'
                }}
                stroke="var(--primary)"
                className="stroke-primary"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
