'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const AREAS = ['Gachibowli','Hitech City','Madhapur','Kondapur','Kukatpally','Ameerpet','Secunderabad','Dilsukhnagar']
const SUBJECTS = ['CBSE Math','JEE Math','NEET Biology','Physics','Chemistry','Spoken English','Coding','UPSC','Class 10 Science']

export default function AdminPage() {
  const [mentors, setMentors] = useState<any[]>([])
  const [editingId, setEditingId] = useState<string|null>(null)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    name: '', area: 'Gachibowli', subjects: [] as string[], rate: 500,
    bio: '', experience: 3, education: 'B.Tech', availability: 'Weekdays 6-8pm',
    photo_url: '', rating: 4.8
  })

  const fetchMentors = async () => {
    const { data } = await supabase.from('mentors').select('*').order('created_at', { ascending: false })
    if (data) setMentors(data)
  }
  useEffect(() => { fetchMentors() }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fileName = `${Date.now()}-${file.name}`
    const { error } = await supabase.storage.from('mentor-photos').upload(fileName, file)
    if (!error) {
      const { data } = supabase.storage.from('mentor-photos').getPublicUrl(fileName)
      setForm({...form, photo_url: data.publicUrl})
    }
    setUploading(false)
  }

  const handleSubmit = async () => {
    if (!form.name) return alert('Name required')
    const payload = {...form, image: form.photo_url, distance_km: 2.5 }

    let error
    if (editingId) {
      const res = await supabase.from('mentors').update(payload).eq('id', editingId)
      error = res.error
    } else {
      const res = await supabase.from('mentors').insert(payload).select()
      error = res.error
    }

    if (error) alert(JSON.stringify(error, null, 2))
    else {
      setForm({ name: '', area: 'Gachibowli', subjects: [], rate: 500, bio: '', experience: 3, education: 'B.Tech', availability: 'Weekdays 6-8pm', photo_url: '', rating: 4.8 })
      setEditingId(null)
      fetchMentors()
    }
  }

  const handleEdit = (m: any) => {
    setForm({ name: m.name, area: m.area, subjects: m.subjects || [], rate: m.rate, bio: m.bio || '', experience: m.experience || 3, education: m.education || '', availability: m.availability || '', photo_url: m.photo_url || m.image || '', rating: m.rating || 4.8 })
    setEditingId(m.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return
    await supabase.from('mentors').delete().eq('id', id)
    fetchMentors()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{editingId? 'Edit' : 'Add'} Mentor - {mentors.length} total</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>

      {/* FORM */}
      <div className="border p-6 rounded-lg mb-8 space-y-4 bg-gray-50">
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="border p-2 rounded" />
          <select value={form.area} onChange={e => setForm({...form, area: e.target.value})} className="border p-2 rounded">
            {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <input type="number" placeholder="Rate ₹/hr" value={form.rate} onChange={e => setForm({...form, rate: Number(e.target.value)})} className="border p-2 rounded" />
          <input type="number" placeholder="Experience years" value={form.experience} onChange={e => setForm({...form, experience: Number(e.target.value)})} className="border p-2 rounded" />
          <input placeholder="Education" value={form.education} onChange={e => setForm({...form, education: e.target.value})} className="border p-2 rounded col-span-2" />
          <input placeholder="Availability" value={form.availability} onChange={e => setForm({...form, availability: e.target.value})} className="border p-2 rounded col-span-2" />
        </div>

        <div>
          <label className="font-semibold">Subjects:</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {SUBJECTS.map(s => (
              <button key={s} type="button"
                onClick={() => setForm({...form, subjects: form.subjects.includes(s)? form.subjects.filter(x=>x!==s) : [...form.subjects, s]})}
                className={`px-3 py-1 rounded-full text-sm border ${form.subjects.includes(s)? 'bg-black text-white' : 'bg-white'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="font-semibold">Photo: {uploading && 'Uploading...'}</label>
          <input type="file" accept="image/*" onChange={handleUpload} className="block mt-2" />
          {form.photo_url && <img src={form.photo_url} alt="preview" className="w-24 h-24 rounded-full mt-2 object-cover" />}
        </div>

        <textarea placeholder="Bio" value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} className="w-full border p-2 rounded h-20" />

        <div className="flex gap-2">
          <button onClick={handleSubmit} className="bg-black text-white px-6 py-2 rounded">{editingId? 'Update' : 'Add'} Mentor</button>
          {editingId && <button onClick={()=>{setEditingId(null); setForm({ name: '', area: 'Gachibowli', subjects: [], rate: 500, bio: '', experience: 3, education: 'B.Tech', availability: 'Weekdays 6-8pm', photo_url: '', rating: 4.8 })}} className="border px-6 py-2 rounded">Cancel</button>}
        </div>
      </div>

      {/* LIST */}
      <div className="grid gap-2">
        {mentors.map(m => (
          <div key={m.id} className="flex items-center justify-between border p-3 rounded">
            <div className="flex items-center gap-3">
              <img src={m.photo_url || m.image} alt={m.name} className="w-10 h-10 rounded-full object-cover" />
              <span><b>{m.name}</b> - {m.area} - {m.subjects?.join(', ')} - ₹{m.rate}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>handleEdit(m)} className="text-blue-600">Edit</button>
              <button onClick={()=>handleDelete(m.id)} className="text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}