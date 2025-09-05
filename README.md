# Resume AI Builder (Next.js + Supabase Auth + OpenAI)

Production-ready scaffold to analyze, optimize, and enhance resumes with ATS alignment. Upload PDF/DOCX/TXT or create from scratch with AI assistance. Exports to PDF.

## Tech
- Next.js App Router, TypeScript, Tailwind CSS
- Supabase (authentication only)
- OpenAI (GPT-3.5 Turbo) for analysis & enhancement
- PDF parsing (pdf-parse), DOCX parsing (mammoth), PDF export (pdf-lib)

## Getting Started
1. Copy envs
```bash
cp .env.example .env
```
2. Fill `.env`
- OPENAI_API_KEY
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

3. Install and run
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy (Vercel)
- Import repo in Vercel
- Add the same env vars in Project Settings → Environment Variables
- Build command: `npm run build` (default)

## Notes
- Supabase is used only for authentication; no data is stored.
- AI prompts are grounded to avoid hallucinations and forbid fabrication.
- PDF export uses a simple layout; swap for templates as needed.

## File Structure
```
app/
  api/
    analyze/
    enhance/
    parse/
    export/
    analyze-section/
    enhance-section/
  app/
    builder/
    upload/
    layout.tsx
    page.tsx
  auth/
    page.tsx
  globals.css
  layout.tsx
  page.tsx
lib/
  supabaseClient.ts
components/
  SignOutButton.tsx
```

## Security
- All OpenAI calls run server-side.
- Only anonymous Supabase client is used on the client.

# AttendanceEase

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/ashish9731/AttendanceEase)