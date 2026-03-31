'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCVStore } from '@/lib/cv-store'
import { ThemeId } from '@/lib/cv-types'
import { DownloadPDFButton } from '../DownloadPDFButton'
import { createClient } from '@/lib/supabase/client'
import { Copy, Check, Globe, Lock, LogOut } from 'lucide-react'

const BLUE = '#1111cc'
const BG = '#f3f4e8'

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
    <div
      style={{
        height: 48,
        backgroundColor: BG,
        borderBottom: `1px solid rgba(10,10,180,0.2)`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 12,
        flexShrink: 0,
        fontFamily: 'var(--font-inter), Inter, sans-serif',
        color: BLUE,
      }}
    >
      {/* Logo */}
      <span style={{ fontSize: 13, fontWeight: 900, letterSpacing: '-0.02em', color: BLUE, marginRight: 4 }}>
        CV.live
      </span>

      {/* Slug */}
      {cv && (
        <span style={{ fontSize: 10, fontFamily: 'monospace', opacity: 0.45, display: 'none' }} className="sm:block">
          /{cv.slug}
        </span>
      )}

      {/* Theme picker */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
        {THEMES.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTheme(id)}
            style={{
              padding: '4px 10px',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.08em',
              cursor: 'pointer',
              fontFamily: 'inherit',
              border: `1px solid ${cv?.theme === id ? BLUE : 'rgba(10,10,180,0.2)'}`,
              backgroundColor: cv?.theme === id ? BLUE : 'transparent',
              color: cv?.theme === id ? BG : BLUE,
              transition: 'all 0.1s',
            }}
          >
            {label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Save status */}
      <span
        style={{
          fontSize: 10,
          fontFamily: 'monospace',
          whiteSpace: 'nowrap',
          color: saveError ? '#cc1111' : 'rgba(10,10,180,0.4)',
          display: 'none',
        }}
        className="md:block"
      >
        {saveLabel}
      </span>

      {/* Publish toggle */}
      <button
        onClick={togglePublish}
        disabled={publishLoading}
        title={isPublished ? 'Make private' : 'Publish CV'}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.08em',
          padding: '4px 10px',
          cursor: publishLoading ? 'not-allowed' : 'pointer',
          opacity: publishLoading ? 0.5 : 1,
          fontFamily: 'inherit',
          border: isPublished ? `1px solid rgba(10,10,180,0.5)` : `1px solid rgba(10,10,180,0.2)`,
          backgroundColor: isPublished ? 'rgba(10,10,180,0.08)' : 'transparent',
          color: BLUE,
        }}
      >
        {isPublished ? <Globe size={11} /> : <Lock size={11} />}
        {isPublished ? 'PUBLISHED' : 'PUBLISH'}
      </button>

      {/* Share */}
      <button
        onClick={copyLink}
        disabled={!isPublished}
        title={isPublished ? 'Copy public link' : 'Publish your CV to share it'}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.08em',
          padding: '4px 10px',
          cursor: isPublished ? 'pointer' : 'not-allowed',
          opacity: isPublished ? 1 : 0.35,
          fontFamily: 'inherit',
          border: `1px solid rgba(10,10,180,0.2)`,
          backgroundColor: 'transparent',
          color: BLUE,
        }}
      >
        {copied ? <Check size={11} /> : <Copy size={11} />}
        {copied ? 'COPIED!' : 'SHARE'}
      </button>

      {/* Download PDF */}
      {cv && (
        <DownloadPDFButton
          cvData={cv}
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.08em',
            padding: '4px 10px',
            backgroundColor: BLUE,
            color: BG,
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        />
      )}

      {/* Sign out */}
      <button
        onClick={handleSignOut}
        title="Sign out"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: `rgba(10,10,180,0.4)`,
          display: 'flex',
          alignItems: 'center',
          padding: 4,
        }}
      >
        <LogOut size={13} />
      </button>
    </div>
  )
}
