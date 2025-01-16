"use client"

import * as React from "react"
import Image from "next/image"
import { Copy, DollarSign, Heart, Star, ThumbsUp } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

type Reaction = {
  emoji: React.ReactNode
  count: number
}

type Meme = {
  id: number
  title: string
  image: string
  author: string
  tags: string[]
  date: string
  reactions: Reaction[]
  fundsReceived: number
}

const memes: Meme[] = [
  {
    id: 1,
    title: "When the smart contract finally deploys",
    image: "/placeholder.svg?height=400&width=400",
    author: "CryptoMemer",
    tags: ["Smart Contracts", "Developer Life"],
    date: "2024-01-15",
    reactions: [
      { emoji: <Heart className="w-4 h-4" />, count: 250 },
      { emoji: <ThumbsUp className="w-4 h-4" />, count: 180 },
      { emoji: <Star className="w-4 h-4" />, count: 75 },
    ],
    fundsReceived: 50.25,
  },
  {
    id: 2,
    title: "POV: You're explaining blockchain to your grandma",
    image: "/placeholder.svg?height=400&width=400",
    author: "BlockchainBob",
    tags: ["Blockchain", "Explainer"],
    date: "2024-01-14",
    reactions: [
      { emoji: <Heart className="w-4 h-4" />, count: 320 },
      { emoji: <ThumbsUp className="w-4 h-4" />, count: 210 },
      { emoji: <Star className="w-4 h-4" />, count: 95 },
    ],
    fundsReceived: 75.5,
  },
  {
    id: 3,
    title: "Web3 developers during a bull run",
    image: "/placeholder.svg?height=400&width=400",
    author: "Web3Wizard",
    tags: ["Web3", "Bull Market"],
    date: "2024-01-13",
    reactions: [
      { emoji: <Heart className="w-4 h-4" />, count: 400 },
      { emoji: <ThumbsUp className="w-4 h-4" />, count: 280 },
      { emoji: <Star className="w-4 h-4" />, count: 120 },
    ],
    fundsReceived: 100.75,
  },
  {
    id: 4,
    title: "NFT artists creating their masterpiece",
    image: "/placeholder.svg?height=400&width=400",
    author: "NFTNinja",
    tags: ["NFT", "Digital Art"],
    date: "2024-01-12",
    reactions: [
      { emoji: <Heart className="w-4 h-4" />, count: 280 },
      { emoji: <ThumbsUp className="w-4 h-4" />, count: 190 },
      { emoji: <Star className="w-4 h-4" />, count: 85 },
    ],
    fundsReceived: 60.0,
  },
  {
    id: 5,
    title: "DeFi traders watching the charts 24/7",
    image: "/placeholder.svg?height=400&width=400",
    author: "DeFiDude",
    tags: ["DeFi", "Trading"],
    date: "2024-01-11",
    reactions: [
      { emoji: <Heart className="w-4 h-4" />, count: 350 },
      { emoji: <ThumbsUp className="w-4 h-4" />, count: 230 },
      { emoji: <Star className="w-4 h-4" />, count: 100 },
    ],
    fundsReceived: 85.25,
  },
  {
    id: 6,
    title: "Trying to explain gas fees to newbies",
    image: "/placeholder.svg?height=400&width=400",
    author: "GasGuru",
    tags: ["Ethereum", "Gas Fees"],
    date: "2024-01-10",
    reactions: [
      { emoji: <Heart className="w-4 h-4" />, count: 300 },
      { emoji: <ThumbsUp className="w-4 h-4" />, count: 200 },
      { emoji: <Star className="w-4 h-4" />, count: 90 },
    ],
    fundsReceived: 70.0,
  },
  // Add more memes to fill out the grid
  ...Array.from({ length: 24 }, (_, i) => ({
    id: i + 7,
    title: `Meme ${i + 7}`,
    image: "/placeholder.svg?height=400&width=400",
    author: `Author ${i + 7}`,
    tags: ["Tag1", "Tag2"],
    date: "2024-01-01",
    reactions: [
      { emoji: <Heart className="w-4 h-4" />, count: 100 },
      { emoji: <ThumbsUp className="w-4 h-4" />, count: 50 },
      { emoji: <Star className="w-4 h-4" />, count: 25 },
    ],
    fundsReceived: 30.0,
  })),
]

export function MemeGrid() {
  const copyMemeToClipboard = async (meme: Meme) => {
    // try {
    //   const response = await fetch(meme.image);
    //   const blob = await response.blob();
    //   await navigator.clipboard.write([
    //     new ClipboardItem({
    //       [blob.type]: blob
    //     })
    //   ]);
    //   toast({
    //     title: "Meme copied!",
    //     description: "The meme has been copied to your clipboard.",
    //   })
    // } catch (err) {
    //   console.error('Failed to copy: ', err);
    //   toast({
    //     title: "Copy failed",
    //     description: "Unable to copy the meme. Please try again.",
    //     variant: "destructive",
    //   })
    // }
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {memes.map((meme) => (
        <Card key={meme.id} className="relative overflow-hidden group">
          <CardContent className="p-0">
            <div className="relative aspect-square">
              <Image
                src={meme.image || "/placeholder.svg"}
                alt={meme.title}
                fill
                className="object-cover"
                sizes="(min-width: 1536px) 16.67vw, (min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33.33vw, 50vw"
              />
              <div className="absolute inset-0 flex flex-col justify-between p-4 transition-opacity duration-300 bg-black opacity-0 bg-opacity-70 group-hover:opacity-100">
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white font-unbounded line-clamp-2">
                    {meme.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {meme.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-white bg-white/10 hover:bg-white/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-white">
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span>{meme.author}</span>
                    <time>{meme.date}</time>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {meme.reactions.map((reaction, index) => (
                        <span key={index} className="flex items-center text-sm">
                          {reaction.emoji}
                          <span className="ml-1">{reaction.count}</span>
                        </span>
                      ))}
                    </div>
                    <span className="flex items-center text-sm font-medium">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {meme.fundsReceived.toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => copyMemeToClipboard(meme)}
                  className="absolute p-2 transition-opacity duration-300 bg-white rounded-full opacity-0 top-2 right-2 group-hover:opacity-100"
                >
                  <Copy className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
