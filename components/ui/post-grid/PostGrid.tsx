import React from "react"
import Link from "next/link"
import { getTotalPostCount } from "@/data/dbPosts"
import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/data/types"

import { Headline } from "../headline"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs"
import { PostGridDisplay } from "./PostGridDisplay"

export interface PostGridProps {
  initialLatestPosts: PostWithTagsCategoriesReactionsPaymentsUser[]
  initialPopularPosts: PostWithTagsCategoriesReactionsPaymentsUser[]
  loadMoreLatestPostsPromise: (
    currentPage: number,
    orderBy?: string,
    search?: string
  ) => Promise<PostWithTagsCategoriesReactionsPaymentsUser[]>
  loadMorePopularPostsPromise: (
    currentPage: number,
    search?: string,
    orderBy?: string
  ) => Promise<PostWithTagsCategoriesReactionsPaymentsUser[]>
}

export default async function PostGrid({
  initialLatestPosts,
  initialPopularPosts,
  loadMoreLatestPostsPromise,
  loadMorePopularPostsPromise,
}: PostGridProps) {
  const totalPostCount = await getTotalPostCount()

  return (
    <section className="py-12">
      <div className="container max-w-[1400px]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-4 mb-8">
            <Headline
              level="h2"
              subtitle={`Discover ${totalPostCount} articles, from a multitude of categories and tags, created by our community creators`}
            >
              Explore latest Polkadot Articles
            </Headline>
            <Tabs
              defaultValue="latest"
              className="relative flex flex-col items-center w-full"
            >
              <TabsList className="relative z-10 grid w-full max-w-md grid-cols-2 mb-2">
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
                  initialPosts={initialLatestPosts}
                  totalPostCount={totalPostCount}
                  loadMorePostsPromise={loadMoreLatestPostsPromise}
                />
              </TabsContent>
              <TabsContent value="popular">
                <PostGridDisplay
                  initialPosts={initialPopularPosts}
                  totalPostCount={totalPostCount}
                  loadMorePostsPromise={loadMorePopularPostsPromise}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
}
