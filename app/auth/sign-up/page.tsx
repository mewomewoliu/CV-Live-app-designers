'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function CvLiveIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect width="20" height="20" rx="4" fill="#18181b" />
      <rect x="5" y="7" width="6" height="1.5" rx="0.75" fill="white" opacity="0.9" />
      <rect x="5" y="10" width="9" height="1.5" rx="0.75" fill="white" opacity="0.9" />
      <rect x="5" y="13" width="7.5" height="1.5" rx="0.75" fill="white" opacity="0.9" />
      <circle cx="15" cy="6.5" r="2.5" fill="#4ade80" />
    </svg>
  )
}

export default function SignUpPage() {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { firstName, lastName },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    setLoading(false)
    if (signUpError) {
      setError(signUpError.message)
    } else {
      setSent(true)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col">
        <header className="h-14 bg-white border-b border-zinc-200 flex items-center px-5">
          <Link href="/" className="flex items-center gap-2">
            <CvLiveIcon />
            <span className="text-sm font-black tracking-tighter text-zinc-900">CV.live</span>
          </Link>
        </header>
        <main className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="w-full max-w-sm text-center">
            <div className="w-10 h-10 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-5">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M3 9l4 4 8-8" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-zinc-900 mb-3">Check your email</h1>
            <p className="text-sm text-zinc-500 leading-relaxed">
              We sent a confirmation link to{' '}
              <span className="text-zinc-900 font-medium">{email}</span>.
              Click it to activate your account.
            </p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* Nav — matches editor toolbar */}
      <header className="h-14 bg-white border-b border-zinc-200 flex items-center px-5">
        <Link href="/" className="flex items-center gap-2">
          <CvLiveIcon />
          <span className="text-sm font-black tracking-tighter text-zinc-900">CV.live</span>
        </Link>
      </header>

      {/* Form */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-black tracking-tight text-zinc-900 mb-1">Create your account</h1>
          <p className="text-sm text-zinc-500 mb-8">
            Already have one?{' '}
            <Link
              href="/auth/sign-in"
              className="text-zinc-900 underline underline-offset-2 hover:text-zinc-600 transition-colors"
            >
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstName" className="block text-xs font-medium text-zinc-500 mb-1.5">
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  autoComplete="given-name"
                  placeholder="Mia"
                  className="w-full bg-white border border-zinc-200 rounded px-3 py-2.5 text-sm text-zinc-900 placeholder-zinc-300 focus:outline-none focus:border-zinc-400 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-xs font-medium text-zinc-500 mb-1.5">
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  autoComplete="family-name"
                  placeholder="Liu"
                  className="w-full bg-white border border-zinc-200 rounded px-3 py-2.5 text-sm text-zinc-900 placeholder-zinc-300 focus:outline-none focus:border-zinc-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-medium text-zinc-500 mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="mia@example.com"
                className="w-full bg-white border border-zinc-200 rounded px-3 py-2.5 text-sm text-zinc-900 placeholder-zinc-300 focus:outline-none focus:border-zinc-400 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-zinc-500 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="8+ characters"
                className="w-full bg-white border border-zinc-200 rounded px-3 py-2.5 text-sm text-zinc-900 placeholder-zinc-300 focus:outline-none focus:border-zinc-400 transition-colors"
              />
            </div>

            {error && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-zinc-900 text-white text-sm font-semibold py-2.5 rounded hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
