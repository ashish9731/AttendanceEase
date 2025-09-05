import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ResumeAnalysis {
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  atsCompatibility: number;
  keywordSuggestions: string[];
}

export interface EnhancedResume {
  content: string;
  improvements: string[];
  atsScore: number;
}

export async function analyzeResume(resumeContent: string): Promise<ResumeAnalysis> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert resume analyzer and ATS specialist. Analyze the provided resume and return a detailed analysis in JSON format with the following structure:
          {
            "overallScore": number (0-100),
            "strengths": ["strength1", "strength2", ...],
            "weaknesses": ["weakness1", "weakness2", ...],
            "recommendations": ["recommendation1", "recommendation2", ...],
            "atsCompatibility": number (0-100),
            "keywordSuggestions": ["keyword1", "keyword2", ...]
          }
          
          Focus on ATS compatibility, formatting, content quality, keyword optimization, and professional presentation. Be specific and actionable in recommendations.`
        },
        {
          role: "user",
          content: `Please analyze this resume:\n\n${resumeContent}`
        }
      ],
      temperature: 0.3,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    return JSON.parse(content) as ResumeAnalysis;
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw new Error('Failed to analyze resume');
  }
}

export async function enhanceResume(resumeContent: string, analysis: ResumeAnalysis): Promise<EnhancedResume> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert resume writer and ATS optimization specialist. Based on the provided resume and analysis, create an enhanced version that addresses all weaknesses and recommendations while maintaining truthfulness. 

          CRITICAL RULES:
          1. NEVER add fake information, experiences, or skills
          2. Only enhance existing content with better wording, formatting, and structure
          3. Add relevant keywords naturally without keyword stuffing
          4. Improve bullet points to be more action-oriented and quantified where possible
          5. Ensure ATS compatibility with proper formatting
          6. Maintain the original person's experience and qualifications

          Return JSON format:
          {
            "content": "enhanced resume content in markdown format",
            "improvements": ["improvement1", "improvement2", ...],
            "atsScore": number (0-100)
          }`
        },
        {
          role: "user",
          content: `Original resume:\n${resumeContent}\n\nAnalysis:\n${JSON.stringify(analysis, null, 2)}\n\nPlease enhance this resume based on the analysis while following all the rules.`
        }
      ],
      temperature: 0.3,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    return JSON.parse(content) as EnhancedResume;
  } catch (error) {
    console.error('Error enhancing resume:', error);
    throw new Error('Failed to enhance resume');
  }
}

export async function generateResumeSection(sectionType: string, userInput: string): Promise<string> {
  try {
    const prompts = {
      summary: "Create a professional summary/objective based on the user's background. Make it compelling and ATS-friendly.",
      experience: "Generate professional work experience bullet points based on the user's input. Use action verbs and quantify achievements where possible.",
      skills: "Suggest relevant technical and soft skills based on the user's background and industry.",
      education: "Format and enhance education information professionally.",
      projects: "Create project descriptions that highlight technical skills and achievements.",
    };

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a professional resume writer. ${prompts[sectionType as keyof typeof prompts] || 'Generate professional resume content based on the user input.'} Return only the generated content without additional formatting or explanations.`
        },
        {
          role: "user",
          content: userInput
        }
      ],
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error generating resume section:', error);
    throw new Error('Failed to generate resume section');
  }
}

export default openai;