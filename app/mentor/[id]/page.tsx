import { mockMentors } from '@/lib/mockMentors'
import { Star, MapPin, Clock, Award, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }> // Next.js 15: params is also async
}

export default async function MentorProfile({ params }: Props) {
  const { id } = await params
  const mentor = mockMentors.find(m => m.id === id)
  
  if (!mentor) {
    notFound() // Shows 404 page
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/search" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft size={20} />
          Back to results
        </Link>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="shrink-0">
              <img 
                src={mentor.photo_url} 
                alt={mentor.name}
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{mentor.name}</h1>
              
              <div className="flex items-center gap-4 mt-3 text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin size={18} />
                  <span>{mentor.area} • {mentor.distance_km} km away</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={18} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{mentor.rating}</span>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                {mentor.badges.map(badge => (
                  <span key={badge} className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Award size={14} />
                    {badge}
                  </span>
                ))}
              </div>
              
              <div className="mt-6">
                <h2 className="font-semibold text-lg text-gray-900 mb-2">Teaches</h2>
                <div className="flex flex-wrap gap-2">
                  {mentor.subjects.map(subject => (
                    <span key={subject} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-100">
                <h2 className="font-semibold text-orange-900 mb-1">Why AI matched you</h2>
                <p className="text-orange-800">{mentor.ai_match_reason}</p>
              </div>
            </div>
            
            <div className="md:w-64 shrink-0">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 sticky top-24">
                <p className="text-3xl font-bold text-gray-900">₹{mentor.rate}</p>
                <p className="text-gray-600 mb-4">per hour</p>
                
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
                  Book a Session
                </button>
                
                <button className="w-full mt-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg transition">
                  Message
                </button>
                
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} />
                  <span>Usually responds in 1 hour</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}