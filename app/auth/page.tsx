"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { supabaseBrowserClient } from '@/lib/supabaseClient'

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const supabase = supabaseBrowserClient()
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      }
      router.push('/app')
    } catch (err: any) {
      setError(err.message || 'Authentication error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="absolute top-6 left-6">
        <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
      </div>
      <div className="glass max-w-md w-full rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-center">{isSignUp ? 'Create account' : 'Welcome back'}</h1>
        <p className="text-center text-white/70 mt-1">Sign {isSignUp ? 'up' : 'in'} to continue</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-white/70">Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="mt-1 w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>
          <div>
            <label className="text-sm text-white/70">Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="mt-1 w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="w-full px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600">
            {loading ? 'Please wait…' : isSignUp ? 'Sign up' : 'Sign in'}
          </button>
        </form>
        <div className="text-center text-sm text-white/70 mt-4">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button onClick={()=>setIsSignUp(!isSignUp)} className="ml-2 text-brand-300 hover:text-brand-200 underline">
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </div>
      </div>
    </main>
  )
}

