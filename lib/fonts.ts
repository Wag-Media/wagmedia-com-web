import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
  Inter,
  Unbounded,
  // Poppins as FontSans,
} from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const fontUnbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
})
