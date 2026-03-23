'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CVData, CVExperience, CVEducation, CVLanguage, ThemeId } from './cv-types'
import { MOCK_CV } from './mock-cv'
import { v4 as uuidv4 } from 'uuid'

interface CVStore {
  cv: CVData
  isDirty: boolean
  lastSaved: Date | null

  updateBio: (bio: Partial<CVData['bio']>) => void
  updateExperience: (id: string, updates: Partial<CVExperience>) => void
  addExperience: () => void
  removeExperience: (id: string) => void
  moveExperience: (fromIndex: number, toIndex: number) => void

  updateSkills: (skills: string[]) => void

  updateEducation: (id: string, updates: Partial<CVEducation>) => void
  addEducation: () => void
  removeEducation: (id: string) => void

  updateLanguages: (languages: CVLanguage[]) => void

  setTheme: (theme: ThemeId) => void
  setAccentColor: (color: string) => void
  markSaved: () => void
  resetCV: () => void
}

export const useCVStore = create<CVStore>()(
  persist(
    (set) => ({
      cv: MOCK_CV,
      isDirty: false,
      lastSaved: null,

      updateBio: (bio) =>
        set((state) => ({
          cv: { ...state.cv, bio: { ...state.cv.bio, ...bio } },
          isDirty: true,
        })),

      updateExperience: (id, updates) =>
        set((state) => ({
          cv: {
            ...state.cv,
            experience: state.cv.experience.map((exp) =>
              exp.id === id ? { ...exp, ...updates } : exp
            ),
          },
          isDirty: true,
        })),

      addExperience: () =>
        set((state) => ({
          cv: {
            ...state.cv,
            experience: [
              ...state.cv.experience,
              {
                id: uuidv4(),
                title: 'New Role',
                company: 'Company',
                startDate: 'Jan 2024',
                endDate: 'Present',
                impactLine: '',
                description: '',
                skills: [],
              },
            ],
          },
          isDirty: true,
        })),

      removeExperience: (id) =>
        set((state) => ({
          cv: {
            ...state.cv,
            experience: state.cv.experience.filter((exp) => exp.id !== id),
          },
          isDirty: true,
        })),

      moveExperience: (fromIndex, toIndex) =>
        set((state) => {
          const exp = [...state.cv.experience]
          const [moved] = exp.splice(fromIndex, 1)
          exp.splice(toIndex, 0, moved)
          return { cv: { ...state.cv, experience: exp }, isDirty: true }
        }),

      updateSkills: (skills) =>
        set((state) => ({
          cv: { ...state.cv, skills },
          isDirty: true,
        })),

      updateEducation: (id, updates) =>
        set((state) => ({
          cv: {
            ...state.cv,
            education: state.cv.education.map((edu) =>
              edu.id === id ? { ...edu, ...updates } : edu
            ),
          },
          isDirty: true,
        })),

      addEducation: () =>
        set((state) => ({
          cv: {
            ...state.cv,
            education: [
              ...state.cv.education,
              {
                id: uuidv4(),
                degree: 'Degree',
                institution: 'Institution',
                startDate: '2020',
                endDate: '2024',
              },
            ],
          },
          isDirty: true,
        })),

      removeEducation: (id) =>
        set((state) => ({
          cv: {
            ...state.cv,
            education: state.cv.education.filter((edu) => edu.id !== id),
          },
          isDirty: true,
        })),

      updateLanguages: (languages) =>
        set((state) => ({
          cv: { ...state.cv, languages },
          isDirty: true,
        })),

      setTheme: (theme) =>
        set((state) => ({
          cv: { ...state.cv, theme },
          isDirty: true,
        })),

      setAccentColor: (accentColor) =>
        set((state) => ({
          cv: { ...state.cv, accentColor },
          isDirty: true,
        })),

      markSaved: () =>
        set({ isDirty: false, lastSaved: new Date() }),

      resetCV: () =>
        set({ cv: MOCK_CV, isDirty: false, lastSaved: null }),
    }),
    {
      name: 'live-cv-store',
      skipHydration: true,
    }
  )
)
