import { Suspense, useState } from "react"
import Link from "next/link"
import { DiscordIcon } from "@/images/icons"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import { Calendar as CalendarIcon, MapPin } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { EventsCategoryFilter } from "./components/events-category-filter"
import { EventsList } from "./components/events-list"
import { MonthSelector } from "./components/month-selector"

export interface PolkadotEvent {
  id: number
  date: string
  time: string
  datetime: string
  name: string
  description: string
  categories: string[]
  link: string
  imageUrl: string
  location: string
}

const events: PolkadotEvent[] = [
  {
    id: 1,
    date: "January 15th, 2025",
    time: "2:00 PM",
    datetime: "2025-01-15T14:00",
    name: "ETH London Hackathon",
    description:
      "Join us for a 48-hour hackathon building the future of Ethereum. Open to developers of all skill levels. Prizes worth $50,000!",
    categories: ["hackathon", "ethereum", "development"],
    link: "https://ethlondon.com",
    imageUrl:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/event-covers/7n/d917e3ce-73f4-4b95-a607-89b09166d100.jpg",
    location: "The Blockchain Hub, London",
  },
  {
    id: 2,
    date: "January 20th, 2025",
    time: "6:30 PM",
    datetime: "2025-01-20T18:30",
    name: "Web3 Developer Meetup",
    description:
      "Monthly meetup for Web3 developers to network, share knowledge, and discuss the latest trends in blockchain development.",
    categories: ["meetup", "networking", "web3"],
    link: "https://web3devs.meetup.com",
    imageUrl:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/event-covers/zb/5cbc1318-6d04-4779-b4af-26bf200858b2",
    location: "CryptoSpace Co-working",
  },
  {
    id: 3,
    date: "January 25th, 2025",
    time: "10:00 AM",
    datetime: "2025-01-25T10:00",
    name: "DeFi Summit 2025",
    description:
      "The largest DeFi conference in Europe. Learn from industry leaders about the future of decentralized finance and emerging trends.",
    categories: ["conference", "defi", "finance"],
    link: "https://defisummit2024.io",
    imageUrl:
      "https://polkadot.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fqf32zgfm%2Fproduction%2Fe94d3bb006b3e702da0c278a0fee179681b95755-1528x1144.png%3Ffm%3Dwebp%26fit%3Dmax&w=3840&q=75",
    location: "Crypto Convention Center",
  },
  {
    id: 4,
    date: "April 12th, 2025",
    time: "3:00 PM",
    datetime: "2025-04-12T15:00",
    name: "NFT Art Gallery Opening",
    description:
      "Exclusive gallery opening featuring digital artworks from renowned NFT artists. Live minting session and artist meet-and-greet.",
    categories: ["art", "nft", "culture"],
    link: "https://nftgallery.art/opening",
    imageUrl:
      "https://polkadot.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fqf32zgfm%2Fproduction%2Fcb903d9d15cb4bfe09d8951c9f64b4f99cd9340b-1229x960.png%3Ffm%3Dwebp%26fit%3Dmax&w=3840&q=75",
    location: "Digital Art House",
  },
  {
    id: 5,
    date: "April 18th, 2025",
    time: "1:00 PM",
    datetime: "2025-04-18T13:00",
    name: "Blockchain Security Workshop",
    description:
      "Hands-on workshop covering smart contract security, audit techniques, and best practices for secure blockchain development.",
    categories: ["workshop", "security", "development"],
    link: "https://web3security.dev/workshop",
    imageUrl:
      "https://polkadot.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fqf32zgfm%2Fproduction%2Fcc7104a8c48eee3e2c57ba354c3f0f1de6c274d0-1528x1144.png%3Ffm%3Dwebp%26fit%3Dmax&w=3840&q=75",
    location: "Web3 Security Institute",
  },
  {
    id: 6,
    date: "April 25th, 2024",
    time: "4:00 PM",
    datetime: "2024-04-25T16:00",
    name: "Zero Knowledge Proofs Workshop",
    description:
      "Deep dive into ZK-proofs implementation. Learn how to build privacy-preserving applications using the latest ZK frameworks.",
    categories: ["workshop", "privacy", "zk-proofs"],
    link: "https://zkworkshop.dev",
    imageUrl:
      "https://polkadot.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fqf32zgfm%2Fproduction%2F5911d3b6dbc994f54a232ea82254fcc142bb1638-1528x1144.png%3Ffm%3Dwebp%26fit%3Dmax&w=3840&q=75",
    location: "Crypto Innovation Lab",
  },
  {
    id: 7,
    date: "May 2nd, 2024",
    time: "11:00 AM",
    datetime: "2024-05-02T11:00",
    name: "Layer 2 Solutions Summit",
    description:
      "Explore the latest developments in Ethereum scaling solutions. Featured talks on Optimistic Rollups, ZK-Rollups, and State Channels.",
    categories: ["conference", "scaling", "layer2"],
    link: "https://l2summit.eth",
    imageUrl:
      "https://polkadot.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fqf32zgfm%2Fproduction%2F3b5f36c4725da484ab096097389871943d20ee08-1528x1144.png%3Ffm%3Dwebp%26fit%3Dmax&w=3840&q=75",
    location: "Blockchain Center",
  },
  {
    id: 8,
    date: "May 8th, 2024",
    time: "7:00 PM",
    datetime: "2024-05-08T19:00",
    name: "Web3 Gaming Night",
    description:
      "Join us for an evening of blockchain gaming. Test new Web3 games, meet game developers, and learn about the future of gaming on the blockchain.",
    categories: ["gaming", "web3", "networking"],
    link: "https://web3gaming.night",
    imageUrl:
      "https://polkadot.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fqf32zgfm%2Fproduction%2Fcc7104a8c48eee3e2c57ba354c3f0f1de6c274d0-1528x1144.png%3Ffm%3Dwebp%26fit%3Dmax&w=3840&q=75",
    location: "GameFi Arena",
  },
]

// Add this near the top where other constants are defined
const uniqueCategories = Array.from(
  new Set(events.flatMap((event) => event.categories))
)

// Add these utility functions at the top of the file
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function generateCalendarDays(year: number, month: number) {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  // Get last days of previous month to fill the first week
  const daysInPrevMonth = getDaysInMonth(year, month - 1)
  const prevMonthDays = Array.from(
    { length: (firstDayOfMonth + 6) % 7 },
    (_, i) => ({
      date: `${year}-${String(month).padStart(2, "0")}-${String(
        daysInPrevMonth - ((firstDayOfMonth + 6) % 7) + i + 1
      ).padStart(2, "0")}`,
      isCurrentMonth: false,
      isToday: false,
    })
  )

  // Current month days
  const today = new Date()
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
    date: `${year}-${String(month + 1).padStart(2, "0")}-${String(
      i + 1
    ).padStart(2, "0")}`,
    isCurrentMonth: true,
    isToday:
      i + 1 === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear(),
  }))

  // Calculate how many days we need from next month
  const totalDays = 42 // 6 weeks * 7 days
  const remainingDays =
    totalDays - prevMonthDays.length - currentMonthDays.length
  const nextMonthDays = Array.from({ length: remainingDays }, (_, i) => ({
    date: `${year}-${String(month + 2).padStart(2, "0")}-${String(
      i + 1
    ).padStart(2, "0")}`,
    isCurrentMonth: false,
    isToday: false,
  }))

  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
}

// Add this helper function before the Calendar component
function getEventsForDate(date: string) {
  return events.filter((event) => {
    const eventDate = new Date(event.datetime)
    const compareDate = new Date(date)
    return eventDate.toDateString() === compareDate.toDateString()
  })
}

interface CalendarProps {
  selectedMonth: string // Format: "MM-YYYY"
}

export function Calendar({ selectedMonth }: CalendarProps) {
  const [month, year] = selectedMonth.split("-").map(Number)
  const days = generateCalendarDays(year, month - 1)

  console.log("selectedMonth", selectedMonth)
  const selectedMonthAsDate = new Date(year, month - 1)
  console.log("selectedMonthAsDate", selectedMonthAsDate)

  // Fix month/year transitions with zero padding
  const prevDate = new Date(year, month - 2)
  const nextDate = new Date(year, month)

  const prevMonth = String(prevDate.getMonth() + 1).padStart(2, "0")
  const prevYear = prevDate.getFullYear()
  const nextMonth = String(nextDate.getMonth() + 1).padStart(2, "0")
  const nextYear = nextDate.getFullYear()

  async function loadMoreEvents(page: number, category?: string) {
    "use server"
    let nextEvents: Array<PolkadotEvent> = []
    try {
      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 500))
    } catch (error) {
      console.error("Failed to load more events:", error)
    }

    return nextEvents
  }

  return (
    <div>
      <div className="flex items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Upcoming Events
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
              {selectedMonthAsDate.toLocaleString("default", {
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
              const dayEvents = getEventsForDate(day.date)
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
                            "mx-auto flex size-7 items-center justify-center rounded-full"
                          )}
                        >
                          {day.date.split("-")[2].replace(/^0/, "")}
                        </time>
                        {hasEvents && (
                          <span className="absolute -translate-x-1/2 bg-indigo-600 rounded-full bottom-1 left-1/2 size-1" />
                        )}
                      </button>
                    </TooltipTrigger>
                    {hasEvents && (
                      <TooltipContent
                        side="bottom"
                        className="p-2 max-w-[300px]"
                      >
                        <div className="space-y-2">
                          {dayEvents.map((event) => (
                            <div
                              key={event.id}
                              className="flex flex-row gap-2 text-sm"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={event.imageUrl}
                                alt={event.name}
                                className="flex-none rounded-sm size-12"
                              />
                              <div className="flex flex-col justify-center gap-0.5 text-left">
                                <div className="font-semibold">
                                  {event.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {event.time} - {event.location}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TooltipContent>
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
            <h4 className="mt-8 text-base font-semibold text-left text-gray-900 dark:text-gray-100">
              🔥 Featured Events
            </h4>
            <ol className="mt-4 space-y-4 top-24">
              {events.slice(0, 3).map((event) => (
                <li key={event.id} className="flex items-center gap-x-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={event.imageUrl}
                    alt=""
                    className="flex-none rounded-sm size-12"
                  />
                  <div className="flex-auto min-w-0">
                    <p className="text-sm font-semibold text-left text-gray-900 truncate dark:text-gray-100">
                      {event.name}
                    </p>
                    <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400 gap-x-2">
                      <CalendarIcon className="flex-none w-2 h-2 size-2" />
                      <span className="truncate">{event.date}</span>
                      <MapPin className="flex-none ml-1 size-2" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="mt-4 text-sm/6 lg:col-span-7 xl:col-span-8">
          <EventsList
            initialEvents={events}
            totalEvents={events.length}
            loadMoreEvents={loadMoreEvents}
          />
        </div>
      </div>
    </div>
  )
}
