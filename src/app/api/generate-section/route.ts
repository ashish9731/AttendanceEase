import { NextRequest, NextResponse } from 'next/server';
import { generateResumeSection } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { sectionType, userInput } = await request.json();

    if (!sectionType || !userInput) {
      return NextResponse.json(
        { error: 'Section type and user input are required' },
        { status: 400 }
      );
    }

    const validSections = ['summary', 'experience', 'skills', 'education', 'projects'];
    if (!validSections.includes(sectionType)) {
      return NextResponse.json(
        { error: 'Invalid section type' },
        { status: 400 }
      );
    }

    const generatedContent = await generateResumeSection(sectionType, userInput);

    return NextResponse.json({ content: generatedContent });
  } catch (error) {
    console.error('Error generating section:', error);
    return NextResponse.json(
      { error: 'Failed to generate section content. Please try again.' },
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