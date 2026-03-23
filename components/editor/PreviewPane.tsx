'use client'

import { useCVStore } from '@/lib/cv-store'
import { CVRenderer } from '@/components/cv/CVRenderer'

export function PreviewPane() {
  const cv = useCVStore((state) => state.cv)

  return (
    <div className="flex-1 bg-zinc-100 overflow-y-auto">
      <div className="p-8 min-h-full">
        <div className="max-w-[794px] mx-auto">
          <CVRenderer
            data={cv}
            context={{ mode: 'web', isPdfRender: false }}
          />
        </div>
      </div>
    </div>
  )
}
