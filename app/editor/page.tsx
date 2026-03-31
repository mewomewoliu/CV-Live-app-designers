import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { EditorLayout } from '@/components/editor/EditorLayout'
import type { CvRow } from '@/lib/supabase/types'

export default async function EditorPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/sign-in?redirectTo=/editor')
  }

  const { data: cvRow } = await supabase
    .from('cvs')
    .select('*')
    .eq('user_id', user.id)
    .single() as { data: CvRow | null }

  if (!cvRow) {
    // CV row missing — shouldn't happen after signup callback, but handle gracefully
    redirect('/auth/sign-in?error=no_cv')
  }

  return <EditorLayout initialCV={cvRow.cv_data} isPublished={cvRow.is_published} />
}
