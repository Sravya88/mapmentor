import { supabase } from '@/lib/supabase'
import { Mentor, Subject, Area } from '@/types/mentor'

export interface MentorFilters {
  subject?: Subject | Subject[]
  area?: Area
  minRating?: number
  maxPrice?: number
  page?: number
  limit?: number
}

export interface MentorsResponse {
  mentors: Mentor[]
  count: number
  page: number
  totalPages: number
}

export async function findMentors(filters: MentorFilters): Promise<MentorsResponse> {
  let query = supabase.from('mentors').select('*', { count: 'exact' })

  // Subject filter - check if array contains the subject
  if (filters.subject) {
    const subjects = Array.isArray(filters.subject) ? filters.subject : [filters.subject]
    query = query.overlaps('subjects', subjects)
  }

  

  if (filters.area) {
    query = query.eq('area', filters.area)
  }

  if (filters.minRating) {
    query = query.gte('rating', filters.minRating)
  }

  if (filters.maxPrice) {
    query = query.lte('rate', filters.maxPrice)
  }

  // Pagination
  const page = filters.page || 1
  const limit = filters.limit || 6
  const startIndex = (page - 1) * limit
  query = query.range(startIndex, startIndex + limit - 1)

  // Default sort by rating desc
  query = query.order('rating', { ascending: false })

  const { data, error, count } = await query
  console.log('Fetched from Supabase:', count, 'mentors')

  if (error) {
    console.error('Supabase error:', error)
    throw new Error('Failed to fetch mentors')
  }

  return {
    mentors: data as Mentor[],
    count: count || 0,
    page,
    totalPages: Math.ceil((count || 0) / limit)
  }
}