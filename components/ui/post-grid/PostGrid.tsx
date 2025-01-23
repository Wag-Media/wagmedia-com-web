import React, { FC, ReactNode, Suspense } from "react"
import Link from "next/link"
import { getTotalPostCount } from "@/data/dbPosts"
import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/data/types"

import { Button } from "@/components/ui/button"
import { fetchPosts } from "@/app/actions/fetchPosts"
import { replaceAuthorLinks } from "@/app/post/[slug]/util"

import { Headline } from "../headline"
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
    <section className="py-12">
      <div className="container max-w-[1400px]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-4 mb-8">
            <Headline
              level="h2"
              subtitle={`Discover ${totalPostCount} articles, from a multitude of categories and tags, created by our community creators`}
            >
              Explore {articleOrder} Polkadot Articles
            </Headline>
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
        </div>
      </div>
    </section>
  )
}
