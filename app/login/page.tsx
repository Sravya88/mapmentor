'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error) router.push('/admin')
    else alert(error.message)
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 space-y-4">
      <h1 className="text-2xl font-bold">Admin Login</h1>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2 rounded" />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2 rounded" />
      <button onClick={handleLogin} className="w-full bg-black text-white py-2 rounded">Login</button>
    </div>
  )
}