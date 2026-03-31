'use client'

import { useCVStore } from '@/lib/cv-store'
import { FormField } from '../FormField'

export function BioForm() {
  const { cv, updateBio } = useCVStore()
  if (!cv) return null
  const bio = cv.bio

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <FormField
          label="First name"
          value={bio.firstName}
          onBlur={(v) => updateBio({ firstName: v })}
          placeholder="Jane"
        />
        <FormField
          label="Last name"
          value={bio.lastName}
          onBlur={(v) => updateBio({ lastName: v })}
          placeholder="Doe"
        />
      </div>

      <FormField
        label="Title"
        value={bio.title}
        onBlur={(v) => updateBio({ title: v })}
        placeholder="Principal Product Designer"
      />

      <div className="grid grid-cols-2 gap-3">
        <FormField
          label="Location"
          value={bio.location}
          onBlur={(v) => updateBio({ location: v })}
          placeholder="Stockholm, Sweden"
        />
        <FormField
          label="Availability"
          value={bio.availability ?? ''}
          onBlur={(v) => updateBio({ availability: v })}
          placeholder="Available Q3 2025"
        />
      </div>

      <FormField
        label="Summary"
        value={bio.summary}
        onBlur={(v) => updateBio({ summary: v })}
        multiline
        rows={4}
        placeholder="Product Designer specializing in..."
        hint="2–3 sentences. Recruiters read this first."
      />

      <div className="border-t border-zinc-100 pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-3">Contact</p>
        <div className="flex flex-col gap-3">
          <FormField
            label="Email"
            value={bio.email}
            onBlur={(v) => updateBio({ email: v })}
            placeholder="jane@example.com"
          />
          <FormField
            label="Phone"
            value={bio.phone ?? ''}
            onBlur={(v) => updateBio({ phone: v })}
            placeholder="+46 70 123 4567"
          />
          <FormField
            label="Website"
            value={bio.website ?? ''}
            onBlur={(v) => updateBio({ website: v })}
            placeholder="yourportfolio.com"
          />
          <FormField
            label="LinkedIn"
            value={bio.linkedin ?? ''}
            onBlur={(v) => updateBio({ linkedin: v })}
            placeholder="linkedin.com/in/yourname"
          />
          <FormField
            label="GitHub"
            value={bio.github ?? ''}
            onBlur={(v) => updateBio({ github: v })}
            placeholder="github.com/yourname"
          />
        </div>
      </div>
    </div>
  )
}
