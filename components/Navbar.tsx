import Link from 'next/link'
import { GraduationCap } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="text-blue-600" size={28} />
            <span className="font-bold text-xl text-gray-900">MapMentor</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link href="/search" className="text-gray-700 hover:text-blue-600 font-medium">
              Browse Mentors
            </Link>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold">
              Become a Mentor
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}