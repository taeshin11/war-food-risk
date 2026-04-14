import Link from 'next/link'

export default function UkraineWheatWar({ params: _params }: { params: Promise<{ locale: string }> }) {
  return (
    <article className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Ukraine Wheat War: How Russia's Invasion Triggered a Global Food Crisis</h1>
      <p className="text-gray-500 text-sm">April 2026 | War Food Risk Monitor</p>
      <p className="text-gray-700 text-lg">
        Ukraine and Russia together account for approximately 28% of global wheat exports. When Russia launched its full-scale invasion
        on February 24, 2022, it triggered the worst food price shock since the 2007–08 crisis.
      </p>
      <h2 className="text-xl font-semibold">The Scale of the Disruption</h2>
      <p className="text-gray-700">
        Within weeks of the invasion, wheat prices surged 60%, reaching a 14-year high of $430/MT in May 2022.
        Ukraine's Black Sea ports — responsible for ~90% of its grain exports — were immediately blockaded by Russian naval forces.
        Sunflower oil, where Ukraine and Russia combined hold 75% of global exports, saw prices triple to $2,300/MT.
      </p>
      <h2 className="text-xl font-semibold">Who Suffered Most</h2>
      <p className="text-gray-700">
        Import-dependent nations in the Middle East, North Africa, and Sub-Saharan Africa faced acute food security crises.
        Egypt imports ~80% of its wheat from the Black Sea region. Lebanon, already in economic collapse, faced food supply collapse.
        Yemen, Somalia, and Ethiopia — already in humanitarian crises — faced additional food inflation stress.
      </p>
      <h2 className="text-xl font-semibold">The Grain Initiative and Its Collapse</h2>
      <p className="text-gray-700">
        On July 22, 2022, the UN brokered the Black Sea Grain Initiative, allowing Ukraine to export grain under a safe passage agreement.
        Wheat prices fell 20% in days. But Russia withdrew from the deal on July 17, 2023 and struck Odesa port infrastructure.
      </p>
      <Link href="/" className="text-blue-600 hover:underline">← Back to War Food Risk Monitor</Link>
    </article>
  )
}
