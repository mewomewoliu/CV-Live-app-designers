// One-time script to create a user via Supabase admin API
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing env vars. Run: source .env.local first, or pass them inline.')
  process.exit(1)
}

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const email = 'mewomewoliu@gmail.com'
const password = process.argv[2]

if (!password) {
  console.error('Usage: node scripts/create-user.mjs <password>')
  process.exit(1)
}

// Create or look up the user
const { data: createData, error: createError } = await admin.auth.admin.createUser({
  email,
  password,
  email_confirm: true, // skip email confirmation
  user_metadata: { firstName: 'Mia', lastName: 'Liu' },
})

let userId
if (createError) {
  if (createError.message.includes('already been registered')) {
    // User exists — look them up
    const { data: list } = await admin.auth.admin.listUsers()
    const existing = list?.users?.find(u => u.email === email)
    if (!existing) { console.error('Could not find existing user'); process.exit(1) }
    userId = existing.id
    // Update password
    await admin.auth.admin.updateUserById(userId, { password })
    console.log('User already exists — password updated. User ID:', userId)
  } else {
    console.error('Create user error:', createError.message)
    process.exit(1)
  }
} else {
  userId = createData.user.id
  console.log('User created. ID:', userId)
}

// Check if CV row exists
const { data: existing } = await admin.from('cvs').select('id').eq('user_id', userId).maybeSingle()

if (existing) {
  console.log('CV row already exists — nothing to do.')
} else {
  // Generate slug
  const base = 'mia-liu'
  const suffix = Math.random().toString(36).slice(2, 6)
  const slug = `${base}-${suffix}`

  const cvData = {
    slug,
    theme: 'minimal',
    accentColor: '#18181b',
    bio: { firstName: 'Mia', lastName: 'Liu', title: '', location: '', summary: '', email },
    experience: [],
    skills: [],
    education: [],
    languages: [],
  }

  const { error: insertError } = await admin.from('cvs').insert({
    user_id: userId,
    slug,
    is_published: false,
    cv_data: cvData,
  })

  if (insertError) {
    console.error('CV insert error:', insertError.message)
    process.exit(1)
  }
  console.log('CV row created with slug:', slug)
}

console.log('Done. You can now sign in with:', email)
