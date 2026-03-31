'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCVStore } from '@/lib/cv-store'
import { ThemeId } from '@/lib/cv-types'
import { DownloadPDFButton } from '../DownloadPDFButton'
import { createClient } from '@/lib/supabase/client'
import { Copy, Check, Globe, Lock, LogOut } from 'lucide-react'

const THEMES: { id: ThemeId; label: string }[] = [
  { id: 'minimal', label: 'Minimal' },
  { id: 'active-ledger', label: 'Ledger' },
  { id: 'dark', label: 'Dark' },
  { id: 'broadsheet', label: 'Broadsheet' },
]

interface EditorToolbarProps {
  isPublished: boolean
}

export function EditorToolbar({ isPublished: initialIsPublished }: EditorToolbarProps) {
  const router = useRouter()
  const { cv, isDirty, lastSaved, saveError, setTheme, markSaved, setSaveError } = useCVStore()
  const [copied, setCopied] = useState(false)
  const [isPublished, setIsPublished] = useState(initialIsPublished)
  const [publishLoading, setPublishLoading] = useState(false)

  // Debounced auto-save to Supabase
  useEffect(() => {
    if (!isDirty || !cv) return
    const timer = setTimeout(async () => {
      try {
        const res = await fetch('/api/cv', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cvData: cv }),
        })
        if (res.ok) {
          markSaved()
        } else {
          const data = await res.json()
          setSaveError(data.error ?? 'Save failed')
        }
      } catch {
        setSaveError('Save failed — check your connection')
      }
    }, 600)
    return () => clearTimeout(timer)
  }, [isDirty, cv, markSaved, setSaveError])

  async function togglePublish() {
    setPublishLoading(true)
    try {
      const res = await fetch('/api/cv/publish', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !isPublished }),
      })
      if (res.ok) {
        setIsPublished((prev) => !prev)
      }
    } finally {
      setPublishLoading(false)
    }
  }

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  function copyLink() {
    if (!cv) return
    navigator.clipboard.writeText(`${window.location.origin}/${cv.slug}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const saveLabel = saveError
    ? saveError
    : isDirty
    ? 'Saving…'
    : lastSaved
    ? `Saved ${new Date(lastSaved).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    : 'All changes saved'

  return (
    <div className="h-14 bg-white border-b border-zinc-200 flex items-center px-4 gap-4 flex-shrink-0">
      {/* Logo */}
      <span className="text-sm font-black tracking-tighter text-zinc-900 mr-2">CV.live</span>

      {/* Slug */}
      {cv && <span className="text-xs text-zinc-400 font-mono hidden sm:block">/{cv.slug}</span>}

      {/* Theme picker */}
      <div className="flex items-center gap-1 ml-auto">
        {THEMES.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTheme(id)}
            className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
              cv?.theme === id
                ? 'bg-zinc-900 text-white'
                : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Save status */}
      <span
        className={`text-[11px] font-mono hidden md:block whitespace-nowrap ${
          saveError ? 'text-red-500' : 'text-zinc-400'
        }`}
      >
        {saveLabel}
      </span>

      {/* Publish toggle */}
      <button
        onClick={togglePublish}
        disabled={publishLoading}
        title={isPublished ? 'Make private' : 'Publish CV (make public)'}
        className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border transition-colors disabled:opacity-50 ${
          isPublished
            ? 'border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
            : 'border-zinc-200 text-zinc-500 hover:text-zinc-800 hover:border-zinc-400'
        }`}
      >
        {isPublished ? <Globe size={12} /> : <Lock size={12} />}
        {isPublished ? 'Published' : 'Publish'}
      </button>

      {/* Share — only meaningful when published */}
      <button
        onClick={copyLink}
        disabled={!isPublished}
        title={isPublished ? 'Copy public link' : 'Publish your CV to share it'}
        className="flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-400 px-3 py-1.5 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
        {copied ? 'Copied!' : 'Share'}
      </button>

      {/* Download PDF */}
      {cv && (
        <DownloadPDFButton
          cvData={cv}
          className="flex items-center gap-1.5 text-xs bg-zinc-900 text-white hover:bg-zinc-700 px-3 py-1.5 rounded transition-colors cursor-pointer disabled:opacity-60"
        />
      )}

      {/* Sign out */}
      <button
        onClick={handleSignOut}
        title="Sign out"
        className="text-zinc-400 hover:text-zinc-700 transition-colors"
      >
        <LogOut size={14} />
      </button>
    </div>
  )
}
