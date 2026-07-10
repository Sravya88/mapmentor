import { Mentor, Subject, Area } from '@/types/mentor'

// This file is the "contract" with DB team. They'll replace getMockData() later.
export interface MentorFilters {
  subject?: Subject
  area?: Area
  minRating?: number
  maxPrice?: number
}

export interface MentorsResponse {
  mentors: Mentor[]
  count: number
  page: number
}

// DB team will replace this function with real DB queries
async function getMockData(): Promise<Mentor[]> {
  // Simulate network delay like a real DB
  await new Promise(resolve => setTimeout(resolve, 300))

  const { mockMentors } = await import('@/lib/mockMentors')
  return mockMentors
}

export async function findMentors(filters: MentorFilters): Promise<MentorsResponse> {
  let mentors = await getMockData()

  if (filters.subject) {
    mentors = mentors.filter(m => m.subjects.includes(filters.subject!))
  }

  if (filters.area) {
    mentors = mentors.filter(m => m.area === filters.area)
  }

  if (filters.minRating) {
    mentors = mentors.filter(m => m.rating >= filters.minRating!)
  }

  if (filters.maxPrice) {
    mentors = mentors.filter(m => m.rate <= filters.maxPrice!)
  }

  return {
    mentors,
    count: mentors.length,
    page: 1
  }
}

export async function findMentorById(id: string): Promise<Mentor | null> {
  const mentors = await getMockData()
  return mentors.find(m => m.id === id) || null
}