'use client'

import { useCVStore } from '@/lib/cv-store'
import { CVLanguage } from '@/lib/cv-types'
import { Plus, Trash2 } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

const LEVELS: CVLanguage['level'][] = ['Native', 'Fluent', 'Professional', 'Basic']

export function LanguagesForm() {
  const { cv, updateLanguages } = useCVStore()
  if (!cv) return null
  const languages = cv.languages

  function addLanguage() {
    updateLanguages([...languages, { id: uuidv4(), name: '', level: 'Fluent' }])
  }

  function updateLang(id: string, updates: Partial<CVLanguage>) {
    updateLanguages(languages.map((l) => (l.id === id ? { ...l, ...updates } : l)))
  }

  function removeLang(id: string) {
    updateLanguages(languages.filter((l) => l.id !== id))
  }

  return (
    <div className="flex flex-col gap-3">
      {languages.map((lang) => (
        <div key={lang.id} className="flex items-center gap-2">
          <input
            type="text"
            className="flex-1 bg-white border border-zinc-200 rounded px-3 py-2 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-300 transition-colors"
            value={lang.name}
            placeholder="English"
            onChange={(e) => updateLang(lang.id, { name: e.target.value })}
            onBlur={(e) => updateLang(lang.id, { name: e.target.value })}
          />
          <select
            className="bg-white border border-zinc-200 rounded px-2 py-2 text-sm text-zinc-700 focus:outline-none focus:border-zinc-400 transition-colors"
            value={lang.level}
            onChange={(e) => updateLang(lang.id, { level: e.target.value as CVLanguage['level'] })}
          >
            {LEVELS.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <button
            onClick={() => removeLang(lang.id)}
            className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={13} />
          </button>
        </div>
      ))}

      <button
        onClick={addLanguage}
        className="flex items-center justify-center gap-2 border border-dashed border-zinc-300 rounded-lg py-2.5 text-sm text-zinc-500 hover:text-zinc-800 hover:border-zinc-400 transition-colors"
      >
        <Plus size={14} />
        Add language
      </button>
    </div>
  )
}
