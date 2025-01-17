import "@/styles/globals.scss"
import "@/styles/index.scss"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// import { Forum, Gabarito, Josefin_Sans, Laila } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { GeistSans } from "geist/font/sans"

import Footer from "@/components/Footer/Footer"
import SiteHeader from "@/components/SiteHeader"

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
  keywords: ["Polkadot", "Latest", "News", "Kusama"],
  creator: "@niftesty",
  publisher: "Polkadot Community",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    images: [
      {
        url: "https://thewagmedia.com/opengraph-image.png", // Must be an absolute URL
        width: 1200,
        height: 630,
        alt: "WagMedia Polkadot Articles and News",
      },
    ],
    type: "website",
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

const queryClient = new QueryClient()

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
            <SiteHeader />
            {children}
            <Footer />
          </div>
        </Providers>
        <Analytics />
        <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none">
          <div className="absolute backdrop-blur-md top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF2670] to-[#ffac07] opacity-80 animate-line-horizontal"></div>
          <div className="absolute backdrop-blur-md bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#7916F3] to-transparent opacity-80 animate-line-horizontal-reverse"></div>
        </div>
      </body>
    </html>
  )
}
