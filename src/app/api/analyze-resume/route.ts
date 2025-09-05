import { NextRequest, NextResponse } from 'next/server';
import { analyzeResume } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { resumeContent } = await request.json();

    if (!resumeContent || typeof resumeContent !== 'string') {
      return NextResponse.json(
        { error: 'Resume content is required' },
        { status: 400 }
      );
    }

    if (resumeContent.length < 100) {
      return NextResponse.json(
        { error: 'Resume content is too short to analyze' },
        { status: 400 }
      );
    }

    const analysis = await analyzeResume(resumeContent);

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Error analyzing resume:', error);
    return NextResponse.json(
      { error: 'Failed to analyze resume. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}