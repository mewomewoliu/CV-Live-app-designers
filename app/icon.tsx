import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          background: '#18181b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Document lines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 2 }}>
          <div style={{ width: 12, height: 2.5, background: 'rgba(255,255,255,0.9)', borderRadius: 1.5 }} />
          <div style={{ width: 17, height: 2.5, background: 'rgba(255,255,255,0.9)', borderRadius: 1.5 }} />
          <div style={{ width: 14, height: 2.5, background: 'rgba(255,255,255,0.9)', borderRadius: 1.5 }} />
        </div>
        {/* Live dot */}
        <div
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#4ade80',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
