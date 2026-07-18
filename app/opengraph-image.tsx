// app/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'MapMentor - Find Tutors Near You'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ background: 'black', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '60px', justifyContent: 'center' }}>
        <div style={{ fontSize: 80, fontWeight: 900, color: 'white' }}>MapMentor</div>
        <div style={{ fontSize: 36, color: '#aaa', marginTop: 20 }}>Find Real Tutors Near You in Hyderabad</div>
        <div style={{ fontSize: 24, color: '#666', marginTop: 40 }}>500+ Verified Mentors • No Commission</div>
      </div>
    ),
    { ...size }
  )
}