# AI Resume Builder

A modern, AI-powered resume builder that helps users create ATS-optimized resumes with intelligent analysis and enhancement features.

## Features

- **AI-Powered Analysis**: Get instant feedback on your resume with advanced AI analysis
- **ATS Optimization**: Ensure your resume passes through Applicant Tracking Systems
- **Resume Enhancement**: AI-powered content improvement and optimization
- **Smart Resume Builder**: Create resumes from scratch with AI assistance
- **Multiple File Formats**: Support for PDF, DOCX, and TXT file uploads
- **Professional Templates**: Beautiful, recruiter-approved resume templates
- **Real-time Preview**: See your resume as you build it
- **PDF Download**: Export your optimized resume as a professional PDF

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Authentication**: Supabase Auth
- **AI**: OpenAI GPT-3.5 Turbo
- **File Processing**: Mammoth (DOCX), PDF parsing
- **PDF Generation**: jsPDF
- **Animations**: Framer Motion
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account
- OpenAI API key

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd ai-resume-builder
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Fill in your environment variables in `.env`:
\`\`\`env
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
\`\`\`

5. Set up Supabase:
   - Create a new Supabase project
   - Enable authentication with email/password
   - Copy your URL and anon key to the `.env` file

6. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
src/
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   ├── builder/           # Resume builder page
│   ├── dashboard/         # User dashboard
│   ├── upload/            # Resume upload page
│   └── page.tsx           # Home page
├── components/            # Reusable components
├── contexts/              # React contexts
├── lib/                   # Utility libraries
│   ├── openai.ts         # OpenAI integration
│   ├── supabase/         # Supabase client/server
│   ├── file-parser.ts    # File parsing utilities
│   └── pdf-generator.ts  # PDF generation
└── middleware.ts          # Next.js middleware
\`\`\`

## Key Features Explained

### AI Resume Analysis
- Analyzes resume content for ATS compatibility
- Provides detailed feedback on strengths and weaknesses
- Suggests improvements and keywords
- Generates overall and ATS compatibility scores

### Resume Enhancement
- Uses AI to improve existing resume content
- Maintains factual accuracy (no fake information)
- Optimizes for ATS systems
- Improves formatting and language

### Smart Resume Builder
- AI-powered content generation for each section
- Real-time suggestions and improvements
- Professional templates and formatting
- Guided step-by-step process

### File Processing
- Supports PDF, DOCX, and TXT file uploads
- Intelligent text extraction and parsing
- File validation and error handling
- Size limits and security checks

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your production environment:
- \`OPENAI_API_KEY\`
- \`NEXT_PUBLIC_SUPABASE_URL\`
- \`NEXT_PUBLIC_SUPABASE_ANON_KEY\`
- \`NEXTAUTH_SECRET\`
- \`NEXTAUTH_URL\` (your production URL)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email [your-email] or create an issue in the repository.