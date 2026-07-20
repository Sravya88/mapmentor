'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'

const AREAS = ['All','Gachibowli','Hitech City','Madhapur','Kondapur','Kukatpally','Ameerpet','Secunderabad','Dilsukhnagar']
const SUBJECTS = ['All','CBSE Math','JEE Math','NEET Biology','Physics','Chemistry','Spoken English','Coding','UPSC']

export default function SearchPage() {
  const [mentors, setMentors] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [area, setArea] = useState('All')
  const [subject, setSubject] = useState('All')
  const [maxRate, setMaxRate] = useState(2000)

  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true)
      const { data } = await supabase.from('mentors').select('*').order('created_at', { ascending: false })
      if (data) {
        setMentors(data)
        setFiltered(data)
      }
      setLoading(false)
    }
    fetchMentors()
  }, [])

  useEffect(() => {
    let result = [...mentors]
    if (search) {
      result = result.filter(m =>
        m.name?.toLowerCase().includes(search.toLowerCase()) ||
        m.subjects?.join(' ').toLowerCase().includes(search.toLowerCase())
      )
    }
    if (area!== 'All') result = result.filter(m => m.area?.toLowerCase().includes(area.toLowerCase()))
    if (subject!== 'All') result = result.filter(m => m.subjects?.some((s:string) => s.toLowerCase().includes(subject.toLowerCase())))
    result = result.filter(m => (m.rate || 0) <= maxRate)
    setFiltered(result)
  }, [search, area, subject, maxRate, mentors])

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Search - DARK TEXT */}
        <form onSubmit={e => e.preventDefault()}>
          <input
            placeholder="Search math, physics, coding..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full p-4 rounded-2xl border border-gray-300 bg-white text- font-medium text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-black focus:border-black"
          />
        </form>

        {/* Filters - DARK */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <select value={area} onChange={e => setArea(e.target.value)} className="w-full p-3.5 rounded-xl border border-gray-300 bg-white text-gray-900 font-medium text-">
            {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <select value={subject} onChange={e => setSubject(e.target.value)} className="w-full p-3.5 rounded-xl border border-gray-300 bg-white text-gray-900 font-medium text-">
            {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <div className="w-full bg-white border border-gray-300 rounded-xl p-3.5 flex items-center gap-3">
            <span className="text- font-bold text-gray-900 whitespace-nowrap">Max ₹{maxRate}</span>
            <input type="range" min={300} max={2000} step={100} value={maxRate} onChange={e => setMaxRate(Number(e.target.value))} className="flex-1 accent-black" />
          </div>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {filtered.map(m => (
            <div key={m.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
              <div className="flex gap-4">
                <Image 
                  src={m.photo_url || m.image || `https://i.pravatar.cc/150?u=${m.id}`} 
                  alt={m.name}
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-full object-cover border"
                />                <div className="flex-1">
                  {/* FIX: text-gray-900 font-bold - NOT light gray */}
                  <h3 className="font-bold text- text-gray-900 leading-tight">{m.name}</h3>
                  <p className="text- font-medium text-gray-700 mt-1">📍 {m.area} • {m.distance_km || 2.5} km</p>
                  <p className="text- font-bold text-gray-900 mt-0.5">⭐ {m.rating || 4.8} • {m.experience || 3} yrs</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {m.subjects?.slice(0,2).map((s:string) => (
                  <span key={s} className="text- font-bold bg-gray-900 text-white px-3 py-1 rounded-full">{s}</span>
                ))}
              </div>

              <p className="text- font-medium text-gray-800 mt-3 line-clamp-2 leading-snug">{m.bio || 'Experienced tutor with proven results'}</p>

              <div className="flex justify-between items-center mt-4 border-t border-gray-100 pt-3">
                <div className="font-black text- text-gray-900">₹{m.rate}<span className="font-medium text- text-gray-600">/hr</span></div>
                <div className="text- font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">{m.availability || 'Weekdays'}</div>
              </div>

              <Link href={`/mentor/${m.id}`} className="block w-full text-center bg-gray-900 text-white py-3 rounded-xl mt-4 font-bold text- hover:bg-black">
                View Profile
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}