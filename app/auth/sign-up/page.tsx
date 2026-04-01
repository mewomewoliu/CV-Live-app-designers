'use client'

import { useState } from 'react'
import Link from 'next/link'
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

const pageStyle: React.CSSProperties = {
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
}

export default function SignUpPage() {
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
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback?next=/auth/sign-in`,
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
      <div style={pageStyle}>
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
            AUTH // SIGN-UP
          </span>
        </header>
        <main
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 24px',
          }}
        >
          <div style={{ width: '100%', maxWidth: 360, textAlign: 'center' }}>
            <div
              style={{
                width: 40,
                height: 40,
                border: `1.5px solid rgba(10,10,180,0.3)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 8l4 4 8-8" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: '-0.02em',
                margin: '0 0 12px',
                color: BLUE,
              }}
            >
              Check your email
            </h1>
            <p style={{ fontSize: 12, opacity: 0.65, lineHeight: 1.7, margin: 0 }}>
              We sent a confirmation link to{' '}
              <span style={{ fontWeight: 700 }}>{email}</span>.
              <br />
              Click it to activate your account.
            </p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div style={pageStyle}>
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
          AUTH // SIGN-UP
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
              Create account
            </h1>
            <p style={{ fontSize: 12, margin: 0, opacity: 0.65 }}>
              Already have one?{' '}
              <Link
                href="/auth/sign-in"
                style={{ color: BLUE, fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 3 }}
              >
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Name row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label
                  htmlFor="firstName"
                  style={{
                    display: 'block',
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    marginBottom: 6,
                    opacity: 0.55,
                  }}
                >
                  FIRST NAME
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  autoComplete="given-name"
                  placeholder="Mia"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = BLUE)}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(10,10,180,0.25)')}
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  style={{
                    display: 'block',
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    marginBottom: 6,
                    opacity: 0.55,
                  }}
                >
                  LAST NAME
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  autoComplete="family-name"
                  placeholder="Liu"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = BLUE)}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(10,10,180,0.25)')}
                />
              </div>
            </div>

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
                minLength={8}
                autoComplete="new-password"
                placeholder="8+ characters"
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
              {loading ? 'CREATING ACCOUNT…' : 'CREATE ACCOUNT →'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
