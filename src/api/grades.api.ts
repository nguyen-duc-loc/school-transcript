import supabase from '@/services/supabase'
import { Grade } from '@/types/database.types'

export async function getBrief() {
  const [cpaResponse, totalCreditsResponse] = await Promise.all([
    supabase.rpc('caculate_cpa').returns<number>(),
    supabase.rpc('get_total_credits').returns<number>()
  ])

  if (cpaResponse.error) {
    throw new Error('Failed to load CPA')
  }

  if (totalCreditsResponse.error) {
    throw new Error('Failed to load total credits')
  }

  return { cpa: cpaResponse.data, totalCredits: totalCreditsResponse.data }
}

export async function getGrades() {
  const { data, error } = await supabase.rpc('get_final_grades').returns<Grade[]>()

  if (error) {
    throw new Error('Failed to load grades')
  }

  return { data }
}

export async function getGradesCount() {
  const { data, error } = await supabase
    .rpc('count_grades')
    .returns<{ count: number; final_grade: number }[]>()

  if (error) {
    throw new Error('Failed to count grades')
  }

  return { data }
}
