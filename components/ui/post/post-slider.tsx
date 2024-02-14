"use client"

import * as React from "react"
import { Post } from "@prisma/client"

import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/types/prisma"
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
    <Carousel className="">
      <CarouselContent>
        {posts.map((post, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
            <PostListItem post={post} variant="full" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
