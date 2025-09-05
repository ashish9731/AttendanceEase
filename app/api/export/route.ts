import { NextRequest } from 'next/server'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

export const runtime = 'nodejs'
export const maxDuration = 30

export async function POST(req: NextRequest) {
  const { content } = await req.json()
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([595.28, 841.89]) // A4
  const { height, width } = page.getSize()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const margin = 48
  const fontSize = 11
  const lineHeight = fontSize * 1.4

  const lines = (content || '').split('\n')
  let y = height - margin

  page.drawText('Resume', { x: margin, y, size: 18, font, color: rgb(0.22,0.25,0.95) })
  y -= lineHeight * 2

  for (const line of lines) {
    const words = line.split(' ')
    let cursor = ''
    for (const word of words) {
      const test = cursor ? cursor + ' ' + word : word
      const w = font.widthOfTextAtSize(test, fontSize)
      if (w > (width - margin * 2)) {
        page.drawText(cursor, { x: margin, y, size: fontSize, font, color: rgb(0.2,0.2,0.25) })
        y -= lineHeight
        cursor = word
      } else {
        cursor = test
      }
      if (y < margin) {
        // start new page
        y = height - margin
      }
    }
    if (cursor) {
      page.drawText(cursor, { x: margin, y, size: fontSize, font, color: rgb(0.2,0.2,0.25) })
      y -= lineHeight
    }
  }

  const bytes = await pdfDoc.save()
  return new Response(Buffer.from(bytes), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="resume.pdf"'
    }
  })
}

