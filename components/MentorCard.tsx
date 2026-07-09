import { Star, MapPin, Sparkles } from 'lucide-react'
import { Mentor } from '@/types/mentor'
import Link from 'next/link'


export default function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
      <div className="flex gap-4">
        <img 
          src={mentor.photo_url} 
          alt={mentor.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-lg text-gray-900">{mentor.name}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                <MapPin size={14} />
                <span>{mentor.area} • {mentor.distance_km} km away</span>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-bold text-xl text-gray-900">₹{mentor.rate}</p>
              <p className="text-xs text-gray-500">per hour</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-sm">{mentor.rating}</span>
            </div>
            <div className="flex gap-1">
              {mentor.badges.map(badge => (
                <span key={badge} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                  {badge}
                </span>
              ))}
            </div>
          </div>
          
          {mentor.ai_match_reason && (
            <div className="mt-3 bg-orange-50 border border-orange-100 rounded-lg p-2 flex gap-2">
              <Sparkles size={16} className="text-orange-500 shrink-0 mt-0.5" />
              <p className="text-sm text-orange-900">
                <span className="font-semibold">AI Match:</span> {mentor.ai_match_reason}
              </p>
            </div>
          )}
          
          <div className="mt-3 text-sm text-gray-700">
            <span className="font-medium">Teaches:</span> {mentor.subjects.join(', ')}
          </div>
          
          <Link 
            href={`/mentor/${mentor.id}`}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition text-center block"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  )
}