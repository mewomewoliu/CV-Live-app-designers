import { notFound } from 'next/navigation'
import { getCVBySlug } from '@/lib/mock-cv'
import { CVRenderer } from '@/components/cv/CVRenderer'
import { DownloadPDFButton } from '@/components/DownloadPDFButton'
import Link from 'next/link'

interface Props {
  params: { slug: string }
}

export default function CVPage({ params }: Props) {
  const cv = getCVBySlug(params.slug)
  if (!cv) notFound()

  return (
    <main className="min-h-screen py-12 px-4" style={{ backgroundColor: '#f0f0ee' }}>
      {/* Top bar */}
      <div className="max-w-[210mm] mx-auto mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-xs font-mono text-zinc-400 hover:text-zinc-700 transition-colors tracking-widest uppercase"
        >
          CV.live
        </Link>
        <DownloadPDFButton
          cvData={cv}
          className="text-xs font-mono text-zinc-500 hover:text-zinc-900 disabled:opacity-50 transition-colors tracking-wider uppercase border border-zinc-300 hover:border-zinc-600 px-3 py-1.5 rounded-sm cursor-pointer"
        />
      </div>

      <CVRenderer data={cv} context={{ mode: 'web', isPdfRender: false }} />

      <div className="max-w-[210mm] mx-auto mt-6 text-center">
        <p className="text-xs text-zinc-400 font-mono">cv.live/{params.slug}</p>
      </div>
    </main>
  )
}
