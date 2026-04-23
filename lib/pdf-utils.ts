import { CVData, CVRenderContext } from './cv-types'

export async function getBrowser() {
  if (process.env.NODE_ENV === 'development') {
    const puppeteer = await import('puppeteer')
    return puppeteer.default.launch({ headless: true })
  }
  const chromium = await import('@sparticuz/chromium')
  const puppeteerCore = await import('puppeteer-core')
  return puppeteerCore.default.launch({
    args: chromium.default.args,
    executablePath: await chromium.default.executablePath(),
    headless: true,
  })
}

const THEME_BG: Record<string, string> = {
  'minimal': '#f5f5f3',
  'dark': '#050505',
  'active-ledger': '#e8eca0',
  'broadsheet': '#F2F1EB',
}

export async function generateCVHTML(cvData: CVData): Promise<string> {
  const { renderToStaticMarkup } = await import('react-dom/server')
  const React = await import('react')
  const { CVRenderer } = await import('@/components/cv/CVRenderer')

  const context: CVRenderContext = { mode: 'pdf', isPdfRender: true }
  const element = React.createElement(CVRenderer, { data: cvData, context })
  const cvHtml = renderToStaticMarkup(element)
  const pageBg = THEME_BG[cvData.theme] ?? '#ffffff'

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <style>
    @page { size: A4; margin: 0; }
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      box-sizing: border-box;
    }
    html, body {
      margin: 0;
      padding: 0;
      background: ${pageBg};
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
      width: 210mm;
    }
    .cv-page {
      break-after: page;
      page-break-after: always;
    }
    .cv-page:last-child {
      break-after: auto;
      page-break-after: auto;
    }
  </style>
</head>
<body>${cvHtml}</body>
</html>`
}
