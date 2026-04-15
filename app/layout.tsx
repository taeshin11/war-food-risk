import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from 'next/script'
import "./globals.css";
import { FeedbackButton } from "@/components/FeedbackButton";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'War Food Risk | Conflict Food Security Monitor',
    template: '%s | War Food Risk'
  },
  description: 'Analyzing food security risks and agricultural disruptions in conflict-affected regions worldwide',
  keywords: 'war food risk, food security, conflict agriculture, famine risk, food supply disruption',
  openGraph: {
    type: 'website',
    siteName: 'War Food Risk',
    title: 'War Food Risk | Conflict Food Security Monitor',
    description: 'Analyzing food security risks and agricultural disruptions in conflict-affected regions worldwide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'War Food Risk',
    description: 'Analyzing food security risks and agricultural disruptions in conflict-affected regions worldwide',
  },
  verification: {
    google: 'WddgcbVJsL2BGHNAje5m6DK56IcR0Mw5UOqozI2Xtrc',
  },
  other: {
    'google-adsense-account': 'ca-pub-7098271335538021',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "War Food Risk",
              "url": "https://war-food-risk.vercel.app",
              "description": "Analyzing food security risks and agricultural disruptions in conflict-affected regions worldwide",
              "publisher": { "@type": "Organization", "name": "War Food Risk", "url": "https://war-food-risk.vercel.app" }
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <FeedbackButton siteName="War Food Risk" siteUrl="https://war-food-risk.vercel.app" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7098271335538021"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
