import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export const runtime = 'nodejs'
export const maxDuration = 60

const systemPrompt = `You are an expert resume writer.
Enhance the provided section to be ATS-aligned and achievement-focused.
Constraints:
- Do not fabricate facts
- Preserve true chronology and roles
- Use strong action verbs and measurable impact when plausible
Return plain text for this section only.`

export async function POST(req: NextRequest) {
  const { section, content, analysis } = await req.json()
  if (!section) return NextResponse.json({ error: 'Missing section' }, { status: 400 })
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const resp = await client.chat.completions.create({
    model: 'gpt-3.5-turbo-0125',
    temperature: 0.2,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `SECTION: ${section}\nANALYSIS:\n${analysis || ''}\n\nCONTENT:\n${content || ''}` }
    ]
  })
  const enhanced = resp.choices[0]?.message?.content || ''
  return NextResponse.json({ enhanced })
}

