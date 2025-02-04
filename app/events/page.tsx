import { Headline } from "@/components/ui/headline"

import { formatMonthYear } from "./[month]/page"
import { Calendar } from "./calendar"

export const revalidate = 30

function getDefaultMonth() {
  const date = new Date()
  return `${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`
}

export const metadata = {
  title: {
    absolute: `Polkadot Events Calendar - ${formatMonthYear(
      getDefaultMonth()
    )}`,
  },
  description: `Polkadot Events Calendar for ${formatMonthYear(
    getDefaultMonth()
  )}`,
}

export default function EventsPage() {
  const currentMonth = getDefaultMonth()

  return (
    <div className="container relative py-4 mx-auto md:py-8 lg:py-16">
      <Headline level="h1" subtitle="Never miss an event in web3">
        Polkadot Events Calendar
      </Headline>
      <Calendar selectedMonth={currentMonth} />
    </div>
  )
}
