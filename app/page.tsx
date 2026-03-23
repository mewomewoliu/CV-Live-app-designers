import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-6">
        <span className="text-lg font-black tracking-tighter">CV.live</span>
        <Link
          href="/editor"
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          Open editor →
        </Link>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-20 text-center">
        <div className="max-w-2xl">
          <div className="inline-block text-[11px] font-mono tracking-[0.2em] uppercase text-zinc-500 border border-zinc-800 px-3 py-1.5 rounded-full mb-8">
            Version 1.0 · Public Beta
          </div>

          <h1 className="text-6xl sm:text-7xl font-black tracking-[-0.04em] leading-[0.9] mb-6">
            Your CV.
            <br />
            <span className="text-zinc-400">Always Live.</span>
          </h1>

          <p className="text-lg text-zinc-400 leading-relaxed mb-10 max-w-lg mx-auto">
            A beautifully designed CV that lives at its own URL.
            Share one link. Download a pixel-perfect A4 PDF. No reformatting.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 bg-white text-zinc-900 font-semibold text-sm px-6 py-3 rounded-full hover:bg-zinc-100 transition-colors"
            >
              Build your CV
              <span>→</span>
            </Link>
            <Link
              href="/mia-liu"
              className="inline-flex items-center gap-2 text-zinc-400 text-sm hover:text-white transition-colors"
            >
              See an example
              <span className="text-zinc-600">↗</span>
            </Link>
          </div>

          <p className="text-xs text-zinc-600 mt-6 font-mono">
            Free · No account required · cv.live/yourname
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800">
        {[
          { label: 'Live URL', desc: 'cv.live/yourname — always your latest CV, no login required to view' },
          { label: 'Structured editor', desc: 'Form-based editor with live preview. No rich text, no layout nightmares' },
          { label: '1-click PDF', desc: 'Server-rendered A4 PDF. Text-selectable, ATS-safe, embedded fonts' },
        ].map(({ label, desc }) => (
          <div key={label} className="px-8 py-8">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">{label}</div>
            <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
