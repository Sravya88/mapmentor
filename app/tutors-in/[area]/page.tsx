import { supabase } from '@/lib/supabase'

export async function generateStaticParams() {
  return [
    { area: 'Gachibowli' },
    { area: 'Hitech-City' },
    { area: 'Madhapur' },
    { area: 'Kondapur' },
    { area: 'Kukatpally' },
  ]
}

export default async function AreaPage({ params }: { params: { area: string } }) {
  // FIX: Safe check
  const areaParam = params?.area || 'Gachibowli'
  const area = areaParam.replace(/-/g, ' ')
  
  let mentors: any[] = []
  try {
    const { data } = await supabase
      .from('mentors')
      .select('*')
      .ilike('area', `%${area}%`)
      .limit(6)
    mentors = data || []
  } catch (e) {
    mentors = []
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Best Tutors in {area}, Hyderabad</h1>
      <p className="text-gray-600 mt-2">Find {mentors.length}+ verified mentors near you in {area}. JEE, NEET, CBSE, Coding.</p>
      
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {mentors.map((m:any)=>(
          <div key={m.id} className="border p-4 rounded">
            <b>{m.name}</b> - {m.subjects?.join(', ')} - ₹{m.rate}/hr
          </div>
        ))}
      </div>
      
      <a href={`/search?area=${area}`} className="inline-block mt-6 bg-black text-white px-6 py-3 rounded">
        View All in {area}
      </a>
    </div>
  )
}

// IMPORTANT: Disable dynamic params error
export const dynamicParams = true