'use client'

import { useEffect, useState } from 'react'
import { useCVStore } from '@/lib/cv-store'
import { ThemeId } from '@/lib/cv-types'
import { DownloadPDFButton } from '../DownloadPDFButton'
import { Copy, Check } from 'lucide-react'
import Link from 'next/link'

const THEMES: { id: ThemeId; label: string }[] = [
  { id: 'minimal', label: 'Minimal' },
  { id: 'active-ledger', label: 'Ledger' },
  { id: 'dark', label: 'Dark' },
  { id: 'broadsheet', label: 'Broadsheet' },
]

export function EditorToolbar() {
  const { cv, isDirty, lastSaved, setTheme, markSaved, resetCV } = useCVStore()
  const [copied, setCopied] = useState(false)

  // Debounced auto-save indicator
  useEffect(() => {
    if (!isDirty) return
    const timer = setTimeout(() => markSaved(), 600)
    return () => clearTimeout(timer)
  }, [isDirty, cv, markSaved])

  function copyLink() {
    navigator.clipboard.writeText(`${window.location.origin}/${cv.slug}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const saveLabel = isDirty
    ? 'Saving…'
    : lastSaved
    ? `Saved ${new Date(lastSaved).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    : 'All changes saved'

  return (
    <div className="h-14 bg-white border-b border-zinc-200 flex items-center px-4 gap-4 flex-shrink-0">
      {/* Logo */}
      <Link href="/" className="text-sm font-black tracking-tighter text-zinc-900 mr-2">
        CV.live
      </Link>

      {/* Slug */}
      <span className="text-xs text-zinc-400 font-mono hidden sm:block">/{cv.slug}</span>

      {/* Theme picker */}
      <div className="flex items-center gap-1 ml-auto">
        {THEMES.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTheme(id)}
            className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
              cv.theme === id
                ? 'bg-zinc-900 text-white'
                : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Save status */}
      <span className="text-[11px] text-zinc-400 font-mono hidden md:block whitespace-nowrap">
        {saveLabel}
      </span>

      {/* Restore defaults */}
      <button
        onClick={() => { if (confirm('Restore CV to saved defaults? Unsaved changes will be lost.')) resetCV() }}
        className="text-[11px] text-zinc-400 hover:text-zinc-700 font-mono hidden md:block whitespace-nowrap transition-colors"
      >
        Restore
      </button>

      {/* Share */}
      <button
        onClick={copyLink}
        className="flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-400 px-3 py-1.5 rounded transition-colors"
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
        {copied ? 'Copied!' : 'Share'}
      </button>

      {/* Download PDF */}
      <DownloadPDFButton
        cvData={cv}
        className="flex items-center gap-1.5 text-xs bg-zinc-900 text-white hover:bg-zinc-700 px-3 py-1.5 rounded transition-colors cursor-pointer disabled:opacity-60"
      />
    </div>
  )
}
