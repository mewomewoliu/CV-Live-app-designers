'use client'

import { useState } from 'react'
import { useCVStore } from '@/lib/cv-store'
import { CVExperience } from '@/lib/cv-types'
import { FormField } from '../FormField'
import { Plus, Trash2, ChevronUp, ChevronDown, ChevronRight } from 'lucide-react'

function TagInput({ tags, onChange }: { tags: string[]; onChange: (tags: string[]) => void }) {
  const [input, setInput] = useState('')

  function addTag(value: string) {
    const trimmed = value.trim().replace(/,+$/, '')
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed])
    }
    setInput('')
  }

  return (
    <div>
      <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-1 block">
        Skills / Tools
      </label>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 text-[10px] border border-zinc-300 rounded-full px-2.5 py-0.5 text-zinc-600"
          >
            {tag}
            <button
              onClick={() => onChange(tags.filter((t) => t !== tag))}
              className="text-zinc-400 hover:text-red-500 transition-colors ml-0.5"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        className="w-full bg-white border border-zinc-200 rounded px-3 py-2 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-300 transition-colors"
        value={input}
        placeholder="Type skill, press Enter or comma"
        onChange={(e) => {
          const val = e.target.value
          if (val.endsWith(',')) {
            addTag(val.slice(0, -1))
          } else {
            setInput(val)
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            addTag(input)
          }
        }}
        onBlur={() => { if (input.trim()) addTag(input) }}
      />
    </div>
  )
}

function ExperienceCard({
  exp,
  index,
  total,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  exp: CVExperience
  index: number
  total: number
  onUpdate: (updates: Partial<CVExperience>) => void
  onRemove: () => void
  onMoveUp: () => void
  onMoveDown: () => void
}) {
  const [open, setOpen] = useState(index === 0)
  const [isPresent, setIsPresent] = useState(exp.endDate === 'Present')

  return (
    <div className="border border-zinc-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 py-2.5 bg-zinc-50 cursor-pointer hover:bg-zinc-100 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <ChevronRight
          size={14}
          className={`text-zinc-400 transition-transform flex-shrink-0 ${open ? 'rotate-90' : ''}`}
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-zinc-800 truncate">
            {exp.title || 'New Role'}
          </p>
          <p className="text-[11px] text-zinc-500 truncate">{exp.company} · {exp.startDate} – {exp.endDate}</p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); onMoveUp() }}
            disabled={index === 0}
            className="p-1 text-zinc-400 hover:text-zinc-700 disabled:opacity-30 transition-colors"
          >
            <ChevronUp size={13} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMoveDown() }}
            disabled={index === total - 1}
            className="p-1 text-zinc-400 hover:text-zinc-700 disabled:opacity-30 transition-colors"
          >
            <ChevronDown size={13} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onRemove() }}
            className="p-1 text-zinc-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {open && (
        <div className="p-3 flex flex-col gap-3 border-t border-zinc-200">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              label="Job title"
              value={exp.title}
              onBlur={(v) => onUpdate({ title: v })}
              placeholder="Senior Designer"
            />
            <FormField
              label="Company"
              value={exp.company}
              onBlur={(v) => onUpdate({ company: v })}
              placeholder="Acme Inc."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormField
              label="Start date"
              value={exp.startDate}
              onBlur={(v) => onUpdate({ startDate: v })}
              placeholder="Jan 2022"
            />
            <div className="flex flex-col gap-1">
              <FormField
                label="End date"
                value={isPresent ? '' : exp.endDate}
                onBlur={(v) => onUpdate({ endDate: v || 'Present' })}
                placeholder="Dec 2024"
              />
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPresent}
                  onChange={(e) => {
                    setIsPresent(e.target.checked)
                    onUpdate({ endDate: e.target.checked ? 'Present' : '' })
                  }}
                  className="w-3 h-3 rounded border-zinc-300"
                />
                <span className="text-[10px] text-zinc-500">Currently here</span>
              </label>
            </div>
          </div>

          <FormField
            label="Impact line"
            value={exp.impactLine}
            onBlur={(v) => onUpdate({ impactLine: v })}
            multiline
            rows={2}
            placeholder="Led redesign that reduced task time by 40%..."
            hint="One punchy sentence. This is highlighted on your CV."
          />

          <FormField
            label="Description"
            value={exp.description}
            onBlur={(v) => onUpdate({ description: v })}
            multiline
            rows={3}
            placeholder="Describe the scope, methods, and outcomes..."
          />

          <TagInput tags={exp.skills} onChange={(skills) => onUpdate({ skills })} />

          <FormField
            label="Case study URL (optional)"
            value={exp.caseStudyUrl ?? ''}
            onBlur={(v) => onUpdate({ caseStudyUrl: v })}
            placeholder="https://..."
          />
        </div>
      )}
    </div>
  )
}

export function ExperienceForm() {
  const { cv, updateExperience, addExperience, removeExperience, moveExperience } = useCVStore()
  if (!cv) return null

  return (
    <div className="flex flex-col gap-3">
      {cv.experience.map((exp, i) => (
        <ExperienceCard
          key={exp.id}
          exp={exp}
          index={i}
          total={cv.experience.length}
          onUpdate={(updates) => updateExperience(exp.id, updates)}
          onRemove={() => removeExperience(exp.id)}
          onMoveUp={() => moveExperience(i, i - 1)}
          onMoveDown={() => moveExperience(i, i + 1)}
        />
      ))}
      <button
        onClick={addExperience}
        className="flex items-center justify-center gap-2 border border-dashed border-zinc-300 rounded-lg py-2.5 text-sm text-zinc-500 hover:text-zinc-800 hover:border-zinc-400 transition-colors"
      >
        <Plus size={14} />
        Add experience
      </button>
    </div>
  )
}
