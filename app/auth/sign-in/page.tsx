'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const BLUE = '#1111cc'
const BG = '#f3f4e8'
const GRID = 'rgba(10, 10, 180, 0.12)'

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: 'rgba(255,255,255,0.65)',
  border: `1.5px solid rgba(10,10,180,0.25)`,
  padding: '10px 12px',
  fontSize: 13,
  color: BLUE,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  borderRadius: 0,
}

const URL_ERRORS: Record<string, string> = {
  no_cv: 'Your account was set up but something went wrong loading your CV. Please sign in again.',
  auth_callback_failed: 'Email confirmation failed. Please try signing up again.',
  missing_code: 'Invalid confirmation link. Please try signing up again.',
}

function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') ?? '/editor'
  const urlError = searchParams.get('error')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(
    urlError ? (URL_ERRORS[urlError] ?? 'Something went wrong. Please try again.') : null
  )
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
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: BG,
        backgroundImage: `
          linear-gradient(to right, ${GRID} 1px, transparent 1px),
          linear-gradient(to bottom, ${GRID} 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        color: BLUE,
        fontFamily: 'var(--font-inter), Inter, sans-serif',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Nav */}
      <header
        style={{
          height: 48,
          backgroundColor: BG,
          borderBottom: `1px solid rgba(10,10,180,0.2)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          flexShrink: 0,
        }}
      >
        <Link href="/" style={{ textDecoration: 'none', color: BLUE }}>
          <span style={{ fontSize: 13, fontWeight: 900, letterSpacing: '-0.02em' }}>CV.live</span>
        </Link>
        <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.15em', opacity: 0.4 }}>
          AUTH // SIGN-IN
        </span>
      </header>

      {/* Form */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
        }}
      >
        <div style={{ width: '100%', maxWidth: 360 }}>
          <div style={{ marginBottom: 32 }}>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 900,
                letterSpacing: '-0.02em',
                margin: '0 0 8px',
                color: BLUE,
              }}
            >
              Sign in
            </h1>
            <p style={{ fontSize: 12, margin: 0, opacity: 0.65 }}>
              No account?{' '}
              <Link
                href="/auth/sign-up"
                style={{ color: BLUE, fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 3 }}
              >
                Create one free
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  marginBottom: 6,
                  opacity: 0.55,
                }}
              >
                EMAIL
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="mia@example.com"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = BLUE)}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(10,10,180,0.25)')}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                style={{
                  display: 'block',
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  marginBottom: 6,
                  opacity: 0.55,
                }}
              >
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = BLUE)}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(10,10,180,0.25)')}
              />
            </div>

            {error && (
              <div
                style={{
                  fontSize: 11,
                  color: '#cc1111',
                  backgroundColor: 'rgba(204,17,17,0.06)',
                  border: '1px solid rgba(204,17,17,0.2)',
                  padding: '8px 12px',
                  letterSpacing: '0.02em',
                  lineHeight: 1.5,
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: BLUE,
                color: BG,
                border: 'none',
                padding: '12px 20px',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.12em',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                fontFamily: 'inherit',
                marginTop: 4,
              }}
            >
              {loading ? 'SIGNING IN…' : 'SIGN IN →'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  )
}
