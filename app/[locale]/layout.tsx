import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { getMessages } from 'next-intl/server'
import Link from 'next/link'
import AdHeader from '@/components/ads/AdHeader'
import AdMobileSticky from '@/components/ads/AdMobileSticky'
import VisitorCounter from '@/components/VisitorCounter'

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const messages = await getMessages()
  return (
    <NextIntlClientProvider messages={messages}>
      <AdHeader />
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href={`/${locale}`} className="font-bold text-lg text-gray-900">War Food Risk</Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href={`/${locale}`} className="text-gray-600 hover:text-gray-900">Home</Link>
            <Link href={`/${locale}/events`} className="text-gray-600 hover:text-gray-900">Events</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">{children}</main>
      <footer className="border-t border-gray-200 bg-gray-50 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">For research purposes only. Not financial advice.</p>
          <VisitorCounter />
        </div>
      </footer>
      <AdMobileSticky />
    </NextIntlClientProvider>
  )
}
