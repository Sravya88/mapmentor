'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Search, Sparkles } from 'lucide-react'
import { Area, Subject } from '@/types/mentor'

const HYD_AREAS: Area[] = ['Gachibowli', 'Hitech City', 'Madhapur', 'Kondapur', 'Dilsukhnagar']
const SUBJECTS: Subject[] = ['CBSE Math', 'JEE Physics', 'NEET Biology', 'Coding']

export default function HeroSearch() {
  const [subject, setSubject] = useState<Subject | ''>('')
  const [area, setArea] = useState<Area | ''>('')
  const router = useRouter()

  const handleSearch = () => {
  if (!subject || !area) {
    alert('Please select subject and area')
    return
  }
  router.push(`/search?subject=${subject}&area=${area}`)
}
  return (
    <section className="bg-linear-to-br from-blue-700 to-blue-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Find Real Mentors Near You in Hyderabad
        </h1>
        <p className="text-lg md:text-xl mb-8 text-blue-100">
          MapMentor uses AI to match you with the best human mentors in your area
        </p>
        
        <div className="bg-white rounded-2xl p-2 shadow-2xl max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-2">
            <select 
              value={subject}
              onChange={e => setSubject(e.target.value as Subject)}
              className="flex-1 px-4 py-4 rounded-xl text-gray-900 text-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select Subject or Goal</option>
              {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-4 -translate-y-1/2 text-gray-400" size={20} />
              <select 
                value={area}
                onChange={e => setArea(e.target.value as Area)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 text-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select Area</option>
                {HYD_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            
            <button 
              onClick={handleSearch}
              className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition"
            >
              <Search size={20} /> Search
            </button>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-center gap-2 text-blue-200 text-sm">
          <Sparkles size={16} className="text-orange-400" />
          <span>AI-Powered: Get your top 3 mentor matches + why they fit</span>
        </div>
      </div>
    </section>
  )
}