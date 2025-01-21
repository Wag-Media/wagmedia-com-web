"use client"

import * as React from "react"
import Image from "next/image"
import { Coins, Copy, DollarSign, Heart, Star, ThumbsUp } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

type Reaction = {
  emoji: React.ReactNode
  count: number
}

type Meme = {
  id: string
  title: string
  image: string
  author: {
    name: string
    avatar: string
  } | null
  width?: number
  height?: number
  categories: {
    slug: string
    name: string
  }[]
  date: string
  fundsReceived: string
}

export function MemeGrid({ memes }: { memes: Meme[] }) {
  const copyMemeToClipboard = async (meme: Meme) => {
    try {
      await navigator.clipboard.writeText(meme.image)

      console.log("Meme copied!", meme.image)
      //   toast({
      //     title: "Meme copied!",
      //     description: "The meme has been copied to your clipboard.",
      //   })
    } catch (err) {
      console.error("Failed to copy: ", err)
      //   toast({
      //     title: "Copy failed",
      //     description: "Unable to copy the meme. Please try again.",
      //     variant: "destructive",
      //   })
    }
  }

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:_balance] h-full">
      {memes.map((meme) => {
        return (
          <Card
            key={meme.id}
            className="relative w-full mb-4 overflow-hidden rounded-sm group break-inside-avoid-column"
          >
            <CardContent className="p-0">
              <div className="relative">
                {/* @ts-ignore */}
                <Image
                  src={meme.image || "/placeholder.svg"}
                  alt={meme.title}
                  width={meme.image ? meme.width : 400}
                  height={meme.image ? meme.height : 300}
                  className="object-cover"
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "auto",
                  }}
                  sizes="(min-width: 1536px) 16.67vw, (min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33.33vw, 50vw"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4 text-center transition-opacity duration-300 bg-black opacity-0 bg-opacity-70 group-hover:opacity-100">
                  <div className="flex flex-col gap-1 text-sm text-white">
                    <h3 className="mb-2 text-lg font-bold text-white font-unbounded line-clamp-2">
                      {meme.title}
                    </h3>
                    <time className="text-white">
                      {new Date(meme.date).toLocaleDateString()}
                    </time>
                    <div className="flex items-center justify-center">
                      <Image
                        src={meme.author?.avatar || "/placeholder.svg"}
                        alt={meme.author?.name || "Unknown"}
                        width={20}
                        height={20}
                        className="mr-2 rounded-full"
                      />
                      <span>{meme.author?.name}</span>
                    </div>
                    <span className="flex items-center justify-center text-sm font-medium text-pink-500">
                      <Coins className="w-4 h-4 mr-1" />
                      {meme.fundsReceived}
                    </span>

                    {/* <div className="flex flex-wrap gap-2 mb-2">
                      {meme.categories.map((category, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-white bg-white/10 hover:bg-white/20"
                        >
                          {category.name}
                        </Badge>
                      ))}
                    </div> */}
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
        )
      })}
    </div>
  )
}
