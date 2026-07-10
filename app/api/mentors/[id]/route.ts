import { NextRequest, NextResponse } from 'next/server'
import { findMentorById } from '@/lib/api/mentors'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const mentor = await findMentorById(params.id)

    if (!mentor) {
      return NextResponse.json(
        { error: 'Mentor not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(mentor)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch mentor' },
      { status: 500 }
    )
  }
}