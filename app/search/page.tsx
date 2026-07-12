'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Mentor, Subject, Area } from '@/types/mentor'
import MentorCard from '@/components/MentorCard'
import MentorCardSkeleton from '@/components/MentorCardSkeleton'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const subject = searchParams.get('subject')
  const area = searchParams.get('area')

  const [mentors, setMentors] = useState<Mentor[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'distance'>('rating')
  const [maxPrice, setMaxPrice] = useState<number | null>(null)
  const [minRating, setMinRating] = useState<number | null>(null)

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [subject, area, maxPrice, minRating])

  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true)
      const params = new URLSearchParams()
      if (subject) params.set('subject', subject)
      if (area) params.set('area', area)
      if (maxPrice) params.set('maxPrice', maxPrice.toString())
      if (minRating) params.set('minRating', minRating.toString())
      params.set('page', page.toString())
      params.set('limit', '6')

      try {
        const res = await fetch(`/api/mentors?${params.toString()}`)
        const data = await res.json()
        setMentors(data.mentors || [])
        setTotalPages(data.totalPages || 1)
      } catch (error) {
        console.error('Failed to fetch:', error)
        setMentors([])
      } finally {
        setLoading(false)
      }
    }

    fetchMentors()
  }, [subject, area, page, maxPrice, minRating])

  const sortedMentors = [...mentors].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'price') return a.rate - b.rate
    if (sortBy === 'distance') return a.distance_km - b.distance_km
    return 0
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Mentors for {subject || 'All Subjects'} in {area || 'Hyderabad'}
          </h1>
          <p className="text-gray-600 mt-2">
            {loading ? 'Searching...' : `${mentors.length} mentors found`}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="rating">Rating</option>
                <option value="price">Price: Low to High</option>
                <option value="distance">Distance</option>
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={maxPrice || ''}
                onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : null)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Any Price</option>
                <option value="500">Under ₹500/hr</option>
                <option value="800">Under ₹800/hr</option>
                <option value="1000">Under ₹1000/hr</option>
              </select>

              <select
                value={minRating || ''}
                onChange={(e) => setMinRating(e.target.value ? Number(e.target.value) : null)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Any Rating</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.8">4.8+ Stars</option>
              </select>

              {(maxPrice || minRating) && (
                <button
                  onClick={() => { setMaxPrice(null); setMinRating(null) }}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <MentorCardSkeleton key={i} />)}
          </div>
        ) : sortedMentors.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedMentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                
                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>
                
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No mentors found</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}