export type Subject = 
  | 'CBSE Math' 
  | 'CBSE Science'  // ← Make sure this line exists
  | 'JEE Physics'
  | 'JEE Math'
  | 'JEE Chemistry'
  | 'NEET Biology'
  | 'Coding'
  | 'English'
  | 'IELTS'

export type Area = 'Gachibowli' | 'Hitech City' | 'Madhapur' | 'Kondapur'  | 'Dilsukhnagar'
export interface Mentor {
  id: string
  name: string
  area: Area
  subjects: Subject[]
  distance_km: number
  rating: number
  rate: number
  photo_url: string
  badges: string[]
  ai_match_reason: string
}