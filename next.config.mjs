/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['puppeteer-core', '@sparticuz/chromium', 'puppeteer'],
  outputFileTracingIncludes: {
    '/api/pdf': ['./node_modules/@sparticuz/chromium/bin/**/*'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const origExternals = config.externals
      const chromiumExternals = [
        { '@sparticuz/chromium': 'commonjs @sparticuz/chromium' },
        { 'puppeteer-core': 'commonjs puppeteer-core' },
        { 'puppeteer': 'commonjs puppeteer' },
      ]
      if (typeof origExternals === 'function') {
        config.externals = [origExternals, ...chromiumExternals]
      } else {
        config.externals = [
          ...(Array.isArray(origExternals) ? origExternals : origExternals ? [origExternals] : []),
          ...chromiumExternals,
        ]
      }
    }
    return config
  },
}

export default nextConfig
