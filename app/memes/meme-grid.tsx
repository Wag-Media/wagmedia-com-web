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
  id: string
  title: string
  image: string
  author: string | null
  width?: number
  height?: number
  categories: {
    slug: string
    name: string
  }[]
  date: string
  fundsReceived: number
}

export function MemeGrid({ memes }: { memes: Meme[] }) {
  const copyMemeToClipboard = async (meme: Meme) => {
    try {
      const response = await fetch(meme.image)
      const blob = await response.blob()
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ])
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
    <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 [column-fill:_balance] h-full">
      {memes.map((meme) => {
        return (
          <Card
            key={meme.id}
            className="relative inline-block w-full mb-4 overflow-hidden rounded-sm group break-inside-avoid-column"
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
                <div className="absolute inset-0 flex flex-col justify-between p-4 transition-opacity duration-300 bg-black opacity-0 bg-opacity-70 group-hover:opacity-100">
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-white font-unbounded line-clamp-2">
                      {meme.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {meme.categories.map((category, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-white bg-white/10 hover:bg-white/20"
                        >
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-white">
                    <div className="flex items-center justify-between mb-2 text-sm">
                      <span>{meme.author}</span>
                      <time>{new Date(meme.date).toLocaleDateString()}</time>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {/* {meme.reactions.map((reaction, index) => (
                        <span key={index} className="flex items-center text-sm">
                          {reaction.emoji}
                          <span className="ml-1">{reaction.count}</span>
                        </span>
                      ))} */}
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
        )
      })}
    </div>
  )
}
