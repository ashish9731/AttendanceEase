import type { ResumeAnalysis, EnhancedResume } from '@/lib/openai';

export class APIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'APIError';
  }
}

export async function analyzeResumeAPI(resumeContent: string): Promise<ResumeAnalysis> {
  try {
    const response = await fetch('/api/analyze-resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resumeContent }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new APIError(errorData.error || 'Failed to analyze resume', response.status);
    }

    const { analysis } = await response.json();
    return analysis;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError('Network error occurred while analyzing resume');
  }
}

export async function enhanceResumeAPI(resumeContent: string, analysis: ResumeAnalysis): Promise<EnhancedResume> {
  try {
    const response = await fetch('/api/enhance-resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resumeContent, analysis }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new APIError(errorData.error || 'Failed to enhance resume', response.status);
    }

    const { enhanced } = await response.json();
    return enhanced;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError('Network error occurred while enhancing resume');
  }
}

export async function generateSectionAPI(sectionType: string, userInput: string): Promise<string> {
  try {
    const response = await fetch('/api/generate-section', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sectionType, userInput }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new APIError(errorData.error || 'Failed to generate section', response.status);
    }

    const { content } = await response.json();
    return content;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError('Network error occurred while generating section');
  }
}