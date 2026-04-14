import { readFileSync } from 'fs'
import { join } from 'path'
import Link from 'next/link'

interface FoodEvent {
  id: string
  date: string
  title: string
  commodity: string
  impact: string
  description: string
  source: string
}

const impactStyles: Record<string, string> = {
  spike: 'bg-red-500/10 text-red-600 ring-1 ring-inset ring-red-500/20',
  relief: 'bg-green-500/10 text-green-600 ring-1 ring-inset ring-green-500/20',
  disruption: 'bg-orange-500/10 text-orange-600 ring-1 ring-inset ring-orange-500/20',
}

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const events: FoodEvent[] = JSON.parse(readFileSync(join(process.cwd(), 'public/data/food-events.json'), 'utf-8'))
  const sorted = [...events].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div>
      <section className="bg-gradient-to-br from-slate-900 via-green-950/20 to-slate-900 text-white py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href={`/${locale}`} className="text-slate-400 hover:text-white text-sm transition-colors mb-4 inline-flex items-center gap-1">
            ← Home
          </Link>
          <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3">🌾 FOOD SECURITY</p>
          <h1 className="text-3xl font-extrabold mb-2">Food Security Events</h1>
          <p className="text-slate-400 text-sm">Conflict-driven disruptions to global food supply</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50">
          {sorted.map(e => (
            <div key={e.id} className="flex items-start gap-4 p-4 hover:bg-green-50/20 transition-colors group">
              <div className="flex flex-col gap-1.5 shrink-0">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${impactStyles[e.impact] || 'bg-slate-500/10 text-slate-600 ring-1 ring-inset ring-slate-500/20'}`}>
                  {e.impact}
                </span>
                <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-medium text-center">{e.commodity}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 text-sm group-hover:text-green-700 transition-colors">{e.title}</h3>
                <p className="text-slate-600 text-xs mt-0.5 line-clamp-2">{e.description}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-slate-400">{e.date}</span>
                  <span className="text-xs text-slate-300">·</span>
                  <span className="text-xs text-slate-400">Source: {e.source}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
