"use client"
import { useState } from 'react'
import { Wand2, FileDown } from 'lucide-react'

type SectionKey = 'summary' | 'experience' | 'education' | 'skills' | 'projects'

const initialState: Record<SectionKey, string> = {
  summary: '',
  experience: '',
  education: '',
  skills: '',
  projects: ''
}

export default function BuilderPage() {
  const [sections, setSections] = useState<Record<SectionKey, string>>(initialState)
  const [working, setWorking] = useState<SectionKey | 'all' | null>(null)
  const [analysis, setAnalysis] = useState<Record<SectionKey, string>>({} as any)

  const update = (key: SectionKey, value: string) => setSections(s => ({ ...s, [key]: value }))

  const analyze = async (key: SectionKey) => {
    setWorking(key)
    const res = await fetch('/api/analyze-section', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: key, content: sections[key] }) })
    const data = await res.json()
    setAnalysis(a => ({ ...a, [key]: data.analysis || '' }))
    setWorking(null)
  }

  const enhance = async (key: SectionKey) => {
    setWorking(key)
    const res = await fetch('/api/enhance-section', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: key, content: sections[key], analysis: analysis[key] || '' }) })
    const data = await res.json()
    update(key, data.enhanced || sections[key])
    setWorking(null)
  }

  const enhanceAll = async () => {
    setWorking('all')
    const res = await fetch('/api/enhance', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: Object.entries(sections).map(([k,v])=>`[${k.toUpperCase()}]\n${v}`).join('\n\n'), analysis: Object.entries(analysis).map(([k,v])=>`[${k.toUpperCase()} ANALYSIS]\n${v}`).join('\n\n') }) })
    const data = await res.json()
    if (data.enhanced) {
      // naive split back
      const parts = data.enhanced.split(/\n\s*\n/)
      const next = { ...sections }
      ;(['summary','experience','education','skills','projects'] as SectionKey[]).forEach((k, i) => { next[k] = parts[i] || next[k] })
      setSections(next)
    }
    setWorking(null)
  }

  const download = async () => {
    const content = Object.entries(sections).map(([k,v])=>`# ${k.toUpperCase()}\n${v}`).join('\n\n')
    const res = await fetch('/api/export', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content }) })
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'resume.pdf'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Create New Resume</h1>
        <div className="flex gap-3">
          <button onClick={enhanceAll} disabled={working==='all'} className="px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 inline-flex items-center gap-2">
            <Wand2 className="w-4 h-4" /> Optimize all
          </button>
          <button onClick={download} className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 inline-flex items-center gap-2">
            <FileDown className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {(['summary','experience','education','skills','projects'] as SectionKey[]).map((key) => (
          <div key={key} className="glass p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{key.charAt(0).toUpperCase()+key.slice(1)}</h2>
              <div className="flex gap-2">
                <button onClick={()=>analyze(key)} disabled={working===key} className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/15 text-sm">Analyze</button>
                <button onClick={()=>enhance(key)} disabled={working===key} className="px-3 py-1.5 rounded bg-brand-500 hover:bg-brand-600 text-sm">Enhance</button>
              </div>
            </div>
            <textarea value={sections[key]} onChange={(e)=>update(key, e.target.value)} className="mt-3 w-full h-40 bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder={
              key === 'summary' ? 'Professional summary…' :
              key === 'experience' ? 'Job title, company, dates, achievements…' :
              key === 'education' ? 'Degree, institution, dates, highlights…' :
              key === 'skills' ? 'Technical and soft skills…' :
              'Projects, impact, technologies…'
            } />
            {analysis[key] && (
              <div className="mt-3 text-sm text-white/80 whitespace-pre-wrap">
                {analysis[key]}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}

