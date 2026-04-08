export type ThemeId = 'minimal' | 'active-ledger' | 'dark' | 'broadsheet' | 'warm-sidebar' | 'typewriter'

export interface CVRenderContext {
  mode: 'web' | 'pdf'
  isPdfRender: boolean
}

export interface CVBio {
  firstName: string
  lastName: string
  title: string
  location: string
  availability?: string
  summary: string
  email: string
  phone?: string
  website?: string
  linkedin?: string
  github?: string
  twitter?: string
}

export interface CVExperience {
  id: string
  title: string
  company: string
  startDate: string
  endDate: string // "Present" or date string
  impactLine: string // highlighted impact sentence
  description: string
  skills: string[]
  caseStudyUrl?: string
  hidden?: boolean
}

export interface CVEducation {
  id: string
  degree: string
  institution: string
  startDate: string
  endDate: string
  description?: string
}

export interface CVLanguage {
  id: string
  name: string
  level: 'Native' | 'Fluent' | 'Professional' | 'Basic'
}

export interface CVData {
  slug: string
  theme: ThemeId
  accentColor: string
  bio: CVBio
  experience: CVExperience[]
  skills: string[]
  education: CVEducation[]
  languages: CVLanguage[]
}
