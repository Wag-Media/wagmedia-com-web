import React, { FC, ReactNode, Suspense } from "react"
import { getTotalPostCount } from "@/data/dbPosts"
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
  const totalPostCount = await getTotalPostCount()
  // const [tabActive, setTabActive] = useState<string>(tabs[0])

  // const handleClickTab = (item: string) => {
  //   if (item === tabActive) {
  //     return
  //   }
  //   setTabActive(item)
  // }

  const subHeading = (
    <>
      Discover <span className="font-semibold">{`${totalPostCount}`}</span>{" "}
      Polkadot related posts
    </>
  )

  return (
    <div className={`nc-SectionGridPosts relative ${className}`}>
      <h2 className="text-5xl font-bold mt-8">Explore our latest Articles</h2>
      <p className="mt-3 text-gray-500 text-lg">
        Discover ... Polkadot related articles by our community
      </p>
      <PostGridDisplay initialPosts={posts} totalPostCount={totalPostCount} />
    </div>
  )
}
