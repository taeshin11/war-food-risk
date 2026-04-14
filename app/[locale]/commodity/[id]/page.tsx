import { readFileSync } from 'fs'
import { join } from 'path'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface Commodity {
  id: string
  name: string
  unit: string
  current_price: number
  change_1m_pct: number
  peak_price: number
  peak_date: string
  conflict_impact: string
  primary_exporters: string[]
  description: string
  tradingview_symbol: string | null
  war_disruption: string
}

export async function generateStaticParams() {
  const commodities: Commodity[] = JSON.parse(readFileSync(join(process.cwd(), 'public/data/commodities.json'), 'utf-8'))
  return commodities.map(c => ({ id: c.id }))
}

export default async function CommodityPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params
  const commodities: Commodity[] = JSON.parse(readFileSync(join(process.cwd(), 'public/data/commodities.json'), 'utf-8'))
  const commodity = commodities.find(c => c.id === id)
  if (!commodity) notFound()
  const events = JSON.parse(readFileSync(join(process.cwd(), 'public/data/food-events.json'), 'utf-8'))
  const related = events.filter((e: { commodity: string }) => e.commodity === id)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-2">
        <Link href={`/${locale}`} className="text-blue-600 hover:underline text-sm">Home</Link>
        <span className="text-gray-400">/</span>
        <span className="text-sm font-medium">{commodity.name}</span>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">{commodity.name}</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border rounded-lg p-4 text-center">
          <p className="text-xs text-gray-500">Current Price</p>
          <p className="text-2xl font-bold text-gray-900">{commodity.current_price.toLocaleString()}</p>
          <p className="text-xs text-gray-400">{commodity.unit}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-xs text-gray-500">Conflict Peak</p>
          <p className="text-2xl font-bold text-red-700">{commodity.peak_price.toLocaleString()}</p>
          <p className="text-xs text-gray-400">{commodity.peak_date}</p>
        </div>
        <div className="bg-white border rounded-lg p-4 text-center">
          <p className="text-xs text-gray-500">Conflict Impact</p>
          <p className="text-lg font-bold capitalize text-orange-700">{commodity.conflict_impact}</p>
        </div>
      </div>
      <p className="text-gray-700">{commodity.description}</p>
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <h3 className="font-semibold text-orange-800 mb-2">War Disruption</h3>
        <p className="text-sm text-orange-700">{commodity.war_disruption}</p>
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 mb-2">Major Exporters</h3>
        <div className="flex flex-wrap gap-2">
          {commodity.primary_exporters.map(e => (
            <span key={e} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full capitalize">{e}</span>
          ))}
        </div>
      </div>
      {related.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Related Events</h2>
          {related.map((e: { id: string; date: string; title: string; impact: string; description: string; source: string }) => (
            <div key={e.id} className="bg-white border border-gray-200 rounded-lg p-4 space-y-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-400">{e.date}</p>
                  <h3 className="font-medium text-gray-900 text-sm">{e.title}</h3>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${e.impact === 'spike' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{e.impact}</span>
              </div>
              <p className="text-xs text-gray-600">{e.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
