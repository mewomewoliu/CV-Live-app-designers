'use client'

import { create } from 'zustand'
import { CVData, CVExperience, CVEducation, CVLanguage, ThemeId } from './cv-types'
import { v4 as uuidv4 } from 'uuid'

interface CVStore {
  cv: CVData | null
  isDirty: boolean
  lastSaved: Date | null
  isLoading: boolean
  saveError: string | null

  loadCV: (cv: CVData) => void
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
  setSaveError: (error: string | null) => void
}

export const useCVStore = create<CVStore>()((set) => ({
  cv: null,
  isDirty: false,
  lastSaved: null,
  isLoading: true,
  saveError: null,

  loadCV: (cv) => set({ cv, isDirty: false, isLoading: false, saveError: null }),

  updateBio: (bio) =>
    set((state) => ({
      cv: state.cv ? { ...state.cv, bio: { ...state.cv.bio, ...bio } } : state.cv,
      isDirty: true,
    })),

  updateExperience: (id, updates) =>
    set((state) => ({
      cv: state.cv
        ? {
            ...state.cv,
            experience: state.cv.experience.map((exp) =>
              exp.id === id ? { ...exp, ...updates } : exp
            ),
          }
        : state.cv,
      isDirty: true,
    })),

  addExperience: () =>
    set((state) => ({
      cv: state.cv
        ? {
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
          }
        : state.cv,
      isDirty: true,
    })),

  removeExperience: (id) =>
    set((state) => ({
      cv: state.cv
        ? { ...state.cv, experience: state.cv.experience.filter((exp) => exp.id !== id) }
        : state.cv,
      isDirty: true,
    })),

  moveExperience: (fromIndex, toIndex) =>
    set((state) => {
      if (!state.cv) return state
      const exp = [...state.cv.experience]
      const [moved] = exp.splice(fromIndex, 1)
      exp.splice(toIndex, 0, moved)
      return { cv: { ...state.cv, experience: exp }, isDirty: true }
    }),

  updateSkills: (skills) =>
    set((state) => ({
      cv: state.cv ? { ...state.cv, skills } : state.cv,
      isDirty: true,
    })),

  updateEducation: (id, updates) =>
    set((state) => ({
      cv: state.cv
        ? {
            ...state.cv,
            education: state.cv.education.map((edu) =>
              edu.id === id ? { ...edu, ...updates } : edu
            ),
          }
        : state.cv,
      isDirty: true,
    })),

  addEducation: () =>
    set((state) => ({
      cv: state.cv
        ? {
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
          }
        : state.cv,
      isDirty: true,
    })),

  removeEducation: (id) =>
    set((state) => ({
      cv: state.cv
        ? { ...state.cv, education: state.cv.education.filter((edu) => edu.id !== id) }
        : state.cv,
      isDirty: true,
    })),

  updateLanguages: (languages) =>
    set((state) => ({
      cv: state.cv ? { ...state.cv, languages } : state.cv,
      isDirty: true,
    })),

  setTheme: (theme) =>
    set((state) => ({
      cv: state.cv ? { ...state.cv, theme } : state.cv,
      isDirty: true,
    })),

  setAccentColor: (accentColor) =>
    set((state) => ({
      cv: state.cv ? { ...state.cv, accentColor } : state.cv,
      isDirty: true,
    })),

  markSaved: () => set({ isDirty: false, lastSaved: new Date(), saveError: null }),

  setSaveError: (error) => set({ saveError: error }),
}))
