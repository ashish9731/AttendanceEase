"use client"
import { useState } from 'react'
import { FileText, Upload, Wand2 } from 'lucide-react'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [parsedText, setParsedText] = useState<string>('')
  const [analysis, setAnalysis] = useState<string>('')
  const [enhanced, setEnhanced] = useState<string>('')
  const [loading, setLoading] = useState<'parse'|'analyze'|'enhance'|'download'|null>(null)

  const handleFile = (f: File) => {
    const allowed = ['application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document','text/plain']
    if (!allowed.includes(f.type)) {
      alert('Please upload PDF, DOCX, or TXT')
      return
    }
    setFile(f)
  }

  const parseResume = async () => {
    if (!file) return
    setLoading('parse')
    setAnalysis('')
    setEnhanced('')
    const form = new FormData()
    form.append('file', file)
    const res = await fetch('/api/parse', { method: 'POST', body: form })
    const data = await res.json()
    setParsedText(data.text || '')
    setLoading(null)
  }

  const analyzeResume = async () => {
    if (!parsedText) return
    setLoading('analyze')
    const res = await fetch('/api/analyze', { method: 'POST', body: JSON.stringify({ text: parsedText }), headers: { 'Content-Type': 'application/json' } })
    const data = await res.json()
    setAnalysis(data.analysis || '')
    setLoading(null)
  }

  const enhanceResume = async () => {
    if (!parsedText || !analysis) return
    setLoading('enhance')
    const res = await fetch('/api/enhance', { method: 'POST', body: JSON.stringify({ text: parsedText, analysis }), headers: { 'Content-Type': 'application/json' } })
    const data = await res.json()
    setEnhanced(data.enhanced || '')
    setLoading(null)
  }

  const downloadPdf = async () => {
    setLoading('download')
    const res = await fetch('/api/export', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: enhanced || parsedText }) })
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'resume.pdf'
    a.click()
    URL.revokeObjectURL(url)
    setLoading(null)
  }

  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold">Upload & Analyze</h1>
      <div className="glass p-6 rounded-2xl">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>{file ? file.name : 'Choose PDF/DOCX/TXT'}</span>
            <input type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={(e)=> e.target.files && handleFile(e.target.files[0])} />
          </label>
          <button onClick={parseResume} disabled={!file || loading==='parse'} className="px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600">{loading==='parse' ? 'Parsing…' : 'Parse'}</button>
        </div>
        {parsedText && (
          <div className="mt-6">
            <button onClick={analyzeResume} disabled={loading==='analyze'} className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 inline-flex items-center gap-2">
              <Wand2 className="w-4 h-4" /> Analyze resume
            </button>
          </div>
        )}
      </div>

      {analysis && (
        <div className="glass p-6 rounded-2xl">
          <h2 className="text-xl font-semibold">Analysis</h2>
          <p className="text-white/80 whitespace-pre-wrap mt-2">{analysis}</p>
          <button onClick={enhanceResume} disabled={loading==='enhance'} className="mt-4 px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 inline-flex items-center gap-2">
            <FileText className="w-4 h-4" /> Enhance CV now
          </button>
        </div>
      )}

      {enhanced && (
        <div className="glass p-6 rounded-2xl">
          <h2 className="text-xl font-semibold">Enhanced Resume Preview</h2>
          <pre className="mt-3 whitespace-pre-wrap text-white/90 text-sm leading-6">{enhanced}</pre>
          <button onClick={downloadPdf} disabled={loading==='download'} className="mt-4 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5">Download PDF</button>
        </div>
      )}
    </main>
  )
}

