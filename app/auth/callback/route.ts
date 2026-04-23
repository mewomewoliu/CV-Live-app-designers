import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createDefaultCV, generateSlug } from '@/lib/default-cv'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/editor'

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/sign-in?error=missing_code`)
  }

  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !user) {
    return NextResponse.redirect(`${origin}/auth/sign-in?error=auth_callback_failed`)
  }

  // Create CV row for new users (idempotent — skip if already exists)
  const admin = createAdminClient()
  const { data: existing } = await admin
    .from('cvs')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle()

  if (!existing) {
    const meta = user.user_metadata ?? {}
    const fullNameParts = ((meta.full_name ?? meta.name) as string | undefined)?.split(' ') ?? []
    const firstName = (meta.firstName as string) || fullNameParts[0] || ''
    const lastName = (meta.lastName as string) || fullNameParts.slice(1).join(' ') || ''

    // Retry up to 3 times on slug collision (extremely unlikely with 4-char suffix)
    for (let attempt = 0; attempt < 3; attempt++) {
      const slug = generateSlug(firstName || 'user', lastName || user.id.slice(0, 6))
      const cvData = createDefaultCV(firstName, lastName, slug)

      const { error: insertError } = await admin.from('cvs').insert({
        user_id: user.id,
        slug,
        is_published: false,
        cv_data: cvData,
      })

      if (!insertError) break
      // If unique violation on slug, loop and try again with new suffix
      if (!insertError.message.includes('cvs_slug_unique')) break
    }
  }

  return NextResponse.redirect(`${origin}${next}`)
}
