"use client"
import { useEffect, useState } from 'react'
import { supabaseBrowserClient } from '@/lib/supabaseClient'
import Link from 'next/link'

export default function Dashboard() {
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = supabaseBrowserClient()
    supabase.auth.getUser().then(({ data }) => {
      const userEmail = data.user?.email || ''
      setEmail(userEmail)
      setLoading(false)
      if (!userEmail) window.location.href = '/auth'
    })
  }, [])

  if (loading) return <div className="text-center">Loading…</div>

  return (
    <main>
      <div className="glass p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Welcome{email ? `, ${email}` : ''}</h1>
          <p className="text-white/70">Choose an option to get started</p>
        </div>
        <div className="flex gap-3">
          <Link href="/app/upload" className="px-5 py-3 rounded-lg bg-brand-500 hover:bg-brand-600">Upload resume</Link>
          <Link href="/app/builder" className="px-5 py-3 rounded-lg border border-white/10 hover:bg-white/5">Create new resume</Link>
        </div>
      </div>
    </main>
  )
}

