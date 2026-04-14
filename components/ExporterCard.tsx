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

const riskColors: Record<string, string> = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800',
}

export default function ExporterCard({ exporter, locale }: { exporter: Exporter; locale: string }) {
  return (
    <Link href={`/${locale}/exporter/${exporter.slug}`} className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{exporter.flag}</span>
          <span className="font-semibold text-gray-900">{exporter.name}</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${riskColors[exporter.conflict_risk] || 'bg-gray-100'}`}>
            {exporter.conflict_risk} risk
          </span>
          {exporter.active_conflict && (
            <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">⚠ Active Conflict</span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {exporter.commodities_exported.slice(0, 3).map(c => (
          <span key={c} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{c}</span>
        ))}
      </div>
      <p className="text-xs text-gray-500 line-clamp-2">{exporter.risk_note}</p>
    </Link>
  )
}
