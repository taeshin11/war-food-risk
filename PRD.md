# War Food Risk — PRD

> Short Title: War-Driven Food Security Risk Tracker
> Last Updated: 2026-04-14

---

## Overview

War Food Risk is a multilingual, statically generated web application that monitors how armed conflicts disrupt global food supply chains and drive food security crises. The site tracks key commodity prices (wheat, sunflower oil, fertilizer, corn, barley), maps the geographic origins of disrupted food exports, and logs food crisis events linked to conflict.

Ukraine and Russia together account for a significant share of global wheat, sunflower oil, and fertilizer exports. Disruption of these supply chains has cascading effects on food security in vulnerable nations. This site makes those dynamics visible and comprehensible for researchers, aid organizations, journalists, policymakers, and the general public.

Data is organized across three JSON files: commodities.json (price series and commodity metadata), exporters.json (country-level export disruption data), and food-events.json (food crisis and supply chain disruption events).

Live URL: https://war-food-risk.vercel.app

---

## Target Users & Pain Points

| User Type | Pain Point | How This Solves It |
|---|---|---|
| Food security researchers | Connecting commodity price spikes to conflict causes requires cross-referencing many sources | Commodity price charts with conflict event overlay; food-events.json links specific events to price impacts |
| NGO & humanitarian workers (WFP, FAO) | Need a rapid briefing tool for understanding food supply disruption in crisis regions | Exporter disruption summaries and food crisis event log with severity ratings |
| Agricultural commodity traders | Need awareness of geopolitical risk to supply chain regions | Commodity price tracker with conflict-tagged risk indicators |
| Policy makers & diplomats | Need to assess which countries face secondary food security crises due to war | Country import dependency data showing which nations rely on conflict-affected exporters |
| Journalists | Writing about food prices without easy access to underlying conflict-supply chain data | Pre-connected data: commodity price + supply chain origin + conflict event in one place |
| Educators & students | Food security risks of war are underreported and hard to explain | Plain-language event descriptions and "why this matters" context on each page |
| SEO traffic | Searching "ukraine wheat supply" or "war food crisis tracker" | Homepage and commodity/exporter pages optimized for these queries |

---

## Tech Stack

- Framework: Next.js 15 (App Router, SSG)
- Styling: Tailwind CSS
- i18n: next-intl (8 languages: en / ko / ja / zh / es / fr / de / pt)
- Data: JSON files in /public/data/ (commodities.json, exporters.json, food-events.json)
- Ads: Adsterra + Google AdSense ca-pub-7098271335538021
- Deployment: Vercel free tier
- Repo: GitHub (public)
- Analytics: Vercel Analytics (free tier)

---

## Pages & Routes

### App Router Structure

```
app/
  [locale]/
    layout.tsx              — Root layout: header, footer, locale provider, AdSense
    page.tsx                — Homepage: commodity price cards, risk map, recent events
    loading.tsx             — Skeleton loader
    not-found.tsx           — 404 page
    commodities/
      page.tsx              — Commodity index: all tracked commodities with price + risk level
      [commoditySlug]/
        page.tsx            — Commodity detail: price history, conflict overlay, exporter origins
    exporters/
      page.tsx              — Exporter index: all conflict-affected exporting countries
      [countryCode]/
        page.tsx            — Country exporter profile: what they export, disruption level, impact
    events/
      page.tsx              — Food crisis events timeline: all logged food-events.json entries
      [eventId]/
        page.tsx            — Individual event detail
    risk/
      page.tsx              — Global food security risk overview: which regions face highest risk
    about/
      page.tsx              — Methodology, data sources, limitations, commodity definitions
  api/
    commodities/
      route.ts              — GET: returns commodities.json
    exporters/
      route.ts              — GET: returns exporters.json
    food-events/
      route.ts              — GET: returns food-events.json (optional ?commodity=, ?country=)
    revalidate/
      route.ts              — POST: ISR revalidation trigger
```

### Key Page Descriptions

**Homepage (`/[locale]/`)**
- Hero: "How War Disrupts the World's Food Supply" with current risk level indicator
- Commodity price summary row: Wheat, Sunflower Oil, Corn, Barley, Fertilizer (DAP) — each with current price, YoY change, and risk badge (Low/Elevated/High/Critical)
- Recent Food Crisis Events: last 8 events from food-events.json
- At-Risk Regions section: countries/regions with highest food insecurity due to conflict-linked supply disruption (FEWS NET IPC Phase 3+ countries)
- Featured supply chain diagram: Ukraine/Russia → commodity → import-dependent countries (static SVG infographic)
- Key stat callouts: "Ukraine accounts for X% of global wheat exports", "Y million people at risk"
- Ad placements: leaderboard top, rectangle after commodity cards

**Commodity Index (`/[locale]/commodities/`)**
- Card grid of all tracked commodities
- Each card: commodity name, current price, unit, YoY change, risk level badge, primary exporting regions
- Filter by risk level, commodity type (grain/oil/fertilizer)
- Sort by: YoY change, current risk level, commodity name

**Commodity Detail (`/[locale]/commodities/[commoditySlug]/`)**
- Commodity header: name, market, unit, data source, update frequency
- Current price card: price, YoY change, 52-week high/low, risk level badge
- Price history chart: time series 2022-present with conflict event markers
- Supply chain origin map: static map image showing major exporting countries, sized by share of global supply
- Exporter disruption table: major exporting countries with their disruption status
- Import-dependent countries: top 10 countries most dependent on this commodity from conflict-affected regions
- Food security risk: which countries/regions face highest food security risk if supply continues to be disrupted
- Related food crisis events
- Substitution notes: alternative sources or substitutes for this commodity

**Exporter Country Profile (`/[locale]/exporters/[countryCode]/`)**
- Country header: flag, name, conflict status
- Export profile: list of key commodities this country exports, with global share %
- Disruption status: current disruption level (none / partial / severe / complete)
- Disruption timeline: when disruptions began, causes, current status
- Impact assessment: which commodities and which import-dependent countries are most affected
- Export volume trend: before/during conflict comparison (2021 vs current)
- Relevant conflict events
- Related commodity links

**Food Events Timeline (`/[locale]/events/`)**
- Full chronological list of food crisis and supply disruption events
- Filter by: commodity, country, event type (supply disruption / price shock / food crisis declaration / aid response), severity
- Date grouping headers
- Event cards: date, event type badge, location, commodity affected, severity rating, description, source link

**Food Security Risk Overview (`/[locale]/risk/`)**
- Global risk summary: "N countries at elevated food security risk due to conflict-linked supply disruption"
- Risk tier table: countries ranked by food security risk level (Critical / High / Elevated / Moderate)
- Risk factors per country: which commodities they import, from which conflict-affected exporters, and estimated % of national food basket affected
- Trend indicators: risk improving or worsening?
- Links to WFP, FEWS NET, FAO data sources

---

## Data Model (JSON schema)

### /public/data/commodities.json

```json
{
  "meta": {
    "lastUpdated": "2026-04-14T00:00:00Z",
    "totalCommodities": 8,
    "version": "1.0.0"
  },
  "commodities": [
    {
      "slug": "wheat",
      "name": "Wheat",
      "marketName": "CBOT Wheat",
      "category": "grain",
      "unit": "USD per bushel",
      "globalImportanceNote": "Staple grain for ~35% of global population. Ukraine and Russia account for ~28% of global exports.",
      "dataSource": "CME Group CBOT / World Bank",
      "sourceUrl": "https://www.cmegroup.com/",
      "updateFrequency": "daily",
      "currentPrice": 5.42,
      "currentPriceAsOf": "2026-04-14",
      "yearOverYearChange": -8.3,
      "week52High": 6.80,
      "week52Low": 4.90,
      "riskLevel": "elevated",
      "riskNote": "Ongoing Black Sea shipping constraints keep prices above pre-war baseline despite recent declines.",
      "priceHistory": [
        { "date": "2022-01-31", "price": 7.85 },
        { "date": "2022-03-07", "price": 12.94, "event": "Russia invasion price spike" },
        { "date": "2022-12-31", "price": 7.60 },
        { "date": "2023-12-31", "price": 6.10 },
        { "date": "2024-12-31", "price": 5.91 },
        { "date": "2025-12-31", "price": 5.91 },
        { "date": "2026-04-14", "price": 5.42 }
      ],
      "conflictEventIds": ["fe-20220224-001", "fe-20220727-001"],
      "majorExporters": [
        {
          "countryCode": "RU",
          "countryName": "Russia",
          "globalSharePercent": 18,
          "disruptionLevel": "partial"
        },
        {
          "countryCode": "UA",
          "countryName": "Ukraine",
          "globalSharePercent": 10,
          "disruptionLevel": "partial"
        },
        {
          "countryCode": "US",
          "countryName": "United States",
          "globalSharePercent": 14,
          "disruptionLevel": "none"
        }
      ],
      "topImportDependentCountries": [
        {
          "countryCode": "EG",
          "countryName": "Egypt",
          "dependencyNote": "Egypt imports ~50-60% of wheat from Russia/Ukraine; largest wheat importer globally",
          "riskLevel": "high"
        },
        {
          "countryCode": "TR",
          "countryName": "Turkey",
          "dependencyNote": "Major importer of Ukrainian wheat; has managed via diplomatic agreements",
          "riskLevel": "moderate"
        }
      ],
      "substitutionOptions": "Australia, Canada, EU (France/Germany), Argentina can partially substitute. Full substitution is slow due to contract timelines."
    },
    {
      "slug": "sunflower-oil",
      "name": "Sunflower Oil",
      "category": "vegetable-oil",
      "unit": "USD per metric ton",
      "globalImportanceNote": "Ukraine accounts for ~46% of global sunflower oil exports. Russia contributes another ~25%.",
      "currentPrice": 890,
      "currentPriceAsOf": "2026-04-14",
      "yearOverYearChange": -4.2,
      "riskLevel": "high",
      "majorExporters": [
        { "countryCode": "UA", "globalSharePercent": 46, "disruptionLevel": "partial" },
        { "countryCode": "RU", "globalSharePercent": 25, "disruptionLevel": "partial" }
      ]
    },
    {
      "slug": "fertilizer-dap",
      "name": "Fertilizer (DAP)",
      "marketName": "Diammonium Phosphate",
      "category": "fertilizer",
      "unit": "USD per metric ton",
      "globalImportanceNote": "Russia is a leading exporter of key fertilizer inputs. Sanctions and logistics disruptions have affected global supply.",
      "riskLevel": "elevated"
    },
    {
      "slug": "corn",
      "name": "Corn (Maize)",
      "category": "grain",
      "unit": "USD per bushel",
      "globalImportanceNote": "Ukraine is among the world's top 5 corn exporters; war has disrupted planting and export logistics.",
      "riskLevel": "moderate"
    }
  ]
}
```

### /public/data/exporters.json

```json
{
  "meta": {
    "lastUpdated": "2026-04-14T00:00:00Z",
    "totalExporters": 6
  },
  "exporters": [
    {
      "countryCode": "UA",
      "countryName": "Ukraine",
      "conflictStatus": "active-warzone",
      "conflictSlug": "ukraine-russia",
      "overallDisruptionLevel": "partial",
      "disruptionSince": "2022-02-24",
      "keyExports": [
        {
          "commoditySlug": "wheat",
          "preWarExportMt": 20.5,
          "currentExportMt": 16.2,
          "disruptionPercent": 21,
          "notes": "Black Sea Grain Initiative allowed partial resumption; ongoing port and infrastructure risks"
        },
        {
          "commoditySlug": "sunflower-oil",
          "preWarExportMt": 5.8,
          "currentExportMt": 4.1,
          "disruptionPercent": 29
        },
        {
          "commoditySlug": "corn",
          "preWarExportMt": 27.0,
          "currentExportMt": 19.8,
          "disruptionPercent": 27
        }
      ],
      "exportRoutesAffected": ["Black Sea ports (Odessa)", "Danube river routes (secondary)"],
      "context": "Ukraine is one of the world's largest agricultural exporters. The Russian invasion severely disrupted port access and farmland use, affecting global supply of wheat, corn, sunflower oil, and barley.",
      "recoveryOutlook": "partial — dependent on conflict resolution and port security",
      "lastUpdated": "2026-04-14"
    },
    {
      "countryCode": "RU",
      "countryName": "Russia",
      "conflictStatus": "aggressor-state",
      "overallDisruptionLevel": "partial",
      "disruptionSince": "2022-02-24",
      "keyExports": [
        {
          "commoditySlug": "wheat",
          "preWarExportMt": 35.0,
          "currentExportMt": 38.5,
          "disruptionPercent": -10,
          "notes": "Russia's wheat exports have actually increased post-2022 as it redirected to non-sanctioning countries"
        },
        {
          "commoditySlug": "fertilizer-dap",
          "preWarExportMt": 12.5,
          "currentExportMt": 9.8,
          "disruptionPercent": 22,
          "notes": "Sanctions on Russian entities complicated fertilizer trade in 2022; largely normalized by 2023"
        }
      ],
      "context": "Russia is the world's largest wheat exporter. Sanctions have complicated but not halted most agricultural exports, which are largely exempt from sanctions regimes."
    }
  ]
}
```

### /public/data/food-events.json

```json
{
  "meta": {
    "lastUpdated": "2026-04-14T00:00:00Z",
    "totalEvents": 420
  },
  "events": [
    {
      "id": "fe-20220224-001",
      "date": "2022-02-24",
      "type": "supply-disruption | price-shock | food-crisis-declaration | aid-response | export-ban | port-closure | harvest-disruption",
      "title": "Ukraine-Russia war triggers global wheat price spike",
      "description": "Russian invasion of Ukraine, the world's 4th and 5th largest wheat exporters respectively, caused wheat futures to spike 50% in 2 weeks, triggering food security alarms across North Africa and the Middle East.",
      "severity": "critical | high | medium | low",
      "commodityTags": ["wheat", "sunflower-oil", "corn", "fertilizer-dap"],
      "countriesAffected": ["UA", "EG", "TN", "LB", "YE", "SO"],
      "conflictSlug": "ukraine-russia",
      "economicImpact": {
        "priceImpactDescription": "Wheat +50% in 2 weeks; sunflower oil +60% in March 2022",
        "affectedPopulationEstimate": 1400000000
      },
      "sources": [
        {
          "name": "FAO",
          "url": "https://www.fao.org/..."
        }
      ],
      "tags": ["wheat", "price-shock", "ukraine", "black-sea", "global-impact"]
    }
  ]
}
```

---

## Milestones & Git Push Points

### M0 — Project Scaffold
- Next.js 15 with App Router initialized
- Tailwind CSS and next-intl for 8 locales configured
- App directory structure: app/[locale]/, app/api/, public/data/
- Placeholder JSON files (commodities.json, exporters.json, food-events.json)
- Vercel project linked, first deploy successful
- Git push: `feat: scaffold war-food-risk with i18n and data structure`

### M1 — Data Layer
- commodities.json: 6-8 commodities with price history (2022-2026) and exporter data
- exporters.json: ≥ 5 exporting countries with disruption profiles
- food-events.json: ≥ 100 food crisis events
- All three API routes implemented (/api/commodities, /api/exporters, /api/food-events)
- Validation scripts passing
- Git push: `feat: food supply chain data and API routes`

### M2 — Layout & Homepage
- Root layout: header (Home, Commodities, Exporters, Events, Risk, About), language switcher, footer
- AdSense script
- Homepage commodity price cards with risk badges
- Recent events feed
- At-risk regions section
- Supply chain infographic (static SVG)
- Mobile responsive
- Git push: `feat: homepage with commodity cards, risk badges, events feed`

### M3 — Commodity Pages
- Commodity index with filters
- Commodity detail page: price chart, exporter table, import dependency table
- generateStaticParams for all commodity slugs
- Price history chart component (SSG SVG or recharts)
- Conflict event overlay markers on price chart
- Git push: `feat: commodity index and detail pages with price charts`

### M4 — Exporters, Events, Risk Pages
- Exporter index table
- Exporter country profile page
- Food events timeline with filters
- Event detail page
- Risk overview page with risk tier table
- generateStaticParams for all exporter country codes and event IDs
- Git push: `feat: exporter profiles, food events timeline, and risk overview`

### M5 — i18n, SEO, Sitemap
- All 8 locale translations complete
- Per-page metadata for all routes and locales
- sitemap.xml covering all commodity/exporter/event slugs × 8 locales
- robots.txt, hreflang, canonical URLs
- JSON-LD Dataset schema on homepage
- OG images referencing commodity names
- Git push: `feat: i18n, SEO metadata, and sitemap`

### M6 — QA & Launch
- Lighthouse: Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 90
- All commodity detail pages tested
- Price charts verified on mobile
- Language switcher tested all 8 locales
- Ad units verified
- GSC verified, sitemap submitted
- Git push: `chore: QA pass and production launch`

---

## Agent Team

### Frontend Agent
**Responsibilities:**
- Commodity price card with risk badge and sparkline
- Price history chart component with event overlay markers (SVG or recharts)
- Exporter disruption table with status indicators
- Risk tier table with color-coded risk levels
- Supply chain SVG infographic for homepage
- Responsive layouts for all pages

**Key Files:**
- app/[locale]/layout.tsx
- app/[locale]/page.tsx
- components/CommodityCard.tsx, RiskBadge.tsx, Sparkline.tsx
- components/PriceChart.tsx, EventMarker.tsx
- components/ExporterTable.tsx, DisruptionStatus.tsx
- components/RiskTierTable.tsx
- components/SupplyChainSVG.tsx

### Backend / Data Agent
**Responsibilities:**
- Source and maintain commodities.json with real price data (CME, World Bank, FAO)
- Source and maintain exporters.json with trade volume data
- Source and maintain food-events.json from FAO, WFP, FEWS NET, news sources
- Implement all three API routes
- Write price update script for regularly changing commodities
- Write food-events ingestion helper

**Key Files:**
- public/data/commodities.json
- public/data/exporters.json
- public/data/food-events.json
- app/api/commodities/route.ts
- app/api/exporters/route.ts
- app/api/food-events/route.ts
- scripts/update-commodity-prices.js
- scripts/validate-food-data.js

### SEO / Content Agent
**Responsibilities:**
- Metadata for all pages and locales
- Translation files (messages/*.json) — 8 languages
- About page with commodity definitions, methodology, and data sources
- JSON-LD DataCatalog and Dataset structured data
- Sitemap generation
- "What this means" context paragraphs for commodity pages
- Internal linking strategy (commodity pages link to exporter pages and food events)

**Key Files:**
- messages/ (8 locale files)
- app/[locale]/about/page.tsx
- public/sitemap.xml

### QA Agent
**Responsibilities:**
- Verify commodity price data accuracy against spot check of source data
- Test all 8 locales on all routes
- Verify price charts on 3 viewport sizes
- Test filter functionality on events and commodity pages
- Lighthouse audits on homepage and at least 3 commodity detail pages
- Ad unit CLS testing

---

## SEO Strategy

### Primary Keywords
- "war food crisis tracker" — homepage title and H1
- "ukraine wheat supply" — wheat commodity page and exporters/ukraine page
- "conflict food security" — risk page and homepage meta
- "ukraine food exports 2026" — exporters/ukraine page
- "wheat price war impact" — wheat commodity detail page

### Secondary Keywords
- "sunflower oil price ukraine"
- "fertilizer price war"
- "global food crisis 2026"
- "russia wheat exports sanctions"
- "black sea grain corridor"
- "war food inflation"
- "ukraine corn exports"

### Long-tail Keywords
- "how ukraine war affects food prices"
- "which countries depend on ukraine wheat"
- "why wheat prices went up in 2022"
- "food security risk conflict countries 2026"
- "egypt food security ukraine war"

### Technical SEO
- Commodity pages (wheat, sunflower oil, fertilizer) target high-volume commodity queries
- Exporter pages target country + commodity + conflict queries
- Risk overview page targets food security crisis queries
- Price history charts with alt text and data tables improve accessibility and indexability
- hreflang for 8 locales maximizes international organic reach
- JSON-LD Dataset schema on homepage
- "Last updated" timestamps on commodity cards signal freshness to search engines
- Internal linking: commodity pages link to exporters, exporters link to food events, events link back to commodities

### Content Authority
- About page with detailed methodology and data source attribution builds E-E-A-T
- Quantified disruption data (export volume pre/during war) adds specificity
- Source links to FAO, WFP, World Bank, CME establish credibility
- Plain-language "why this matters" sections improve dwell time

---

## Launch Checklist

- [ ] commodities.json has ≥ 6 commodities with price history data (2022-2026)
- [ ] exporters.json has ≥ 4 country profiles (Ukraine, Russia, Belarus, others)
- [ ] food-events.json has ≥ 100 events
- [ ] All 8 locale routes return 200
- [ ] Homepage commodity cards show current prices with risk badges
- [ ] Homepage recent events feed populates from food-events.json
- [ ] Commodity index page loads with all commodities
- [ ] At least 4 commodity detail pages tested (wheat, sunflower oil, corn, fertilizer)
- [ ] Price charts render on desktop and mobile
- [ ] Conflict event overlay markers appear on price charts
- [ ] Exporters index page loads
- [ ] Ukraine and Russia exporter profiles tested
- [ ] Food events timeline loads with filters
- [ ] At least 5 event detail pages tested
- [ ] Risk overview page loads with risk tier table
- [ ] Language switcher works on all 8 locales
- [ ] AdSense ca-pub-7098271335538021 in page source
- [ ] Adsterra units rendering without CLS
- [ ] sitemap.xml includes all commodity/exporter/event slugs × 8 locales
- [ ] robots.txt accessible and not blocking crawlers
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse SEO ≥ 95
- [ ] Lighthouse Accessibility ≥ 90
- [ ] Price chart alt text and data tables present
- [ ] No console errors on any page
- [ ] OG tags verified
- [ ] Google Search Console property verified
- [ ] Sitemap submitted to GSC
- [ ] Vercel URL confirmed: https://war-food-risk.vercel.app
- [ ] 404 page working for invalid commodity and exporter slugs
