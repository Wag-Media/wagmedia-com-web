import "@/styles/globals.scss"
import "@/styles/index.scss"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// import { Forum, Gabarito, Josefin_Sans, Laila } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { GeistSans } from "geist/font/sans"

import Footer from "@/components/Footer/Footer"
import SiteHeader from "@/components/SiteHeader"
import { Bg } from "@/components/bg"

import Providers from "./providers"

export const metadata = {
  metadataBase: new URL("https://thewagmedia.com/"),
  title: {
    template: "%s | WagMedia Polkadot Articles and News",
    default: "WagMedia Polkadot Articles and News",
  },
  description:
    "Frictionless Decentralized Content Creation Platform For Polkadot",
  generator: "Next.js",
  applicationName: "WagMedia Web App",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Polkadot",
    "News",
    "Articles",
    "Web3",
    "NFTs",
    "DeFi",
    "Blockchain",
  ],

  creator: "@niftesty",
  publisher: "Polkadot Community",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  twitter: {
    card: "summary_large_image",
    title: "WagMedia Polkadot Articles and News",
    description:
      "Frictionless Decentralized Content Creation Platform For Polkadot",
    creator: "@nextjs",
  },
}

export const revalidate = 4320 // 72 hours

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="">
        <Providers>
          <div className="text-base text-neutral-900 dark:text-neutral-200">
            <Bg />
            <SiteHeader />
            {children}
            <Footer />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
