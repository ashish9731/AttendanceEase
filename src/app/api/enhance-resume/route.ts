import { NextRequest, NextResponse } from 'next/server';
import { enhanceResume } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { resumeContent, analysis } = await request.json();

    if (!resumeContent || !analysis) {
      return NextResponse.json(
        { error: 'Resume content and analysis are required' },
        { status: 400 }
      );
    }

    const enhanced = await enhanceResume(resumeContent, analysis);

    return NextResponse.json({ enhanced });
  } catch (error) {
    console.error('Error enhancing resume:', error);
    return NextResponse.json(
      { error: 'Failed to enhance resume. Please try again.' },
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