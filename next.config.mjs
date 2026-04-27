/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['puppeteer-core', '@sparticuz/chromium', 'puppeteer'],
    // Prevent the client-side Router Cache from serving stale data on dynamic routes.
    // Without this, Next.js 14.2 caches dynamic pages for 30s even with force-dynamic.
    staleTimes: {
      dynamic: 0,
    },
  },
}

export default nextConfig
