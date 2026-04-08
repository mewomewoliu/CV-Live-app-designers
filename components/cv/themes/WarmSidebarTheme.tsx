import React from 'react'
import { CVData, CVRenderContext, CVExperience } from '@/lib/cv-types'
import { ensureHttp } from '@/lib/url-utils'

interface Props {
  data: CVData
  context: CVRenderContext
}

const bg      = '#F7F4EE'
const ink     = '#1C1C19'
const inkDim  = '#5A5A53'
const inkMuted = '#9A9A90'
const rule    = 'rgba(0,0,0,0.11)'

const serif = `Georgia, 'Times New Roman', Times, serif`
const sans  = `'Helvetica Neue', Helvetica, Arial, sans-serif`

const linkStyle: React.CSSProperties = { color: 'inherit', textDecoration: 'none' }

/* ─── Sidebar section label ─── */
function Label({ text }: { text: string }) {
  return (
    <div style={{
      fontFamily: sans,
      fontSize: '0.48rem',
      fontWeight: 600,
      letterSpacing: '0.18em',
      textTransform: 'uppercase' as const,
      color: inkMuted,
      borderBottom: `0.5px solid ${rule}`,
      paddingBottom: '0.28rem',
      marginBottom: '0.6rem',
    }}>
      {text}
    </div>
  )
}

/* ─── Thin divider ─── */
function Rule() {
  return <div style={{ height: '0.5px', backgroundColor: rule, margin: '1.1rem 0' }} />
}

/* ─── Experience entry ─── */
function ExperienceBlock({ exp }: { exp: CVExperience }) {
  const period = exp.endDate === 'Present'
    ? `${exp.startDate} – Present`
    : `${exp.startDate} – ${exp.endDate}`

  const bullets: string[] = []
  if (exp.impactLine) bullets.push(exp.impactLine)
  if (exp.description) {
    const sentences = exp.description.split(/(?<=[.!?])\s+/).filter(Boolean)
    bullets.push(...sentences)
  }

  return (
    <div style={{ marginBottom: '1.55rem' }}>
      {/* Company + period */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.18rem' }}>
        <span style={{ fontFamily: sans, fontSize: '0.67rem', fontWeight: 600, color: ink, letterSpacing: '0.01em' }}>
          {exp.company}
        </span>
        <span style={{ fontFamily: sans, fontSize: '0.57rem', color: inkMuted, whiteSpace: 'nowrap' as const, flexShrink: 0 }}>
          {period}
        </span>
      </div>
      {/* Hair rule */}
      <div style={{ height: '0.5px', backgroundColor: rule, marginBottom: '0.28rem' }} />
      {/* Job title — italic serif */}
      <div style={{ fontFamily: serif, fontSize: '0.8rem', fontStyle: 'italic', fontWeight: 400, color: ink, marginBottom: '0.38rem', lineHeight: 1.3 }}>
        {exp.title}
      </div>
      {/* Bullets */}
      {bullets.length > 0 && (
        <div style={{ fontFamily: sans, fontSize: '0.64rem', color: inkDim, lineHeight: 1.72 }}>
          {bullets.slice(0, 3).map((b, i) => (
            <div key={i} style={{ position: 'relative', paddingLeft: '0.9rem', marginBottom: '0.1rem' }}>
              <span style={{ position: 'absolute', left: 0, color: inkMuted, fontSize: '0.6rem' }}>–</span>
              {b}
            </div>
          ))}
        </div>
      )}
      {/* Skill tags — plain, spaced */}
      {exp.skills.length > 0 && (
        <div style={{ marginTop: '0.38rem', fontFamily: sans, fontSize: '0.56rem', color: inkMuted, letterSpacing: '0.02em' }}>
          {exp.skills.join('  ·  ')}
        </div>
      )}
    </div>
  )
}

export function WarmSidebarTheme({ data, context }: Props) {
  const { bio, experience, skills, education, languages } = data

  const pageStyle = context.isPdfRender
    ? { width: '210mm', minHeight: '297mm', boxSizing: 'border-box' as const }
    : { width: '100%', maxWidth: '210mm', minHeight: '297mm', boxSizing: 'border-box' as const }

  const pageOneExp = experience.slice(0, 5)
  const restExp = experience.slice(5)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: context.isPdfRender ? '0' : '2rem', fontFamily: sans, WebkitFontSmoothing: 'antialiased' }}>

      {/* PAGE 1 */}
      <div
        className="cv-page mx-auto shadow-sm"
        style={{ ...pageStyle, backgroundColor: bg, color: ink, display: 'flex', flexDirection: 'row' }}
      >
        {/* LEFT SIDEBAR */}
        <aside style={{
          width: '62mm',
          flexShrink: 0,
          borderRight: `0.5px solid ${rule}`,
          padding: '10mm 7mm 10mm 9mm',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Name */}
          <div style={{
            fontFamily: serif,
            fontSize: '2.1rem',
            fontWeight: 400,
            lineHeight: 1.0,
            letterSpacing: '-0.01em',
            color: ink,
            marginBottom: '0.35rem',
          }}>
            {bio.firstName}
            <br />
            {bio.lastName}
          </div>

          {/* Title */}
          <div style={{
            fontFamily: sans,
            fontSize: '0.57rem',
            fontWeight: 400,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            color: inkMuted,
            marginBottom: '1.8rem',
          }}>
            {bio.title}
          </div>

          {/* Contact */}
          <Label text="Contact" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {bio.email && (
              <div>
                <div style={{ fontFamily: sans, fontSize: '0.44rem', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: inkMuted, marginBottom: '0.07rem' }}>Email</div>
                <a href={`mailto:${bio.email}`} style={{ ...linkStyle, fontFamily: sans, fontSize: '0.64rem', color: ink, wordBreak: 'break-all' as const }}>{bio.email}</a>
              </div>
            )}
            {bio.phone && (
              <div>
                <div style={{ fontFamily: sans, fontSize: '0.44rem', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: inkMuted, marginBottom: '0.07rem' }}>Phone</div>
                <div style={{ fontFamily: sans, fontSize: '0.64rem', color: ink }}>{bio.phone}</div>
              </div>
            )}
            {bio.website && (
              <div>
                <div style={{ fontFamily: sans, fontSize: '0.44rem', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: inkMuted, marginBottom: '0.07rem' }}>Web</div>
                <a href={ensureHttp(bio.website)} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, fontFamily: sans, fontSize: '0.64rem', color: ink, wordBreak: 'break-all' as const }}>{bio.website}</a>
              </div>
            )}
            {bio.linkedin && (
              <div>
                <div style={{ fontFamily: sans, fontSize: '0.44rem', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: inkMuted, marginBottom: '0.07rem' }}>LinkedIn</div>
                <a href={ensureHttp(bio.linkedin)} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, fontFamily: sans, fontSize: '0.64rem', color: ink, wordBreak: 'break-all' as const }}>{bio.linkedin}</a>
              </div>
            )}
            {bio.github && (
              <div>
                <div style={{ fontFamily: sans, fontSize: '0.44rem', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: inkMuted, marginBottom: '0.07rem' }}>GitHub</div>
                <a href={ensureHttp(bio.github)} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, fontFamily: sans, fontSize: '0.64rem', color: ink, wordBreak: 'break-all' as const }}>{bio.github}</a>
              </div>
            )}
            {bio.location && (
              <div>
                <div style={{ fontFamily: sans, fontSize: '0.44rem', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: inkMuted, marginBottom: '0.07rem' }}>Location</div>
                <div style={{ fontFamily: sans, fontSize: '0.64rem', color: ink }}>{bio.location}</div>
              </div>
            )}
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <>
              <Rule />
              <Label text="Skills" />
              <div style={{ fontFamily: sans, fontSize: '0.63rem', color: inkDim, lineHeight: 1.9 }}>
                {skills.map((s) => <div key={s}>{s}</div>)}
              </div>
            </>
          )}

          {/* Education */}
          {education.length > 0 && (
            <>
              <Rule />
              <Label text="Education" />
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '0.7rem' }}>
                  <div style={{ fontFamily: serif, fontSize: '0.7rem', fontStyle: 'italic', fontWeight: 400, color: ink, lineHeight: 1.3, marginBottom: '0.1rem' }}>
                    {edu.degree}
                  </div>
                  <div style={{ fontFamily: sans, fontSize: '0.6rem', color: inkDim }}>{edu.institution}</div>
                  {edu.endDate && (
                    <div style={{ fontFamily: sans, fontSize: '0.55rem', color: inkMuted, marginTop: '0.05rem' }}>
                      {edu.startDate} – {edu.endDate}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <>
              <Rule />
              <Label text="Languages" />
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: sans, fontSize: '0.63rem', color: inkDim, marginBottom: '0.32rem' }}>
                  <span>{lang.name}</span>
                  <span style={{ color: inkMuted, fontSize: '0.57rem' }}>{lang.level}</span>
                </div>
              ))}
            </>
          )}

          {bio.availability && (
            <>
              <Rule />
              <div style={{ fontFamily: sans, fontSize: '0.58rem', fontStyle: 'italic', color: inkMuted }}>{bio.availability}</div>
            </>
          )}
        </aside>

        {/* RIGHT MAIN */}
        <main style={{ flex: 1, padding: '10mm 9mm 10mm 8mm' }}>
          {/* Section label */}
          <div style={{ fontFamily: sans, fontSize: '0.48rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: inkMuted, borderBottom: `0.5px solid ${rule}`, paddingBottom: '0.28rem', marginBottom: '1.15rem' }}>
            Experience
          </div>
          {pageOneExp.map((exp) => (
            <ExperienceBlock key={exp.id} exp={exp} />
          ))}
        </main>
      </div>

      {/* CONTINUATION PAGE */}
      {restExp.length > 0 && (
        <div
          className="cv-page mx-auto shadow-sm"
          style={{ ...pageStyle, backgroundColor: bg, color: ink, padding: '10mm' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: `0.5px solid ${rule}`, paddingBottom: '0.5rem', marginBottom: '1.2rem' }}>
            <span style={{ fontFamily: serif, fontSize: '0.85rem', fontStyle: 'italic', color: ink }}>{bio.firstName} {bio.lastName}</span>
            <span style={{ fontFamily: sans, fontSize: '0.48rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: inkMuted }}>Continued</span>
          </div>
          <div style={{ fontFamily: sans, fontSize: '0.48rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: inkMuted, borderBottom: `0.5px solid ${rule}`, paddingBottom: '0.28rem', marginBottom: '1.15rem' }}>
            Experience
          </div>
          {restExp.map((exp) => (
            <ExperienceBlock key={exp.id} exp={exp} />
          ))}
        </div>
      )}
    </div>
  )
}
