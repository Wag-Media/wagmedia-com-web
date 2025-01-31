import { Metadata } from "next"

import { Headline } from "@/components/ui/headline"

import { Calendar } from "../calendar"

interface PageProps {
  params: { month: string }
  searchParams: { category?: string }
}

export const metadata: Metadata = {
  title: "Polkadot Events Calendar",
  description: "Never miss an event in web3",
}

export const revalidate = 30

function getDefaultMonth() {
  const date = new Date()
  return `${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`
}

function validateMonth(month?: string) {
  if (!month) return getDefaultMonth()

  // Validate format MM-YYYY
  const isValidFormat = /^\d{2}-\d{4}$/.test(month)
  if (!isValidFormat) return getDefaultMonth()

  const [monthStr, yearStr] = month.split("-")
  const monthNum = parseInt(monthStr)
  const yearNum = parseInt(yearStr)

  const currentYear = new Date().getFullYear()
  // Allow 10 years in the past and 10 years in the future
  const minYear = currentYear - 10
  const maxYear = currentYear + 10

  // Check if month is between 1-12 and year is within reasonable range
  if (
    monthNum >= 1 &&
    monthNum <= 12 &&
    yearNum >= minYear &&
    yearNum <= maxYear
  ) {
    return month
  }

  return getDefaultMonth()
}

export default function EventsPage({ params, searchParams }: PageProps) {
  const month = params?.month

  const validatedMonth = validateMonth(month)

  console.log("validatedMonth", validatedMonth)

  return (
    <div className="container relative py-4 mx-auto md:py-8 lg:py-16 ">
      <Headline level="h1" subtitle="Never miss an event in web3">
        Polkadot Events Calendar
      </Headline>
      <Calendar
        selectedMonth={validatedMonth}
        category={searchParams?.category}
      />
    </div>
  )
}
