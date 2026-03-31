import Link from 'next/link'

const COLS = [
  'A','B','C','D','E','F','G','H','I','J','K','L','M',
  'N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
  'AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK',
  'AL','AM','AN','AO','AP','AQ','AR','AS','AT','AU','AV',
  'AW','AX','AY','AZ',
]


const FEATURES = [
  {
    ref: 'F-001',
    feature: 'Live URL',
    description: 'cv.live/yourname — share one link. Never send a file again.',
    status: 'ACTIVE',
  },
  {
    ref: 'F-002',
    feature: 'Structured editor',
    description: 'Fill in the fields. It looks good automatically. No design work.',
    status: 'ACTIVE',
  },
  {
    ref: 'F-003',
    feature: '1-click PDF',
    description: 'A4, ATS-safe, text-selectable. Looks like a real CV.',
    status: 'ACTIVE',
  },
  {
    ref: 'F-004',
    feature: 'Aesthetic themes',
    description: 'Pick your look. More coming. Still no Canva required.',
    status: 'ACTIVE',
  },
  {
    ref: 'F-005',
    feature: 'Custom domain',
    description: 'yourname.com → your CV. Very cool. Very soon.',
    status: 'SOON',
  },
]

const BLUE = '#1111cc'
const BG = '#f3f4e8'
const GRID = 'rgba(10, 10, 180, 0.12)'

export default function Home() {
  return (
    <div
      style={{
        backgroundColor: BG,
        backgroundImage: `
          linear-gradient(to right, ${GRID} 1px, transparent 1px),
          linear-gradient(to bottom, ${GRID} 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        backgroundPosition: '48px 28px',
        color: BLUE,
        fontFamily: 'var(--font-inter), Inter, sans-serif',
        overflowX: 'hidden',
      }}
    >
      {/* ── Column label header ───────────────────────────────────── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          display: 'flex',
          alignItems: 'stretch',
          borderBottom: `1px solid ${GRID}`,
          backgroundColor: BG,
          height: 28,
        }}
      >
        {/* corner */}
        <div
          style={{
            width: 48,
            minWidth: 48,
            borderRight: `1px solid rgba(10,10,180,0.2)`,
          }}
        />
        {COLS.slice(0, 48).map((col) => (
          <div
            key={col}
            style={{
              width: 40,
              minWidth: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: '0.05em',
              color: `rgba(10,10,180,0.4)`,
              borderRight: `1px solid rgba(10,10,180,0.06)`,
              flexShrink: 0,
            }}
          >
            {col}
          </div>
        ))}
      </div>

      {/* ── Main layout: row labels + content ────────────────────── */}
      <div style={{ display: 'flex' }}>
        {/* Row label spacer — fixed width, no fixed height */}
        <div
          style={{
            width: 48,
            minWidth: 48,
            borderRight: `1px solid rgba(10,10,180,0.2)`,
            flexShrink: 0,
          }}
        />

        {/* ── Content ──────────────────────────────────────────────── */}
        <div style={{ flex: 1, position: 'relative', paddingBottom: 0 }}>

          {/* Navigation — top right */}
          <nav
            style={{
              position: 'absolute',
              top: 8,
              right: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              zIndex: 10,
            }}
          >
            {[
              { label: 'BUILD YOUR CV  [A]', href: '/editor' },
              { label: 'SIGN IN  [B]', href: '/auth/sign-in' },
              { label: 'GIVE FEEDBACK  [C]', href: 'mailto:hello@cv.live' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                style={{
                  display: 'block',
                  border: `1.5px solid ${BLUE}`,
                  padding: '5px 12px',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: BLUE,
                  textDecoration: 'none',
                  backgroundColor: 'transparent',
                  whiteSpace: 'nowrap',
                }}
                className="home-nav-link"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Version badge — rows 3-4 */}
          <div
            style={{
              paddingTop: 80,
              paddingLeft: 40,
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.15em',
              opacity: 0.5,
            }}
          >
            SYS.OP.2026 // V.1.0.0
          </div>

          {/* ── Hero headline — rows 5-12 ──────────────────────── */}
          <div
            style={{
              paddingLeft: 36,
              paddingTop: 8,
              paddingRight: 320,
              overflow: 'hidden',
            }}
          >
            <h1
              style={{
                fontSize: 'clamp(80px, 11vw, 160px)',
                fontWeight: 900,
                lineHeight: 0.88,
                letterSpacing: '-0.03em',
                margin: 0,
                color: BLUE,
              }}
            >
              YOUR CV.
              <br />
              ALWAYS
              <br />
              LIVE.
            </h1>
          </div>

          {/* ── Tagline + pitch — rows 13-18 ─────────────────── */}
          <div
            style={{
              paddingLeft: 40,
              paddingTop: 40,
              paddingRight: 360,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0 80px',
              borderTop: `1px solid rgba(10,10,180,0.2)`,
              marginTop: 32,
              paddingBottom: 32,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.6,
                  margin: 0,
                  fontWeight: 400,
                  maxWidth: 420,
                }}
              >
                Build your CV in minutes. Share it with a link.
                Download a perfect A4 PDF whenever you need.
                No design skills. No attachments. No drama.
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                <Link
                  href="/editor"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    backgroundColor: BLUE,
                    color: BG,
                    padding: '10px 20px',
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textDecoration: 'none',
                    border: `1.5px solid ${BLUE}`,
                  }}
                  className="home-cta-primary"
                >
                  START BUILDING →
                </Link>
                <Link
                  href="/auth/sign-in"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    backgroundColor: 'transparent',
                    color: BLUE,
                    padding: '10px 20px',
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textDecoration: 'none',
                    border: `1.5px solid ${BLUE}`,
                  }}
                  className="home-cta-secondary"
                >
                  SIGN IN
                </Link>
              </div>
            </div>

            {/* Status columns */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0 24px',
                alignContent: 'start',
              }}
            >
              {[
                { label: 'STATUS', value: 'Free · Open Beta' },
                { label: 'FORMAT', value: 'A4 PDF + Live URL' },
                { label: 'ACCOUNT', value: 'Required to save' },
                { label: 'TEMPLATES', value: '3 themes included' },
              ].map(({ label, value }) => (
                <div key={label} style={{ paddingBottom: 16 }}>
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      opacity: 0.5,
                      marginBottom: 4,
                    }}
                  >
                    {label}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Feature table ─────────────────────────────────── */}
          <div
            style={{
              paddingLeft: 40,
              paddingRight: 40,
              marginTop: 8,
            }}
          >
            {/* Table header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 200px 1fr 100px',
                gap: '0 24px',
                padding: '10px 0',
                borderTop: `1.5px solid ${BLUE}`,
                borderBottom: `1px solid rgba(10,10,180,0.3)`,
              }}
            >
              {['REF', 'FEATURE', 'DESCRIPTION', 'STATUS'].map((h) => (
                <div
                  key={h}
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                  }}
                >
                  {h}
                </div>
              ))}
            </div>

            {/* Table rows */}
            {FEATURES.map(({ ref, feature, description, status }) => (
              <div
                key={ref}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 200px 1fr 100px',
                  gap: '0 24px',
                  padding: '14px 0',
                  borderBottom: `1px solid rgba(10,10,180,0.12)`,
                  alignItems: 'start',
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    opacity: 0.5,
                    paddingTop: 1,
                  }}
                >
                  {ref}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{feature}</div>
                <div style={{ fontSize: 12, lineHeight: 1.5, opacity: 0.75 }}>
                  {description}
                </div>
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    paddingTop: 2,
                    color: status === 'ACTIVE' ? '#1a7a1a' : BLUE,
                    opacity: status === 'ACTIVE' ? 1 : 0.5,
                  }}
                >
                  {status === 'ACTIVE' ? '✓ ' : '◌ '}{status}
                </div>
              </div>
            ))}
          </div>

          {/* ── System footer ─────────────────────────────────── */}
          <div
            style={{
              paddingLeft: 40,
              paddingTop: 48,
              paddingBottom: 48,
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: '0.12em',
              opacity: 0.45,
              lineHeight: 1.8,
            }}
          >
            <div>SYS.REF: CV-LIVE-001</div>
            <div>UPDATED: 26.03.31</div>
            <div>ENCODING: UTF-8</div>
          </div>

        </div>
      </div>

      {/* ── Founder footer ──────────────────────────────────────── */}
      <div
        style={{
          borderTop: `1.5px solid ${BLUE}`,
          display: 'grid',
          gridTemplateColumns: '48px 1fr',
        }}
      >
        {/* row label spacer */}
        <div style={{ borderRight: `1px solid rgba(10,10,180,0.2)` }} />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '0 40px',
            padding: '40px 40px 40px 40px',
          }}
        >
          {/* Contact */}
          <div>
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.15em',
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span style={{ width: 6, height: 6, backgroundColor: BLUE, display: 'inline-block', flexShrink: 0 }} />
              FOUNDER
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Mia Liu</div>
            <div style={{ fontSize: 11, opacity: 0.6, lineHeight: 1.7 }}>
              <div>UXMIA1996@GMAIL.COM</div>
              <div>STOCKHOLM, SWEDEN</div>
            </div>
          </div>

          {/* Connect */}
          <div>
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.15em',
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span style={{ width: 6, height: 6, backgroundColor: BLUE, display: 'inline-block', flexShrink: 0 }} />
              CONNECT
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/mia-liu-ici-design/' },
                { label: 'MEDIUM', href: 'https://medium.com/@mewomewoliu' },
                { label: 'WEBSITE', href: 'https://www.mialiu.se/' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: BLUE,
                    textDecoration: 'none',
                    letterSpacing: '0.05em',
                    opacity: 0.8,
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.15em',
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span style={{ width: 6, height: 6, backgroundColor: BLUE, display: 'inline-block', flexShrink: 0 }} />
              AVAILABILITY
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.7, opacity: 0.75, maxWidth: 240 }}>
              OPEN TO CONSULTING,<br />
              PRODUCT DESIGN ROLES,<br />
              AND CONVERSATIONS.
            </div>
          </div>
        </div>
      </div>

      {/* ── Copyright bar ───────────────────────────────────────── */}
      <div
        style={{
          borderTop: `1px solid rgba(10,10,180,0.2)`,
          display: 'grid',
          gridTemplateColumns: '48px 1fr',
        }}
      >
        <div style={{ borderRight: `1px solid rgba(10,10,180,0.2)` }} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 40px',
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: '0.12em',
            opacity: 0.45,
          }}
        >
          <span>© 2026 CRAFTED BY MIA WITH CLAUDE CODE</span>
          <span>CV.LIVE</span>
        </div>
      </div>
    </div>
  )
}
