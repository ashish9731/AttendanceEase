import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export const runtime = 'nodejs'
export const maxDuration = 60

const systemPrompt = `You are an expert resume writer.
Enhance the resume text to be ATS-aligned, concise, and achievement-focused.
Constraints:
- Do NOT fabricate facts or titles
- Only refine, rephrase, reorder, and quantify where plausible
- Incorporate all recommendations provided in the analysis
- Keep structure clean with clear sections and bullet points
Return plain text.`

export async function POST(req: NextRequest) {
  const { text, analysis } = await req.json()
  if (!text) return NextResponse.json({ error: 'Missing text' }, { status: 400 })
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const resp = await client.chat.completions.create({
    model: 'gpt-3.5-turbo-0125',
    temperature: 0.2,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `ANALYSIS:\n${analysis || ''}\n\nRESUME:\n${text}` }
    ]
  })
  const enhanced = resp.choices[0]?.message?.content || ''
  return NextResponse.json({ enhanced })
}

