import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { CVData } from '@/lib/cv-types'

export async function GET() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: cvRow, error } = await supabase
    .from('cvs')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error || !cvRow) {
    return NextResponse.json({ error: 'CV not found' }, { status: 404 })
  }

  return NextResponse.json(cvRow)
}

export async function PUT(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json() as { cvData: CVData }
  const { cvData } = body

  if (!cvData || typeof cvData !== 'object') {
    return NextResponse.json({ error: 'Invalid CV data' }, { status: 400 })
  }

  // Validate slug format
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  if (!cvData.slug || !slugPattern.test(cvData.slug)) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })
  }

  const { data: updated, error } = await supabase
    .from('cvs')
    .update({
      slug: cvData.slug,
      cv_data: cvData,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    // Slug collision with another user
    if (error.message.includes('cvs_slug_unique')) {
      return NextResponse.json({ error: 'Slug already taken' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Save failed' }, { status: 500 })
  }

  return NextResponse.json(updated)
}
