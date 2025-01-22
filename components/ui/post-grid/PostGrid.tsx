import React, { FC, ReactNode, Suspense } from "react"
import Link from "next/link"
import { getTotalPostCount } from "@/data/dbPosts"
import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/data/types"

import { Button } from "@/components/ui/button"
import { fetchPosts } from "@/app/actions/fetchPosts"
import { replaceAuthorLinks } from "@/app/post/[slug]/util"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs"
import { PostGridDisplay } from "./PostGridDisplay"
import PostGridSkeleton from "./PostGridSkeleton"

export interface PostGridProps {
  articleOrder?: string
  latestPosts: PostWithTagsCategoriesReactionsPaymentsUser[]
  popularPosts: PostWithTagsCategoriesReactionsPaymentsUser[]
}

export default async function PostGrid({
  articleOrder,
  latestPosts,
  popularPosts,
}: PostGridProps) {
  const totalPostCount = await getTotalPostCount()

  return (
    <section className="py-16">
      <div className="container max-w-[1400px]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
              Explore {articleOrder} Polkadot Articles
            </h2>
            <p className="my-2 text-lg text-gray-500 dark:text-gray-400">
              Discover <Suspense fallback="...">{totalPostCount}</Suspense>{" "}
              articles, from a multitude of categories and tags, created by our
              community authors
            </p>
            <Tabs
              defaultValue={articleOrder}
              className="relative flex flex-col items-center w-full"
            >
              <TabsList className="relative z-10 grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="latest" className="font-sans">
                  <Link href={`?articles=latest`} scroll={false}>
                    Latest
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="popular" className="font-sans">
                  <Link href={`?articles=popular`} scroll={false}>
                    Popular
                  </Link>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="latest">
                <PostGridDisplay
                  initialPosts={latestPosts}
                  totalPostCount={totalPostCount}
                />
              </TabsContent>
              <TabsContent value="popular">
                <PostGridDisplay
                  initialPosts={popularPosts}
                  totalPostCount={totalPostCount}
                />
              </TabsContent>
            </Tabs>
          </div>

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
