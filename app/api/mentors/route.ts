import { NextRequest, NextResponse } from 'next/server'
import { findMentors } from '@/lib/api/mentors'
import { Subject, Area } from '@/types/mentor'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  try {
    const filters = {
      subject: searchParams.get('subject') as Subject || undefined,
      area: searchParams.get('area') as Area || undefined,
      minRating: searchParams.get('minRating')? Number(searchParams.get('minRating')) : undefined,
      maxPrice: searchParams.get('maxPrice')? Number(searchParams.get('maxPrice')) : undefined,
      page: searchParams.get('page')? Number(searchParams.get('page')) : 1, 
      limit: searchParams.get('limit')? Number(searchParams.get('limit')) : 6 
    }

    const data = await findMentors(filters)
    return NextResponse.json(data)

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch mentors' },
      { status: 500 }
    )
  }
}