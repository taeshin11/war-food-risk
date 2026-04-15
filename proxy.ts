import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextRequest } from 'next/server'
const intlMiddleware = createMiddleware(routing)
export function proxy(request: NextRequest) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  if (url && !request.nextUrl.pathname.startsWith('/api')) {
    fetch(url, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ page: request.nextUrl.pathname, ts: Date.now() }) }).catch(() => {})
  }
  return intlMiddleware(request)
}
export default proxy
export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\..*).*)'] }
