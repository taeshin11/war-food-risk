'use client'
// @ts-ignore
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const highRisk = ['UKR', 'RUS', 'SDN', 'MMR']
const mediumRisk = ['ETH', 'YEM']
const lowRisk = ['USA', 'BRA', 'AUS', 'CAN']

function getRiskColor(iso: string) {
  if (highRisk.includes(iso)) return '#fca5a5'
  if (mediumRisk.includes(iso)) return '#fde68a'
  if (lowRisk.includes(iso)) return '#bbf7d0'
  return '#e5e7eb'
}

export default function ExporterMap() {
  return (
    <div className="w-full rounded-lg overflow-hidden border border-gray-200 bg-blue-50">
      <ComposableMap projectionConfig={{ scale: 120 }} style={{ width: '100%', height: 'auto' }}>
        <Geographies geography={geoUrl}>
          {({ geographies }: { geographies: any[] }) =>
            geographies.map((geo: any) => {
              const iso = geo.properties.ISO_A3 as string
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getRiskColor(iso)}
                  stroke="#fff"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none', opacity: 0.8 },
                    pressed: { outline: 'none' },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
      <div className="flex gap-4 p-3 text-xs justify-center">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-red-300 inline-block"></span> High Risk</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-yellow-200 inline-block"></span> Medium Risk</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-green-200 inline-block"></span> Low Risk</span>
      </div>
    </div>
  )
}
