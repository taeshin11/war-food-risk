import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { FeedbackButton } from "@/components/FeedbackButton";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
export const metadata: Metadata = { title: "War Food Risk", description: "Conflict food supply pressure" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <FeedbackButton siteName="War Food Risk" siteUrl="https://war-food-risk.vercel.app" />
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
      </body>
    </html>
  );
}
