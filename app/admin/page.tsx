'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Mentor } from '@/types/mentor'

export default function AdminPage() {
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [form, setForm] = useState({ name: '', area: 'Gachibowli', subjects: '', rate: 0, rating: 5 })

  const fetchMentors = async () => {
    const { data } = await supabase.from('mentors').select('*').order('created_at', { ascending: false })
    if (data) setMentors(data as Mentor[])
  }

  useEffect(() => { fetchMentors() }, [])

 const handleAdd = async () => {
  const payload = {
    name: form.name,
    area: form.area,
    subjects: form.subjects.split(',').map(s => s.trim()).filter(Boolean),
    rate: Number(form.rate) || 500,
    rating: 4.8,
    distance_km: 2.5,
    photo_url: `https://i.pravatar.cc/300?u=${Date.now()}`,
    image: `https://i.pravatar.cc/300?u=${Date.now()}`,
    bio: 'Experienced tutor',
    experience: 5,
    education: 'M.Tech',
    availability: 'Weekdays'
  }
  
  const { error } = await supabase.from('mentors').insert(payload).select()
  if (error) alert(JSON.stringify(error, null, 2))
  else { alert('Success!'); fetchMentors(); }
}

  const handleDelete = async (id: string) => {
    await supabase.from('mentors').delete().eq('id', id)
    fetchMentors()
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin - {mentors.length} Mentors</h1>

      {/* Add Form */}
      <div className="border p-4 rounded mb-8 grid grid-cols-2 gap-4">
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="border p-2 rounded" />
        <input placeholder="Area" value={form.area} onChange={e => setForm({...form, area: e.target.value})} className="border p-2 rounded" />
        <input placeholder="Subjects comma separated: Math, Physics" value={form.subjects} onChange={e => setForm({...form, subjects: e.target.value})} className="border p-2 rounded" />
        <input type="number" placeholder="Rate" value={form.rate} onChange={e => setForm({...form, rate: Number(e.target.value)})} className="border p-2 rounded" />
        <button onClick={handleAdd} className="col-span-2 bg-black text-white py-2 rounded">Add Mentor</button>
      </div>

      {/* List */}
      <div className="grid gap-2">
        {mentors.map(m => (
          <div key={m.id} className="flex justify-between border p-3 rounded">
            <span>{m.name} - {m.area} - {m.subjects.join(', ')} - ₹{m.rate}</span>
            <button onClick={() => handleDelete(m.id)} className="text-red-500">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}