import {
  JetBrains_Mono as FontMono,
  // Inter as FontSans,
  Poppins as FontSans,
} from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})
