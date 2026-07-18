'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { use } from 'react'

export default function MentorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params) // FIX: unwrap Promise
  const [mentor, setMentor] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMentor = async () => {
      const { data } = await supabase.from('mentors').select('*').eq('id', id).single()
      setMentor(data)
      setLoading(false)
    }
    fetchMentor()
  }, [id])

  if (loading) return <div className="p-10 text-center font-bold text-gray-900">Loading...</div>
  if (!mentor) return <div className="p-10 text-center">Mentor not found</div>

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-3xl mx-auto p-6">
        <Link href="/search" className="text-sm font-bold text-gray-900 hover:underline">← Back to search</Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 mt-6 shadow-sm">
          <div className="flex gap-6">
            <img
              src={mentor.photo_url || mentor.image || `https://i.pravatar.cc/150?u=${mentor.id}`}
              className="w-24 h-24 rounded-full object-cover border border-gray-200"
              alt={mentor.name}
            />
            <div>
              <h1 className="text-3xl font-black text-gray-900">{mentor.name}</h1>
              <p className="text- font-medium text-gray-700 mt-1">📍 {mentor.area} • {mentor.education || 'B.Tech'}</p>
              <p className="text- font-bold text-gray-900 mt-2">₹{mentor.rate}/hr • {mentor.experience || 3} yrs • ⭐ {mentor.rating || 4.8}</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-black text-gray-900 text-">About</h3>
            <p className="text- font-medium text-gray-800 mt-2 leading-relaxed">
              {mentor.bio || 'Experienced tutor with proven track record helping students achieve top ranks in CBSE, JEE and NEET.'}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {mentor.subjects?.map((s:string) => (
              <span key={s} className="bg-gray-900 text-white px-4 py-1.5 rounded-full text- font-bold">{s}</span>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="text-gray-500 font-medium">Availability</div>
              <div className="font-bold text-gray-900 mt-1">{mentor.availability || 'Weekdays, Evenings'}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="text-gray-500 font-medium">Mode</div>
              <div className="font-bold text-gray-900 mt-1">{mentor.mode || 'Home + Online'}</div>
            </div>
          </div>

          <button className="w-full bg-gray-900 text-white py-4 rounded-xl mt-8 font-black text-">
            Contact {mentor.name.split(' ')[0]} — ₹{mentor.rate}/hr
          </button>
        </div>
      </div>
    </div>
  )
}