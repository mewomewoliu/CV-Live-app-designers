import { NextRequest } from 'next/server'
import { CVData } from '@/lib/cv-types'
import { getBrowser, generateCVHTML } from '@/lib/pdf-utils'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function POST(request: NextRequest) {
  let cvData: CVData
  try {
    cvData = await request.json()
  } catch {
    return new Response('Invalid JSON', { status: 400 })
  }

  let browser
  try {
    const html = await generateCVHTML(cvData)

    browser = await getBrowser()
    const page = await browser.newPage()

    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2.5 })
    await page.setContent(html, { waitUntil: 'networkidle0' })
    await page.evaluate(() => document.fonts.ready)

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    })

    const firstName = cvData.bio.firstName ?? 'CV'
    const lastName = cvData.bio.lastName ?? ''
    const year = new Date().getFullYear()
    const filename = `${firstName}_${lastName}_CV_${year}.pdf`

    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (err) {
    console.error('PDF generation error:', err)
    return new Response('PDF generation failed', { status: 500 })
  } finally {
    await browser?.close()
  }
}
