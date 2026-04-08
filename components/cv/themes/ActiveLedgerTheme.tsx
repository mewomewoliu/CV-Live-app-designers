import React from 'react'
import { CVData, CVRenderContext, CVExperience } from '@/lib/cv-types'
import { ensureHttp } from '@/lib/url-utils'

interface Props {
  data: CVData
  context: CVRenderContext
}

const linkStyle: React.CSSProperties = { color: 'inherit', textDecoration: 'none' }

const bg = '#ffffff'
const ink = '#1a1a1a'
const inkDim = '#71717a '
const inkMuted = '#a1a1aa'
const border = '#e4e4e7'

function SectionMarker({ index, title, tag }: { index: string; title: string; tag?: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '1.1rem',
        marginTop: index === '01' ? '0' : '2rem',
        fontSize: '0.62rem',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        fontWeight: 500,
        color: inkMuted,
        fontFamily: 'ui-monospace, monospace',
      }}
    >
      <span style={{ color: inkDim }}>{`${index} // ${title}`}</span>
      {tag && <span style={{ opacity: 0.7 }}>[{tag}]</span>}
    </div>
  )
}

function ExperienceItem({ exp, index }: { exp: CVExperience; index: number }) {
  const period = exp.endDate === 'Present'
    ? `${exp.startDate} – Present`
    : `${exp.startDate} – ${exp.endDate}`

  return (
    <div style={{ paddingBottom: '1.5rem' }}>
      <div style={{ width: '100%', height: '1px', backgroundColor: border, margin: '0 0 0.85rem 0' }} />

      {/* Title row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.2rem', gap: '0.5rem' }}>
        <div style={{ fontSize: '1rem', fontWeight: 500, lineHeight: 1.2, letterSpacing: '-0.01em', flex: 1 }}>
          {exp.title}
          <span style={{ fontSize: '0.82rem', color: inkDim, marginLeft: '0.35em', fontWeight: 400 }}>
            ({exp.company})
          </span>
        </div>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.6rem', color: inkMuted, whiteSpace: 'nowrap' }}>
          REF-{String(index + 1).padStart(3, '0')}
        </span>
      </div>

      {/* Date */}
      <div style={{ fontSize: '0.68rem', color: inkDim, marginBottom: '0.45rem', fontWeight: 400 }}>
        {period}
      </div>

      {/* Impact line */}
      {exp.impactLine && (
        <div style={{ fontSize: '0.68rem', fontWeight: 500, color: ink, marginBottom: '0.4rem', fontStyle: 'italic', borderLeft: `2px solid ${inkMuted}`, paddingLeft: '0.6rem' }}>
          {exp.impactLine}
        </div>
      )}

      {/* Description */}
      <div style={{ fontSize: '0.72rem', lineHeight: 1.6, color: inkDim, maxWidth: '94%' }}>
        {exp.description}
      </div>

      {/* Skills + case study */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '0.5rem', flexWrap: 'wrap', gap: '0.35rem' }}>
        {exp.skills.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
            {exp.skills.map((s) => (
              <span key={s} style={{ fontSize: '0.58rem', border: `1px solid ${border}`, color: inkMuted, padding: '0.15rem 0.5rem', borderRadius: '99px', display: 'inline-block', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {s}
              </span>
            ))}
          </div>
        )}
        {exp.caseStudyUrl && (
          <a href={ensureHttp(exp.caseStudyUrl)} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.58rem', color: inkDim, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            CASE STUDY ↗
          </a>
        )}
      </div>
    </div>
  )
}

export function ActiveLedgerTheme({ data, context }: Props) {
  const { bio, experience, skills, education, languages } = data
  const fullName = `${bio.firstName} ${bio.lastName}`
  const pageOneExp = experience.slice(0, 5)
  const pageTwoExp = experience.slice(5, 8)
  const pageThreeExp = experience.slice(8)
  const hasPage2 = pageTwoExp.length > 0
  const hasPage3 = pageThreeExp.length > 0

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
          display: 'flex',
          flexDirection: 'row',
          gap: '8mm',
        }}
      >
        {/* Sidebar */}
        <aside style={{ width: '52mm', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Name */}
          <div
            style={{
              fontSize: '1.5rem',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              color: ink,
              wordBreak: 'break-word',
            }}
          >
            {bio.firstName}
            <br />
            {bio.lastName.toUpperCase()}
          </div>

          {/* Title + location */}
          <div style={{ fontSize: '0.72rem', lineHeight: 1.6, color: inkDim, display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
            <span style={{ color: ink }}>{bio.title}</span>
            <span>Based in {bio.location}</span>
            {bio.availability && <span>{bio.availability}</span>}
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
            
          </div>

          {/* Skills / Capabilities */}
          {skills.length > 0 && (
            <>
              <div style={{ width: '100%', height: '1px', backgroundColor: border }} />
              <div>
                <div style={{ fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: inkMuted, marginBottom: '0.5rem', fontFamily: 'ui-monospace, monospace' }}>
                  Capabilities
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                  {skills.map((s) => (
                    <span key={s} style={{ fontSize: '0.6rem', border: `1px solid ${border}`, color: inkMuted, padding: '0.15rem 0.5rem', borderRadius: '99px', display: 'inline-block', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Education */}
          {education.length > 0 && (
            <>
              <div style={{ width: '100%', height: '1px', backgroundColor: border }} />
              <div>
                <div style={{ fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: inkMuted, marginBottom: '0.5rem', fontFamily: 'ui-monospace, monospace' }}>
                  Education
                </div>
                {education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: '0.65rem' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 400, lineHeight: 1.3, color: ink }}>{edu.degree}</div>
                    <div style={{ fontSize: '0.65rem', color: inkDim, fontFamily: 'ui-monospace, monospace', marginTop: '0.1rem' }}>{edu.institution}</div>
                    {edu.endDate && <div style={{ fontSize: '0.62rem', color: inkMuted, fontFamily: 'ui-monospace, monospace' }}>{edu.startDate} — {edu.endDate}</div>}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <>
              <div style={{ width: '100%', height: '1px', backgroundColor: border }} />
              <div>
                <div style={{ fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: inkMuted, marginBottom: '0.5rem', fontFamily: 'ui-monospace, monospace' }}>
                  Languages
                </div>
                {languages.map((lang) => (
                  <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.7rem' }}>
                    <span style={{ color: ink }}>{lang.name}</span>
                    <span style={{ color: inkMuted, fontSize: '0.62rem', fontFamily: 'ui-monospace, monospace' }}>{lang.level.toUpperCase()}</span>
                  </div>
                ))}
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
          }}
        >
          {/* Page header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: `1px solid ${border}`, paddingBottom: '1rem', marginBottom: '2rem' }}>
            <span style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '-0.01em' }}>{fullName}</span>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.62rem', color: inkMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Curriculum Vitae — p.02
            </span>
          </div>

          {pageTwoExp.length > 0 && (
            <div>
              <SectionMarker index="01" title="Experience cont." />
              {pageTwoExp.map((exp, i) => (
                <ExperienceItem key={exp.id} exp={exp} index={pageOneExp.length + i} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* PAGE 3 */}
      {hasPage3 && (
        <div
          className="cv-page mx-auto"
          style={{ ...pageStyle, backgroundColor: bg, color: ink, padding: '10mm' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: `1px solid ${border}`, paddingBottom: '1rem', marginBottom: '2rem' }}>
            <span style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '-0.01em' }}>{fullName}</span>
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '1rem' }}>
              {education.length > 0 && (
                <div>
                  <SectionMarker index="02" title="Education" />
                  {education.map((edu) => (
                    <div key={edu.id} style={{ marginBottom: '0.85rem' }}>
                      <div style={{ width: '100%', height: '1px', backgroundColor: border, marginBottom: '0.5rem' }} />
                      <div style={{ fontSize: '0.78rem', fontWeight: 500, letterSpacing: '-0.01em', marginBottom: '0.1rem' }}>{edu.degree}</div>
                      <div style={{ fontSize: '0.65rem', color: inkDim }}>{edu.institution}</div>
                      <div style={{ fontSize: '0.6rem', color: inkMuted, fontFamily: 'ui-monospace, monospace', marginTop: '0.1rem' }}>{edu.startDate} — {edu.endDate}</div>
                    </div>
                  ))}
                </div>
              )}
              {languages.length > 0 && (
                <div>
                  <SectionMarker index={education.length > 0 ? '03' : '02'} title="Languages" />
                  <div style={{ width: '100%', height: '1px', backgroundColor: border, marginBottom: '0.75rem' }} />
                  {languages.map((lang) => (
                    <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.75rem' }}>
                      <span>{lang.name}</span>
                      <span style={{ color: inkMuted, fontSize: '0.65rem', fontFamily: 'ui-monospace, monospace' }}>{lang.level.toUpperCase()}</span>
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
