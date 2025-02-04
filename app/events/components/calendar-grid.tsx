import Link from "next/link"
import { DiscordIcon } from "@/images/icons"
import { PolkadotEvent } from "@prisma/client"
import { TooltipPortal } from "@radix-ui/react-tooltip"
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPin,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  formatEventDates,
  generateCalendarDays,
  getEventsForDate,
} from "../util"
import { EventCardSmall } from "./event-list-item-sm"

interface CalendarGridProps {
  selectedMonthAsDate: Date
  events: Array<PolkadotEvent>
  month: number
  year: number
  featuredEvents: Array<PolkadotEvent>
}

export function CalendarGrid({
  selectedMonthAsDate,
  events,
  month,
  year,
  featuredEvents,
}: CalendarGridProps) {
  const days = generateCalendarDays(year, month - 1)

  const prevDate = new Date(year, month - 2)
  const nextDate = new Date(year, month)

  const prevMonth = String(prevDate.getMonth() + 1).padStart(2, "0")
  const prevYear = prevDate.getFullYear()
  const nextMonth = String(nextDate.getMonth() + 1).padStart(2, "0")
  const nextYear = nextDate.getFullYear()

  return (
    <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
      <div className="flex items-center text-gray-900 dark:text-gray-100">
        <Link href={`/events/${prevMonth}-${prevYear}`}>
          <Button
            variant="ghost"
            size="icon"
            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="size-5" aria-hidden="true" />
          </Button>
        </Link>
        <div className="flex-auto text-sm font-semibold">
          {selectedMonthAsDate.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <Link href={`/events/${nextMonth}-${nextYear}`}>
          <Button
            variant="ghost"
            size="icon"
            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="size-5" aria-hidden="true" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-7 mt-6 text-gray-500 dark:text-gray-400 text-xs/6">
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
        <div>S</div>
      </div>
      <div className="grid grid-cols-7 gap-px mt-2 text-sm bg-gray-200 rounded-lg shadow dark:bg-gray-800 isolate ring-1 ring-gray-200 dark:ring-gray-800">
        {days.map((day, dayIdx) => {
          const dayEvents = day.isCurrentMonth
            ? getEventsForDate(events, day.date)
            : []
          const hasEvents = dayEvents.length > 0

          return (
            <TooltipProvider key={day.date} delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 focus:z-10 relative",
                      day.isCurrentMonth
                        ? "bg-white dark:bg-gray-900"
                        : "bg-gray-50 dark:bg-gray-800",

                      dayIdx === 0 && "rounded-tl-lg",
                      dayIdx === 6 && "rounded-tr-lg",
                      dayIdx === days.length - 7 && "rounded-bl-lg",
                      dayIdx === days.length - 1 && "rounded-br-lg"
                    )}
                  >
                    <time
                      dateTime={day.date}
                      className={cn(
                        "mx-auto flex size-6 items-center justify-center rounded-full",
                        day.date === new Date().toISOString().split("T")[0] &&
                          "bg-[var(--polkadot-pink)] text-white font-semibold"
                      )}
                    >
                      {day.date.split("-")[2].replace(/^0/, "")}
                    </time>
                    {hasEvents && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                        {[...Array(Math.min(dayEvents.length, 5))].map(
                          (_, i) => (
                            <span
                              key={i}
                              className="size-1 rounded-full bg-[var(--polkadot-purple)]"
                            />
                          )
                        )}
                      </div>
                    )}
                  </button>
                </TooltipTrigger>
                {hasEvents && (
                  <TooltipPortal>
                    <TooltipContent
                      side="left"
                      className="p-2 max-w-[300px]"
                      sideOffset={5}
                    >
                      <div className="space-y-2">
                        {dayEvents.map((event) => (
                          <EventCardSmall event={event} key={event.id} />
                        ))}
                      </div>
                    </TooltipContent>
                  </TooltipPortal>
                )}
              </Tooltip>
            </TooltipProvider>
          )
        })}
      </div>
      <div className="sticky top-12">
        <Link href="https://discord.com/channels/916926605056696341/945838967914389594">
          <Button className="w-full px-3 py-2 mt-8 text-sm font-semibold transition-all duration-300 rounded-md shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:scale-[1.01]">
            Add event <DiscordIcon className="ml-2 size-4" />
          </Button>
        </Link>
        {featuredEvents.length > 0 && (
          <>
            <h4 className="mt-8 text-base font-semibold text-left text-gray-900 dark:text-gray-100">
              🔥 Featured Events
            </h4>

            <ol className="mt-4 space-y-4 top-24">
              {featuredEvents.map((event) => (
                <li key={event.id} className="flex items-center gap-x-3">
                  <EventCardSmall event={event} />
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    </div>
  )
}
