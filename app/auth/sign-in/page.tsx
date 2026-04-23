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
  const [oauthLoading, setOauthLoading] = useState(false)

  async function handleGoogleSignIn() {
    setError(null)
    setOauthLoading(true)
    const supabase = createClient()
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      },
    })
    if (oauthError) {
      setError(oauthError.message)
      setOauthLoading(false)
    }
  }

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

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              margin: '20px 0',
            }}
          >
            <div style={{ flex: 1, height: 1, backgroundColor: 'rgba(10,10,180,0.15)' }} />
            <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.15em', opacity: 0.4 }}>OR</span>
            <div style={{ flex: 1, height: 1, backgroundColor: 'rgba(10,10,180,0.15)' }} />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={oauthLoading}
            style={{
              width: '100%',
              backgroundColor: 'rgba(255,255,255,0.75)',
              color: BLUE,
              border: `1.5px solid rgba(10,10,180,0.25)`,
              padding: '11px 20px',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.1em',
              cursor: oauthLoading ? 'not-allowed' : 'pointer',
              opacity: oauthLoading ? 0.7 : 1,
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
              <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            {oauthLoading ? 'REDIRECTING…' : 'CONTINUE WITH GOOGLE'}
          </button>
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
