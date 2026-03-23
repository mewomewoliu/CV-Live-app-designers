'use client'

import { useState, useRef } from 'react'

interface FormFieldProps {
  label: string
  value: string
  onBlur: (value: string) => void
  placeholder?: string
  multiline?: boolean
  hint?: string
  rows?: number
}

export function FormField({ label, value, onBlur, placeholder, multiline, hint, rows = 3 }: FormFieldProps) {
  const [local, setLocal] = useState(value)
  const prevValueRef = useRef(value)

  // Sync if parent value changes externally
  if (value !== prevValueRef.current) {
    prevValueRef.current = value
    setLocal(value)
  }

  const inputClass =
    'w-full bg-white border border-zinc-200 rounded px-3 py-2 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-300 transition-colors'

  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">{label}</label>
      {multiline ? (
        <textarea
          className={`${inputClass} resize-none`}
          value={local}
          rows={rows}
          placeholder={placeholder}
          onChange={(e) => setLocal(e.target.value)}
          onBlur={() => onBlur(local)}
        />
      ) : (
        <input
          type="text"
          className={inputClass}
          value={local}
          placeholder={placeholder}
          onChange={(e) => setLocal(e.target.value)}
          onBlur={() => onBlur(local)}
        />
      )}
      {hint && <p className="text-[10px] text-zinc-400">{hint}</p>}
    </div>
  )
}
