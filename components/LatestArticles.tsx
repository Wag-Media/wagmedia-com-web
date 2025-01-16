"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { DollarSign, Heart, Star, ThumbsUp } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { PostDisplayType } from "./FeaturedPostsSlider"
import { LatestArticlesCard } from "./ui/latest-articles/latest-article-card"

type Reaction = {
  emoji: React.ReactNode
  count: number
}

type Article = {
  id: number
  title: string
  excerpt: string
  image: string
  author: string
  tags: string[]
  date: string
  reactions: Reaction[]
  fundsReceived: number
}

export function LatestArticles({ posts }: { posts: PostDisplayType[] }) {
  const [selectedTab, setSelectedTab] = React.useState("latest")

  return (
    <section className="py-16">
      <div className="container max-w-[1400px]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
              Explore{" "}
              {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}{" "}
              Polkadot Articles
            </h2>
            <Tabs
              defaultValue="latest"
              className="w-full max-w-md"
              value={selectedTab}
              onValueChange={setSelectedTab}
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="latest" className="font-sans">
                  Latest
                </TabsTrigger>
                <TabsTrigger value="popular" className="font-sans">
                  Popular
                </TabsTrigger>
                <TabsTrigger value="trending" className="font-sans">
                  Trending
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((article) => (
              <LatestArticlesCard article={article} />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              size="lg"
              className="min-w-[200px]  text-[#FF2670] hover:bg-[#FF2670] hover:text-white border-[#FF2670] font-sans"
            >
              Load More
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
