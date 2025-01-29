"use client"

import { useCallback, useEffect, useState } from "react"
import { Calendar, Loader2, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"

import { PolkadotEvent } from "../calendar"

interface EventsListProps {
  initialEvents: Array<PolkadotEvent>
  totalEvents: number
  loadMoreEvents: (
    page: number,
    category?: string
  ) => Promise<Array<PolkadotEvent>>
}

export function EventsList({
  initialEvents,
  totalEvents,
  loadMoreEvents,
}: EventsListProps) {
  const [events, setEvents] = useState(initialEvents)
  const [category, setCategory] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadMoreDisabled, setIsLoadMoreDisabled] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  const handleLoadMoreEvents = useCallback(async () => {
    if (isLoadMoreDisabled || isLoading) return

    setIsLoading(true)
    try {
      const newEvents = await loadMoreEvents(currentPage + 1, category)
      setCurrentPage(currentPage + 1)
      setEvents((prev) => [...prev, ...newEvents])
    } catch (error) {
      console.error("Failed to load more posts:", error)
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, isLoading, isLoadMoreDisabled, category, loadMoreEvents])

  useEffect(() => {
    setIsLoadMoreDisabled(events.length >= totalEvents)
  }, [events, totalEvents])

  return (
    <>
      <ol className="divide-y divide-gray-100 dark:divide-gray-800 text-sm/6">
        {events.map((event) => (
          <li
            key={event.id}
            className="relative flex flex-col py-6 gap-x-6 xl:static lg:grid lg:grid-cols-4 lg:items-start"
          >
            <div className="flex gap-x-6 lg:col-span-3">
              <img
                src={event.imageUrl}
                alt=""
                className="flex-none rounded-sm size-28"
              />
              <div className="flex-auto">
                <h3 className="pr-10 text-lg font-semibold text-gray-900 dark:text-gray-100 xl:pr-0">
                  <a href={event.link} className="hover:underline">
                    {event.name}
                  </a>
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {event.description}
                </p>
                <dl className="flex flex-col mt-2 text-gray-500 dark:text-gray-400 xl:flex-row">
                  <div className="flex items-start gap-x-3">
                    <dt className="mt-0.5">
                      <span className="sr-only">Date</span>
                      <Calendar
                        className="text-gray-400 size-5"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd>
                      <time dateTime={event.datetime}>
                        {event.date} at {event.time}
                      </time>
                    </dd>
                  </div>
                  <div className="mt-2 flex items-start gap-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400/50 xl:pl-3.5">
                    <dt className="mt-0.5">
                      <span className="sr-only">Location</span>
                      <MapPin
                        className="text-gray-400 size-5"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd>{event.location}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 cursor-default lg:mt-0 lg:justify-end lg:self-start">
              {event.categories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-600 rounded-md dark:text-gray-300 bg-gray-50 dark:bg-gray-800 ring-1 ring-inset ring-gray-500/10 dark:ring-gray-400/20"
                >
                  {category}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>
      <div className="flex items-center justify-center mt-10">
        {!isLoadMoreDisabled && (
          <Button
            onClick={handleLoadMoreEvents}
            disabled={isLoading}
            variant="outline"
            size="lg"
            className="min-w-[200px] bg-background hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                Loading... <Loader2 className="ml-2 size-4 animate-spin" />
              </>
            ) : (
              "Show me more"
            )}
          </Button>
        )}
      </div>
    </>
  )
}
