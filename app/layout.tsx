import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Resume AI Builder',
  description: 'Analyze, optimize, and enhance resumes with ATS alignment',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}

