"use client"
import { supabaseBrowserClient } from '@/lib/supabaseClient'

export function SignOutButton() {
  const handle = async () => {
    const supabase = supabaseBrowserClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }
  return (
    <button onClick={handle} className="text-sm text-white/70 hover:text-white">Sign out</button>
  )
}

