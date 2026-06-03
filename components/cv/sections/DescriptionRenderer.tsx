import React from 'react'
import { parseDescription } from '@/lib/description-utils'

interface DescriptionRendererProps {
  text: string | undefined
  style?: React.CSSProperties
  /** Style for bullet list items */
  bulletStyle?: React.CSSProperties
  /** Style for the bullet marker (•) */
  markerStyle?: React.CSSProperties
}

/**
 * Renders an experience description with:
 *  - Multi-line support (Enter = new line / new paragraph)
 *  - Lines starting with `-` or `*` rendered as bullet points
 *
 * Uses inline styles throughout so it works correctly in Puppeteer PDF rendering.
 */
export function DescriptionRenderer({
  text,
  style,
  bulletStyle,
  markerStyle,
}: DescriptionRendererProps) {
  const segments = parseDescription(text)
  if (segments.length === 0) return null

  const defaultStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
  }

  const defaultBulletStyle: React.CSSProperties = {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.15rem',
  }

  const defaultMarkerStyle: React.CSSProperties = {
    position: 'absolute' as const,
    left: 0,
    top: '0.05em',
  }

  return (
    <div style={{ ...defaultStyle, ...style }}>
      {segments.map((seg, i) => {
        if (seg.type === 'paragraph') {
          return (
            <p
              key={i}
              style={{
                margin: 0,
                whiteSpace: 'pre-wrap',
                lineHeight: 'inherit',
              }}
            >
              {seg.text}
            </p>
          )
        }

        // bullets
        return (
          <ul key={i} style={{ ...defaultBulletStyle, ...bulletStyle }}>
            {seg.items.map((item, j) => (
              <li
                key={j}
                style={{ position: 'relative', paddingLeft: '0.95rem', lineHeight: 'inherit' }}
              >
                <span
                  aria-hidden
                  style={{ ...defaultMarkerStyle, ...markerStyle }}
                >
                  •
                </span>
                {item}
              </li>
            ))}
          </ul>
        )
      })}
    </div>
  )
}
