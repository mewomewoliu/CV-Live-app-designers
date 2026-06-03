/**
 * Parses an experience description string into render segments.
 *
 * Rules:
 *  - Lines starting with `-` or `*` (optionally followed by a space) are bullet items.
 *    Consecutive bullet lines are grouped into one segment.
 *  - All other lines are paragraph text, grouped into segments and rendered with
 *    white-space: pre-wrap so manual newlines are preserved.
 */

export type DescriptionSegment =
  | { type: 'paragraph'; text: string }
  | { type: 'bullets'; items: string[] }

const BULLET_RE = /^[-*]\s*(.*)/

export function parseDescription(text: string | undefined): DescriptionSegment[] {
  if (!text) return []

  const lines = text.split('\n')
  const segments: DescriptionSegment[] = []
  let pendingParaLines: string[] = []
  let pendingBullets: string[] = []

  function flushParagraph() {
    if (pendingParaLines.length === 0) return
    // Trim trailing blank lines only
    while (pendingParaLines.length && pendingParaLines[pendingParaLines.length - 1].trim() === '') {
      pendingParaLines.pop()
    }
    if (pendingParaLines.length) {
      segments.push({ type: 'paragraph', text: pendingParaLines.join('\n') })
    }
    pendingParaLines = []
  }

  function flushBullets() {
    if (pendingBullets.length === 0) return
    segments.push({ type: 'bullets', items: pendingBullets })
    pendingBullets = []
  }

  for (const line of lines) {
    const m = line.match(BULLET_RE)
    if (m) {
      flushParagraph()
      pendingBullets.push(m[1])
    } else {
      flushBullets()
      pendingParaLines.push(line)
    }
  }

  flushParagraph()
  flushBullets()

  return segments
}

/**
 * Flattens a description into plain bullet strings for themes that render
 * everything as a bullet list (WarmSidebar, Typewriter).
 *
 * - Lines starting with `-`/`*` become explicit bullets.
 * - Other non-empty lines each become a bullet (respects Enter-separated entries).
 */
export function descriptionToBullets(text: string | undefined): string[] {
  if (!text) return []
  return text
    .split('\n')
    .map((line) => {
      const m = line.match(BULLET_RE)
      return m ? m[1] : line
    })
    .filter((line) => line.trim().length > 0)
}
