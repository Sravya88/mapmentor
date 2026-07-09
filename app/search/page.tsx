import { mockMentors } from '@/lib/mockMentors'
import MentorCard from '@/components/MentorCard'
import { Area, Subject } from '@/types/mentor'

type SearchParams = { subject?: string, area?: string }

export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: Promise<SearchParams> // ← Next.js 15: it's a Promise
}) {
  const { subject, area } = await searchParams // ← Must await this
  
  console.log('URL params:', { subject, area })
  
  const filteredMentors = mockMentors.filter(mentor => {
    const matchesSubject = !subject || mentor.subjects.includes(subject as Subject)
    const matchesArea = !area || mentor.area === area
    return matchesSubject && matchesArea
  })

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Mentors for {subject || 'All Subjects'} in {area || 'Hyderabad'}
          </h1>
          <p className="text-gray-600 mt-1">
            {filteredMentors.length} mentors found
          </p>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid gap-4">
          {filteredMentors.length > 0 ? (
            filteredMentors.map(mentor => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No mentors found. Try a different area or subject.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}