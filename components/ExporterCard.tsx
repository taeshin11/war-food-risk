import Link from 'next/link'

interface Exporter {
  code: string
  name: string
  flag: string
  slug: string
  conflict_risk: string
  commodities_exported: string[]
  description: string
  active_conflict: boolean
  risk_note: string
}

const riskBadgeStyles: Record<string, string> = {
  high: 'bg-red-500/10 text-red-600 ring-1 ring-inset ring-red-500/20',
  medium: 'bg-yellow-500/10 text-yellow-700 ring-1 ring-inset ring-yellow-500/20',
  low: 'bg-green-500/10 text-green-600 ring-1 ring-inset ring-green-500/20',
}

export default function ExporterCard({ exporter, locale }: { exporter: Exporter; locale: string }) {
  return (
    <Link href={`/${locale}/exporter/${exporter.slug}`} className="block group">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{exporter.flag}</span>
            <span className="font-bold text-slate-900 group-hover:text-green-700 transition-colors">{exporter.name}</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${riskBadgeStyles[exporter.conflict_risk] || 'bg-slate-500/10 text-slate-600 ring-1 ring-inset ring-slate-500/20'}`}>
              {exporter.conflict_risk} risk
            </span>
            {exporter.active_conflict && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-600 ring-1 ring-inset ring-red-500/20">
                ⚠ Active Conflict
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {exporter.commodities_exported.slice(0, 3).map(c => (
            <span key={c} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{c}</span>
          ))}
        </div>

        <p className="text-xs text-slate-500 line-clamp-2">{exporter.risk_note}</p>
      </div>
    </Link>
  )
}
