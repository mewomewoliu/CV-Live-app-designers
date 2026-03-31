import type { CVData } from '@/lib/cv-types'

export interface CvRow {
  id: string
  user_id: string
  slug: string
  is_published: boolean
  cv_data: CVData
  created_at: string
  updated_at: string
}
