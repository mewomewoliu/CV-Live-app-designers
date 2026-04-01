import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

// Bold blocky C with chamfered outer corners and chamfered inner concave corners.
// Traced as a single clockwise polygon (no holes needed — C is open on the right).
//
// Layout (32×32):
//   top arm:    y 0–12  (12 px thick)
//   bottom arm: y 20–32 (12 px thick)
//   left bar:   x 0–12  (12 px wide)
//   opening:    x 12–32, y 12–20  (open right)
//   outer chamfer: 4 px diagonal cut on all 4 outer corners
//   inner chamfer: 2 px diagonal cut on the 2 concave inner corners
//
// Path goes: outer-TL → top edge → outer-TR → down outer-right of top arm →
//            inner-TR chamfer → inner-top edge left → inner-TL concave chamfer →
//            inner left side down → inner-BL concave chamfer → inner-bottom edge right →
//            inner-BR chamfer → down outer-right of bottom arm →
//            outer-BR → bottom edge left → outer-BL → up left side → close
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#f3f4e8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32">
          <path
            d="M4,0 L28,0 L32,4 L32,12 L14,12 L12,14 L12,18 L14,20 L32,20 L32,28 L28,32 L4,32 L0,28 L0,4 Z"
            fill="#1111cc"
          />
        </svg>
      </div>
    ),
    { ...size }
  )
}
