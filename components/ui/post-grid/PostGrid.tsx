import React, { FC, ReactNode, Suspense } from "react"
import { getTotalPostCount } from "@/data/dbPosts"

import { Button } from "@/components/ui/button"
import { fetchPosts } from "@/app/actions/fetchPosts"
import { replaceAuthorLinks } from "@/app/post/[slug]/util"

import { Tabs, TabsList, TabsTrigger } from "../tabs"
import { PostGridDisplay } from "./PostGridDisplay"
import PostGridSkeleton from "./PostGridSkeleton"

export interface PostGridProps {
  currentPage?: number
  search?: string
  className?: string
  gridClass?: string
  heading?: ReactNode
  headingIsCenter?: boolean
}

export default async function PostGrid({
  search,
  currentPage = 0,
  className = "",
  gridClass = "",
  heading,
  headingIsCenter,
}: PostGridProps) {
  const posts = await fetchPosts({
    search,
  })

  const postsWithLinks = await Promise.all(
    posts.map(async (post) => {
      const title = await replaceAuthorLinks(post.title, false)
      return { ...post, title }
    })
  )

  const totalPostCount = await getTotalPostCount()

  return (
    <section className="py-16">
      <div className="container max-w-[1400px]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
              Explore our latest Articles
            </h2>
            <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
              Discover <Suspense fallback="...">{totalPostCount}</Suspense>{" "}
              Polkadot related articles by our community authors
            </p>
            <Tabs defaultValue="latest" className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF2670]/10 to-[#7916F3]/10 rounded-lg"></div>
              <TabsList className="relative z-10 grid w-full grid-cols-3">
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

          <Suspense fallback={<PostGridSkeleton />}>
            <PostGridDisplay
              initialPosts={postsWithLinks}
              totalPostCount={totalPostCount}
            />
          </Suspense>

          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              size="lg"
              className="min-w-[200px] bg-white text-[#FF2670] hover:bg-[#7916F3] hover:text-white border-[#FF2670] font-sans"
            >
              Load More
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
