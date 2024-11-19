import React, { FC, ReactNode, Suspense } from "react"
import { getPosts, getTotalPostCount } from "@/data/dbPosts"

import { PostGridDisplay } from "./PostGridDisplay"

export interface NewsGridProps {
  currentPage?: number
  search?: string
  className?: string
  gridClass?: string
  heading?: ReactNode
  headingIsCenter?: boolean
}

export default async function NewsGrid({
  search,
  currentPage = 0,
  className = "",
  gridClass = "",
  heading,
  headingIsCenter,
}: NewsGridProps) {
  const posts = await getPosts({
    search,
    contentType: "news",
  })
  const totalPostCount = await getTotalPostCount("news")

  return (
    <div className={`nc-SectionGridPosts relative ${className}`}>
      <h2 className="mt-8 text-5xl font-bold">
        What&apos;s the news and updates about the Polkadot ecosystem?
      </h2>
      <p className="mt-3 text-lg text-gray-500">
        Explore <Suspense fallback="...">{totalPostCount}</Suspense> Polkadot
        ecosystem news uncovered by our news finders program, conveniently
        bundled together in one place.
      </p>
      <PostGridDisplay
        initialPosts={posts}
        totalPostCount={totalPostCount}
        contentType="news"
      />
    </div>
  )
}
