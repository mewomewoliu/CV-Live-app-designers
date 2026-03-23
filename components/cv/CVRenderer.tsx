import { CVData, CVRenderContext } from '@/lib/cv-types'
import { MinimalTheme } from './themes/MinimalTheme'
import { DarkTheme } from './themes/DarkTheme'
import { ActiveLedgerTheme } from './themes/ActiveLedgerTheme'
import { BroadsheetTheme } from './themes/BroadsheetTheme'

interface CVRendererProps {
  data: CVData
  context: CVRenderContext
}

export function CVRenderer({ data, context }: CVRendererProps) {
  switch (data.theme) {
    case 'minimal':
      return <MinimalTheme data={data} context={context} />
    case 'dark':
      return <DarkTheme data={data} context={context} />
    case 'active-ledger':
      return <ActiveLedgerTheme data={data} context={context} />
    case 'broadsheet':
      return <BroadsheetTheme data={data} context={context} />
    default:
      return <MinimalTheme data={data} context={context} />
  }
}
