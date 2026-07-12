'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Star, MapPin } from 'lucide-react'
import { Mentor } from '@/types/mentor'
import ContactModal from './ContactModal'

interface MentorCardProps {
  mentor: Mentor
}

export default function MentorCard({ mentor }: MentorCardProps) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div 
        data-testid="mentor-card"
        className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
      >
        <div className="flex items-start gap-4 mb-4">
          <img
            src={mentor.photo_url}
            alt={mentor.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">{mentor.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <MapPin size={14} />
              <span>{mentor.area}</span>
              <span>•</span>
              <span>{mentor.distance_km} km</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Star className="text-yellow-400 fill-yellow-400" size={16} />
          <span className="font-semibold text-gray-900">{mentor.rating}</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-900 font-semibold">₹{mentor.rate}/hr</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {mentor.subjects.map((subject) => (
            <span
              key={subject}
              className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium"
            >
              {subject}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {mentor.badges.map((badge) => (
            <span
              key={badge}
              className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-medium"
            >
              {badge}
            </span>
          ))}
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {mentor.ai_match_reason}
        </p>

        <div className="flex gap-2">
          <Link
            href={`/mentor/${mentor.id}`}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2 rounded-lg transition text-center"
          >
            View Profile
          </Link>
          <button 
            onClick={() => setShowModal(true)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Contact
          </button>
        </div>
      </div>

      {showModal && (
        <ContactModal mentor={mentor} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}