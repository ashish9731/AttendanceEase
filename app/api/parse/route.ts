import { NextRequest, NextResponse } from 'next/server'
// Defer requiring heavy modules to runtime to avoid build-time issues
let pdfParse: any
let mammoth: any

export const runtime = 'nodejs'
export const maxDuration = 30

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const type = file.type
  let text = ''
  try {
    if (type === 'application/pdf') {
      if (!pdfParse) pdfParse = (await import('pdf-parse')).default
      const data = await pdfParse(buffer)
      text = data.text
    } else if (type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      if (!mammoth) mammoth = (await import('mammoth')).default
      const result = await mammoth.extractRawText({ buffer })
      text = result.value
    } else if (type === 'text/plain') {
      text = buffer.toString('utf-8')
    } else {
      return NextResponse.json({ error: 'Unsupported type' }, { status: 400 })
    }
    return NextResponse.json({ text })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Parse error' }, { status: 500 })
  }
}

