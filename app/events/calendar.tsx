import { Suspense } from "react"

import { CalendarGrid } from "./components/calendar-grid"
import { EventsCategoryFilter } from "./components/events-category-filter"
import { EventsList } from "./components/events-list"
import { MonthSelector } from "./components/month-selector"
import { generateCalendarDays } from "./util"

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

interface CalendarProps {
  selectedMonth: string // Format: "MM-YYYY"
}

export function Calendar({ selectedMonth }: CalendarProps) {
  const [month, year] = selectedMonth.split("-").map(Number)
  const selectedMonthAsDate = new Date(year, month - 1)

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
        <CalendarGrid
          selectedMonthAsDate={selectedMonthAsDate}
          events={events}
          month={month}
          year={year}
        />
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
