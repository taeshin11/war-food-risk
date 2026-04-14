import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about War Food Risk — our mission, methodology, and commitment to transparent conflict intelligence.',
  keywords: 'food security war, war food crisis, conflict food risk, agricultural disruption, famine risk, food insecurity, about us, conflict intelligence',
}

export default function AboutPage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-700">Home</Link>
          <span className="mx-2">/</span>
          <span>About Us</span>
        </nav>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">About War Food Risk</h1>
        <p className="text-xl text-slate-600 mb-10 leading-relaxed">Analyzing food security risks and agricultural disruptions in conflict-affected regions worldwide</p>
        <div className="space-y-8">
          <section className="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed mb-4">War Food Risk was built on the conviction that access to timely, accurate conflict intelligence should not be limited to governments, think tanks, or expensive subscription services. We believe journalists, researchers, policy analysts, students, and engaged citizens deserve quality information to understand the world&apos;s most pressing security challenges.</p>
            <p className="text-slate-600 leading-relaxed">In a world where armed conflicts shape economies, displace populations, and determine history&apos;s course, we are committed to making conflict data accessible, transparent, and useful for everyone.</p>
          </section>
          <section className="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">What We Track</h2>
            <p className="text-slate-600 leading-relaxed mb-4">War Food Risk analyzes food security risks and agricultural disruptions in conflict-affected regions worldwide. Our platform aggregates, verifies, and presents data in a format designed for clarity, so users can quickly understand the current situation and track changes over time.</p>
            <p className="text-slate-600 leading-relaxed">We cover active conflicts across multiple regions, providing visualizations, timelines, and analysis that contextualizes data within broader geopolitical realities.</p>
          </section>
          <section className="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Data Sources &amp; Methodology</h2>
            <p className="text-slate-600 leading-relaxed mb-4">Our data is compiled from: official government reports, United Nations agencies (OCHA, UNHCR, WFP), academic conflict databases (ACLED, SIPRI, Uppsala Conflict Data Program), verified OSINT researchers, and internationally recognized news organizations.</p>
            <p className="text-slate-600 leading-relaxed">We prioritize source transparency and cross-reference multiple sources. Where sources disagree, we present the range of estimates rather than a single contested figure.</p>
          </section>
          <section className="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Why This Matters</h2>
            <p className="text-slate-600 leading-relaxed">Conflict data is inherently sensitive and contested. We strive to present information in a factual, non-partisan manner — to support informed discussion, humanitarian response, and evidence-based policy. The data we track represents real human lives, and that responsibility guides everything we do.</p>
          </section>
          <section className="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Our Team &amp; Independence</h2>
            <p className="text-slate-600 leading-relaxed mb-4">The platform was developed by a team of data engineers, journalists, and security researchers passionate about making conflict intelligence accessible to the public. Our backgrounds span open-source intelligence (OSINT), data visualization, and international security studies.</p>
            <p className="text-slate-600 leading-relaxed">We are not affiliated with any government, military organization, or political group. Funded entirely through advertising revenue, allowing us to remain independent and freely accessible to all.</p>
          </section>
          <section className="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Structured Data vs. News Cycles</h2>
            <p className="text-slate-600 leading-relaxed mb-4">Traditional news media covers conflicts reactively. War Food Risk provides continuous, structured monitoring that persists beyond news cycles. Where newspapers provide narrative, we provide data.</p>
            <p className="text-slate-600 leading-relaxed">Our structured data format makes it easy for researchers to track trends, compare across regions, and identify patterns invisible in unstructured reporting.</p>
          </section>
          <section className="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Contact Us</h2>
            <p className="text-slate-600">For inquiries, corrections, or partnership opportunities: <strong>contact@war-food-risk.vercel.app</strong></p>
          </section>
        </div>
      </div>
    </main>
  )
}
