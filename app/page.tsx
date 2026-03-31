import Link from 'next/link'

function CvLiveIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="20" height="20" rx="4" fill="#18181b" />
      {/* Document lines */}
      <rect x="5" y="7" width="6" height="1.5" rx="0.75" fill="white" opacity="0.9" />
      <rect x="5" y="10" width="9" height="1.5" rx="0.75" fill="white" opacity="0.9" />
      <rect x="5" y="13" width="7.5" height="1.5" rx="0.75" fill="white" opacity="0.9" />
      {/* Live dot */}
      <circle cx="15" cy="6.5" r="2.5" fill="#4ade80" />
    </svg>
  )
}

const FEATURES = [
  {
    label: 'Live URL',
    desc: 'cv.live/yourname — always your latest version. Share one link, never send a file again.',
  },
  {
    label: 'Structured editor',
    desc: 'Form-based with live preview. No layout decisions, no design work — just fill it in.',
  },
  {
    label: '1-click PDF',
    desc: 'Server-rendered A4. Text-selectable, ATS-safe, embedded fonts. Looks like a real CV.',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col">

      {/* ── Nav — matches editor toolbar exactly ─────────── */}
      <header className="h-14 bg-white border-b border-zinc-200 flex items-center px-5 flex-shrink-0">
        <div className="flex items-center gap-2 mr-auto">
          <CvLiveIcon size={20} />
          <span className="text-sm font-black tracking-tighter text-zinc-900">CV.live</span>
        </div>

        <nav className="flex items-center gap-1" aria-label="Site navigation">
          <Link
            href="/auth/sign-in"
            className="text-xs text-zinc-500 hover:text-zinc-900 px-3 py-1.5 rounded transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/auth/sign-up"
            className="text-xs bg-zinc-900 text-white hover:bg-zinc-700 px-3 py-1.5 rounded transition-colors font-medium"
          >
            Get started
          </Link>
        </nav>
      </header>

      {/* ── Hero ─────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-start justify-center px-8 sm:px-16 py-24 max-w-4xl">
        <div className="text-[10px] font-mono tracking-[0.18em] uppercase text-zinc-400 mb-6">
          Free · Public Beta
        </div>

        <h1 className="text-5xl sm:text-6xl font-black tracking-[-0.03em] leading-[1.05] mb-6">
          Your CV,
          <br />
          <span className="text-zinc-400">always live.</span>
        </h1>

        <p className="text-base text-zinc-500 leading-relaxed mb-10 max-w-sm">
          A structured editor with a live URL and one-click A4 PDF.
          Share a link — no attachments, no reformatting.
        </p>

        <div className="flex items-center gap-5">
          <Link
            href="/editor"
            className="inline-flex items-center gap-2 bg-zinc-900 text-white text-sm font-semibold px-4 py-2.5 rounded hover:bg-zinc-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
          >
            Build your CV
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/mia-liu"
            className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            See an example ↗
          </Link>
        </div>

        <p className="mt-8 text-xs font-mono text-zinc-300">
          cv.live/<span className="text-zinc-400">yourname</span>
        </p>
      </main>

      {/* ── Feature strip — same border language as editor ─ */}
      <footer className="bg-white border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-3 sm:divide-x divide-zinc-200">
        {FEATURES.map(({ label, desc }) => (
          <div key={label} className="px-8 py-7 border-t border-zinc-200 sm:border-t-0">
            <div className="text-[9px] font-mono tracking-[0.2em] uppercase text-zinc-400 mb-2">
              {label}
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </footer>

    </div>
  )
}
