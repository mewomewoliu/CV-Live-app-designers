'use client'

import { useEffect, useState } from 'react'
import { useCVStore } from '@/lib/cv-store'
import type { CVData } from '@/lib/cv-types'
import { EditorToolbar } from './EditorToolbar'
import { PreviewPane } from './PreviewPane'
import { BioForm } from './forms/BioForm'
import { ExperienceForm } from './forms/ExperienceForm'
import { SkillsForm } from './forms/SkillsForm'
import { EducationForm } from './forms/EducationForm'
import { LanguagesForm } from './forms/LanguagesForm'

const BLUE = '#1111cc'
const BG = '#f3f4e8'
const GRID = 'rgba(10, 10, 180, 0.12)'

type Tab = 'bio' | 'experience' | 'skills' | 'education' | 'languages'

const TABS: { id: Tab; label: string }[] = [
  { id: 'bio', label: 'Bio' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'languages', label: 'Languages' },
]

interface EditorLayoutProps {
  initialCV: CVData
  isPublished: boolean
}

export function EditorLayout({ initialCV, isPublished }: EditorLayoutProps) {
  const [activeTab, setActiveTab] = useState<Tab>('bio')
  const { loadCV, isLoading } = useCVStore()

  useEffect(() => {
    loadCV(initialCV)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run on mount — initialCV is stable from server

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: BG,
          color: BLUE,
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.12em',
          opacity: 0.5,
        }}
      >
        LOADING…
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: BG,
        backgroundImage: `
          linear-gradient(to right, ${GRID} 1px, transparent 1px),
          linear-gradient(to bottom, ${GRID} 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        fontFamily: 'var(--font-inter), Inter, sans-serif',
        color: BLUE,
      }}
    >
      <EditorToolbar isPublished={isPublished} />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left panel — forms */}
        <aside
          style={{
            width: 420,
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            borderRight: `1px solid rgba(10,10,180,0.2)`,
            backgroundColor: 'rgba(243,244,232,0.92)',
            overflow: 'hidden',
          }}
        >
          {/* Tab nav */}
          <div
            style={{
              display: 'flex',
              borderBottom: `1px solid rgba(10,10,180,0.2)`,
              flexShrink: 0,
              overflowX: 'auto',
            }}
          >
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                style={{
                  padding: '10px 14px',
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontFamily: 'inherit',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === id ? `2px solid ${BLUE}` : '2px solid transparent',
                  color: activeTab === id ? BLUE : `rgba(10,10,180,0.4)`,
                  transition: 'all 0.1s',
                }}
              >
                {label.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Form content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
            {activeTab === 'bio' && <BioForm />}
            {activeTab === 'experience' && <ExperienceForm />}
            {activeTab === 'skills' && <SkillsForm />}
            {activeTab === 'education' && <EducationForm />}
            {activeTab === 'languages' && <LanguagesForm />}
          </div>
        </aside>

        {/* Right panel — preview */}
        <PreviewPane />
      </div>
    </div>
  )
}
