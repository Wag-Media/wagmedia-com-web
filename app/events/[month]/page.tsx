import { Metadata } from "next"

import { Headline } from "@/components/ui/headline"

import { Calendar } from "../calendar"

interface PageProps {
  params: { month: string }
  searchParams: { category?: string }
}

export function formatMonthYear(monthStr: string) {
  const [month, year] = monthStr.split("-")
  const date = new Date(parseInt(year), parseInt(month) - 1)
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
}

export const generateMetadata = ({ params }: { params: { month: string } }) => {
  const formattedDate = formatMonthYear(validateMonth(params.month))
  return {
    title: `Polkadot Events Calendar - ${formattedDate}`,
    description: `Polkadot Events Calendar for ${formattedDate}`,
  }
}

export async function generateStaticParams() {
  const now = new Date()
  const months: string[] = []

  // Get first date (3 months ago)
  const startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1)
  // Get last date (12 months from now)
  const endDate = new Date(now.getFullYear(), now.getMonth() + 12, 1)

  // Create current date to iterate
  let currentDate = startDate
  while (currentDate < endDate) {
    const month = String(currentDate.getMonth() + 1).padStart(2, "0")
    const year = currentDate.getFullYear()
    months.push(`${month}-${year}`)

    // Move to next month
    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    )
  }

  return months.map((month) => ({ month }))
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

  return (
    <div className="container relative py-4 mx-auto md:py-8 lg:py-16 ">
      <Headline
        level="h1"
        subtitle="Discover Web3 events across the Polkadot network"
      >
        Polkadot Events Calendar
      </Headline>
      <Calendar
        selectedMonth={validatedMonth}
        category={searchParams?.category}
      />
    </div>
  )
}
