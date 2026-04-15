import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { getMessages } from 'next-intl/server'
import Link from 'next/link'
import AdHeader from '@/components/ads/AdHeader'
import AdMobileSticky from '@/components/ads/AdMobileSticky'
import VisitorCounter from '@/components/VisitorCounter'

export const metadata: Metadata = {
  title: {
    default: 'War Food Risk | Real-Time Intelligence',
    template: '%s | War Food Risk'
  },
  description: 'Analyzing food security risks and agricultural disruptions in conflict-affected regions worldwide',
  keywords: 'food security war, war food crisis, conflict food risk, agricultural disruption, famine risk, food insecurity',
  openGraph: {
    type: 'website',
    siteName: 'War Food Risk',
    title: 'War Food Risk | Real-Time Intelligence',
    description: 'Analyzing food security risks and agricultural disruptions in conflict-affected regions worldwide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'War Food Risk',
    description: 'Analyzing food security risks and agricultural disruptions in conflict-affected regions worldwide',
  },
  verification: {
    google: 'WddgcbVJsL2BGHNAje5m6DK56IcR0Mw5UOqozI2Xtrc',
  },
  other: {
    'google-adsense-account': 'ca-pub-7098271335538021',
  },
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const messages = await getMessages()
  return (
    <NextIntlClientProvider messages={messages}>
      <AdHeader />
      <header className="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inset-0 rounded-full bg-green-400 opacity-75"></span>
              <span className="relative rounded-full h-2.5 w-2.5 bg-green-400"></span>
            </span>
            <Link href={`/${locale}`} className="text-lg font-bold hover:text-green-400 transition-colors">
              War Food Risk
            </Link>
          </div>
          <nav className="flex gap-1 items-center">
            <Link href={`/${locale}`} className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg text-sm transition-all">Home</Link>
            <Link href={`/${locale}/#commodities`} className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg text-sm transition-all">Commodities</Link>
            <Link href={`/${locale}/#exporters`} className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg text-sm transition-all">Exporters</Link>
            <Link href={`/${locale}/events`} className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg text-sm transition-all">Events</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 bg-slate-50 min-h-screen">{children}</main>
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-6 text-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-slate-700 pt-6 mb-4 mt-4">
            <a href={`/${locale}/about`} className="hover:text-white transition-colors">About Us</a>
            <a href={`/${locale}/faq`} className="hover:text-white transition-colors">How to Use &amp; FAQ</a>
            <a href={`/${locale}/privacy`} className="hover:text-white transition-colors">Privacy Policy</a>
            <a href={`/${locale}/terms`} className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-500 text-xs">For research purposes only. Not financial advice.</p>
            <VisitorCounter />
          </div>
        </div>
      </footer>
      <AdMobileSticky />
    </NextIntlClientProvider>
  )
}
