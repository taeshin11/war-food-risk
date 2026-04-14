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
  war_disruption: string
}

const impactColors: Record<string, string> = {
  critical: 'bg-red-100 text-red-800',
  high: 'bg-orange-100 text-orange-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800',
}

export default function CommodityCard({ commodity, locale }: { commodity: Commodity; locale: string }) {
  const isUp = commodity.change_1m_pct > 0
  return (
    <Link href={`/${locale}/commodity/${commodity.id}`} className="block bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow space-y-3">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-gray-900">{commodity.name}</h3>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${impactColors[commodity.conflict_impact] || 'bg-gray-100 text-gray-600'}`}>
          {commodity.conflict_impact} impact
        </span>
      </div>
      <div className="flex items-end gap-3">
        <span className="text-2xl font-bold">{commodity.current_price.toLocaleString()}</span>
        <span className="text-xs text-gray-400">{commodity.unit}</span>
        <span className={`text-sm font-medium ${isUp ? 'text-green-600' : 'text-red-600'}`}>
          {isUp ? '▲' : '▼'} {Math.abs(commodity.change_1m_pct).toFixed(1)}% (1M)
        </span>
      </div>
      <div className="text-xs text-gray-500">
        Peak: <strong className="text-red-600">{commodity.peak_price.toLocaleString()}</strong> {commodity.unit} on {commodity.peak_date}
      </div>
      <p className="text-xs text-gray-600 line-clamp-2">{commodity.war_disruption}</p>
    </Link>
  )
}
