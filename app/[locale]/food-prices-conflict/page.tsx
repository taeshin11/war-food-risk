import Link from 'next/link'

export default function FoodPricesConflict({ params: _params }: { params: Promise<{ locale: string }> }) {
  return (
    <article className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Food Prices and Conflict: The Vicious Cycle</h1>
      <p className="text-gray-500 text-sm">April 2026 | War Food Risk Monitor</p>
      <p className="text-gray-700 text-lg">
        The relationship between food prices and armed conflict is cyclical: conflict drives food prices up,
        and food price spikes increase the risk of social unrest and new conflicts.
      </p>
      <h2 className="text-xl font-semibold">How Conflict Drives Food Prices</h2>
      <ul className="space-y-2 text-gray-700 list-disc pl-5">
        <li>Supply disruption: wars destroy farmland, displace farmers, block export routes</li>
        <li>Infrastructure damage: storage facilities, processing plants, ports targeted</li>
        <li>Energy prices: conflict drives oil/gas prices up, raising fertilizer and transport costs</li>
        <li>Currency collapse: war-affected countries face currency depreciation, making imports more expensive</li>
        <li>Sanctions: trade restrictions on belligerents block food commodity flows</li>
      </ul>
      <h2 className="text-xl font-semibold">Key Conflict-Food Nexus Events (2022–2026)</h2>
      <div className="space-y-3">
        {[
          { year: '2022', event: 'Russia-Ukraine invasion', impact: 'Wheat +60%, sunflower oil +150%' },
          { year: '2022', event: 'EU sanctions Russian fertilizers', impact: 'Urea prices doubled' },
          { year: '2023', event: 'Black Sea Grain Initiative collapses', impact: 'Wheat +8% in one day' },
          { year: '2024', event: 'Houthi Red Sea attacks', impact: 'Food freight costs +250%' },
          { year: '2023', event: 'Sudan civil war harvests destroyed', impact: '18M food insecure in Sudan' },
        ].map(item => (
          <div key={item.year + item.event} className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-400">{item.year}</p>
            <p className="font-medium text-sm">{item.event}</p>
            <p className="text-xs text-red-600 font-medium">{item.impact}</p>
          </div>
        ))}
      </div>
      <Link href="/" className="text-blue-600 hover:underline">← Back to War Food Risk Monitor</Link>
    </article>
  )
}
