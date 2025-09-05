import { createClient } from '@supabase/supabase-js'

export const supabaseBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseAnonKey) throw new Error('Supabase env vars not set')
  return createClient(supabaseUrl, supabaseAnonKey)
}

