import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createDefaultCV, generateSlug } from '@/lib/default-cv'
import { EditorLayout } from '@/components/editor/EditorLayout'
import type { CvRow } from '@/lib/supabase/types'

export default async function EditorPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/sign-in?redirectTo=/editor')
  }

  let { data: cvRow } = await supabase
    .from('cvs')
    .select('*')
    .eq('user_id', user.id)
    .single() as { data: CvRow | null }

  // CV row missing (callback failed) — create it on the fly
  if (!cvRow) {
    const admin = createAdminClient()
    const firstName = (user.user_metadata?.firstName as string) ?? ''
    const lastName = (user.user_metadata?.lastName as string) ?? ''

    for (let attempt = 0; attempt < 3; attempt++) {
      const slug = generateSlug(firstName || 'user', lastName || user.id.slice(0, 6))
      const cvData = createDefaultCV(firstName, lastName, slug)
      const { error: insertError } = await admin.from('cvs').insert({
        user_id: user.id,
        slug,
        is_published: false,
        cv_data: cvData,
      })
      if (!insertError) {
        cvRow = { id: '', user_id: user.id, slug, is_published: false, cv_data: cvData, created_at: '', updated_at: '' }
        break
      }
      if (!insertError.message.includes('cvs_slug_unique')) break
    }

    if (!cvRow) redirect('/auth/sign-in?error=no_cv')
  }

  return <EditorLayout initialCV={cvRow.cv_data} isPublished={cvRow.is_published} />
}
