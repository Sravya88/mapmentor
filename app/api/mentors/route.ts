import { NextRequest, NextResponse } from 'next/server'
import { mockMentors } from '@/lib/mockMentors'
import { Area, Subject } from '@/types/mentor'

// GET /api/mentors?subject=CBSE%20Math&area=Gachibowli
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const subject = searchParams.get('subject')
  const area = searchParams.get('area')

  // Simulate DB delay so we see loading.tsx
  await new Promise(resolve => setTimeout(resolve, 500))

  let filtered = mockMentors

  if (subject) {
    filtered = filtered.filter(m => m.subjects.includes(subject as Subject))
  }
  
  if (area) {
    filtered = filtered.filter(m => m.area === area)
  }

  return NextResponse.json({ 
    mentors: filtered,
    count: filtered.length 
  })
}