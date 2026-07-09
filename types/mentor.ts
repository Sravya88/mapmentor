export type Area = 'Gachibowli' | 'Hitech City' | 'Madhapur' | 'Kondapur' | 'Kukatpally' | 'Ameerpet' | 'Secunderabad' | 'Jubilee Hills' | 'Miyapur' | 'Dilsukhnagar'

export type Subject = 'CBSE Math' | 'JEE Physics' | 'NEET Biology' | 'Spoken English' | 'Coding' | 'UPSC' | 'Class 10 Science' | 'Interview Prep'

export interface Mentor {
  id: string
  name: string
  subjects: Subject[]
  rate: number
  rating: number
  distance_km: number
  area: Area
  ai_match_reason?: string
  photo_url: string
  badges: string[]
}