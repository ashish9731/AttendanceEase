"use client"
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="max-w-5xl w-full text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-white/80">
          <Sparkles className="w-4 h-4 text-brand-400" />
          AI-powered ATS optimization
        </div>
        <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-tight">
          Build a better resume with AI
        </h1>
        <p className="mt-4 text-white/80 max-w-2xl mx-auto">
          Upload or create a resume from scratch. Analyze, optimize, and enhance every section with ATS-aligned suggestions.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link href="/auth" className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-500 hover:bg-brand-600 transition">
            Get started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
          </Link>
          <a href="#features" className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition">Learn more</a>
        </div>

        <section id="features" className="mt-24 grid md:grid-cols-3 gap-6">
          {[
            { title: 'Upload & Analyze', desc: 'PDF, DOCX, or TXT parsing with AI analysis' },
            { title: 'ATS Aligned', desc: 'Optimized content and formatting to pass screenings' },
            { title: 'Export PDF', desc: 'Beautiful, professional templates ready to download' },
          ].map((f) => (
            <div key={f.title} className="glass rounded-2xl p-6 text-left">
              <h3 className="text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-white/70">{f.desc}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  )
}

