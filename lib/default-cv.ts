import type { CVData } from './cv-types'

export function generateSlug(firstName: string, lastName: string): string {
  const base = `${firstName}-${lastName}`
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'user'
  const suffix = Math.random().toString(36).slice(2, 6)
  return `${base}-${suffix}`
}

export function createDefaultCV(firstName: string, lastName: string, slug: string): CVData {
  return {
    slug,
    theme: 'minimal',
    accentColor: '#18181b',
    bio: {
      firstName,
      lastName,
      title: '',
      location: '',
      summary: '',
      email: '',
    },
    experience: [],
    skills: [],
    education: [],
    languages: [],
  }
}
