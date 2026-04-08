import { CVData, CVRenderContext } from '@/lib/cv-types'
import { MinimalTheme } from './themes/MinimalTheme'
import { DarkTheme } from './themes/DarkTheme'
import { ActiveLedgerTheme } from './themes/ActiveLedgerTheme'
import { BroadsheetTheme } from './themes/BroadsheetTheme'
import { WarmSidebarTheme } from './themes/WarmSidebarTheme'
import { TypewriterTheme } from './themes/TypewriterTheme'

interface CVRendererProps {
  data: CVData
  context: CVRenderContext
}

export function CVRenderer({ data, context }: CVRendererProps) {
  const visibleData = { ...data, experience: data.experience.filter((e) => !e.hidden) }
  switch (visibleData.theme) {
    case 'minimal':
      return <MinimalTheme data={visibleData} context={context} />
    case 'dark':
      return <DarkTheme data={visibleData} context={context} />
    case 'active-ledger':
      return <ActiveLedgerTheme data={visibleData} context={context} />
    case 'broadsheet':
      return <BroadsheetTheme data={visibleData} context={context} />
    case 'warm-sidebar':
      return <WarmSidebarTheme data={visibleData} context={context} />
    case 'typewriter':
      return <TypewriterTheme data={visibleData} context={context} />
    default:
      return <MinimalTheme data={visibleData} context={context} />
  }
}
