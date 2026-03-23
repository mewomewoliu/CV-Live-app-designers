import React from 'react'
import { CVData, CVRenderContext, CVExperience } from '@/lib/cv-types'
import { SkillPill } from '../sections/SkillPill'
import { ensureHttp } from '@/lib/url-utils'

interface Props {
  data: CVData
  context: CVRenderContext
}

const linkStyle: React.CSSProperties = { color: 'inherit', textDecoration: 'none' }

const bg = '#f5f5f3'
const ink = '#09090b'
const inkDim = '#71717a'
const inkMuted = '#a1a1aa'
const border = '#e4e4e7'

function SectionMarker({ index, title, tag }: { index: string; title: string; tag?: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '1.25rem',
        paddingBottom: '0.6rem',
        borderBottom: `1px solid ${border}`,
        fontSize: '0.62rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        fontWeight: 600,
        color: inkMuted,
        fontFamily: 'ui-monospace, monospace',
      }}
    >
      <span style={{ color: ink }}>{`${index} // ${title}`}</span>
      {tag && <span style={{ opacity: 0.6 }}>[{tag}]</span>}
    </div>
  )
}

function ExperienceItem({ exp, index }: { exp: CVExperience; index: number }) {
  const dateRange = exp.endDate === 'Present'
    ? `${exp.startDate.replace(' ', '.')} — PRESENT`
    : `${exp.startDate.replace(' ', '.')} — ${exp.endDate.replace(' ', '.')}`

  return (
    <div style={{ paddingBottom: '1.75rem' }}>
      {/* Rule */}
      <div style={{ width: '100%', height: '2px', backgroundColor: ink, marginBottom: '0.75rem' }} />

      {/* Title row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.2rem', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-0.02em', color: ink, lineHeight: 1.2 }}>
            {exp.title}
          </span>
          <span style={{ fontSize: '0.82rem', color: inkDim, marginLeft: '0.4em', fontWeight: 400 }}>
            ({exp.company})
          </span>
        </div>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.6rem', color: inkMuted, whiteSpace: 'nowrap', marginTop: '0.2rem' }}>
          REF-{String(index + 1).padStart(3, '0')}
        </span>
      </div>

      {/* Date — display */}
      <div style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.04em', color: ink, lineHeight: 1, marginBottom: '0.65rem', marginTop: '0.15rem' }}>
        {dateRange}
      </div>

      {/* Impact line */}
      {exp.impactLine && (
        <div style={{ display: 'inline-block', background: ink, color: '#fff', fontSize: '0.65rem', padding: '0.2rem 0.5rem', marginBottom: '0.55rem', lineHeight: 1.5, letterSpacing: '0.01em' }}>
          {exp.impactLine}
        </div>
      )}

      {/* Description */}
      {exp.description && (
        <div style={{ fontSize: '0.75rem', lineHeight: 1.6, color: '#52525b', marginBottom: '0.55rem', maxWidth: '94%' }}>
          {exp.description}
        </div>
      )}

      {/* Skills + case study */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '0.35rem' }}>
        {exp.skills.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
            {exp.skills.map((s) => (
              <SkillPill key={s} label={s} variant="outlined" size="xs" />
            ))}
          </div>
        )}
        {exp.caseStudyUrl && (
          <a href={ensureHttp(exp.caseStudyUrl)} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.6rem', color: ink, textDecoration: 'none', whiteSpace: 'nowrap', borderBottom: `1px solid ${inkMuted}` }}>
            CASE STUDY ↗
          </a>
        )}
      </div>
    </div>
  )
}

export function MinimalTheme({ data, context }: Props) {
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: context.isPdfRender ? '0' : '2rem', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', WebkitFontSmoothing: 'antialiased' }}>

      {/* PAGE 1 */}
      <div
        className="cv-page mx-auto shadow-sm"
        style={{ ...pageStyle, backgroundColor: bg, color: ink, padding: '10mm', display: 'flex', flexDirection: 'row', gap: '8mm' }}
      >
        {/* Sidebar */}
        <aside style={{ width: '52mm', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Name */}
          <div>
            <div
              style={{
                fontSize: '2.4rem',
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: '-0.04em',
                color: ink,
                wordBreak: 'break-word',
              }}
            >
              {bio.firstName}
              <br />
              {bio.lastName}
            </div>
          </div>

          {/* Title + location */}
          <div style={{ fontSize: '0.72rem', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
            <span style={{ color: ink, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.65rem' }}>{bio.title}</span>
            <span style={{ color: inkDim }}>{bio.location}</span>
            {bio.availability && <span style={{ color: inkDim }}>{bio.availability}</span>}
          </div>

          {/* Divider */}
          <div style={{ width: '100%', height: '1px', backgroundColor: border }} />

          {/* Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.68rem', color: inkDim }}>
            {bio.email && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href={`mailto:${bio.email}`} style={{ ...linkStyle, wordBreak: 'break-all' }}>{bio.email}</a>
                <span style={{ color: inkMuted, marginLeft: '4px', flexShrink: 0 }}>↗</span>
              </div>
            )}
            {bio.phone && <div>{bio.phone}</div>}
            {bio.website && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href={ensureHttp(bio.website)} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, wordBreak: 'break-all' }}>{bio.website}</a>
                <span style={{ color: inkMuted, marginLeft: '4px', flexShrink: 0 }}>↗</span>
              </div>
            )}
            {bio.linkedin && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href={ensureHttp(bio.linkedin)} target="_blank" rel="noopener noreferrer" style={linkStyle}>LINKEDIN</a>
                <span style={{ color: inkMuted }}>↗</span>
              </div>
            )}
            {bio.github && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href={ensureHttp(bio.github)} target="_blank" rel="noopener noreferrer" style={linkStyle}>GITHUB</a>
                <span style={{ color: inkMuted }}>↗</span>
              </div>
            )}
            {context.mode === 'web' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>DOWNLOAD.PDF</span>
                <span style={{ color: inkMuted }}>↓</span>
              </div>
            )}
          </div>

          {/* Summary */}
          {bio.summary && (
            <>
              <div style={{ width: '100%', height: '1px', backgroundColor: border }} />
              <div style={{ fontSize: '0.68rem', lineHeight: 1.65, color: inkDim }}>
                {bio.summary}
              </div>
            </>
          )}

          {/* Skills sidebar */}
          {skills.length > 0 && (
            <>
              <div style={{ width: '100%', height: '1px', backgroundColor: border }} />
              <div>
                <div
                  style={{
                    fontSize: '0.58rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: inkMuted,
                    marginBottom: '0.6rem',
                    fontFamily: 'ui-monospace, monospace',
                    fontWeight: 600,
                  }}
                >
                  Capabilities
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                  {skills.map((s) => (
                    <SkillPill key={s} label={s} variant="outlined" size="xs" />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* System footer */}
          <div
            style={{
              marginTop: 'auto',
              paddingTop: '1.5rem',
              fontFamily: 'ui-monospace, monospace',
              fontSize: '0.58rem',
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

        {/* Main content */}
        <main style={{ flex: 1, paddingTop: '2px', minWidth: 0 }}>
          <SectionMarker index="01" title="Professional Experience"  />
          {pageOneExp.map((exp, i) => (
            <ExperienceItem key={exp.id} exp={exp} index={i} />
          ))}
        </main>
      </div>

      {/* PAGE 2 */}
      {hasPage2 && (
        <div
          className="cv-page mx-auto shadow-sm"
          style={{
            ...pageStyle,
            backgroundColor: bg,
            color: ink,
            padding: '10mm',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}
        >
          {/* Page header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              borderBottom: `1px solid ${border}`,
              paddingBottom: '1rem',
            }}
          >
            <span style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{fullName}</span>
            <span
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.62rem',
                color: inkMuted,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Curriculum Vitae — p.02
            </span>
          </div>

          {/* Continued experience */}
          {pageTwoExp.length > 0 && (
            <div>
              <SectionMarker index="01" title="Experience cont."  />
              {pageTwoExp.map((exp, i) => (
                <ExperienceItem key={exp.id} exp={exp} index={pageOneExp.length + i} />
              ))}
            </div>
          )}

          {/* Education + Languages — only if no page 3 */}
          {!hasPage3 && (education.length > 0 || languages.length > 0) && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
              {education.length > 0 && (
                <div>
                  <SectionMarker index="02" title="Education" />
                  {education.map((edu) => (
                    <div key={edu.id} style={{ marginBottom: '0.9rem' }}>
                      <div style={{ width: '100%', height: '1px', backgroundColor: border, marginBottom: '0.5rem' }} />
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: '0.1rem' }}>{edu.degree}</div>
                      <div style={{ fontSize: '0.68rem', color: inkDim }}>{edu.institution}</div>
                      <div style={{ fontSize: '0.62rem', color: inkMuted, fontFamily: 'ui-monospace, monospace', marginTop: '0.1rem' }}>{edu.startDate} — {edu.endDate}</div>
                      {edu.description && <div style={{ fontSize: '0.65rem', color: inkDim, marginTop: '0.3rem', lineHeight: 1.55 }}>{edu.description}</div>}
                    </div>
                  ))}
                </div>
              )}
              {languages.length > 0 && (
                <div>
                  <SectionMarker index={education.length > 0 ? '03' : '02'} title="Languages" />
                  <div style={{ width: '100%', height: '1px', backgroundColor: border, marginBottom: '0.75rem' }} />
                  {languages.map((lang) => (
                    <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.78rem' }}>
                      <span style={{ fontWeight: 500 }}>{lang.name}</span>
                      <span style={{ color: inkDim, fontSize: '0.68rem', fontFamily: 'ui-monospace, monospace' }}>{lang.level.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* PAGE 3 */}
      {hasPage3 && (
        <div
          className="cv-page mx-auto shadow-sm"
          style={{ ...pageStyle, backgroundColor: bg, color: ink, padding: '10mm', display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: `1px solid ${border}`, paddingBottom: '1rem' }}>
            <span style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{fullName}</span>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.62rem', color: inkMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Curriculum Vitae — p.03
            </span>
          </div>

          {pageThreeExp.length > 0 && (
            <div>
              <SectionMarker index="01" title="Experience cont."  />
              {pageThreeExp.map((exp, i) => (
                <ExperienceItem key={exp.id} exp={exp} index={pageOneExp.length + pageTwoExp.length + i} />
              ))}
            </div>
          )}

          {(education.length > 0 || languages.length > 0) && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
              {education.length > 0 && (
                <div>
                  <SectionMarker index="02" title="Education" />
                  {education.map((edu) => (
                    <div key={edu.id} style={{ marginBottom: '0.9rem' }}>
                      <div style={{ width: '100%', height: '1px', backgroundColor: border, marginBottom: '0.5rem' }} />
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: '0.1rem' }}>{edu.degree}</div>
                      <div style={{ fontSize: '0.68rem', color: inkDim }}>{edu.institution}</div>
                      <div style={{ fontSize: '0.62rem', color: inkMuted, fontFamily: 'ui-monospace, monospace', marginTop: '0.1rem' }}>{edu.startDate} — {edu.endDate}</div>
                      {edu.description && <div style={{ fontSize: '0.65rem', color: inkDim, marginTop: '0.3rem', lineHeight: 1.55 }}>{edu.description}</div>}
                    </div>
                  ))}
                </div>
              )}
              {languages.length > 0 && (
                <div>
                  <SectionMarker index={education.length > 0 ? '03' : '02'} title="Languages" />
                  <div style={{ width: '100%', height: '1px', backgroundColor: border, marginBottom: '0.75rem' }} />
                  {languages.map((lang) => (
                    <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.78rem' }}>
                      <span style={{ fontWeight: 500 }}>{lang.name}</span>
                      <span style={{ color: inkDim, fontSize: '0.68rem', fontFamily: 'ui-monospace, monospace' }}>{lang.level.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
