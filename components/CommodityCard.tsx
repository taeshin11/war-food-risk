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

const conflictImpactColor: Record<string, string> = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-yellow-400',
  low: 'bg-green-400',
}

const conflictImpactBadge: Record<string, string> = {
  critical: 'bg-red-500/10 text-red-600 ring-1 ring-inset ring-red-500/20',
  high: 'bg-orange-500/10 text-orange-600 ring-1 ring-inset ring-orange-500/20',
  medium: 'bg-yellow-500/10 text-yellow-700 ring-1 ring-inset ring-yellow-500/20',
  low: 'bg-green-500/10 text-green-600 ring-1 ring-inset ring-green-500/20',
}

export default function CommodityCard({ commodity, locale }: { commodity: Commodity; locale: string }) {
  const isUp = commodity.change_1m_pct > 0

  return (
    <Link href={`/${locale}/commodity/${commodity.id}`} className="block group">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 overflow-hidden relative">
        {/* Conflict impact indicator top border */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${conflictImpactColor[commodity.conflict_impact] || 'bg-slate-300'}`}></div>

        <div className="mt-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-black text-slate-900 text-lg group-hover:text-green-700 transition-colors">{commodity.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{commodity.unit}</p>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${conflictImpactBadge[commodity.conflict_impact] || 'bg-slate-500/10 text-slate-600 ring-1 ring-inset ring-slate-500/20'}`}>
              {commodity.conflict_impact} impact
            </span>
          </div>

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-black text-slate-900">${commodity.current_price.toLocaleString()}</span>
            <span className={`text-sm font-semibold ${isUp ? 'text-red-600' : 'text-green-600'}`}>
              {isUp ? '+' : ''}{commodity.change_1m_pct.toFixed(1)}% this month
            </span>
          </div>

          {/* Peak price context */}
          <div className="bg-slate-50 rounded-lg p-3 text-xs mb-4">
            <span className="text-slate-500">War peak: </span>
            <span className="font-bold text-red-600">${commodity.peak_price.toLocaleString()}</span>
            <span className="text-slate-400 ml-1">({commodity.peak_date})</span>
          </div>

          <p className="text-slate-600 text-sm line-clamp-2">{commodity.war_disruption}</p>
        </div>
      </div>
    </Link>
  )
}
