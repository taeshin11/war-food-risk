import { readFileSync } from 'fs'
import { join } from 'path'
import { notFound } from 'next/navigation'
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

export async function generateStaticParams() {
  const exporters: Exporter[] = JSON.parse(readFileSync(join(process.cwd(), 'public/data/exporters.json'), 'utf-8'))
  return exporters.map(e => ({ slug: e.slug }))
}

export default async function ExporterPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params
  const exporters: Exporter[] = JSON.parse(readFileSync(join(process.cwd(), 'public/data/exporters.json'), 'utf-8'))
  const exporter = exporters.find(e => e.slug === slug)
  if (!exporter) notFound()

  const riskColors: Record<string, string> = {
    high: 'text-red-700 bg-red-50',
    medium: 'text-yellow-700 bg-yellow-50',
    low: 'text-green-700 bg-green-50',
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-2">
        <Link href={`/${locale}`} className="text-blue-600 hover:underline text-sm">Home</Link>
        <span className="text-gray-400">/</span>
        <span className="text-sm font-medium">{exporter.name}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-5xl">{exporter.flag}</span>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{exporter.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${riskColors[exporter.conflict_risk] || ''}`}>
              {exporter.conflict_risk} conflict risk
            </span>
            {exporter.active_conflict && (
              <span className="text-sm text-red-600 font-medium">⚠ Active Conflict</span>
            )}
          </div>
        </div>
      </div>
      <p className="text-gray-700">{exporter.description}</p>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-800 mb-2">Risk Note</h3>
        <p className="text-sm text-yellow-700">{exporter.risk_note}</p>
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 mb-2">Key Export Commodities</h3>
        <div className="flex flex-wrap gap-2">
          {exporter.commodities_exported.map(c => (
            <Link key={c} href={`/${locale}/commodity/${c}`} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full hover:bg-blue-200">{c}</Link>
          ))}
        </div>
      </div>
    </div>
  )
}
