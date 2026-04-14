import type { Metadata } from 'next'
import { readFileSync } from 'fs'
import { join } from 'path'
import CommodityCard from '@/components/CommodityCard'
import ExporterCard from '@/components/ExporterCard'
import ExporterMap from '@/components/ExporterMap'
import AdInContent from '@/components/ads/AdInContent'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'War Food Risk | Real-Time Conflict Intelligence',
  description: 'Analyzing food security risks and agricultural disruptions in conflict-affected regions worldwide',
  keywords: 'food security war, war food crisis, conflict food risk, agricultural disruption, famine risk, food insecurity',
}

interface FoodEvent {
  id: string
  date: string
  title: string
  commodity: string
  impact: string
  description: string
  source: string
}

const impactEventStyles: Record<string, string> = {
  spike: 'bg-red-500/10 text-red-600 ring-1 ring-inset ring-red-500/20',
  relief: 'bg-green-500/10 text-green-600 ring-1 ring-inset ring-green-500/20',
  disruption: 'bg-orange-500/10 text-orange-600 ring-1 ring-inset ring-orange-500/20',
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const commodities = JSON.parse(readFileSync(join(process.cwd(), 'public/data/commodities.json'), 'utf-8'))
  const exporters = JSON.parse(readFileSync(join(process.cwd(), 'public/data/exporters.json'), 'utf-8'))
  const events: FoodEvent[] = JSON.parse(readFileSync(join(process.cwd(), 'public/data/food-events.json'), 'utf-8'))
  const recentEvents = [...events].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5)

  const wheatCom = commodities.find((c: { id: string; current_price: number; change_1m_pct: number }) => c.id === 'wheat')

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-green-950/20 to-slate-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3">🌾 FOOD SECURITY TRACKER</p>
          <h1 className="text-4xl font-extrabold mb-4">War Food Risk</h1>
          <p className="text-slate-300 text-base max-w-2xl mb-8">
            Track how wars reshape what the world eats — wheat, corn, fertilizer, and the countries caught in the middle.
          </p>
          <div className="flex flex-wrap gap-4">
            {wheatCom && (
              <div className="bg-white/10 backdrop-blur rounded-xl px-5 py-3 text-center">
                <div className="text-2xl font-black text-white">${wheatCom.current_price}</div>
                <div className="text-xs text-slate-400 mt-0.5">Wheat Price</div>
              </div>
            )}
            <div className="bg-white/10 backdrop-blur rounded-xl px-5 py-3 text-center">
              <div className="text-2xl font-black text-white">{commodities.length}</div>
              <div className="text-xs text-slate-400 mt-0.5">Commodities</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl px-5 py-3 text-center">
              <div className="text-2xl font-black text-white">{events.length}</div>
              <div className="text-xs text-slate-400 mt-0.5">Disruption Events</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        {/* Commodities */}
        <section id="commodities">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Conflict-Sensitive Commodities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {commodities.map((c: { id: string }) => <CommodityCard key={c.id} commodity={c as any} locale={locale} />)}
          </div>
        </section>

        <AdInContent />

        {/* Exporter Map */}
        <section id="exporters">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Exporter Country Risk Map</h2>
          <ExporterMap />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {exporters.map((e: { slug: string }) => <ExporterCard key={e.slug} exporter={e as any} locale={locale} />)}
          </div>
        </section>

        {/* Recent Events */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">Recent Food Security Events</h2>
            <Link href={`/${locale}/events`} className="text-sm text-green-600 hover:text-green-700 font-semibold transition-colors">View all →</Link>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50">
            {recentEvents.map(e => (
              <div key={e.id} className="flex items-start gap-4 p-4 hover:bg-green-50/20 transition-colors group">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 ${impactEventStyles[e.impact] || 'bg-slate-500/10 text-slate-600 ring-1 ring-inset ring-slate-500/20'}`}>
                  {e.impact}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 text-sm group-hover:text-green-700 transition-colors">{e.title}</h3>
                  <p className="text-slate-600 text-xs mt-0.5 line-clamp-2">{e.description}</p>
                  <span className="text-xs text-slate-400 mt-1 block">{e.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
