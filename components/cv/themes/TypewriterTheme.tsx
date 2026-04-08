import React from 'react'
import { CVData, CVRenderContext, CVExperience } from '@/lib/cv-types'
import { ensureHttp } from '@/lib/url-utils'

interface Props {
  data: CVData
  context: CVRenderContext
}

const bg = '#FAFAF8'
const ink = '#0A0A0A'
const inkDim = '#3A3A3A'
const inkMuted = '#888888'
const divColor = 'rgba(0,0,0,0.18)'
const mono = `Helvetica, Arial, sans-serif`

const linkStyle: React.CSSProperties = { color: 'inherit', textDecoration: 'none' }

function SectionTitle({ title }: { title: string }) {
  return (
    <div style={{ marginBottom: '0.6rem' }}>
      <div style={{
        fontFamily: mono,
        fontSize: '1rem',
        fontWeight: 900,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.06em',
        color: ink,
      }}>
        {title}
      </div>
      <div style={{ height: '2px', backgroundColor: ink, marginTop: '0.18rem' }} />
    </div>
  )
}

function ExperienceItem({ exp }: { exp: CVExperience }) {
  const period = exp.endDate === 'Present'
    ? `${exp.startDate} - Present`
    : `${exp.startDate} - ${exp.endDate}`

  const bullets: string[] = []
  if (exp.impactLine) bullets.push(exp.impactLine)
  if (exp.description) {
    const sentences = exp.description.split(/(?<=[.!?])\s+/).filter(Boolean)
    bullets.push(...sentences)
  }

  return (
    <div style={{ marginBottom: '1.05rem' }}>
      <div style={{ fontFamily: mono, fontSize: '0.76rem', fontWeight: 700, color: ink, marginBottom: '0.08rem' }}>
        {exp.title}
      </div>
      <div style={{ fontFamily: mono, fontSize: '0.7rem', color: inkDim }}>
        {exp.company}
      </div>
      <div style={{ fontFamily: mono, fontSize: '0.65rem', color: inkMuted, marginBottom: '0.28rem' }}>
        {period}
      </div>
      {bullets.length > 0 && (
        <ul style={{ margin: 0, paddingLeft: '1.15rem', fontSize: '0.67rem', fontFamily: mono, color: inkDim, lineHeight: 1.72 }}>
          {bullets.slice(0, 4).map((b, i) => (
            <li key={i} style={{ marginBottom: '0.08rem' }}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function TypewriterTheme({ data, context }: Props) {
  const { bio, experience, skills, education, languages } = data

  const pageStyle = context.isPdfRender
    ? { width: '210mm', minHeight: '297mm', boxSizing: 'border-box' as const }
    : { width: '100%', maxWidth: '210mm', minHeight: '297mm', boxSizing: 'border-box' as const }

  const pageOneExp = experience.slice(0, 5)
  const restExp = experience.slice(5)

  // Collect unique skills from experience entries for "Creative Tools" pills
  const toolSkillsSet = new Set(experience.flatMap((e) => e.skills))
  const toolSkills = Array.from(toolSkillsSet).slice(0, 10)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: context.isPdfRender ? '0' : '2rem', fontFamily: mono }}>

      {/* PAGE 1 */}
      <div
        className="cv-page mx-auto shadow-sm"
        style={{ ...pageStyle, backgroundColor: bg, color: ink, padding: '10mm' }}
      >
        {/* HEADER: name (left) + title pills + contact (right) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.7rem' }}>
          {/* Huge name */}
          <div style={{
            fontFamily: mono,
            fontSize: '4rem',
            fontWeight: 900,
            lineHeight: 0.88,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase' as const,
            color: ink,
          }}>
            {bio.firstName}
            <br />
            {bio.lastName}
          </div>

          {/* Right: title pill(s) + contact */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem', paddingTop: '0.2rem' }}>
            {/* Role tag */}
            <div style={{
              backgroundColor: ink,
              color: bg,
              borderRadius: '4px',
              padding: '0.2rem 0.7rem',
              fontFamily: mono,
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              whiteSpace: 'nowrap' as const,
            }}>
              {bio.title}
            </div>

            {/* Contact block */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.12rem', marginTop: '0.4rem' }}>
              {bio.website && (
                <a href={ensureHttp(bio.website)} target="_blank" rel="noopener noreferrer"
                  style={{ ...linkStyle, fontFamily: mono, fontSize: '0.63rem', color: ink, letterSpacing: '0.02em' }}>
                  {bio.website}
                </a>
              )}
              {bio.email && (
                <a href={`mailto:${bio.email}`}
                  style={{ ...linkStyle, fontFamily: mono, fontSize: '0.63rem', color: ink, letterSpacing: '0.02em' }}>
                  {bio.email}
                </a>
              )}
              {bio.phone && (
                <span style={{ fontFamily: mono, fontSize: '0.63rem', color: ink }}>
                  {bio.phone}
                </span>
              )}
              {bio.linkedin && (
                <a href={ensureHttp(bio.linkedin)} target="_blank" rel="noopener noreferrer"
                  style={{ ...linkStyle, fontFamily: mono, fontSize: '0.63rem', color: ink, letterSpacing: '0.02em' }}>
                  {bio.linkedin}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: divColor, marginBottom: '0.7rem' }} />


        {/* BODY: left column (skills/tools/languages) + right column (experience) */}
        <div style={{ display: 'flex', gap: '6mm' }}>

          {/* LEFT COLUMN */}
          <div style={{ width: '34%', flexShrink: 0, borderRight: `1px solid ${divColor}`, paddingRight: '5mm' }}>

            {/* Skills */}
            {skills.length > 0 && (
              <div style={{ marginBottom: '1.1rem' }}>
                <SectionTitle title="Skills" />
                <div style={{ fontFamily: mono, fontSize: '0.66rem', color: inkDim, lineHeight: 1.82 }}>
                  {skills.map((s) => (
                    <div key={s}>{s}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Creative Tools (from experience skills) */}
            {toolSkills.length > 0 && (
              <div style={{ marginBottom: '1.1rem' }}>
                <SectionTitle title="Creative Tools" />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.45rem' }}>
                  {toolSkills.map((t) => (
                    <span key={t} style={{
                      fontFamily: mono,
                      fontSize: '0.58rem',
                      border: `1px solid ${ink}`,
                      borderRadius: '12px',
                      padding: '0.1rem 0.5rem',
                      color: ink,
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.04em',
                      whiteSpace: 'nowrap' as const,
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div style={{ marginBottom: '1.1rem' }}>
                <SectionTitle title="Education" />
                {education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: '0.55rem' }}>
                    <div style={{ fontFamily: mono, fontSize: '0.66rem', fontWeight: 700, color: ink, lineHeight: 1.4 }}>
                      {edu.degree}
                    </div>
                    <div style={{ fontFamily: mono, fontSize: '0.63rem', color: inkDim }}>
                      {edu.institution}{edu.endDate ? `, ${edu.endDate}` : ''}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div>
                <SectionTitle title="Languages" />
                <div style={{ fontFamily: mono, fontSize: '0.66rem', color: inkDim, lineHeight: 1.82 }}>
                  {languages.map((lang) => (
                    <div key={lang.id}>{lang.name} — {lang.level}</div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Experience */}
          <div style={{ flex: 1 }}>
            <SectionTitle title="Experience" />
            {pageOneExp.map((exp) => (
              <ExperienceItem key={exp.id} exp={exp} />
            ))}
          </div>
        </div>
      </div>

      {/* CONTINUATION PAGE */}
      {restExp.length > 0 && (
        <div
          className="cv-page mx-auto shadow-sm"
          style={{ ...pageStyle, backgroundColor: bg, color: ink, padding: '10mm' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: `1px solid ${divColor}`, paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ fontFamily: mono, fontSize: '0.78rem', fontWeight: 900, textTransform: 'uppercase' as const }}>
              {bio.firstName} {bio.lastName}
            </span>
            <span style={{ fontFamily: mono, fontSize: '0.62rem', color: inkMuted }}>Continued</span>
          </div>
          <SectionTitle title="Experience" />
          {restExp.map((exp) => (
            <ExperienceItem key={exp.id} exp={exp} />
          ))}
        </div>
      )}
    </div>
  )
}
