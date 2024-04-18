import "@/styles/globals.scss"
import "@/styles/index.scss"
// import { Forum, Gabarito, Josefin_Sans, Laila } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { GeistSans } from "geist/font/sans"

import Footer from "@/components/Footer/Footer"
import SiteHeader from "@/components/SiteHeader"

export const metadata = {
  title: "WagMedia - Polkadot Media Platform",
  description: "Decentralized media platform for Polkadot and Kusama",
}

// const poppins = Poppins({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["300", "400", "500", "600", "700"],
// });

// const geistSans = GeistSans({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["400", "500", "600", "700"],
// });

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
