'use client'

import { useState } from 'react'
import { useCVStore } from '@/lib/cv-store'
import { FormField } from '../FormField'
import { Plus, Trash2, ChevronRight } from 'lucide-react'

export function EducationForm() {
  const { cv, updateEducation, addEducation, removeEducation } = useCVStore()
  const [openIds, setOpenIds] = useState<Set<string>>(
    new Set(cv.education[0] ? [cv.education[0].id] : [])
  )

  function toggleOpen(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="flex flex-col gap-3">
      {cv.education.map((edu) => (
        <div key={edu.id} className="border border-zinc-200 rounded-lg overflow-hidden">
          <div
            className="flex items-center gap-2 px-3 py-2.5 bg-zinc-50 cursor-pointer hover:bg-zinc-100 transition-colors"
            onClick={() => toggleOpen(edu.id)}
          >
            <ChevronRight
              size={14}
              className={`text-zinc-400 transition-transform flex-shrink-0 ${openIds.has(edu.id) ? 'rotate-90' : ''}`}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-800 truncate">{edu.degree || 'Degree'}</p>
              <p className="text-[11px] text-zinc-500 truncate">{edu.institution} · {edu.startDate}–{edu.endDate}</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); removeEducation(edu.id) }}
              className="p-1 text-zinc-400 hover:text-red-500 transition-colors flex-shrink-0"
            >
              <Trash2 size={13} />
            </button>
          </div>

          {openIds.has(edu.id) && (
            <div className="p-3 flex flex-col gap-3 border-t border-zinc-200">
              <FormField
                label="Degree / Qualification"
                value={edu.degree}
                onBlur={(v) => updateEducation(edu.id, { degree: v })}
                placeholder="BSc Computer Science"
              />
              <FormField
                label="Institution"
                value={edu.institution}
                onBlur={(v) => updateEducation(edu.id, { institution: v })}
                placeholder="MIT"
              />
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  label="Start year"
                  value={edu.startDate}
                  onBlur={(v) => updateEducation(edu.id, { startDate: v })}
                  placeholder="2018"
                />
                <FormField
                  label="End year"
                  value={edu.endDate}
                  onBlur={(v) => updateEducation(edu.id, { endDate: v })}
                  placeholder="2022"
                />
              </div>
              <FormField
                label="Description (optional)"
                value={edu.description ?? ''}
                onBlur={(v) => updateEducation(edu.id, { description: v })}
                multiline
                rows={2}
                placeholder="Thesis, specialisation, or highlights..."
              />
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addEducation}
        className="flex items-center justify-center gap-2 border border-dashed border-zinc-300 rounded-lg py-2.5 text-sm text-zinc-500 hover:text-zinc-800 hover:border-zinc-400 transition-colors"
      >
        <Plus size={14} />
        Add education
      </button>
    </div>
  )
}
