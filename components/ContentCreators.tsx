import Image from "next/image"
import { getAuthors } from "@/data/dbAuthors"

import { Card, CardContent } from "@/components/ui/card"

import { ImageGood } from "./WagImage/NewWagImage"

const creators = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Web3 Developer",
    avatar: "/placeholder.svg?height=100&width=100",
    followers: "12.5K",
    posts: 156,
    earnings: 2450,
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "DeFi Analyst",
    avatar: "/placeholder.svg?height=100&width=100",
    followers: "8.2K",
    posts: 98,
    earnings: 1820,
  },
  {
    id: 3,
    name: "John Doe",
    role: "NFT Artist",
    avatar: "/placeholder.svg?height=100&width=100",
    followers: "15.7K",
    posts: 212,
    earnings: 3100,
  },
  {
    id: 4,
    name: "Emma Wilson",
    role: "Blockchain Researcher",
    avatar: "/placeholder.svg?height=100&width=100",
    followers: "9.3K",
    posts: 115,
    earnings: 2010,
  },
  {
    id: 5,
    name: "Michael Chang",
    role: "Crypto Journalist",
    avatar: "/placeholder.svg?height=100&width=100",
    followers: "11.1K",
    posts: 138,
    earnings: 2275,
  },
  {
    id: 1,
    name: "Alex Rivera",
    role: "Web3 Developer",
    avatar: "/placeholder.svg?height=100&width=100",
    followers: "12.5K",
    posts: 156,
    earnings: 2450,
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "DeFi Analyst",
    avatar: "/placeholder.svg?height=100&width=100",
    followers: "8.2K",
    posts: 98,
    earnings: 1820,
  },
  {
    id: 3,
    name: "John Doe",
    role: "NFT Artist",
    avatar: "/placeholder.svg?height=100&width=100",
    followers: "15.7K",
    posts: 212,
    earnings: 3100,
  },
  {
    id: 4,
    name: "Emma Wilson",
    role: "Blockchain Researcher",
    avatar: "/placeholder.svg?height=100&width=100",
    followers: "9.3K",
    posts: 115,
    earnings: 2010,
  },
  {
    id: 5,
    name: "Michael Chang",
    role: "Crypto Journalist",
    avatar: "/placeholder.svg?height=100&width=100",
    followers: "11.1K",
    posts: 138,
    earnings: 2275,
  },
]

type Creator = Awaited<ReturnType<typeof getAuthors>>[number]

export function ContentCreators({ creators }: { creators: Creator[] }) {
  return (
    <section className="py-12 pb-32">
      <div className="container max-w-6xl">
        <h2 className="mb-8 text-3xl font-bold text-center font-unbounded">
          Top WagMedia Creators
        </h2>
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          {creators.map((creator) => (
            <Card
              key={creator.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-md dark:bg-slate-900 hover:scale-[102%] rounded-sm"
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <ImageGood
                    src={creator.avatar || "/placeholder.svg"}
                    alt={creator.name || ""}
                    className="flex-shrink-0 w-12 h-12 rounded-full"
                    sizes="64px"
                    width={40}
                    height={40}
                  />
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-1">
                      {creator.name}
                    </h3>
                    {/* <p className="text-sm text-gray-600 dark:text-slate-300">
                      {creator.role}
                    </p> */}
                  </div>
                </div>
                <div className="flex flex-row justify-between gap-2 mt-4 text-sm text-center">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {creator.postCount}
                    </p>
                    <p className="text-gray-600 dark:text-slate-300">Posts</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      ${creator.totalEarnings}
                    </p>
                    <p className="text-gray-600 dark:text-slate-300">Earned</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
