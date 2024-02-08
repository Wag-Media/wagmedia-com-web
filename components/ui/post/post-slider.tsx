"use client"

import * as React from "react"
import { Post } from "@prisma/client"

import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/types/prisma"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { PostListItem } from "./post-list-item"

export function PostSlider({
  posts,
}: {
  posts: PostWithTagsCategoriesReactionsPaymentsUser[]
}) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {posts.map((post, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/2 lg:basis-1/2 xl:basis-1/3"
          >
            <div className="p-1">
              <PostListItem post={post} className="lg:w-full 2xl:w-full" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
