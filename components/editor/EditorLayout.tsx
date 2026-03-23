'use client'

import { useEffect, useState } from 'react'
import { useCVStore } from '@/lib/cv-store'
import { EditorToolbar } from './EditorToolbar'
import { PreviewPane } from './PreviewPane'
import { BioForm } from './forms/BioForm'
import { ExperienceForm } from './forms/ExperienceForm'
import { SkillsForm } from './forms/SkillsForm'
import { EducationForm } from './forms/EducationForm'
import { LanguagesForm } from './forms/LanguagesForm'

type Tab = 'bio' | 'experience' | 'skills' | 'education' | 'languages'

const TABS: { id: Tab; label: string }[] = [
  { id: 'bio', label: 'Bio' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'languages', label: 'Languages' },
]

export function EditorLayout() {
  const [activeTab, setActiveTab] = useState<Tab>('bio')
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    useCVStore.persist.rehydrate()
    setHydrated(true)
  }, [])

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-50">
        <div className="text-sm text-zinc-400 font-mono">Loading…</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-zinc-50">
      <EditorToolbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel — forms */}
        <aside className="w-[420px] flex-shrink-0 flex flex-col border-r border-zinc-200 bg-white overflow-hidden">
          {/* Tab nav */}
          <div className="flex border-b border-zinc-200 overflow-x-auto flex-shrink-0">
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-4 py-3 text-xs font-semibold tracking-wide uppercase whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === id
                    ? 'border-zinc-900 text-zinc-900'
                    : 'border-transparent text-zinc-500 hover:text-zinc-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Form content */}
          <div className="flex-1 overflow-y-auto p-5">
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
