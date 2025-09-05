import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export const runtime = 'nodejs'
export const maxDuration = 60

const systemPrompt = `You are an expert career coach and ATS specialist.
Analyze the provided resume text. Return:
- Key strengths
- Gaps or missing details (without fabricating)
- Actionable recommendations to improve ATS match and clarity
Keep concise bullet points. Avoid hallucinations. Do not invent experiences.`

export async function POST(req: NextRequest) {
  const { text } = await req.json()
  if (!text) return NextResponse.json({ error: 'Missing text' }, { status: 400 })
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const resp = await client.chat.completions.create({
    model: 'gpt-3.5-turbo-0125',
    temperature: 0.2,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: text }
    ]
  })
  const analysis = resp.choices[0]?.message?.content || ''
  return NextResponse.json({ analysis })
}

