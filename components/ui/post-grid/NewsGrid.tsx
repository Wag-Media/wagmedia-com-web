import React, { FC, ReactNode, Suspense } from "react"
import { getPosts, getTotalPostCount } from "@/data/dbPosts"
import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/data/types"
import { prisma } from "@/prisma/prisma"
import { ArrowRightIcon } from "lucide-react"

import Button from "@/components/Button/Button"
import ButtonPrimary from "@/components/Button/ButtonPrimary"
import Card11Wag from "@/components/Card11/Card11Wag"
import Heading from "@/components/Heading/Heading"
import Nav from "@/components/Nav/Nav"
import { fetchPosts } from "@/app/actions/fetchPosts"

import { revalidate } from "../../../app/(home)/page"
import { Skeleton } from "../skeleton"
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
      <h2 className="text-5xl font-bold mt-8">
        What's the news and updates about the Polkadot ecosystem?
      </h2>
      <p className="mt-3 text-gray-500 text-lg">
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
