'use client' // ← Add this. We need useState for sorting

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation' // ← New import
import { mockMentors } from '@/lib/mockMentors'
import MentorCard from '@/components/MentorCard'
import { Subject } from '@/types/mentor'
import { ArrowUpDown } from 'lucide-react'

export default function SearchPage() {
  const searchParams = useSearchParams() // ← Next.js 15 client way
  const subject = searchParams.get('subject')
  const area = searchParams.get('area')
  
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'price'>('distance')

  // useMemo = recalculates only when deps change. Interview keyword.
  const filteredAndSortedMentors = useMemo(() => {
    const filtered = mockMentors.filter(mentor => {
      const matchesSubject = !subject || mentor.subjects.includes(subject as Subject)
      const matchesArea = !area || mentor.area === area
      return matchesSubject && matchesArea
    })

    // Sorting logic - this is pure JS, great for interviews
    return filtered.sort((a, b) => {
      if (sortBy === 'distance') return a.distance_km - b.distance_km
      if (sortBy === 'rating') return b.rating - a.rating // Higher rating first
      if (sortBy === 'price') return a.rate - b.rate // Lower price first
      return 0
    })
  }, [subject, area, sortBy])

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Mentors for {subject || 'All Subjects'} in {area || 'Hyderabad'}
              </h1>
              <p className="text-gray-600 mt-1">
                {filteredAndSortedMentors.length} mentors found
              </p>
            </div>
            
            {/* Sort dropdown - Day 4 new */}
            <div className="flex items-center gap-2">
              <ArrowUpDown size={18} className="text-gray-500" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="distance">Sort: Nearest</option>
                <option value="rating">Sort: Top Rated</option>
                <option value="price">Sort: Lowest Price</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid gap-4">
          {filteredAndSortedMentors.length > 0 ? (
            filteredAndSortedMentors.map(mentor => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))
          ) : (
            <EmptyState subject={subject} area={area} />
          )}
        </div>
      </div>
    </main>
  )
}

function EmptyState({ subject, area }: { subject: string | null, area: string | null }) {
  return (
    <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-bold text-gray-900">No mentors found</h3>
      <p className="text-gray-600 mt-2 max-w-md mx-auto">
        We couldn't find mentors for {subject || 'that subject'} in {area || 'that area'}. 
        Try broadening your search.
      </p>
      <a 
        href="/"
        className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
      >
        Search Again
      </a>
    </div>
  )
}