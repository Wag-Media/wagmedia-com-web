"use client"

import { useState } from "react"
import { DiscordIcon } from "@/images/icons"
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid"
import { Filter, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const events = [
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
    date: "April 12th, 2024",
    time: "3:00 PM",
    datetime: "2024-04-12T15:00",
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
    date: "April 18th, 2024",
    time: "1:00 PM",
    datetime: "2024-04-18T13:00",
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

function generateCalendarDays() {
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth()
  const currentDate = today.getDate()

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)

  // Get last days of previous month to fill the first week
  const daysInPrevMonth = getDaysInMonth(currentYear, currentMonth - 1)
  const prevMonthDays = Array.from(
    { length: (firstDayOfMonth + 6) % 7 },
    (_, i) => ({
      date: `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(
        daysInPrevMonth - ((firstDayOfMonth + 6) % 7) + i + 1
      ).padStart(2, "0")}`,
      isCurrentMonth: false,
      isToday: false,
    })
  )

  // Current month days
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
    date: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(
      i + 1
    ).padStart(2, "0")}`,
    isCurrentMonth: true,
    isToday: i + 1 === currentDate,
  }))

  // Calculate how many days we need from next month
  const totalDays = 42 // 6 weeks * 7 days
  const remainingDays =
    totalDays - prevMonthDays.length - currentMonthDays.length
  const nextMonthDays = Array.from({ length: remainingDays }, (_, i) => ({
    date: `${currentYear}-${String(currentMonth + 2).padStart(2, "0")}-${String(
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

export default function Calendar() {
  const [isLoading, setIsLoading] = useState(false)
  const [displayedEvents, setDisplayedEvents] = useState(events.slice(0, 5))
  const [isLoadMoreDisabled, setIsLoadMoreDisabled] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const today = new Date()
  const currentMonth = today.toLocaleString("default", { month: "long" })
  const days = generateCalendarDays()

  async function loadMoreEvents() {
    if (isLoadMoreDisabled || isLoading) return

    setIsLoading(true)
    try {
      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const currentLength = displayedEvents.length
      const nextEvents = events.slice(currentLength, currentLength + 5)
      setDisplayedEvents((prev) => [...prev, ...nextEvents])

      if (currentLength + 5 >= events.length) {
        setIsLoadMoreDisabled(true)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Upcoming Events
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Filter className="size-3" />
              <span className="sr-only">Filter events</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="font-medium">
              All Events
            </DropdownMenuItem>
            {uniqueCategories.map((category) => (
              <DropdownMenuItem key={category}>{category}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
        <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
          <div className="flex items-center text-gray-900 dark:text-gray-100">
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="size-5" aria-hidden="true" />
            </button>
            <div className="flex-auto text-sm font-semibold">
              {currentMonth}
            </div>
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="size-5" aria-hidden="true" />
            </button>
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
                        onClick={() => setSelectedDate(day.date)}
                        className={cn(
                          "py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 focus:z-10 relative",
                          day.isCurrentMonth
                            ? "bg-white dark:bg-gray-900"
                            : "bg-gray-50 dark:bg-gray-800",
                          (day.date === selectedDate || day.isToday) &&
                            "font-semibold",
                          day.date === selectedDate && "text-white",
                          !selectedDate &&
                            day.isCurrentMonth &&
                            !day.isToday &&
                            "text-gray-900 dark:text-gray-100",
                          !selectedDate &&
                            !day.isCurrentMonth &&
                            !day.isToday &&
                            "text-gray-400 dark:text-gray-600",
                          day.isToday &&
                            day.date !== selectedDate &&
                            "text-indigo-600 dark:text-indigo-400",
                          dayIdx === 0 && "rounded-tl-lg",
                          dayIdx === 6 && "rounded-tr-lg",
                          dayIdx === days.length - 7 && "rounded-bl-lg",
                          dayIdx === days.length - 1 && "rounded-br-lg"
                        )}
                      >
                        <time
                          dateTime={day.date}
                          className={cn(
                            "mx-auto flex size-7 items-center justify-center rounded-full",
                            day.date === selectedDate &&
                              day.isToday &&
                              "bg-indigo-600",
                            day.date === selectedDate &&
                              !day.isToday &&
                              "bg-gray-900"
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
            <Button className="w-full px-3 py-2 mt-8 text-sm font-semibold rounded-md shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">
              Add event <DiscordIcon className="ml-2 size-4" />
            </Button>
            <h4 className="mt-8 text-base font-semibold text-left text-gray-900 dark:text-gray-100">
              🔥 Featured Events
            </h4>
            <ol className="mt-4 space-y-4 top-24">
              {events.slice(0, 3).map((event) => (
                <li key={event.id} className="flex items-center gap-x-3">
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
                      <CalendarIcon className="flex-none size-3" />
                      <span className="truncate">{event.date}</span>
                      <MapPinIcon className="flex-none ml-1 size-3" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="mt-4 text-sm/6 lg:col-span-7 xl:col-span-8">
          <ol className="divide-y divide-gray-100 dark:divide-gray-800 text-sm/6">
            {displayedEvents.map((event) => (
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
                          <CalendarIcon
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
                          <MapPinIcon
                            className="text-gray-400 size-5"
                            aria-hidden="true"
                          />
                        </dt>
                        <dd>{event.location}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 lg:mt-0 lg:justify-end lg:self-start">
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
                onClick={loadMoreEvents}
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
        </div>
      </div>
    </div>
  )
}
