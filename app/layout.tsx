import "@/styles/globals.scss"
import "@/styles/index.scss"
// import { Forum, Gabarito, Josefin_Sans, Laila } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { GeistSans } from "geist/font/sans"

import Footer from "@/components/Footer/Footer"
import SiteHeader from "@/components/SiteHeader"

export const metadata = {
  metadataBase: new URL("https://thewagmedia.com/"),
  title: {
    template: "%s | WagMedia Polkadot News Platform",
    default: "WagMedia Polkadot News Platform",
  },
  description: "Decentralized news and updates for Polkadot and Kusama",
  generator: "Next.js",
  applicationName: "WagMedia Web App",
  referrer: "origin-when-cross-origin",
  keywords: ["Polkadot", "Latest", "News", "Kusama"],
  creator: "@niftesty",
  publisher: "Polkadot Community",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="">
        <div className="text-base text-neutral-900 dark:text-neutral-200">
          <SiteHeader />
          {children}
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
