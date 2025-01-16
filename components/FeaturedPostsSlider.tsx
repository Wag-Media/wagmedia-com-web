"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export interface PostDisplayType {
  id: string
  title: string
  excerpt: string
  image: string | null
  categories: {
    name: string
    slug: string
  }[]
  slug: string
  author: {
    name: string | null
    avatar: string | null
  } | null
  date: string
  fundsReceived: string
}

export function FeaturedPostsSlider({ posts }: { posts: PostDisplayType[] }) {
  return (
    <div className="w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {posts?.map((post) => (
            <CarouselItem key={post.id} className="md:basis-1/1 lg:basis-1/2">
              <Card className="h-full overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-[16/9]">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="object-cover w-full h-full"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex flex-row flex-wrap items-start w-full gap-2">
                      {post?.categories?.map((category) => (
                        <Link
                          href={`/category/${category.slug}`}
                          key={category.slug}
                        >
                          <Badge className="mb-2 bg-[#FF2670] text-white hover:bg-[#E4FF07] hover:text-black font-sans">
                            {category.name}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                    <h3 className="mb-2 font-sans text-xl text-gray-900 dark:text-white md:text-2xl">
                      {post.title}
                    </h3>
                    <p className="mb-4 font-sans text-sm text-gray-600 dark:text-slate-300 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="text-[#FF2670] hover:text-[#E4FF07] transition-colors duration-200 font-sans"
                    >
                      Read more →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-2 mt-4">
          <CarouselPrevious
            variant="outline"
            size="icon"
            className="w-9 h-9 border-2 text-[#FF2670] hover:bg-[#FF2670] hover:text-white border-[#FF2670] font-sans"
          >
            <ChevronLeft className="w-8 h-8" />
          </CarouselPrevious>
          <CarouselNext
            variant="outline"
            size="icon"
            className="w-9 h-9 border-2 text-[#FF2670] hover:bg-[#FF2670] hover:text-white border-[#FF2670] font-sans"
          >
            <ChevronRight className="w-8 h-8" />
          </CarouselNext>
        </div>
      </Carousel>
    </div>
  )
}
