import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PATCH(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { isPublished } = await request.json() as { isPublished: boolean }

  if (typeof isPublished !== 'boolean') {
    return NextResponse.json({ error: 'isPublished must be a boolean' }, { status: 400 })
  }

  const { error } = await supabase
    .from('cvs')
    .update({ is_published: isPublished })
    .eq('user_id', user.id)

  if (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }

  return NextResponse.json({ isPublished })
}
