'use client'

import { useState } from 'react'
import { useCVStore } from '@/lib/cv-store'

export function SkillsForm() {
  const { cv, updateSkills } = useCVStore()
  const [input, setInput] = useState('')
  if (!cv) return null
  const skills = cv.skills

  function addSkill(value: string) {
    const trimmed = value.trim().replace(/,+$/, '')
    if (trimmed && !skills.includes(trimmed)) {
      updateSkills([...skills, trimmed])
    }
    setInput('')
  }

  function removeSkill(skill: string) {
    updateSkills(skills.filter((s) => s !== skill))
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-zinc-500 leading-relaxed">
        These appear as pill tags in the sidebar of your CV. Keep them concise — tools, methods, and domains.
      </p>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1.5 text-xs border border-zinc-300 rounded-full px-3 py-1 text-zinc-700 bg-white"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="text-zinc-400 hover:text-red-500 transition-colors leading-none"
            >
              ×
            </button>
          </span>
        ))}
        {skills.length === 0 && (
          <p className="text-xs text-zinc-400 italic">No skills added yet</p>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 bg-white border border-zinc-200 rounded px-3 py-2 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-300 transition-colors"
          value={input}
          placeholder="Type skill, press Enter or comma"
          onChange={(e) => {
            const val = e.target.value
            if (val.endsWith(',')) {
              addSkill(val.slice(0, -1))
            } else {
              setInput(val)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addSkill(input)
            }
          }}
        />
        <button
          onClick={() => addSkill(input)}
          className="px-3 py-2 bg-zinc-900 text-white text-xs rounded hover:bg-zinc-700 transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  )
}
