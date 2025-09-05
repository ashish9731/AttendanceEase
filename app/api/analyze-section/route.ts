import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export const runtime = 'nodejs'
export const maxDuration = 60

const systemPrompt = `You are an expert resume coach. Analyze the given section (summary/experience/education/skills/projects).
Return concise bullets with:
- Clarity issues
- Missing details to add (without inventing)
- ATS optimization suggestions (keywords, structure)`

export async function POST(req: NextRequest) {
  const { section, content } = await req.json()
  if (!section) return NextResponse.json({ error: 'Missing section' }, { status: 400 })
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const resp = await client.chat.completions.create({
    model: 'gpt-3.5-turbo-0125',
    temperature: 0.2,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `SECTION: ${section}\nCONTENT:\n${content || ''}` }
    ]
  })
  const analysis = resp.choices[0]?.message?.content || ''
  return NextResponse.json({ analysis })
}

