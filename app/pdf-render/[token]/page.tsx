// This route is kept as a dev utility for previewing PDF renders.
// The actual PDF generation uses page.setContent() directly in the API route.
import { notFound } from 'next/navigation'
import { getCVBySlug } from '@/lib/mock-cv'
import { CVRenderer } from '@/components/cv/CVRenderer'

interface Props {
  params: { token: string }
}

export default function PDFRenderPage({ params }: Props) {
  // In dev, use slug for preview: /pdf-render/mia-liu
  const cv = getCVBySlug(params.token)
  if (!cv) notFound()

  return (
    <>
      <style>{`
        @page { size: A4; margin: 0; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        html, body { margin: 0; padding: 0; background: transparent; }
        .cv-page { page-break-after: always; }
        .cv-page:last-child { page-break-after: avoid; }
      `}</style>
      <CVRenderer
        data={cv}
        context={{ mode: 'pdf', isPdfRender: true }}
      />
    </>
  )
}
