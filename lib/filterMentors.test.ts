import { describe, it, expect } from 'vitest'
import { Mentor } from '@/types/mentor'

export function filterMentors(
  mentors: Mentor[],
  subject?: string,
  area?: string
): Mentor[] {
  return mentors.filter(m => {
    const matchesSubject =!subject || m.subjects.includes(subject as any)
    const matchesArea =!area || m.area === area
    return matchesSubject && matchesArea
  })
}

describe('filterMentors', () => {
  const mockData: Mentor[] = [
    { id: '1', name: 'A', area: 'Gachibowli', subjects: ['CBSE Math'], distance_km: 1, rating: 4.5, rate: 500, photo_url: '', badges: [], ai_match_reason: '' },
    { id: '2', name: 'B', area: 'Kondapur', subjects: ['JEE Physics'], distance_km: 2, rating: 4.8, rate: 800, photo_url: '', badges: [], ai_match_reason: '' },
  ]

  it('filters by subject only', () => {
    const result = filterMentors(mockData, 'CBSE Math')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('A')
  })

  it('filters by area only', () => {
    const result = filterMentors(mockData, undefined, 'Kondapur')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('B')
  })

  it('returns all when no filters', () => {
    const result = filterMentors(mockData)
    expect(result).toHaveLength(2)
  })
})