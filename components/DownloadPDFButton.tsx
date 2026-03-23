'use client'

import { useState } from 'react'
import { CVData } from '@/lib/cv-types'

interface Props {
  cvData: CVData
  className?: string
}

export function DownloadPDFButton({ cvData, className }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleDownload() {
    setLoading(true)
    try {
      const res = await fetch('/api/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cvData),
      })
      if (!res.ok) throw new Error('PDF generation failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${cvData.bio.firstName}_${cvData.bio.lastName}_CV_2026.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error(err)
      alert('PDF generation failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className={className}
    >
      {loading ? 'Generating…' : 'Download PDF ↓'}
    </button>
  )
}
