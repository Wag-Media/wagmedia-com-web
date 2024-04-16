import "@/styles/globals.scss"
import "@/styles/index.scss"
import { Forum, Gabarito, Josefin_Sans, Laila } from "next/font/google"
import { GeistSans } from "geist/font/sans"

import Footer from "@/components/Footer/Footer"
import SiteHeader from "@/components/SiteHeader"

export const metadata = {
  title: "WagMedia",
  description: "Decentralized News for Polkadot and Kusama",
}

// const poppins = Poppins({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["300", "400", "500", "600", "700"],
// });

const gabarito = Gabarito({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

const laila = Laila({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

const forum = Forum({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
})

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

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
        <div className="bg-[#fff] text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
          <SiteHeader />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
