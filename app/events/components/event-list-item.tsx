import Link from "next/link"
import { PolkadotEvent } from "@prisma/client"
import {
  Calendar,
  CalendarArrowDown,
  CalendarSync,
  Download,
  MapPin,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import { formatEventDates, generateICalEvent } from "../util"

export function EventListItem({
  event,
}: {
  event: PolkadotEvent & { tags: { name: string }[] }
}) {
  function handleExport() {
    if (!event.title || !event.description || !event.location) return
    if (!event.startsAt) return

    const icalData = generateICalEvent({
      title: event.title,
      description: event.description,
      location: event.location,
      startDate: event.startsAt,
      endDate: event.endsAt,
      recurrencePattern: event.recurrencePattern,
    })

    const blob = new Blob([icalData], { type: "text/calendar;charset=utf-8" })
    const link = document.createElement("a")
    link.href = window.URL.createObjectURL(blob)
    link.download = `${event.title.toLowerCase().replace(/\s+/g, "-")}.ics`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <li
      key={event.id}
      className="relative flex flex-col py-6 gap-x-6 xl:static lg:grid lg:grid-cols-4 lg:items-start"
    >
      <div className="flex gap-x-6 lg:col-span-3">
        <Link
          href={event.link || ""}
          target="_blank"
          className="flex-none hover:opacity-80 size-28 w-28"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.image ?? "/placeholder.svg"}
            alt={event.title}
            className="flex-none object-cover rounded-sm size-28"
          />
        </Link>
        <div className="flex-auto">
          <h3 className="pr-10 text-lg font-semibold text-gray-900 dark:text-gray-100 xl:pr-0">
            <Link
              href={event.link || ""}
              target="_blank"
              className="hover:underline"
            >
              {event.title}
            </Link>
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-4">
            {event.description}
          </p>
          <dl className="flex flex-col mt-2 text-gray-500 dark:text-gray-400">
            <div className="flex items-start gap-x-2">
              <dt className="mt-0.5">
                <span className="sr-only">Date</span>
                <Calendar className="text-gray-400 size-5" aria-hidden="true" />
              </dt>
              <dd>
                {formatEventDates({
                  startDate: event.startsAt,
                  endDate: event.endsAt,
                })}
              </dd>
            </div>
            {event?.recurrencePattern && (
              <div className="flex items-start mt-1 gap-x-2">
                <dt className="mt-0.5">
                  <span className="sr-only">Recurrence</span>
                  <CalendarSync
                    className="text-gray-400 size-5"
                    aria-hidden="true"
                  />
                </dt>
                <dd>
                  {event.recurrencePattern} until{" "}
                  {formatEventDates({
                    startDate: null,
                    endDate: event.recurrenceEndDate,
                    withTime: false,
                  })}
                </dd>
              </div>
            )}
            <div className="flex items-start mt-1 gap-x-2">
              <dt className="mt-0.5">
                <span className="sr-only">Location</span>
                <MapPin className="text-gray-400 size-5" aria-hidden="true" />
              </dt>
              <dd>{event.location}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="flex flex-col flex-wrap justify-between h-full gap-2 mt-4 lg:mt-0">
        <div className="flex flex-wrap self-end gap-2">
          {event.tags.map((tag) => (
            <span
              key={tag.name}
              className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-600 rounded-md cursor-default dark:text-gray-300 bg-gray-50 dark:bg-gray-800 ring-1 ring-inset ring-gray-500/10 dark:ring-gray-400/20"
            >
              {tag.name}
            </span>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          className="flex items-center self-end h-6 gap-2 text-xs w-36"
        >
          <CalendarArrowDown className="size-4" />
          Add to Calendar
        </Button>
      </div>
      <pre>{JSON.stringify(event, null, 2)}</pre>
    </li>
  )
}
