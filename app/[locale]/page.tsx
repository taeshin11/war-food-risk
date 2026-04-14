import { readFileSync } from 'fs'
import { join } from 'path'
import CommodityCard from '@/components/CommodityCard'
import ExporterCard from '@/components/ExporterCard'
import ExporterMap from '@/components/ExporterMap'
import AdInContent from '@/components/ads/AdInContent'
import Link from 'next/link'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const commodities = JSON.parse(readFileSync(join(process.cwd(), 'public/data/commodities.json'), 'utf-8'))
  const exporters = JSON.parse(readFileSync(join(process.cwd(), 'public/data/exporters.json'), 'utf-8'))
  const events = JSON.parse(readFileSync(join(process.cwd(), 'public/data/food-events.json'), 'utf-8'))
  const recentEvents = [...events].sort((a: { date: string }, b: { date: string }) => b.date.localeCompare(a.date)).slice(0, 5)

  return (
    <div className="space-y-10">
      <div className="text-center space-y-2 py-6">
        <h1 className="text-3xl font-bold text-gray-900">War Food Risk Monitor</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          How armed conflicts drive global food price volatility, supply disruptions, and hunger crises.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Conflict-Sensitive Commodities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {commodities.map((c: { id: string }) => <CommodityCard key={c.id} commodity={c as any} locale={locale} />)}
        </div>
      </section>

      <AdInContent />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Exporter Country Risk Map</h2>
        <ExporterMap />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {exporters.map((e: { slug: string }) => <ExporterCard key={e.slug} exporter={e as any} locale={locale} />)}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Recent Food Security Events</h2>
          <Link href={`/${locale}/events`} className="text-sm text-blue-600 hover:underline">View all →</Link>
        </div>
        <div className="space-y-3">
          {recentEvents.map((e: { id: string; date: string; title: string; commodity: string; impact: string; description: string; source: string }) => (
            <div key={e.id} className="bg-white border border-gray-200 rounded-lg p-4 space-y-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs text-gray-400">{e.date}</p>
                  <h3 className="font-medium text-gray-900 text-sm">{e.title}</h3>
                </div>
                <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${e.impact === 'spike' ? 'bg-red-100 text-red-700' : e.impact === 'relief' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {e.impact}
                </span>
              </div>
              <p className="text-xs text-gray-600">{e.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
