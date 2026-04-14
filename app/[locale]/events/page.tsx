import { readFileSync } from 'fs'
import { join } from 'path'
import Link from 'next/link'

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const events = JSON.parse(readFileSync(join(process.cwd(), 'public/data/food-events.json'), 'utf-8'))
  const sorted = [...events].sort((a: { date: string }, b: { date: string }) => b.date.localeCompare(a.date))
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-2">
        <Link href={`/${locale}`} className="text-blue-600 hover:underline text-sm">Home</Link>
        <span className="text-gray-400">/</span>
        <span className="text-sm font-medium">Food Security Events</span>
      </div>
      <h1 className="text-2xl font-bold">Food Security Events</h1>
      <div className="space-y-3">
        {sorted.map((e: { id: string; date: string; title: string; commodity: string; impact: string; description: string; source: string }) => (
          <div key={e.id} className="bg-white border border-gray-200 rounded-lg p-4 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs text-gray-400">{e.date}</p>
                <h3 className="font-semibold text-gray-900 text-sm">{e.title}</h3>
              </div>
              <div className="flex gap-1 shrink-0">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{e.commodity}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${e.impact === 'spike' ? 'bg-red-100 text-red-700' : e.impact === 'relief' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{e.impact}</span>
              </div>
            </div>
            <p className="text-xs text-gray-600">{e.description}</p>
            <p className="text-xs text-gray-400">Source: {e.source}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
