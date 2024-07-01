import { each, orderBy, round } from 'lodash'

import { Grade } from '@/types/database.types'

type Rate = 'A+' | 'A' | 'B' | 'B+' | 'C' | 'C+' | 'D' | 'D+' | 'F'

export function gradeToRate(grade: number): Rate {
  switch (grade) {
    case 4:
      return 'A+'
    case 3.7:
      return 'A'
    case 3.5:
      return 'B+'
    case 3:
      return 'B'
    case 2.5:
      return 'C+'
    case 2:
      return 'C'
    case 1.5:
      return 'D+'
    case 1:
      return 'D'
    default:
      return 'F'
  }
}

type Base4Grade = 0 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 3.7 | 4

export function base10ToBase4(grade: number): Base4Grade {
  if (grade >= 9) {
    return 4
  } else if (grade >= 8.5) {
    return 3.7
  } else if (grade >= 8) {
    return 3.5
  } else if (grade >= 7) {
    return 3
  } else if (grade >= 6.5) {
    return 2.5
  } else if (grade >= 5.5) {
    return 2
  } else if (grade >= 5) {
    return 1.5
  } else if (grade >= 4) {
    return 1
  }
  return 0
}

type Varient = 'good' | 'medium' | 'bad'

export function gradeToVarient(grade: number): Varient {
  if (grade >= 3.7) {
    return 'good'
  } else if (grade >= 3) {
    return 'medium'
  }
  return 'bad'
}

type SemesterMappingValue = {
  finalGradeCreditsSumProduct: number
  totalCredits: number
}

export function caculateSemesterGPAs(
  grades: Grade[] | undefined
): { semester: string; gpa: number }[] {
  const gpas: { semester: string; gpa: number }[] = []
  const semesterMapping = new Map<string, SemesterMappingValue>()

  each(grades, grade => {
    const semesterKey = `${grade.school_year} ${grade.semester}`
    const currentValue = semesterMapping.has(semesterKey)
      ? semesterMapping.get(semesterKey)!
      : ({ finalGradeCreditsSumProduct: 0, totalCredits: 0 } as SemesterMappingValue)
    semesterMapping.set(semesterKey, {
      finalGradeCreditsSumProduct:
        currentValue.finalGradeCreditsSumProduct + grade.credits * grade.final_grade,
      totalCredits: currentValue.totalCredits + grade.credits
    })
  })

  for (let [semester, value] of semesterMapping) {
    gpas.push({ semester, gpa: round(value.finalGradeCreditsSumProduct / value.totalCredits, 2) })
  }

  return orderBy(gpas, ['semester'], ['asc'])
}
