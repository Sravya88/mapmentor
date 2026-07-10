'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import MentorCard from '@/components/MentorCard'
import { Mentor } from '@/types/mentor'
import { ArrowUpDown, Loader2 } from 'lucide-react'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const subject = searchParams.get('subject')
  const area = searchParams.get('area')
  
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'price'>('distance')

  const [maxPrice, setMaxPrice] = useState<number | null>(null)
  const [minRating, setMinRating] = useState<number | null>(null)

  // Fetch from API - Day 5 key change
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const params = new URLSearchParams()
        if (subject) params.set('subject', subject)
        if (area) params.set('area', area)
        if (maxPrice) params.set('maxPrice', maxPrice.toString())
        if (minRating) params.set('minRating', minRating.toString())

        const res = await fetch(`/api/mentors?${params.toString()}`)
                
        if (!res.ok) throw new Error('Failed to fetch mentors')
        
        const data = await res.json()
        setMentors(data.mentors)
      } catch (err) {
        setError('Could not load mentors. Try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMentors()
  }, [subject, area, maxPrice, minRating]) // Refetch when URL changes

  // Sort client-side after fetch
  const sortedMentors = useMemo(() => {
    return [...mentors].sort((a, b) => {
      if (sortBy === 'distance') return a.distance_km - b.distance_km
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'price') return a.rate - b.rate
      return 0
    })
  }, [mentors, sortBy])

  if (loading) return <SearchSkeleton />
  if (error) return <ErrorState message={error} />

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
                {sortedMentors.length} mentors found
              </p>
            </div>
            
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

<div className="flex flex-wrap items-center gap-3 mt-4">
  <select
    value={maxPrice || ''}
    onChange={(e) => setMaxPrice(e.target.value? Number(e.target.value) : null)}
    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
  >
    <option value="">Any Price</option>
    <option value="500">Under ₹500/hr</option>
    <option value="800">Under ₹800/hr</option>
    <option value="1000">Under ₹1000/hr</option>
  </select>

  <select
    value={minRating || ''}
    onChange={(e) => setMinRating(e.target.value? Number(e.target.value) : null)}
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
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid gap-4">
          {sortedMentors.length > 0 ? (
            sortedMentors.map(mentor => (
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

function SearchSkeleton() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-blue-600" size={40} />
          <span className="ml-3 text-gray-600">Finding mentors...</span>
        </div>
      </div>
    </main>
  )
}

function ErrorState({ message }: { message: string }) {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-16 bg-white rounded-xl border border-red-200">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-900">Something went wrong</h3>
          <p className="text-gray-600 mt-2">{message}</p>
          <a 
            href="/"
            className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Back to Home
          </a>
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