import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const AREAS = ['Gachibowli','Hitech City','Madhapur','Kondapur','Kukatpally','Ameerpet']
const SUBJECTS = ['CBSE Math','JEE','NEET','Coding','Spoken English','Physics']

export default async function Home() {
  const { count } = await supabase.from('mentors').select('*', { count: 'exact', head: true })

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <div className="bg-linear-to-br from-black to-gray-800 text-white px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold leading-tight">
            Find Real Tutors<br/>Near You in Hyderabad
          </h1>
          <p className="text-xl text-gray-300 mt-4 max-w-2xl">
            No agencies. Directly connect with verified mentors in your area. 
            JEE, NEET, CBSE, Coding — {count || 500}+ mentors.
          </p>
          
          <div className="flex gap-4 mt-8">
            <Link href="/search" className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg">
              Find Tutors →
            </Link>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-yellow-400 rounded-full border-2 border-black"></div>
                <div className="w-8 h-8 bg-blue-400 rounded-full border-2 border-black"></div>
                <div className="w-8 h-8 bg-green-400 rounded-full border-2 border-black"></div>
              </div>
              <span>Trusted by 200+ parents</span>
            </div>
          </div>

          {/* Search Quick */}
          <div className="mt-12 bg-white rounded-2xl p-2 flex gap-2 max-w-2xl">
            <select className="flex-1 text-black p-3 rounded-xl outline-none" id="area-select">
              <option>Select Area</option>
              {AREAS.map(a => <option key={a}>{a}</option>)}
            </select>
            <Link href="/search" className="bg-black text-white px-8 py-3 rounded-xl font-semibold">
              Search
            </Link>
          </div>
        </div>
      </div>

      {/* AREAS */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold">Popular Areas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
          {AREAS.map(area => (
            <Link key={area} href={`/tutors-in/${area.replace(/ /g, '-')}`} className="border p-6 rounded-2xl hover:bg-black hover:text-white transition text-center">
              <div className="text-2xl mb-2">📍</div>
              <div className="font-semibold">{area}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* SUBJECTS */}
      <div className="bg-gray-50 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold">What do you want to learn?</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {SUBJECTS.map(s => (
              <Link key={s} href={`/search?subject=${s}`} className="bg-white border p-6 rounded-2xl hover:shadow-lg transition">
                <div className="font-bold text-lg">{s}</div>
                <div className="text-gray-500 text-sm mt-1">Expert mentors available</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* WHY US */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center">Why MapMentor?</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <div className="text-center">
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl mx-auto">✓</div>
            <h3 className="font-bold mt-4">Verified Mentors</h3>
            <p className="text-gray-600 text-sm mt-2">ID verified, background checked. No fake profiles.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl mx-auto">📍</div>
            <h3 className="font-bold mt-4">Near You</h3>
            <p className="text-gray-600 text-sm mt-2">Walkable distance. Home tuition, no travel.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl mx-auto">₹</div>
            <h3 className="font-bold mt-4">No Commission</h3>
            <p className="text-gray-600 text-sm mt-2">Direct payment to mentor. No agency fees.</p>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="bg-black text-white px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold">Parents Trust Us</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 p-6 rounded-2xl">
              <p>"Found amazing JEE tutor in Gachibowli in 2 days. Earlier struggled for weeks on Justdial."</p>
              <div className="mt-4 font-bold">— Priya, Gachibowli</div>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl">
              <p>"Direct contact, no middleman. My daughter's CBSE Math improved from 60 to 92."</p>
              <div className="mt-4 font-bold">— Ramesh, Madhapur</div>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl">
              <p>"Finally a hyperlocal platform. Mentor lives 500m away, comes daily."</p>
              <div className="mt-4 font-bold">— Anjali, Kondapur</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold">Ready to find your mentor?</h2>
        <Link href="/search" className="inline-block mt-6 bg-black text-white px-10 py-4 rounded-full text-lg font-bold">
          Browse {count || 100}+ Mentors
        </Link>
      </div>
    </div>
  )
}