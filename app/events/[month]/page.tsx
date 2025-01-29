import { redirect } from "next/navigation"

import { Headline } from "@/components/ui/headline"

import { Calendar } from "../calendar"

interface PageProps {
  params: { month: string }
}

function getDefaultMonth() {
  const date = new Date()
  return `${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`
}

function validateMonth(month?: string) {
  console.log("month", month)
  if (!month) return getDefaultMonth()

  // Validate format MM-YYYY
  const isValidFormat = /^\d{2}-\d{4}$/.test(month)
  if (!isValidFormat) return getDefaultMonth()

  const [monthStr, yearStr] = month.split("-")
  const monthNum = parseInt(monthStr)
  const yearNum = parseInt(yearStr)

  // Check if month is between 1-12 and year is reasonable
  if (monthNum >= 1 && monthNum <= 12 && yearNum >= 2024 && yearNum <= 2026) {
    return month
  }

  return getDefaultMonth()
}

export default function EventsPage({ params }: PageProps) {
  const month = params?.month

  const validatedMonth = validateMonth(month)

  console.log("validatedMonth", validatedMonth)

  return (
    <div className="container relative py-4 mx-auto md:py-8 lg:py-16 ">
      <Headline level="h1" subtitle="Never miss an event in web3">
        Polkadot Events Calendar
      </Headline>
      <Calendar selectedMonth={validatedMonth} />
    </div>
  )
}
