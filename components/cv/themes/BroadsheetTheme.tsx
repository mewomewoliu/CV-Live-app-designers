import React from 'react'
import { CVData, CVRenderContext, CVExperience } from '@/lib/cv-types'
import { ensureHttp } from '@/lib/url-utils'

interface Props {
  data: CVData
  context: CVRenderContext
}

const bg = '#F2F1EB'
const ink = '#0A0A0A'
const inkDim = '#4A4A4A'
const inkMuted = '#888888'
const mono = `"Courier New", "Courier", monospace`

const linkStyle: React.CSSProperties = { color: 'inherit', textDecoration: 'none' }

const gridBg: React.CSSProperties = {
  backgroundImage: [
    'linear-gradient(rgba(0,0,0,0.055) 1px, transparent 1px)',
    'linear-gradient(90deg, rgba(0,0,0,0.055) 1px, transparent 1px)',
  ].join(', '),
  backgroundSize: '20px 20px',
}

/* ── Barcode ── */
function Barcode() {
  const pattern = [3, 1, 2, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 3, 1]
  const bars: { x: number; w: number }[] = []
  let cur = 0
  const sc = 2.8
  pattern.forEach((w, i) => {
    if (i % 2 === 0) bars.push({ x: cur, w: w * sc })
    cur += w * sc
  })
  return (
    <svg width={cur} height="30" style={{ display: 'block', maxWidth: '100%' }}>
      {bars.map((b, i) => <rect key={i} x={b.x} y={0} width={b.w} height={30} fill={ink} />)}
    </svg>
  )
}

/* ── Sidebar block header ── */
function SysHeader({ label, sysRef }: { label: string; sysRef: string }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      borderBottom: `1.5px solid ${ink}`,
      paddingBottom: '0.2rem',
      marginBottom: '0.45rem',
      marginTop: '1rem',
    }}>
      <span style={{ fontFamily: mono, fontSize: '0.62rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {label}
      </span>
      <span style={{ fontFamily: mono, fontSize: '0.48rem', color: inkMuted }}>
        {sysRef}
      </span>
    </div>
  )
}

/* ── Sidebar key/value row ── */
function DataRow({ label, value, href }: { label: string; value: string; href?: string }) {
  const val = href
    ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ ...linkStyle, fontWeight: 700, letterSpacing: '0.04em' }}>{value}</a>
    : <span style={{ fontWeight: 700, letterSpacing: '0.04em' }}>{value}</span>
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: '0.56rem', marginBottom: '0.22rem', gap: '0.3rem', textTransform: 'uppercase' }}>
      <span style={{ color: inkMuted, flexShrink: 0 }}>{label}</span>
      <span style={{ color: ink, textAlign: 'right' }}>{val}</span>
    </div>
  )
}

/* ── Main section header ── */
function SectionHeader({ index, title }: { index: string; title: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.65rem',
      marginBottom: '1rem',
      marginTop: index === '01' ? '0' : '2rem',
    }}>
      <div style={{
        border: `1.5px solid ${ink}`,
        padding: '0.06rem 0.28rem',
        fontFamily: mono,
        fontSize: '0.58rem',
        fontWeight: 900,
        flexShrink: 0,
        lineHeight: 1.3,
      }}>
        {index}
      </div>
      <span style={{
        fontFamily: mono,
        fontSize: '1.3rem',
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        lineHeight: 1,
        color: ink,
      }}>
        {title}
      </span>
      <div style={{ flex: 1, height: '2px', backgroundColor: ink }} />
    </div>
  )
}

/* ── Experience entry ── */
function ExperienceItem({ exp }: { exp: CVExperience; index?: number }) {
  const period = exp.endDate === 'Present'
    ? `${exp.startDate} — PRESENT`
    : `${exp.startDate} — ${exp.endDate}`

  return (
    <div style={{ paddingBottom: '1.35rem' }}>
      {/* Company + period */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.1rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.35rem' }}>
          <span style={{ fontFamily: mono, fontSize: '0.62rem', color: inkDim, flexShrink: 0, lineHeight: 1.6 }}>▸</span>
          <span style={{ fontFamily: mono, fontSize: '0.88rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', color: ink, lineHeight: 1.2 }}>
            {exp.company}
          </span>
        </div>
        <span style={{ fontFamily: mono, fontSize: '0.58rem', color: inkDim, whiteSpace: 'nowrap' }}>
          {period}
        </span>
      </div>

      {/* Job title */}
      <div style={{
        fontFamily: mono,
        fontSize: '0.65rem',
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        fontWeight: 700,
        color: inkDim,
        marginLeft: '1rem',
        marginBottom: '0.45rem',
        paddingBottom: '0.3rem',
        borderBottom: `1px solid rgba(0,0,0,0.14)`,
      }}>
        {exp.title}
      </div>

      {/* Description */}
      {exp.description && (
        <div style={{ fontFamily: mono, fontSize: '0.65rem', lineHeight: 1.72, color: ink, marginLeft: '1rem', marginBottom: '0.25rem' }}>
          {exp.description}
        </div>
      )}

      {/* Impact line as "> bullet" */}
      {exp.impactLine && (
        <div style={{ fontFamily: mono, fontSize: '0.63rem', color: ink, marginLeft: '1rem', marginBottom: '0.22rem', lineHeight: 1.5 }}>
          {'> '}{exp.impactLine}
        </div>
      )}

      {/* Skills + case study */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginLeft: '1rem', marginTop: '0.45rem', flexWrap: 'wrap', gap: '0.3rem' }}>
        {exp.skills.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.2rem' }}>
            {exp.skills.map(s => (
              <span key={s} style={{
                fontFamily: mono, fontSize: '0.5rem',
                border: `1px solid rgba(0,0,0,0.28)`, color: inkDim,
                padding: '0.08rem 0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                {s}
              </span>
            ))}
          </div>
        )}
        {exp.caseStudyUrl && (
          <a href={ensureHttp(exp.caseStudyUrl)} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: mono, fontSize: '0.52rem', color: ink, textDecoration: 'none', fontWeight: 900, whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>
            {'>'} CASE STUDY ↗
          </a>
        )}
      </div>
    </div>
  )
}

/* ── Corner registration marks ── */
function Corners() {
  return (
    <>
      {([
        { top: '4mm', left: '4mm' },
        { top: '4mm', right: '4mm' },
        { bottom: '4mm', left: '4mm' },
        { bottom: '4mm', right: '4mm' },
      ] as React.CSSProperties[]).map((pos, i) => (
        <span key={i} style={{
          position: 'absolute', ...pos,
          fontFamily: mono, fontSize: '0.62rem',
          color: 'rgba(0,0,0,0.22)', lineHeight: 1, userSelect: 'none',
        }}>+</span>
      ))}
    </>
  )
}

export function BroadsheetTheme({ data, context }: Props) {
  const { bio, experience, skills, education, languages } = data
  const pageOneExp = experience.slice(0, 3)
  const pageTwoExp = experience.slice(3, 6)
  const pageThreeExp = experience.slice(6)
  const hasPage2 = pageTwoExp.length > 0 || (pageThreeExp.length === 0 && (education.length > 0 || languages.length > 0))
  const hasPage3 = pageThreeExp.length > 0 || (pageTwoExp.length > 0 && (education.length > 0 || languages.length > 0))

  const today = new Date()
  const updatedStr = `${String(today.getFullYear())}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`

  const pageStyle = context.isPdfRender
    ? { width: '210mm', minHeight: '297mm', boxSizing: 'border-box' as const }
    : { width: '100%', maxWidth: '210mm', minHeight: '297mm', boxSizing: 'border-box' as const }

  /* ── Education + Languages content (shared across pages) ── */
  const eduLangSection = (
    <>
      {education.length > 0 && (
        <div>
          <SectionHeader index="02" title="Archival Data" />
          {education.map((edu) => (
            <div key={edu.id} style={{ paddingBottom: '1.1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.35rem' }}>
                  <span style={{ fontFamily: mono, fontSize: '0.62rem', color: inkDim, flexShrink: 0, lineHeight: 1.6 }}>▸</span>
                  <span style={{ fontFamily: mono, fontSize: '0.85rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.04em', color: ink }}>
                    {edu.institution}
                  </span>
                </div>
                <span style={{ fontFamily: mono, fontSize: '0.58rem', color: inkDim, whiteSpace: 'nowrap' }}>
                  {edu.startDate} — {edu.endDate}
                </span>
              </div>
              <div style={{
                fontFamily: mono, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.06em',
                fontWeight: 700, color: inkDim, marginLeft: '1rem', marginBottom: '0.3rem',
                paddingBottom: '0.3rem', borderBottom: '1px solid rgba(0,0,0,0.14)',
              }}>
                {edu.degree}
              </div>
              {edu.description && (
                <div style={{ fontFamily: mono, fontSize: '0.63rem', color: ink, marginLeft: '1rem', lineHeight: 1.65 }}>
                  {edu.description}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {languages.length > 0 && (
        <div>
          <SectionHeader index={education.length > 0 ? '03' : '02'} title="Languages" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.22rem 2rem' }}>
            {languages.map(lang => (
              <div key={lang.id} style={{
                display: 'flex', justifyContent: 'space-between',
                fontFamily: mono, fontSize: '0.63rem',
                paddingBottom: '0.3rem', borderBottom: '1px solid rgba(0,0,0,0.1)',
              }}>
                <span style={{ textTransform: 'uppercase', letterSpacing: '0.04em', color: ink, fontWeight: 700 }}>{lang.name}</span>
                <span style={{ color: inkMuted }}>{lang.level.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )

  /* ── Full sidebar (page 1) ── */
  const sidebar = (
    <aside style={{
      width: '56mm', flexShrink: 0,
      borderRight: `1.5px solid ${ink}`,
      paddingRight: '5mm',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* APPROVED stamp */}
      <div style={{ marginBottom: '0.75rem' }}>
        <div style={{
          display: 'inline-block', border: `2px solid ${ink}`,
          padding: '0.12rem 0.4rem', fontFamily: mono,
          fontSize: '0.68rem', fontWeight: 900, letterSpacing: '0.1em',
          transform: 'rotate(-2deg)', transformOrigin: 'left center',
          marginBottom: '0.6rem',
        }}>
          APPROVED
        </div>
        <div style={{ fontFamily: mono, fontSize: '0.5rem', color: inkMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.15rem' }}>
          DOCUMENT REF:
        </div>
        <div style={{ fontFamily: mono, fontSize: '0.6rem', fontWeight: 700, color: ink, marginBottom: '0.1rem' }}>
          {bio.lastName.toUpperCase()}-CV-001
        </div>
        <div style={{ fontFamily: mono, fontSize: '0.5rem', color: inkMuted, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          LAST MODIFIED: {updatedStr}
        </div>
      </div>

      {/* CORE SPECS */}
      <SysHeader label="Core Specs" sysRef="SYS.01" />
      {bio.title && <DataRow label="CLASS" value={bio.title.slice(0, 18).toUpperCase()} />}
      {bio.location && <DataRow label="LOCATION" value={bio.location.toUpperCase()} />}
      <DataRow label="STATUS" value={(bio.availability ?? 'ACTIVE DEPLOYMENT').toUpperCase().slice(0, 18)} />

      {/* TECH STACK */}
      {skills.length > 0 && (
        <>
          <SysHeader label="Tech_Stack" sysRef="SYS.02" />
          {skills.map(s => (
            <div key={s} style={{
              fontFamily: mono, fontSize: '0.56rem', textTransform: 'uppercase',
              letterSpacing: '0.04em', color: ink, fontWeight: 600,
              paddingBottom: '0.2rem', marginBottom: '0.2rem',
              borderBottom: `1px solid rgba(0,0,0,0.1)`,
            }}>
              {s}
            </div>
          ))}
        </>
      )}

      {/* COMMUNICATION */}
      <SysHeader label="Communication" sysRef="SYS.03" />
      {bio.email && <DataRow label="EMAIL" value={bio.email.toUpperCase()} href={`mailto:${bio.email}`} />}
      {bio.phone && <DataRow label="PHONE" value={bio.phone} />}
      {bio.linkedin && <DataRow label="NETWORK" value="LINKEDIN" href={ensureHttp(bio.linkedin)} />}
      {bio.github && <DataRow label="CODE" value="GITHUB" href={ensureHttp(bio.github)} />}
      {bio.website && <DataRow label="WEB" value={bio.website.replace(/^https?:\/\//, '').toUpperCase().slice(0, 20)} href={ensureHttp(bio.website)} />}
      {context.mode === 'web' && <DataRow label="EXPORT" value="DOWNLOAD PDF" />}

      {/* Barcode + part number */}
      <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
        <Barcode />
        <div style={{ fontFamily: mono, fontSize: '0.48rem', color: inkMuted, marginTop: '0.35rem', letterSpacing: '0.04em' }}>
          PN: {bio.lastName.toUpperCase().slice(0, 2)}-{bio.firstName.toUpperCase().slice(0, 2)}-{String(today.getFullYear()).slice(2)}-A
        </div>
      </div>
    </aside>
  )

  /* ── Compact sidebar (pages 2+) ── */
  const sidebarCompact = (pageNum: string) => (
    <aside style={{
      width: '56mm', flexShrink: 0,
      borderRight: `1.5px solid ${ink}`,
      paddingRight: '5mm',
    }}>
      <div style={{ fontFamily: mono, fontSize: '0.6rem', fontWeight: 700, color: ink }}>
        {bio.lastName.toUpperCase()}-CV-001
      </div>
      <div style={{ fontFamily: mono, fontSize: '0.5rem', color: inkMuted, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>
        PAGE {pageNum}
      </div>
      <div style={{ width: '100%', height: '1.5px', backgroundColor: ink }} />
    </aside>
  )

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      gap: context.isPdfRender ? '0' : '2rem',
      fontFamily: mono, WebkitFontSmoothing: 'antialiased',
    }}>

      {/* ══ PAGE 1 ══ */}
      <div
        className="cv-page mx-auto"
        style={{ ...pageStyle, ...gridBg, backgroundColor: bg, color: ink, padding: '10mm', display: 'flex', flexDirection: 'row', gap: '8mm', position: 'relative' }}
      >
        <Corners />
        {sidebar}

        <main style={{ flex: 1, minWidth: 0 }}>
          {/* Name hero */}
          <div style={{
            fontFamily: mono, fontSize: '3rem', fontWeight: 900,
            textTransform: 'uppercase', letterSpacing: '0.07em',
            lineHeight: 0.88, color: ink, wordBreak: 'break-word',
            marginBottom: '0.55rem',
          }}>
            {bio.firstName}
            <br />
            {bio.lastName}
          </div>

          {/* Title */}
          <div style={{
            fontFamily: mono, fontSize: '0.68rem', textTransform: 'uppercase',
            letterSpacing: '0.2em', color: inkDim, fontWeight: 400,
            marginBottom: '1rem',
          }}>
            {bio.title}
          </div>

          {/* Decorative wavy divider */}
          <svg width="100%" height="14" viewBox="0 0 400 14" preserveAspectRatio="none"
            style={{ display: 'block', marginBottom: '1rem', opacity: 0.2 }}>
            <path d="M0,7 Q25,1 50,7 Q75,13 100,7 Q125,1 150,7 Q175,13 200,7 Q225,1 250,7 Q275,13 300,7 Q325,1 350,7 Q375,13 400,7"
              fill="none" stroke={ink} strokeWidth="1.5" />
          </svg>

          {/* Experience */}
          <SectionHeader index="01" title="Operational History" />
          {pageOneExp.map((exp, i) => (
            <ExperienceItem key={exp.id} exp={exp} index={i} />
          ))}
        </main>
      </div>

      {/* ══ PAGE 2 ══ */}
      {hasPage2 && (
        <div
          className="cv-page mx-auto"
          style={{ ...pageStyle, ...gridBg, backgroundColor: bg, color: ink, padding: '10mm', display: 'flex', flexDirection: 'row', gap: '8mm', position: 'relative' }}
        >
          <Corners />
          {sidebarCompact('02')}
          <main style={{ flex: 1, minWidth: 0 }}>
            {pageTwoExp.length > 0 && (
              <>
                <SectionHeader index="01" title="Op. History cont." />
                {pageTwoExp.map((exp, i) => (
                  <ExperienceItem key={exp.id} exp={exp} index={pageOneExp.length + i} />
                ))}
              </>
            )}
            {!hasPage3 && eduLangSection}
          </main>
        </div>
      )}

      {/* ══ PAGE 3 ══ */}
      {hasPage3 && (
        <div
          className="cv-page mx-auto"
          style={{ ...pageStyle, ...gridBg, backgroundColor: bg, color: ink, padding: '10mm', display: 'flex', flexDirection: 'row', gap: '8mm', position: 'relative' }}
        >
          <Corners />
          {sidebarCompact('03')}
          <main style={{ flex: 1, minWidth: 0 }}>
            {pageThreeExp.length > 0 && (
              <>
                <SectionHeader index="01" title="Op. History cont." />
                {pageThreeExp.map((exp, i) => (
                  <ExperienceItem key={exp.id} exp={exp} index={pageOneExp.length + pageTwoExp.length + i} />
                ))}
              </>
            )}
            {eduLangSection}
          </main>
        </div>
      )}
    </div>
  )
}
