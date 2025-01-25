"use client"

import * as React from "react"
import Link from "next/link"
import { getFeaturedPosts } from "@/data/dbPosts"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/types/prisma"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { removeHtmlTags, removeLinks } from "@/app/post/[slug]/util"

import CategoryBadgeListWag from "./CategoryBadgeList/CategoryBadgeListWag"
import { WagImage } from "./WagImage/WagImage"

export function FeaturedPostsSlider({
  featuredPosts,
}: {
  featuredPosts: Awaited<ReturnType<typeof getFeaturedPosts>>
}) {
  return (
    <div className="relative w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="relative z-10 w-full [&>div]:pt-4 [&>div]:pb-6"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {featuredPosts.map(
            (post: PostWithTagsCategoriesReactionsPaymentsUser) => (
              <CarouselItem key={post.id} className="md:basis-1/2 xl:basis-1/3">
                <Card className="overflow-hidden transition-all duration-500 rounded-sm hover:shadow-lg hover:border-[#FF2670] h-full border-[1.5px]">
                  <CardContent className="flex flex-col h-full p-0">
                    <div className="relative aspect-[16/9]">
                      <WagImage
                        containerClassName="w-full h-full"
                        image={
                          post.embeds?.[0]?.embedImage || "/placeholder.svg"
                        }
                        alt={post.title}
                        className="object-cover w-full h-full"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        priority
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-4">
                      <CategoryBadgeListWag
                        categories={post.categories.slice(0, 4)}
                        className="mb-2"
                        itemClass="mr-0.5"
                      />
                      <h3 className="mb-2 text-lg text-gray-900 dark:text-white text-normal font-unbounded">
                        {post.title}
                      </h3>
                      {post?.content && (
                        <div className="flex-1">
                          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                            {removeLinks(removeHtmlTags(post.content))}
                          </p>
                        </div>
                      )}
                      <Link
                        href={`/post/${post.slug}`}
                        className="text-[#FF2670] hover:text-[#7916F3] transition-colors duration-200 "
                      >
                        Read more →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            )
          )}
        </CarouselContent>
        <div className="flex justify-center gap-2 md:mt-4">
          <CarouselPrevious
            variant="outline"
            size="icon"
            className="text-[#FF2670] hover:scale-105 hover:text-[#FF2670] hover:bg-background transition-all border-[#FF2670] "
          >
            <ChevronLeft className="w-4 h-4" />
          </CarouselPrevious>
          <CarouselNext
            variant="outline"
            size="icon"
            className=" text-[#FF2670] hover:scale-105 hover:text-[#FF2670] hover:bg-background transition-all border-[#FF2670] "
          >
            <ChevronRight className="w-4 h-4" />
          </CarouselNext>
        </div>
      </Carousel>
    </div>
  )
}
