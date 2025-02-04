"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { PolkadotEvent, Tag } from "@prisma/client"
import { CalendarX2, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

import { EventListItem } from "./event-list-item"

interface EventsListProps {
  initialEvents: Array<PolkadotEvent & { tags: Tag[] }>
  totalEvents: number
  loadMoreEvents: (
    page: number,
    category?: string
  ) => Promise<Array<PolkadotEvent & { tags: Tag[] }>>
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
      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
          <CalendarX2 className="text-gray-400 size-8" />
          <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
            No events found
          </p>
          <p className="mt-1 mb-2 text-sm text-gray-500 dark:text-gray-400">
            Check back later for upcoming events or
          </p>
          <Button size="sm" className="min-w-[200px]">
            <Link href="/events">Go back to current month</Link>
          </Button>
        </div>
      ) : (
        <>
          <ol className="divide-y divide-gray-100 dark:divide-gray-800 text-sm/6">
            {events.map((event) => (
              <EventListItem event={event} key={event.id} />
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
      )}
    </>
  )
}
