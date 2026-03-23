/** Ensures a URL has an https:// scheme so it works as an <a href>. */
export function ensureHttp(url: string | undefined | null): string {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:')) return url
  return `https://${url}`
}
