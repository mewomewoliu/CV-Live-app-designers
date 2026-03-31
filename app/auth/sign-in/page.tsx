'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
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

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') ?? '/editor'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)
    if (signInError) {
      setError(signInError.message)
    } else {
      router.push(redirectTo)
      router.refresh()
    }
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
          <h1 className="text-2xl font-black tracking-tight text-zinc-900 mb-1">Sign in</h1>
          <p className="text-sm text-zinc-500 mb-8">
            No account?{' '}
            <Link
              href="/auth/sign-up"
              className="text-zinc-900 underline underline-offset-2 hover:text-zinc-600 transition-colors"
            >
              Create one free
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                autoComplete="current-password"
                placeholder="••••••••"
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
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
