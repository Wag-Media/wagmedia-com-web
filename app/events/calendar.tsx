import { Suspense } from "react"
import { getEvents, getEventsByMonth, getTotalEvents } from "@/data/dbEvents"
import { PolkadotEvent, Tag } from "@prisma/client"

import { CalendarGrid } from "./components/calendar-grid"
import { EventsCategoryFilter } from "./components/events-category-filter"
import { EventsList } from "./components/events-list"
import { MonthSelector } from "./components/month-selector"

interface CalendarProps {
  selectedMonth: string // Format: "MM-YYYY"
  category?: string
}

export async function Calendar({ selectedMonth, category }: CalendarProps) {
  const [month, year] = selectedMonth.split("-").map(Number)
  const selectedMonthAsDate = new Date(year, month - 1)

  const [events, totalEvents] = await Promise.all([
    getEvents({ fromDate: selectedMonthAsDate, category }),
    getTotalEvents({ fromDate: selectedMonthAsDate, category }),
  ])

  async function loadMoreEvents(page: number, category?: string) {
    "use server"
    const nextEvents = await getEvents({
      page,
      category,
      fromDate: selectedMonthAsDate,
    })
    return nextEvents
  }

  const uniqueCategories = Array.from(
    new Set(events.flatMap((event) => event.tags.map((tag) => tag.name)))
  )
    .filter(Boolean)
    .sort()

  return (
    <div>
      <div className="flex items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Upcoming Events from
          <Suspense
            fallback={selectedMonthAsDate.toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          >
            <MonthSelector selectedMonthAsDate={selectedMonthAsDate} />
          </Suspense>
          <Suspense fallback={"in all categories"}>
            <EventsCategoryFilter uniqueCategories={uniqueCategories} />
          </Suspense>
        </h2>
      </div>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
        <CalendarGrid
          selectedMonthAsDate={selectedMonthAsDate}
          events={events}
          month={month}
          year={year}
        />
        <div className="mt-4 text-sm/6 lg:col-span-7 xl:col-span-8">
          <EventsList
            initialEvents={events}
            totalEvents={totalEvents}
            loadMoreEvents={loadMoreEvents}
          />
        </div>
      </div>
    </div>
  )
}
