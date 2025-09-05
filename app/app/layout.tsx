import { ReactNode } from 'react'
import Link from 'next/link'
import { SignOutButton } from '@/components/SignOutButton'
import '../../app/globals.css'

export const metadata = { title: 'Application - Resume AI Builder' }

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between p-4">
        <Link href="/" className="text-white/80 hover:text-white">← Back</Link>
        <div className="flex items-center gap-4">
          <div className="text-sm text-white/60">Resume AI Builder</div>
          <SignOutButton />
        </div>
      </header>
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {children}
      </div>
    </div>
  )
}

