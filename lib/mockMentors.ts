import { Mentor } from '@/types/mentor'

export const mockMentors: Mentor[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    subjects: ['CBSE Math', 'Class 10 Science'],
    rate: 800,
    rating: 4.8,
    distance_km: 1.2,
    area: 'Gachibowli',
    ai_match_reason: 'Top-rated for CBSE Math. 50+ students in Gachibowli.',
    photo_url: 'https://i.pravatar.cc/150?img=1',
    badges: ['Top Rated', 'Verified']
  },
  {
    id: '2',
    name: 'Arjun Reddy',
    subjects: ['JEE Physics', 'Coding'],
    rate: 1200,
    rating: 4.9,
    distance_km: 2.5,
    area: 'Hitech City',
    ai_match_reason: 'IIT graduate. Specializes in JEE crash courses.',
    photo_url: 'https://i.pravatar.cc/150?img=3',
    badges: ['IIT Alumni', 'Verified']
  },
  {
    id: '3',
    name: 'Meena Patel',
    subjects: ['NEET Biology', 'CBSE Math'],
    rate: 900,
    rating: 4.7,
    distance_km: 0.8,
    area: 'Gachibowli',
    ai_match_reason: 'Closest mentor. Strong NEET Biology track record.',
    photo_url: 'https://i.pravatar.cc/150?img=5',
    badges: ['Near You', 'Verified']
  }
]