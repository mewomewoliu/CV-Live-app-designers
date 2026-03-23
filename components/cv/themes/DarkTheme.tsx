import React from 'react'
import { CVData, CVRenderContext, CVExperience } from '@/lib/cv-types'
import { SkillPill } from '../sections/SkillPill'
import { ensureHttp } from '@/lib/url-utils'

interface Props {
  data: CVData
  context: CVRenderContext
}

const bg = '#050505'
const ink = '#ffffff'
const inkDim = '#9ca3af'
const inkMuted = '#52525b'
const border = '#27272a'

function SectionMarker({ index, title, tag }: { index: string; title: string; tag?: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '1.1rem',
        marginTop: index === '01' ? '0' : '1.75rem',
        fontSize: '0.62rem',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        fontWeight: 500,
        color: inkDim,
        fontFamily: 'ui-monospace, monospace',
      }}
    >
      <span>{`${index} // ${title}`}</span>
      {tag && <span style={{ opacity: 0.6 }}>[{tag}]</span>}
    </div>
  )
}

function StructuralRule() {
  return <div style={{ width: '100%', height: '1px', backgroundColor: border, margin: '0 0 1rem 0' }} />
}

const linkStyle: React.CSSProperties = { color: 'inherit', textDecoration: 'none' }

function ExperienceItem({ exp, index }: { exp: CVExperience; index: number }) {
  const period = exp.endDate === 'Present'
    ? `${exp.startDate} – Present`
    : `${exp.startDate} – ${exp.endDate}`

  return (
    <div style={{ paddingBottom: '1.5rem' }}>
      <StructuralRule />

      {/* Title row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem', flexWrap: 'wrap', gap: '0.3rem' }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 400, lineHeight: 1.15, letterSpacing: '-0.02em', flex: 1, minWidth: 0 }}>
          {exp.title}
          <span style={{ fontSize: '0.82rem', color: inkDim, marginLeft: '0.4em', fontWeight: 400 }}>
            ({exp.company})
          </span>
        </div>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.6rem', color: inkMuted, whiteSpace: 'nowrap' }}>
          REF-{String(index + 1).padStart(3, '0')}
        </span>
      </div>

      {/* Date */}
      <div style={{ fontSize: '0.72rem', color: inkDim, marginBottom: '0.5rem' }}>
        {period}
      </div>

      {/* Impact line */}
      {exp.impactLine && (
        <div style={{ fontSize: '0.72rem', fontWeight: 500, color: '#e4e4e7', marginBottom: '0.4rem', fontStyle: 'italic' }}>
          {exp.impactLine}
        </div>
      )}

      {/* Description */}
      <div style={{ fontSize: '0.75rem', lineHeight: 1.55, fontWeight: 300, color: '#a1a1aa', maxWidth: '92%' }}>
        {exp.description}
      </div>

      {/* Case study + Skills */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '0.5rem', flexWrap: 'wrap', gap: '0.35rem' }}>
        {exp.skills.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
            {exp.skills.map((s) => (
              <SkillPill key={s} label={s} variant="dark-outlined" size="xs" />
            ))}
          </div>
        )}
        {exp.caseStudyUrl && (
          <a href={ensureHttp(exp.caseStudyUrl)} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.6rem', color: '#B39FFF', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            CASE STUDY ↗
          </a>
        )}
      </div>
    </div>
  )
}

export function DarkTheme({ data, context }: Props) {
  const { bio, experience, skills, education, languages } = data
  const fullName = `${bio.firstName} ${bio.lastName}`
  const pageOneExp = experience.slice(0, 3)
  const pageTwoExp = experience.slice(3, 6)
  const pageThreeExp = experience.slice(6)
  const hasPage2 = pageTwoExp.length > 0 || (pageThreeExp.length === 0 && (education.length > 0 || languages.length > 0))
  const hasPage3 = pageThreeExp.length > 0 || (pageTwoExp.length > 0 && (education.length > 0 || languages.length > 0))

  const today = new Date()
  const updatedStr = `${String(today.getDate()).padStart(2,'0')}.${String(today.getMonth()+1).padStart(2,'0')}.${String(today.getFullYear()).slice(2)}`

  const pageStyle = context.isPdfRender
    ? { width: '210mm', minHeight: '297mm', boxSizing: 'border-box' as const }
    : { width: '100%', maxWidth: '210mm', minHeight: '297mm', boxSizing: 'border-box' as const }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: context.isPdfRender ? '0' : '2rem',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      {/* PAGE 1 */}
      <div
        className="cv-page mx-auto"
        style={{
          ...pageStyle,
          backgroundColor: bg,
          color: ink,
          padding: '10mm',
          backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(40,40,48,0.7) 0%, transparent 55%)',
          display: 'flex',
          flexDirection: 'row',
          gap: '8mm',
          boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
        }}
      >
        {/* Sidebar */}
        <aside style={{ width: '52mm', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Name */}
          <div style={{ fontSize: '1.6rem', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.025em', wordBreak: 'break-word' }}>
            {fullName}
          </div>

          {/* Title + location */}
          <div style={{ fontSize: '0.78rem', lineHeight: 1.6, color: inkDim, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <span style={{ color: ink, fontWeight: 400 }}>{bio.title}</span>
            <span>{bio.location}</span>
            {bio.availability && <span>{bio.availability}</span>}
          </div>

          {/* Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.72rem', color: inkDim }}>
            {bio.email && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href={`mailto:${bio.email}`} style={{ ...linkStyle, wordBreak: 'break-all' }}>{bio.email}</a>
                <span style={{ opacity: 0.5, color: '#B39FFF', marginLeft: '4px', flexShrink: 0 }}>↗</span>
              </div>
            )}
            {bio.phone && <div>{bio.phone}</div>}
            {bio.website && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href={ensureHttp(bio.website)} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, wordBreak: 'break-all' }}>{bio.website}</a>
                <span style={{ opacity: 0.5, color: '#B39FFF', marginLeft: '4px', flexShrink: 0 }}>↗</span>
              </div>
            )}
            {bio.linkedin && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href={ensureHttp(bio.linkedin)} target="_blank" rel="noopener noreferrer" style={linkStyle}>LINKEDIN</a>
                <span style={{ opacity: 0.5, color: '#B39FFF', marginLeft: '4px' }}>↗</span>
              </div>
            )}
            {bio.github && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href={ensureHttp(bio.github)} target="_blank" rel="noopener noreferrer" style={linkStyle}>GITHUB</a>
                <span style={{ opacity: 0.5, color: '#B39FFF', marginLeft: '4px' }}>↗</span>
              </div>
            )}
          </div>

          {/* Summary */}
          {bio.summary && (
            <div style={{ fontSize: '0.7rem', lineHeight: 1.55, color: inkDim, borderTop: `1px solid ${border}`, paddingTop: '1rem' }}>
              {bio.summary}
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ borderTop: `1px solid ${border}`, paddingTop: '1rem' }}>
              <div style={{ fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: inkMuted, marginBottom: '0.6rem', fontFamily: 'ui-monospace, monospace' }}>
                Capabilities
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                {skills.map((s) => (
                  <SkillPill key={s} label={s} variant="dark-outlined" size="xs" />
                ))}
              </div>
            </div>
          )}

          {/* System footer */}
          <div
            style={{
              marginTop: 'auto',
              paddingTop: '2rem',
              fontFamily: 'ui-monospace, monospace',
              fontSize: '0.6rem',
              color: inkMuted,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.15rem',
            }}
          >
            <span>SYS.REF: {bio.lastName.toUpperCase().slice(0,2)}-CV-001</span>
            <span>UPDATED: {updatedStr}</span>
            <span>ENCODING: UTF-8</span>
          </div>
        </aside>

        {/* Ledger */}
        <section style={{ flex: 1, paddingTop: '2px', minWidth: 0 }}>
          <SectionMarker index="01" title="Professional Experience"  />
          {pageOneExp.map((exp, i) => (
            <ExperienceItem key={exp.id} exp={exp} index={i} />
          ))}
        </section>
      </div>

      {/* PAGE 2 */}
      {hasPage2 && (
        <div
          className="cv-page mx-auto"
          style={{
            ...pageStyle,
            backgroundColor: bg,
            color: ink,
            padding: '10mm',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
          }}
        >
          {/* Page header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: `1px solid ${border}`, paddingBottom: '1rem', marginBottom: '2rem' }}>
            <span style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '-0.02em' }}>{fullName}</span>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.62rem', color: inkMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Curriculum Vitae — p.02
            </span>
          </div>

          {pageTwoExp.length > 0 && (
            <>
              <SectionMarker index="01" title="Experience cont."  />
              {pageTwoExp.map((exp, i) => (
                <ExperienceItem key={exp.id} exp={exp} index={pageOneExp.length + i} />
              ))}
            </>
          )}

          {/* Show edu/lang on page 2 only if no page 3 */}
          {!hasPage3 && education.length > 0 && (
            <>
              <SectionMarker index="02" title="Academic Credentials" tag="Archived" />
              {education.map((edu, i) => (
                <div key={edu.id} style={{ paddingBottom: '0.9rem' }}>
                  <div style={{ width: '100%', height: '1px', backgroundColor: border, margin: '0 0 0.6rem 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.15rem' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 400, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                      {edu.degree}
                      <span style={{ fontSize: '0.75rem', color: inkDim, marginLeft: '0.4em' }}>({edu.institution})</span>
                    </div>
                    <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.58rem', color: inkMuted, whiteSpace: 'nowrap' }}>
                      EDU-{String(i + 1).padStart(3, '0')}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.68rem', color: inkDim, fontFamily: 'ui-monospace, monospace' }}>{edu.startDate} — {edu.endDate}</div>
                </div>
              ))}
            </>
          )}
          {!hasPage3 && languages.length > 0 && (
            <>
              <SectionMarker index={education.length > 0 ? '03' : '02'} title="Languages" />
              <StructuralRule />
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.78rem' }}>
                  <span style={{ fontWeight: 400 }}>{lang.name}</span>
                  <span style={{ color: inkDim, fontSize: '0.68rem', fontFamily: 'ui-monospace, monospace' }}>{lang.level.toUpperCase()}</span>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {/* PAGE 3 */}
      {hasPage3 && (
        <div
          className="cv-page mx-auto"
          style={{ ...pageStyle, backgroundColor: bg, color: ink, padding: '10mm', boxShadow: '0 8px 40px rgba(0,0,0,0.6)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: `1px solid ${border}`, paddingBottom: '1rem', marginBottom: '2rem' }}>
            <span style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '-0.02em' }}>{fullName}</span>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.62rem', color: inkMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Curriculum Vitae — p.03
            </span>
          </div>

          {pageThreeExp.length > 0 && (
            <>
              <SectionMarker index="01" title="Experience cont."  />
              {pageThreeExp.map((exp, i) => (
                <ExperienceItem key={exp.id} exp={exp} index={pageOneExp.length + pageTwoExp.length + i} />
              ))}
            </>
          )}

          {education.length > 0 && (
            <>
              <SectionMarker index="02" title="Academic Credentials" tag="Archived" />
              {education.map((edu, i) => (
                <div key={edu.id} style={{ paddingBottom: '0.9rem' }}>
                  <div style={{ width: '100%', height: '1px', backgroundColor: border, margin: '0 0 0.6rem 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.15rem' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 400, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                      {edu.degree}
                      <span style={{ fontSize: '0.75rem', color: inkDim, marginLeft: '0.4em' }}>({edu.institution})</span>
                    </div>
                    <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.58rem', color: inkMuted, whiteSpace: 'nowrap' }}>
                      EDU-{String(i + 1).padStart(3, '0')}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.68rem', color: inkDim, fontFamily: 'ui-monospace, monospace' }}>{edu.startDate} — {edu.endDate}</div>
                </div>
              ))}
            </>
          )}

          {languages.length > 0 && (
            <>
              <SectionMarker index={education.length > 0 ? '03' : '02'} title="Languages" />
              <StructuralRule />
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.78rem' }}>
                  <span style={{ fontWeight: 400 }}>{lang.name}</span>
                  <span style={{ color: inkDim, fontSize: '0.68rem', fontFamily: 'ui-monospace, monospace' }}>{lang.level.toUpperCase()}</span>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}
